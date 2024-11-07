# manage.py

import os
import sys

def main():
    """Punto de entrada principal para las tareas administrativas de Django."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_servidor.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "No se pudo importar Django. Asegúrate de que está instalado "
            "y disponible en el entorno virtual."
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
