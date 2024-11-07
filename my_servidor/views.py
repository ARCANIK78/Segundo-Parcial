# my_app/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Producto
from .forms import ProductoForm
from django.utils import timezone

@login_required
def venta_view(request):
    productos = Producto.objects.all()
    
    if request.method == 'POST':
        producto_id = request.POST.get('producto_id')
        producto = Producto.objects.get(id=producto_id)
        
        if producto.estado == 'Disponible':
            if producto.cantidad_disponible > 0:
                producto.estado = 'Vendido'
                producto.fecha_venta = timezone.now()
                producto.cantidad_disponible = 0 
            else:
                producto.cantidad_disponible -= 1
                if producto.cantidad_disponible == 0:
                    producto.estado = 'Vendido'
                    producto.fecha_venta = timezone.now()
            
            producto.save()
            messages.success(request, 'Producto actualizado correctamente.')
        
    return render(request, 'Servicios/ventas.html', {'productos': productos})

@login_required
def subir_producto_view(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            producto = form.save(commit=False)
            producto.vendedor = request.user
            producto.save()
            messages.success(request, 'Producto subido exitosamente.')
            return redirect('venta')
        else:
            pass
            messages.error(request, 'Error al subir el producto.')
    else:
        form = ProductoForm()
    return render(request, 'Servicios/subir_producto.html', {'form': form})
