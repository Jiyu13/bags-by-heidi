from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


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


class Product(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    image = models.ImageField(null=True, blank=True, upload_to='media/product-images/')
    category = models.ForeignKey(ProductCategory, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class ProductImage(models.Model):
    """ A product has many media- ForeignKey """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')
    image_name = models.CharField(max_length=120)
    product_image = models.ImageField(null=True, blank=True, upload_to='media/product-images/')

    def __str__(self):
        return self.image_name


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
        return self.title



