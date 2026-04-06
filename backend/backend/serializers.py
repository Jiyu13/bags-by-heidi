# convert model instances to JSON so that frontend can work with the received data
from rest_framework import serializers
from .models import *


class AppUserSerializer(serializers.ModelSerializer):
    """ based on the model AppUser & returns user """

    class Meta:
        model = AppUser
        fields = ['user_id', 'username', 'email', 'is_staff']


# ======================================== product ================================================================
class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["id", "category", "cover_image"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image_name", "product_image"]


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(source="category.id", read_only=True)
    category_name = serializers.CharField(source="category.category", read_only=True)
    # Nested ProductImage serializers to display associated media with a product
    product_images = ProductImageSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "title", "description", "image", "product_images", "category_id", "category_name",
                  'material', "size", "price", "features", "is_available"]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


# ======================================== Home page ================================================================
class HomepageSectionSerializer(serializers.ModelSerializer):
    section_id = serializers.PrimaryKeyRelatedField(
        source="section",
        queryset=Section.objects.all(),
        write_only=True
    )
    # read as label,returns in the response
    section_name = serializers.CharField(read_only=True, source="section.name")

    class Meta:
        model = HomepageSection
        fields = ["id", "section_id", "section_name", "title", "description", "banner_image"]


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ["id", "name", "svg_icon", "link", "is_available"]


class CustomerFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerFeedback
        fields = ["id", "customer_name", "comment", "published", "image", "review_date"]


class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = '__all__'


class AboutPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPage
        fields = '__all__'


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = '__all__'
