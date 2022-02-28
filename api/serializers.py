from django.contrib.auth.models import User
from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer

from .models import Recipe, Comment, Like, UserFollow


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

    tags = TagListSerializerField()

    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            "id",
            "title",
            "summary",
            "content",
            "prep_time",
            "image",
            "user",
            "created",
            "tags",
            "like_count",
            "is_liked",
            "comment_count",
        ]
        read_only_fields = ["user"]  # this is set automatically

    def get_is_liked(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return Like.objects.filter(user=user, recipe=obj).exists()
        return False


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["user"]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["id", "recipe", "user", "created"]
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


class UserFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollow
        fields = ["follows", "user", "created"]
        read_only_fields = ["user"]
