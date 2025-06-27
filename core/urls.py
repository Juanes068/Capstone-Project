from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import UserAppointmentsView
from .views import CheckoutView
from .views import PaymentListView
from .views import cancel_page
from .views import success_page
from .views import CreateServiceView
from .views import UpdateServiceView
from .views import DeleteServiceView
from .views import ListAllAppointmentsView
from .views import CreateReviewView 
from .views import ListReviewsByServiceView
from .views import MostBookedServicesView
from .views import DailyActivityView


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
    path('barbers/<int:id>/delete/', views.delete_barber),
    path('services/', CreateServiceView.as_view(), name='create_service'),
    path('services/<int:id>/', DeleteServiceView.as_view(), name='delete_service'),
    path('appointments/all/', ListAllAppointmentsView.as_view(), name='list_all_appointments'),
    path('reviews/', CreateReviewView.as_view(), name='create_review'),
    path('reviews/<int:service_id>/', ListReviewsByServiceView.as_view(), name='list_reviews_by_service'),
    path('dashboard/most-booked-services/', MostBookedServicesView.as_view(), name='most_booked_services'),
    path('dashboard/daily-activity/', DailyActivityView.as_view(), name='daily_activity'),
]
#Creacion de endpoint - ping - test



#conecta  las ruts between api/register y la funcion register 
