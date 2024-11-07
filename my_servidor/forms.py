# my_app/forms.py
from django import forms
from .models import Producto

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 'imagen', 'categoria', 'marca', 'cantidad_disponible']
    
    def __init__(self, *args, **kwargs):
        super(ProductoForm, self).__init__(*args, **kwargs)
        self.fields['cantidad_disponible'].initial = 1
        self.fields['cantidad_disponible'].widget.attrs.update({'min': 1})
