from rest_framework import permissions


class IsAuthorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        # must be logged in
        if request.user.is_authenticated:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        # must be author or admin
        if obj.user == request.user or request.user.is_superuser:
            return True

        return False


class IsAuthor(permissions.BasePermission):
    def has_permission(self, request, view):
        # must be logged in
        if request.user.is_authenticated:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        # must be author
        if obj.user == request.user:
            return True

        return False
