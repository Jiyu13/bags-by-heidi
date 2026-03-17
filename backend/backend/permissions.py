from rest_framework.permissions import BasePermission


class IsSuperUserOrReadOnly(BasePermission):
    """
    Custom permission to only allow superusers to edit objects, and others to read.
    """

    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.is_superuser
