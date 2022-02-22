from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, generics
from rest_framework.response import Response

from .models import Category, Recipe
from .permissions import AuthorOrAdmin
from .serializers import (
    CategorySerializer,
    RecipeSerializer,
    UserSerializer,
    RegisterSerializer,
)


class RecipeView(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filterset_fields = (
        "title",
        "content",
        "category",
    )

    def get_permissions(self):

        if self.action not in ["list", "retrieve"]:
            permission_classes = [permissions.AllowAny]

        elif self.action in ["post"]:
            permission_classes = [permissions.IsAuthenticated]

        else:
            permission_classes = [AuthorOrAdmin]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):

        if self.action in ["list", "retrieve"]:
            permission_classes = [permissions.AllowAny]

        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]


class UserView(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "message": "User Created Successfully.  Now log in to get your token",
            }
        )
