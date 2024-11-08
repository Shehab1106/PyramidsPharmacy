from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Medication, RefillRequest
from .serializers import UserSerializer, MedicationSerializer, RefillRequestSerializer
from django.db.models import Count;
from django.contrib.auth.models import User
from pharmacy.models import Medication

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginUserView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class MedicationListView(generics.ListAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer
    permission_classes = [permissions.IsAuthenticated]


class RefillRequestView(generics.CreateAPIView):
    queryset = RefillRequest.objects.all()
    serializer_class = RefillRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RefillStatisticsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        stats = RefillRequest.objects.filter(user=request.user).values('medication__name').annotate(total_requests=Count('medication'))
        return Response(stats)

