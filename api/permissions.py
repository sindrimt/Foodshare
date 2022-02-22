from rest_framework import permissions


class AuthorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.user.is_authenticated:
            return True

        return False

    def has_object_permission(self, request, view, obj):

        if obj.author == request.user or request.user.is_superuser:
            return True

        return False
