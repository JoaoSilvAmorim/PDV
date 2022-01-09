from django.contrib import admin
from django.contrib.admin.decorators import register

# Register your models here.


from .models import *


admin.site.register(Produto)
admin.site.register(VendaPdv)
admin.site.register(Caixa)
admin.site.register(ConfiguracaoPDV)
admin.site.register(CaixasPdv)
admin.site.register(Orcamentos)
admin.site.register(Usuario)
admin.site.register(VendaProduto)
admin.site.register(DevolucaoTroca)
admin.site.register(MovimentacaoProduto)
admin.site.register(GerenciaNetBolix)
admin.site.register(GerenciaNetCarnes)




