from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ("user_id", 'email', 'username')
    search_fields = ('email',)
    ordering = ('email',)
    list_filter = ("is_staff",)


admin.site.register(AppUser, UserAdmin)


# ===================================== product =================================================
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "category", "cover_image")


class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "category_id", "image", "product_images")


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "image_name")


admin.site.register(ProductCategory, ProductCategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)


# ================================= home page ===================================================
class SectionAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


class HomepageSectionAdmin(admin.ModelAdmin):
    list_display = ("id", "section", "banner_image", "title", "description")


admin.site.register(Section, SectionAdmin)
admin.site.register(HomepageSection, HomepageSectionAdmin)


