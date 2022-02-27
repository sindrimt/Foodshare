from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Comment, Recipe, UserFollow
from .permissions import IsAuthor, IsAuthorOrAdmin
from .serializers import (
    CommentSerializer,
    RecipeSerializer,
    UserSerializer,
    UserFollowSerializer,
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

    # def get_queryset(self, *args, **kwargs):
    #     user = self.request.user
    #     return super().get_queryset(*args, **kwargs).filter(user__followers__user=user)

    @action(detail=False)
    def followed(self, request):
        recipes = Recipe.objects.filter(user__followers__user=request.user)
        serializer = self.get_serializer(recipes, many=True)
        return Response(serializer.data)

    def get_permissions(self):

        if self.action in ["list", "retrieve"]:  # anyone can read
            permission_classes = [permissions.AllowAny]

        elif self.action in ["create", "followed"]:  # must be logged in to interact
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


class UserFollowView(viewsets.ModelViewSet):
    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer

    def get_queryset(self, *args, **kwargs):
        # cant see whom other people follow
        return super().get_queryset(*args, **kwargs).filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
