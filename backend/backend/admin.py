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


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1  # how many empty rows to show
    fields = ("image_name", "product_image")


class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "image", "category", 'material', "size", "price", "is_available")
    inlines = [ProductImageInline]


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


admin.site.register(SocialMedia, SocialMediasAdmin)


# ================================= customer feedback ===================================================
class CustomerFeedbackAdmin(admin.ModelAdmin):
    list_display = ("id", "customer_name", "comment", "image", "published", "review_date")


admin.site.register(CustomerFeedback, CustomerFeedbackAdmin)


# ================================= contact ===================================================
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender_email', "subject", 'message', 'created_at', "name", "solved" )


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