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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return JsonResponse({
        'username': user.username,
        'email': user.email,
        'id': user.id
    })


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
