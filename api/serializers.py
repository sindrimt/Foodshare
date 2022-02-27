from django.contrib.auth.models import User
from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer

from .models import Recipe, Comment


class RecipeSerializer(TaggitSerializer, serializers.ModelSerializer):

    comment_count = serializers.IntegerField(
        source="comments.count",
        read_only=True,
        default=-1,
    )

    like_count = serializers.IntegerField(
        source="liked_by.count",
        read_only=True,
        default=-1,
    )

    tags = TagListSerializerField()

    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        exclude = ("liked_by",)
        read_only_fields = ["user"]  # this is set automatically

    def get_is_liked(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return user.liked_recipes.filter(id=obj.id).exists()
        return False


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
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
