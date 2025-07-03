from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from rest_framework.test import APIRequestFactory
from .views import DailyActivityView, MostBookedServicesView

@staff_member_required
def admin_dashboard(request):
    factory = APIRequestFactory()

    request_daily = factory.get('/api/dashboard/daily-activity/')
    request_daily.user = request.user  # CLAVE para permisos

    request_most = factory.get('/api/dashboard/most-booked-services/')
    request_most.user = request.user   # CLAVE para permisos

    daily_view = DailyActivityView.as_view()
    most_view = MostBookedServicesView.as_view()

    response_daily = daily_view(request_daily)
    response_most = most_view(request_most)

    daily_data = response_daily.data
    most_data = response_most.data

    return render(request, 'admin_dashboard.html', {
        'daily_activity': daily_data,
        'most_booked': most_data,
    })
