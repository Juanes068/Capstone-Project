from rest_framework import serializers
from .models import Appointment
from .models import Payment
from .models import Barber
from .models import Service

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['user']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class BarberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barber
        fields = ['id', 'name', 'specialty', 'available']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True) #swhos username

    class Meta:
        model = Review
        fields = '__all__'
