from django.urls import include, path
from rest_framework import routers
from . import views

urlpatterns = [
    path(
        "api-auth/",
        include("rest_framework.urls", namespace="rest_framework"),
    ),
    path("accounts/", include("rest_registration.api.urls")),
]

router = routers.DefaultRouter()
router.register("recipes", views.RecipeView, basename="recipes")
router.register("comments", views.CommentView, basename="comments")
router.register("likes", views.LikeView, basename="likes")
router.register("accounts", views.UserView, basename="accounts")
router.register("follows", views.UserFollowView, basename="follows")
urlpatterns += router.urls
