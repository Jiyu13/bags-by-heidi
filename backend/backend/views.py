from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *
from .permissions import IsSuperUserOrReadOnly


class AppUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        if not request.user.is_staff:
            return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        users = AppUser.objects.all()
        serializer = AppUserSerializer(users, many=True)
        return Response(serializer.data)


# ======================================== Products ================================================================
class ProductCategoriesView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request):
        try:
            categories = ProductCategory.objects.all()
            print("=======================", categories)
            serializer = ProductCategorySerializer(categories, many=True, context={"request": request})
            response = serializer.data
        except:
            response = {"error": "categories not found"}

        return Response(response)


class ProductListView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            response = serializer.data
        except:
            response = {"error": "product not found"}

        return Response(response)


# ======================================== Home page ================================================================
class HomepageSectionView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request):
        sections = HomepageSection.objects.all()
        serializer = HomepageSectionSerializer(sections, many=True, context={"request": request})
        return Response(serializer.data)