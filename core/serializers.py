from rest_framework import serializers
from .models import Appointment, Payment, Barber, Service, Review

class BarberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barber
        fields = ('id', 'name', 'specialty')

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'name', 'price')

class AppointmentSerializer(serializers.ModelSerializer):
    barber = serializers.PrimaryKeyRelatedField(queryset=Barber.objects.all())
    services = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all(), many=True)

    class Meta:
        model = Appointment
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['barber'] = BarberSerializer(instance.barber).data if instance.barber else None
        representation['services'] = ServiceSerializer(instance.services.all(), many=True).data
        return representation

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
