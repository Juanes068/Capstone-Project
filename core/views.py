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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    data = request.data.copy()
    data['user'] = request.user.id
    serializer = AppointmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return JsonResponse(serializer.data, status=201)
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
            # Simular monto con base en la cita (puedes ajustar)
            amount = 2500  # en centavos = $25.00

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
                success_url="http://localhost:8000/api/success/",
                cancel_url="http://localhost:8000/api/cancel/",
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

from rest_framework.permissions import IsAuthenticated, IsAdminUser

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser]) #solo superuser es capaz de acceder a info
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
