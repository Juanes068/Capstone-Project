from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('ping/', views.ping), 
    path('register/', views.register),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.profile),
    path('appointments/', views.create_appointment),

]
#Creacion de endpoint - ping - test



#conecta  las ruts between api/register y la funcion register 
