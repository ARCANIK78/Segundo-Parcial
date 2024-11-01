# mi_servidor/urls.py

from django.urls import path
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required

def inicio(request):
    mensaje = request.GET.get('mensaje')
    login_messages = []
    register_messages = []

    if mensaje == 'login':
        login_messages = messages.get_messages(request)
    elif mensaje == 'registro':
        register_messages = messages.get_messages(request)

    return render(request, 'index.html', {
        'login_messages': login_messages,
        'register_messages': register_messages,
    })

@login_required
def Servicios(request):
    return render(request, 'Servicios/index.html')

@login_required
def Tienda(request):
    return render(request, 'Servicios/tiendas.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = User.objects.get(email=email)
            user_authenticated = authenticate(request, username=user.username, password=password)
            if user_authenticated is not None:
                login(request, user_authenticated)
                return redirect('servicios')
            else:
                messages.error(request, 'Credenciales inválidas.')
                return redirect('/?mensaje=login')
        except User.DoesNotExist:
            messages.error(request, 'Credenciales inválidas.')
            return redirect('/?mensaje=login')

    return redirect('/?mensaje=login')

def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Credenciales ya están en uso.')
            return redirect('/?mensaje=registro')
        elif User.objects.filter(email=email).exists():
            messages.error(request, 'Credenciales ya están en uso.')
            return redirect('/?mensaje=registro')
        elif User.objects.filter(password=password).exists():
            messages.error(request, 'Credenciales ya están en uso.')
            return redirect('/?mensaje=registro')
        else:
            user = User.objects.create_user(username=username, email=email, password=password)
            messages.success(request, 'Registro exitoso. Ahora puedes iniciar sesión.')
            return redirect('/?mensaje=registro')

    return redirect('/?mensaje=registro')

urlpatterns = [
    path('', inicio, name='inicio'),
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('pagina/', Servicios, name='servicios'),
    path('tienda/', Tienda, name='tienda'),
]
