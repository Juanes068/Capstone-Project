from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Service, Barber, Appointment
from .models import Payment

admin.site.register(Service)
admin.site.register(Barber)
admin.site.register(Appointment)
admin.site.register(Payment)
