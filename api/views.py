from asyncio.proactor_events import _ProactorWritePipeTransport
from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, generics, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response

# from django_filters.rest_framework import DjangoFilterBackend

from .models import Category, Recipe, UserFollowing, Like, Comment
from .permissions import IsAuthor, IsAuthorOrAdmin
from .serializers import (
    CategorySerializer,
    RecipeSerializer,
    UserSerializer,
    CommentSerializer,
    LikeSerializer,
)


class RecipeView(viewsets.ModelViewSet):
    """
    List of all recipes. Go to /recipes/<id>/ to modify or delete
    """

    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    filterset_fields = ("category", "user")

    search_fields = (
        "title",
        "content",
    )

    def get_permissions(self):

        if self.action in ["list", "retrieve"]:  # anyone can read
            permission_classes = [permissions.AllowAny]

        elif self.action in ["post"]:  # must be logged in to interact
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

        elif self.action in ["post"]:  # must be logged in to post
            permission_classes = [permissions.IsAuthenticated]

        else:
            permission_classes = [IsAuthorOrAdmin]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LikeView(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # can only view personal likes
        return Like.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CategoryView(viewsets.ModelViewSet):
    """
    List of all categories. Go to /category/<id>/ to modify or delete (admin only)
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):

        if self.action in ["retrieve", "list"]:  # read only actions
            permission_classes = [permissions.AllowAny]

        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]


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
