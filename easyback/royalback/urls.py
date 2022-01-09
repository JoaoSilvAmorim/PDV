from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path(r'api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(r'api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('admin/', admin.site.urls), 
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.authtoken')),
    
    path('api/v1/', include('royal.urls'))
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


