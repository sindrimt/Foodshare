from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Category, Recipe, Comment, Like, UserFollowing


class CategorySerializer(serializers.ModelSerializer):

    recipe_count = serializers.IntegerField(
        source="recipes.count", read_only=True, default=-1  # in case of problems
    )

    class Meta:
        model = Category
        fields = "__all__"


class RecipeSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
        default="",
    )

    comment_count = serializers.IntegerField(
        source="comments.count", read_only=True, default=-1
    )

    like_count = serializers.IntegerField(
        source="likes.count", read_only=True, default=-1
    )

    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = "__all__"
        read_only_fields = ["user"]  # this is set automatically

    def get_is_liked(self, obj):
        user = self.context["request"].user
        return Like.objects.filter(recipe=obj, user=user).exists()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["user"]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"
        read_only_fields = ["user"]


class UserSerializer(serializers.ModelSerializer):
    recipes = serializers.HyperlinkedRelatedField(
        many=True, view_name="recipes-detail", read_only=True
    )

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
        ]
