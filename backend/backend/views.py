from django.core.mail import send_mail
from django.conf import settings

from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import CreateAPIView
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
            serializer = ProductCategorySerializer(categories, many=True, context={"request": request})
            response = serializer.data
        except:
            response = {"error": "categories not found"}

        return Response(response)


class GetProductByCategoryView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request, category_name):
        try:
            category_name = category_name.replace("-", " ").title()
            products = Product.objects.filter(category__category=category_name)
            serializer = ProductSerializer(products, many=True, context={"request": request})
            response = serializer.data
        except:
            response = {"error": f"{category_name} not found"}

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


class GetSocialMediasView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request):
        social_medias = SocialMedia.objects.all()
        serializer = SocialMediaSerializer(social_medias, many=True, context={"request": request})
        return Response(serializer.data)


class GetCustomerFeedbackView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request):
        feedbacks = CustomerFeedback.objects.all()
        serializer = CustomerFeedbackSerializer(feedbacks, many=True, context={"request": request})
        return Response(serializer.data)


# ======================================== contact ================================================================
class CreateContactRequestView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # ============================================Create the ContactRequest & save to db============================
        # data = serializer.validated_data
        # name = data.get("name", "")
        # user_email = data.get("sender_email", "")
        # message = data.get("message", "")

        contact_request = serializer.save()
        # =========================================Compose the email content============================================
        notification_subject = "New Ticket" + " -- from " + contact_request.name
        user_email = contact_request.sender_email
        notification_message = (
            f'From: {contact_request.name} -- {user_email}\n\n'
            f'{contact_request.message}'
        )

        try:
            # # =================Send a notification email =============================================================
            send_mail(
                notification_subject,
                notification_message,
                settings.EMAIL_HOST_USER,
                [settings.EMAIL_HOST_USER],
                fail_silently=False
            )
            # ==================Send a auto-reply email to user ========================================================
            auto_reply_subject = "Bags by Heidi" + " - Ticket Received!"

            auto_reply_message = (
                f"Hello {contact_request.name},\n\n"
                f"We would like to acknowledge that we have received your request and a ticket has been created. \n"
                f"We will be reviewing your request and will send you a personal response shortly.\n\n"
                f"Thank you for your patience. \n\n"
                f"Sincerely,\n\n"
                f"Sent by Bags by Heidi"
            )

            # Specify the email address where you want to receive notifications
            autor_reply_receiver_email = user_email

            # Send the notification email
            send_mail(
                auto_reply_subject,
                auto_reply_message,
                settings.EMAIL_HOST_USER,
                [autor_reply_receiver_email],
                fail_silently=False
            )

        except Exception as e:
            # Handle email sending errors
            return Response({'error': 'Failed to send email.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.data, status=status.HTTP_201_CREATED)