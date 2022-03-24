from django.contrib.auth.models import User
from django.db.models import Avg
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from taggit.models import Tag
from taggit.serializers import TaggitSerializer, TagListSerializerField

from .models import CartItem, Comment, Ingredient, Like, Recipe, UserFollow


class TagListSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ("id", "name", "count")

    def get_count(self, obj):
        return Recipe.objects.filter(tags=obj).count()


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        exclude = ("recipe",)


class CartItemSerializer(serializers.ModelSerializer):

    recipe = serializers.IntegerField(source="ingredient.recipe.id", read_only=True)
    recipe_title = serializers.CharField(
        source="ingredient.recipe.title", read_only=True
    )

    class Meta:
        model = CartItem
        fields = ["id", "ingredient", "recipe", "recipe_title"]
        read_only_fields = ["user"]


class RecipeSerializer(TaggitSerializer, serializers.ModelSerializer):

    comment_count = serializers.IntegerField(
        source="comments.count",
        read_only=True,
        default=-1,
    )

    like_count = serializers.IntegerField(
        source="likes.count",
        read_only=True,
        default=-1,
    )

    username = serializers.CharField(
        source="user.username",
        read_only=True,
        default="N/A",
    )

    ingredients = IngredientSerializer(many=True, required=False)

    tags = TagListSerializerField()

    is_liked = serializers.SerializerMethodField()

    avg_rating = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            "id",
            "title",
            "summary",
            "content",
            "prep_time",
            "ingredients",
            "image",
            "user",
            "username",
            "created",
            "tags",
            "like_count",
            "is_liked",
            "comment_count",
            "avg_rating",
        ]
        read_only_fields = ["user"]  # this is set automatically

    def get_is_liked(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return Like.objects.filter(user=user, recipe=obj).exists()
        return False

    def get_avg_rating(self, obj):
        # reverse lookup on Reviews using item field
        return obj.comments.all().aggregate(Avg("rating"))["rating__avg"]

    def create(self, validated_data):
        ingredients_data = validated_data.pop("ingredients", [])
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        return recipe

    def update(self, obj, validated_data):
        # if ingredients, even if empty, delete all and input new
        if "ingredients" in validated_data:
            ingredients_data = validated_data.pop("ingredients", [])
            recipe = super().update(obj, validated_data)
            Ingredient.objects.filter(recipe=recipe).delete()
            for ingredient_data in ingredients_data:
                Ingredient.objects.create(recipe=recipe, **ingredient_data)

        # else just use super update
        else:
            recipe = super().update(obj, validated_data)

        return recipe


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["user"]


class LikeSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = Like
        fields = ["id", "recipe", "user", "created"]
        read_only_fields = ["user"]
        validators = [
            UniqueTogetherValidator(
                queryset=Like.objects.all(),
                fields=["user", "recipe"],
            )
        ]


class UserSerializer(serializers.ModelSerializer):

    recipes = serializers.HyperlinkedRelatedField(
        many=True, view_name="recipes-detail", read_only=True
    )

    followers = serializers.IntegerField(
        source="followers.count", default=0, read_only=True
    )

    following = serializers.IntegerField(
        source="following.count", default=0, read_only=True
    )

    is_followed = serializers.SerializerMethodField(default=False)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "date_joined",
            "last_login",
            "is_superuser",
            "recipes",
            "followers",
            "following",
            "is_followed",
        ]

    def get_is_followed(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return UserFollow.objects.filter(user=user, follows=obj).exists()
        return False


class UserFollowSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    follows_username = serializers.CharField(
        source="follows.username",
        read_only=True,
        default="N/A",
    )

    class Meta:
        model = UserFollow
        fields = "__all__"
        read_only_fields = ["user"]
        validators = [
            UniqueTogetherValidator(
                queryset=UserFollow.objects.all(),
                fields=["user", "follows"],
            )
        ]
