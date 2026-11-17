from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allows public read-only access (GET, HEAD, OPTIONS),
    while requiring an authenticated staff/admin user for write operations.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
