from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import *


class AppUserAdmin(BaseUserAdmin):
    model = AppUser
    list_display = ("user_id", "email", "username", "is_staff", "is_superuser", "is_active")
    search_fields = ("email", "username")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "username", "password1", "password2", "is_staff", "is_superuser", "is_active"),
        }),
    )


admin.site.register(AppUser, AppUserAdmin)


# ===================================== product =================================================
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "category", "cover_image")


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1  # how many empty rows to show
    fields = ("image_name", "product_image")


class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "image", "category", 'material', "size", "price", "features", "is_available")
    inlines = [ProductImageInline]
    fields = ("title", "description", "image", "category", 'material', "size", "price", "features", "is_available")
    search_fields = ['=name', "=category__category"]


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "image_name")


admin.site.register(ProductCategory, ProductCategoryAdmin)
admin.site.register(Product, ProductAdmin)
# admin.site.register(ProductImage, ProductImageAdmin)


# ================================= home page ===================================================
class SectionAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


class HomepageSectionAdmin(admin.ModelAdmin):
    list_display = ("id", "section", "banner_image", "title", "description")


admin.site.register(Section, SectionAdmin)
admin.site.register(HomepageSection, HomepageSectionAdmin)


# ================================= social medias ===================================================
class SocialMediasAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "svg_icon", "link", "is_available")
    fields = ("name", "svg_icon", "link", "is_available")


admin.site.register(SocialMedia, SocialMediasAdmin)


# ================================= customer feedback ===================================================
class CustomerFeedbackAdmin(admin.ModelAdmin):
    list_display = ("id", "customer_name", "comment", "image", "published", "review_date")
    search_fields = ['=customer_name']



admin.site.register(CustomerFeedback, CustomerFeedbackAdmin)


# ================================= contact ===================================================
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender_email', "subject", 'message', 'created_at', "name", "solved" )
    search_fields = ['=sender_email']



admin.site.register(ContactRequest, ContactRequestAdmin)


# ================================= About page ===================================================
class AboutPageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'paragraph', 'paragraph_image')


admin.site.register(AboutPage, AboutPageAdmin)


# # ================================= faqs page ===================================================
class FaqAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'answer')


admin.site.register(FAQ, FaqAdmin)

# # ================================= Order page ===================================================
# class OrderAdmin(admin.ModelAdmin):
#     list_display = ('id', 'customer_name', 'customer_email', 'paragraph_image')
#
#
# admin.site.register(AboutPage, AboutPageAdmin)