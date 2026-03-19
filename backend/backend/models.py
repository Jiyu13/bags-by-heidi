from PIL import Image
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .product_image import process_image


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """" create standard users, expects an email & password  & additional fields """
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """" create superusers """
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        superuser = self.create_user(email, password, **extra_fields)
        return superuser


class AppUser(AbstractBaseUser, PermissionsMixin):
    """User"""
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=50, unique=True)
    is_staff = models.BooleanField(default=False)

    # use the email as the unique identifier for authentication, instead of the default "username"
    USERNAME_FIELD = 'email'
    objects = UserManager()

    def __str__(self):
        return f"{self.email} - {self.username}"


# ------------------------------------ product ----------------------------------------------------------------------
class ProductCategory(models.Model):
    """ A category can have many Products """
    category = models.CharField(max_length=120)
    cover_image = models.ImageField(null=True, blank=True, upload_to='category_cover/')

    def __str__(self):
        return self.category

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #
    #     if self.cover_image:
    #         self.cover_image.name = process_image(self.cover_image)
    #         super().save(update_fields=["cover_image"])


class Product(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    image = models.ImageField(null=True, blank=True, upload_to='product-images/')
    category = models.ForeignKey(ProductCategory, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} - {self.title}"

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #
    #     if self.image:
    #         self.image.name = process_image(self.image)
    #         super().save(update_fields=["image"])


class ProductImage(models.Model):
    """ A product has many media- ForeignKey """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')
    image_name = models.CharField(max_length=120)
    product_image = models.ImageField(null=True, blank=True, upload_to='product-images/')

    def __str__(self):
        return f"{self.product.id}- {self.product.title}: {self.product_image}"

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #
    #     if self.product_image:
    #         self.product_image.name = process_image(self.product_image)
    #         super().save(update_fields=["product_image"])


# ------------------------------------ Home page ----------------------------------------------------------------------
class Section(models.Model):
    """SECTIONS: top banner, about branch, customer feedback"""
    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name


class HomepageSection(models.Model):
    """ Template to show a picture, slogan, text, for top_banner, about_branch, customer_feedback in homepage. """
    section = models.ForeignKey(Section, null=False, on_delete=models.CASCADE)
    banner_image = models.ImageField(null=True, blank=True, upload_to='homepage/')
    title = models.CharField(max_length=120)
    description = models.TextField()

    def __str__(self):
        return f"{self.section.name} - {self.title}"

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #
    #     if self.banner_image:
    #         self.banner_image.name = process_image(self.banner_image)
    #         super().save(update_fields=["banner_image"])


class SocialMedia(models.Model):
    name = models.CharField(max_length=120, null=True, blank=True)
    link = models.CharField(max_length=120, null=True, blank=True)
    is_available = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class CustomerFeedback(models.Model):
    customer_name = models.CharField(max_length=120, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='customer-feedback-images/')
    published = models.BooleanField(default=False)
    review_date = models.DateField(null=True, blank=True)


# ================================= Contact ==================================================
class ContactRequest(models.Model):
    name = models.CharField(max_length=255, null=True)
    sender_email = models.EmailField(null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    solved = models.BooleanField(default=False)

    def __str__(self):
        return f'Contact Request form {self.sender_email}'