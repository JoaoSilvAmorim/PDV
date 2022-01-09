from django.urls import path, include

from royal import views

urlpatterns = [ 
    #Produtos
    path('cadastrarProduto/', views.Produtos.as_view()),
    path('listarProdutos/', views.Produtos.as_view()), 
    path('editarProduto/<id>/', views.Produtos.as_view()),
    path('deletarProduto/<id>/', views.Produtos.as_view()),
    
    #Pdv
    path('finalizarVenda/', views.FinalizarVenda.as_view()),
    path('configuracaoPdv/', views.ConfiguracoesPdv),
    path('aberturaCaixa/', views.AberturaCaixa),
    path('fechamentoCaixa/', views.FechamentoCaixa),
    
    #urls configuracao do sistema
    path('configuracaoSistema/<id>/', views.configuracoesSistema.as_view()),
    path('configuracaoSistema/', views.configuracoesSistema.as_view()),
    
    #Gerencia net teste
    path('gerenciaNetConfig/', views.configGerenciaNet),
    path('gerarBoleto/', views.gerarBoleto),
    path('gerarCarne/', views.gerarCarne),
    
    path('gerarBoletoAvulso/', views.GerenciaNetBoleto.as_view()),
    path('gerarCarneAvulso/', views.GerenciaNetCarne.as_view()),
    
    path('boletosEmitidos/', views.BolixEmitidos.as_view()),
    path('carnesEmitidos/', views.CarnesEmitidos.as_view()),
    
    path('acaoGerenciaNet/', views.AcaoGerenciaNet.as_view()),
    path('reeviarEmailGerenciaNet/', views.AcaoGerenciaNet.as_view()),
    
    #Dashboard
    path('graficosVendaPeriodo/', views.GraficoVendaPeriodo.as_view()),
    path('graficosProdutoVendidos/', views.GraficoProdutosVendidos.as_view()),
    path('graficosFaturamentoAnual/', views.GraficoProdutosVendidos.as_view()),
    
]