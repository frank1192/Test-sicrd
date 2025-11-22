from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('user/', views.user_info_view, name='user_info'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
