from rest_framework import serializers
from .models import Appointment
from .models import Payment
from .models import Barber
from .models import Service

class AppointmentSerializer(serializers.ModelSerializer):
    services = serializers.PrimaryKeyRelatedField(many=True, queryset=Service.objects.all())
    class Meta:
        model = Appointment
        fields = '__all__'



class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class BarberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barber
        fields = ['id', 'name', 'specialty', 'available']


from rest_framework import serializers
from .models import Appointment, Barber, Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'price']

class BarberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barber
        fields = ['id', 'name', 'specialty']

class AppointmentSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    barber = BarberSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'services', 'date', 'time', 'barber']


from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True) #swhos username

    class Meta:
        model = Review
        fields = '__all__'
