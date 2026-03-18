"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', AppUserView.as_view(), name='users'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('auth/', include('rest_framework.urls')),

    path('homepage_sections/', HomepageSectionView.as_view(), name="homepage_sections"),

    path('product_categories/', ProductCategoriesView.as_view(), name="product_categories"),
    path('products/', ProductListView.as_view(), name="products"),
    path('products/<str:category_name>/', GetProductByCategoryView.as_view(), name="get_backpacks"),
    path('product/<int:pk>/', ProductDetailView.as_view(), name="product-detail"),

    path("social_medias/", GetSocialMediasView.as_view(), name="social-media")

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
