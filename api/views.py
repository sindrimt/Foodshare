from urllib import request
from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, filters, generics
from django_filters.rest_framework import DjangoFilterBackend

from .models import Comment, Recipe, UserFollowing
from .permissions import IsAuthor, IsAuthorOrAdmin
from .serializers import (
    CommentSerializer,
    RecipeSerializer,
    UserSerializer,
)


class RecipeView(viewsets.ModelViewSet):
    """
    List of all recipes. Go to /recipes/<id>/ to modify or delete,
    Tags must be formatted as proper JSON lists, e.g. ["frokost", "kjøtt"]
    """

    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    filterset_fields = (
        "user",
        "tags__name",
    )
    # https://stackoverflow.com/questions/41279335/filter-by-multiple-django-taggit-tags-with-django-rest-framework

    search_fields = (
        "title",
        "content",
        "tags__name",
    )

    def get_permissions(self):

        if self.action in ["list", "retrieve"]:  # anyone can read
            permission_classes = [permissions.AllowAny]

        elif self.action in ["create"]:  # must be logged in to interact
            permission_classes = [permissions.IsAuthenticated]

        else:
            permission_classes = [IsAuthorOrAdmin]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentView(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    filterset_fields = (
        "recipe",
        "user",
    )

    search_fields = None  # needed for filters to work

    def get_permissions(self):

        if self.action in ["list", "retrieve"]:  # anyone can read
            permission_classes = [permissions.AllowAny]

        elif self.action in ["create"]:  # must be logged in to post
            permission_classes = [permissions.IsAuthenticated]

        else:
            permission_classes = [IsAuthorOrAdmin]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserView(viewsets.ReadOnlyModelViewSet):
    """
    To do stuff:
        api/ accounts/ register/
        api/ accounts/ verify-registration/
        api/ accounts/ send-reset-password-link/
        api/ accounts/ reset-password/
        api/ accounts/ login/
        api/ accounts/ logout/
        api/ accounts/ profile/
        api/ accounts/ change-password/
        api/ accounts/ register-email/
        api/ accounts/ verify-email/
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
