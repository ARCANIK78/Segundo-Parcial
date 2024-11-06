# Servicios/models.py

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

def user_directory_path(instance, filename):
    return f'productos/{instance.vendedor.username}/{filename}'

class Producto(models.Model):

    ESTADO_CHOICES = [
        ('disponible', 'Disponible'),
        ('vendido', 'Vendido'),
    ]

    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to=user_directory_path)
    vendedor = models.ForeignKey(User, on_delete=models.CASCADE)
    categoria = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    fecha_subida = models.DateTimeField(auto_now_add=True)
    fecha_venta = models.DateTimeField(null=True, blank=True)

    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='Disponible')

    def verificar_estado(self):
        """Verifica si el producto está vendido y si la fecha de venta supera los 5 días."""
        if self.estado == 'Vendido' and self.fecha_venta:
            if timezone.now() > self.fecha_venta + timezone.timedelta(days=5):
                self.delete()
                return "Producto eliminado"
        return "Producto no eliminado"

    def __str__(self):
        return self.nombre
