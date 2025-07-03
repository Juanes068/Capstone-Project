from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

def ping(request):
    return JsonResponse({'message': 'pong'})

# definimos una funcion request ping 

from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt #use it for postman
def register(request):
#Manege request post 
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'message': 'User registered successfully'})

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user

    if request.method == 'GET':
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })

    if request.method == 'PATCH':
        username = request.data.get("username")
        email = request.data.get("email")

        if username:
            user.username = username
        if email:
            user.email = email

        user.save()
        return Response({
            "message": "Profile updated successfully",
            "username": user.username,
            "email": user.email
        }, status=status.HTTP_200_OK)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import AppointmentSerializer
from .models import Appointment
from rest_framework import status
from django.http import JsonResponse

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    data = request.data.copy()
    data['user'] = request.user.id
    serializer = AppointmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return JsonResponse(serializer.data, status=201)
    else:
        print("DATA:", data)
        print("USER:", request.user)
        print("IS AUTHENTICATED:", request.user.is_authenticated)
        print("VALID:", serializer.is_valid())
        print("ERRORS:", serializer.errors)
        return JsonResponse(serializer.errors, status=400)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Appointment
from .serializers import AppointmentSerializer

class UserAppointmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        appointments = Appointment.objects.filter(user=user)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import stripe
from django.conf import settings 
from .models import Appointment
from django.shortcuts import get_object_or_404

stripe.api_key = settings.STRIPE_SECRET_KEY 

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        appointment_id = request.data.get("appointment_id")
        appointment = get_object_or_404(Appointment, id=appointment_id, user=request.user)

        try:
            
            services = appointment.services.all()
            amount = sum([int(service.price * 100)for service in services])  # valor del servicio en centavos, x 100 pra dar el decimal 

            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[{
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": f"Appointment #{appointment.id}"
                        },
                        "unit_amount": amount,
                    },
                    "quantity": 1,
                }],
                mode="payment",
                success_url="https://nowa-barbershop.web.app/payment-success/",
                cancel_url="https://nowa-barbershop.web.app/payment-cancel/",
                metadata={"appointment_id": appointment.id}
            )

            return Response({"checkout_url": session.url})

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


from .models import Payment
from .serializers import PaymentSerializer

class PaymentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payments = Payment.objects.filter(user=request.user).order_by('-payment_date')
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)
        
from django.http import HttpResponse

def success_page(request):
    return HttpResponse("payment succesfuly")

def cancel_page(request):
    return HttpResponse("decline")

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer

@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def appointment_detail(request, id):
    try:
        appointment = Appointment.objects.get(id=id, user=request.user)
    except Appointment.DoesNotExist:
        return Response({'error': 'Appointment not found'}, status=404)

    if request.method == 'PATCH':
        serializer = AppointmentSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        appointment.delete()
        return Response({'message': 'Appointment deleted'}, status=204)


from .models import Barber  
from .serializers import BarberSerializer
from rest_framework.permissions import IsAdminUser

@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_barber(request, id):
    try:
        barber = Barber.objects.get(id=id)
    except Barber.DoesNotExist:
        return Response({'error': 'Barber not found'}, status=404)

    serializer = BarberSerializer(barber, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Cualquier usuario autenticado puede acceder
def list_barbers(request):
    barbers = Barber.objects.all()
    serializer = BarberSerializer(barbers, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_barber(request):
    serializer = BarberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

import stripe
import os

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .models import Barber

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_barber(request, id):
    try:
        barber = Barber.objects.get(id=id)
    except Barber.DoesNotExist:
        return Response({'error': 'Barber not found'}, status=status.HTTP_404_NOT_FOUND)

    barber.delete()
    return Response({'message': 'Barber deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Service
from .serializers import ServiceSerializer

class CreateServiceView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAdminUser
from .models import Service
from .serializers import ServiceSerializer

class UpdateServiceView(UpdateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'  


from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAdminUser
from .models import Service
from .serializers import ServiceSerializer

class DeleteServiceView(DestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'

from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from .models import Appointment
from .serializers import AppointmentSerializer

class ListAllAppointmentsView(ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAdminUser]

from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Review
from .serializers import ReviewSerializer

# POST 
class CreateReviewView(CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# GET 
class ListReviewsByServiceView(ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        service_id = self.kwargs['service_id']
        return Review.objects.filter(service__id=service_id).order_by('-created_at')


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.db.models import Count
from .models import Service, Appointment

class MostBookedServicesView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        services = Service.objects.annotate(bookings=Count('appointment')).order_by('-bookings')[:5]
        data = [
            {"service": service.name, "bookings": service.bookings}
            for service in services
        ]
        return Response(data)

from django.db.models.functions import TruncDate

class DailyActivityView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        daily_appointments = (
            Appointment.objects
            .values('date')  
            .annotate(count=Count('id'))
            .order_by('date')
        )
        return Response(daily_appointments)

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Aquí puedes extraer metadata y crear el Payment
        appointment_id = session.get('metadata', {}).get('appointment_id')
        amount_total = session.get('amount_total') / 100

        from .models import Appointment, Payment
        from django.contrib.auth.models import User

        try:
            appointment = Appointment.objects.get(id=appointment_id)
            Payment.objects.create(
                user=appointment.user,
                appointment=appointment,
                amount=amount_total,
            )
        except Appointment.DoesNotExist:
            pass

    return HttpResponse(status=200)

    
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from .models import Service
from .serializers import ServiceSerializer

class ListServicesView(ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]  

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Review

class ReviewDeleteView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        review.delete()
        return Response({"message": "Review deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .models import Appointment, Service
from django.db.models import Count
from django.utils import timezone

class DashboardDailyActivity(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        today = timezone.now().date()
        data = (
            Appointment.objects.filter(date__lte=today)
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )
        return Response(data)

class DashboardMostBookedServices(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        data = (
            Appointment.objects.values('service__name')
            .annotate(count=Count('id'))
            .order_by('-count')[:5]
        )
        return Response(data)

from django.contrib.auth.models import User
from django.http import JsonResponse

def create_superuser(request):
    if User.objects.filter(username='Juanes068').exists():
        return JsonResponse({"message": "Superuser already exists"})
    User.objects.create_superuser(
        username='Juanes068',
        email='trianajuan95@gmail.com',
        password='NOWA2025'
    )
    return JsonResponse({"message": "Superuser created successfully"})
