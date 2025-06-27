from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import UserAppointmentsView
from .views import CheckoutView
from .views import PaymentListView
from .views import cancel_page
from .views import success_page


urlpatterns = [
    path('ping/', views.ping), 
    path('register/', views.register),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.user_profile),
    path('appointments/', views.create_appointment),  # POST
    path('my-appointments/', UserAppointmentsView.as_view(), name='user-appointments'),  # GET
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('payments/', PaymentListView.as_view(), name='payments'),
    path('success/', success_page),
    path('cancel/', cancel_page),
    path('appointments/<int:id>/', views.appointment_detail),
    path('barbers/<int:id>/', views.update_barber),
    path('barbers/', views.list_barbers),
    path('barbers/create/', views.create_barber),
]
#Creacion de endpoint - ping - test



#conecta  las ruts between api/register y la funcion register 
