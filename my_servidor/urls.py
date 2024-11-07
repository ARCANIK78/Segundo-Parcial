# mi_servidor/urls.py

from django.urls import path
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from . import views
from django.shortcuts import render, get_object_or_404

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
    productos = views.Producto.objects.exclude(vendedor=request.user)
    return render(request, 'Servicios/index.html', {'productos': productos})

def Vistaprevia(request):
    productos = views.Producto.objects.all()
    return render(request, 'Servicios/Vistaprevia.html', {'productos': productos})

@login_required
def Venta(request):
    productos_usuario = views.Producto.objects.filter(vendedor=request.user)
    return render(request, 'Servicios/ventas.html', {'productos_usuario': productos_usuario})

@login_required
def Detalle(request):
    id_producto = request.GET.get('id')

    if id_producto is None:
        return redirect('productos')

    producto = get_object_or_404(views.Producto, id=id_producto)

    return render(request, 'Servicios/ventaproducto/index.html', {'producto': producto})

@login_required
def editar_producto(request):
    id_producto = request.GET.get('id')
    producto = get_object_or_404(views.Producto, id=id_producto)

    if producto.vendedor != request.user:
        messages.error(request, 'No tienes permiso para editar este producto.')
        return redirect('inicio')

    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        descripcion = request.POST.get('descripcion')
        marca = request.POST.get('marca')
        precio = request.POST.get('precio')
        categoria = request.POST.get('categoria')
        cantidad_disponible = request.POST.get('cantidad_disponible')

        if 'imagen' in request.FILES:
            imagen = request.FILES['imagen']
            producto.imagen = imagen

        producto.nombre = nombre
        producto.descripcion = descripcion
        producto.marca = marca
        producto.precio = precio
        producto.categoria = categoria
        producto.cantidad_disponible = cantidad_disponible
        producto.save()

        # Mostrar mensaje de éxito
        messages.success(request, 'Producto actualizado correctamente.')
        return redirect('detalle', id=producto.id)

    return render(request, 'Servicios/ventaproducto/editar_producto.html', {'producto': producto})

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
    path('venta/', Venta, name='venta'),
    path('Vistaprevia/', Vistaprevia, name='vistaprevia'),
    path('subir-producto/', views.subir_producto_view, name='subir_producto'),
    path('Detalle/', Detalle, name='detalle'),
    path('Editar_producto', editar_producto, name='editar_producto'),
    path('logout/', auth_views.LogoutView.as_view(next_page='inicio'), name='logout'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
