from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from taggit.models import Tag

from .models import CartItem, Comment, Ingredient, Like, Recipe, UserFollow
from .permissions import IsAuthorOrAdmin
from .serializers import (
    CartItemSerializer,
    CommentSerializer,
    LikeSerializer,
    RecipeSerializer,
    TagListSerializer,
    UserFollowSerializer,
    UserSerializer,
)


class TagsView(viewsets.ReadOnlyModelViewSet):
    queryset = Recipe.tags.most_common()
    serializer_class = TagListSerializer


class CartItemView(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)


class RecipeView(viewsets.ModelViewSet):
    """
    /recipes/<id>/ to modify or delete.
    /recipes/<id>/like/ to like or unlike.
    /recipes/is_liked/ for recipes liked by the currently logged in user.
    /recipes/by_followed/ for recipes written by people whom the current follow.

    NB:
    - Tags must be formatted as proper JSON lists, e.g. ["frokost", "kjøtt"]
    - All ingredients are deleted on updates; include all you want to keep.
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

    @action(detail=False)
    def by_followed(self, request):
        recipes = Recipe.objects.filter(user__followers__user=request.user)
        serializer = self.get_serializer(recipes, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def is_liked(self, request):
        recipes = Recipe.objects.filter(likes__user=request.user)
        serializer = self.get_serializer(recipes, many=True)
        return Response(serializer.data)

    @action(detail=True)
    def like(self, request, pk=None):
        recipe = self.get_object()
        user = request.user

        try:
            like_obj = Like.objects.get(recipe=recipe, user=user)

        except Like.DoesNotExist:
            return Response(
                data={"message": "Currently not liked."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = LikeSerializer(like_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @like.mapping.post
    def add_like(self, request, pk=None):
        recipe = self.get_object()
        user = request.user

        try:
            Like.objects.get(recipe=recipe, user=user)
            return Response(
                data={"message": "Error, already liked."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Like.DoesNotExist:
            new_like = Like(recipe=recipe, user=user)
            new_like.save()
            return Response(
                data={"message": "Successfully liked."},
                status=status.HTTP_201_CREATED,
            )

    @like.mapping.delete
    def del_like(self, request, pk=None):
        recipe = self.get_object()
        user = request.user

        try:
            old_like = Like.objects.get(recipe=recipe, user=user)

        except Like.DoesNotExist:
            return Response(
                data={"message": "Error, no like to remove."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        old_like.delete()
        return Response(
            data={"message": "Successfully unliked."},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["get"])
    def add_to_cart(self, request, pk=None):
        user = request.user

        ingredients = Ingredient.objects.filter(recipe=pk)

        for ingredient in ingredients:
            CartItem.objects.create(user=user, ingredient=ingredient)

        return Response(
            data={"message": "Successfully added to cart (if there were any)."},
            status=status.HTTP_200_OK,
        )

    def get_permissions(self):

        if self.action in ["list", "retrieve"]:  # anyone can read
            permission_classes = [permissions.AllowAny]

        elif self.action in [
            "create",
            "by_followed",
            "is_liked",
            "like",
            "add_like",
            "del_like",
        ]:
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


class LikeView(viewsets.ModelViewSet):
    """
    Attempting to like the same recipe twice will not work,
        but you will not get a proper error message.
    """

    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    filterset_fields = (
        "user",
        "recipe",
    )

    def get_queryset(self):
        return Like.objects.filter(user=self.request.user)

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
        api/ accounts/ <id>/ follow/
        api/ accounts/ delete/
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    search_fields = ("email", "username", "first_name", "last_name")

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
        return Response(serializer.data, status=status.HTTP_200_OK)

    @follow.mapping.post
    def new_follow(self, request, pk=None):
        follows = self.get_object()
        user = request.user

        try:
            UserFollow.objects.get(follows=follows, user=user)
            return Response(
                data={"message": "Error, already following."},
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
    Read only.
    """

    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer

    filterset_fields = ("user", "follows")


class DeleteAccountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):

        user = self.request.user
        user.delete()

        return Response({"result": "user delete"})
