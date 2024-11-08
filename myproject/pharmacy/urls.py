from django.urls import path
from .views import RegisterUserView, LoginUserView, MedicationListView, RefillRequestView, RefillStatisticsView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('medications/', MedicationListView.as_view(), name='medication-list'),
    path('refill/', RefillRequestView.as_view(), name='refill-request'),
    path('statistics/', RefillStatisticsView.as_view(), name='refill-statistics'),
]
