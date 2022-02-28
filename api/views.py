from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, generics, mixins, status
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


class UserView(viewsets.ModelViewSet):
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
        api/ accounts/ follow
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True)
    def follow(self, request, pk=None):
        follows = self.get_object()
        user = request.user

        try:
            relationship = UserFollow.objects.get(follows=follows, user=user)

        except UserFollow.DoesNotExist:
            return Response(
                data={"message": "Currently not following"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = UserFollowSerializer(relationship)
        return Response(serializer.data, status=status.HTTP_302_FOUND)

    @follow.mapping.post
    def new_follow(self, request, pk=None):
        follows = self.get_object()
        user = request.user

        try:
            UserFollow.objects.get(follows=follows, user=user)
            return Response(
                data={"message": "Currently following"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except UserFollow.DoesNotExist:
            new_relationsship = UserFollow(follows=follows, user=user)
            new_relationsship.save()
            return Response(
                data={"message": "Successfully followed."},
                status=status.HTTP_201_CREATED,
            )

    @follow.mapping.delete
    def unfollow(self, request, pk=None):
        follows = self.get_object()
        user = request.user

        try:
            relationship = UserFollow.objects.get(follows=follows, user=user)

        except UserFollow.DoesNotExist:
            return Response(
                data={"message": "Currently not following"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        relationship.delete()
        return Response(
            data={"message": "Successfully unfollowed"},
            status=status.HTTP_200_OK,
        )

    def get_permissions(self):

        if self.action in ["list", "retrieve"]:
            permission_classes = [permissions.AllowAny]

        elif self.action in ["follow", "new_follow", "unfollow"]:
            permission_classes = [permissions.IsAuthenticated]

        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]


class UserFollowView(viewsets.ReadOnlyModelViewSet):
    """
    You can not follow the same user several times.
    """

    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer

    filterset_fields = ("user", "follows")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
