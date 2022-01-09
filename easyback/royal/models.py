from io import BytesIO
import uuid
from django.core.files import File
from django.db import models
import json
from django.contrib.auth.models import AbstractUser, User
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, UUIDField
from django.db.models.fields.json import JSONField




class Usuario(AbstractUser):
    #user campos extendidos
    
    #Dados gerais
    nome = models.CharField(max_length=64) #Obr
    cpf = models.CharField(max_length=16)  #Obr
    perfilAcesso = models.PositiveBigIntegerField(null=True, blank=True)
    telefone = models.CharField(max_length=16, null=True, blank=True)
    departamento = models.CharField(max_length=100)  #Obr
    sexo = models.PositiveIntegerField(null=True, blank=True)
    tipo = models.PositiveIntegerField(null=True, blank=True)
    entidade = models.PositiveIntegerField(null=True, blank=True)
    observacoes = models.TextField(null=True, blank=True)
    categorias = models.PositiveIntegerField(null=True, blank=True)
    
    #Dados secundarios
    #Informações pessoais
    rg = models.CharField(max_length=14)  #Obr
    dataNascimento = models.CharField(max_length=12) #Obr
    escolaridade = models.CharField(max_length=12, null=True, blank=True)

    #Comissao e desconto
    comissao = models.PositiveIntegerField(null=True, blank=True) 
    desconto = models.PositiveIntegerField(null=True, blank=True)
    
    #Dados trabalhistas
    dataAdmissao = models.DateField(null=True, blank=True) 
    dataDemissao = models.DateField(null=True, blank=True)
    descansoSemanal = models.PositiveIntegerField(null=True, blank=True)
    ctps = models.PositiveIntegerField(null=True, blank=True)
    
    #Dados bancarios
    tipoContaBancaria = models.PositiveIntegerField(null=True, blank=True)
    agencia = models.CharField(max_length=12, null=True, blank=True)
    contaBancaria = models.CharField(max_length=12, null=True, blank=True)
    numeroBanco = models.CharField(max_length=12, null=True, blank=True)
    
    #Horarios
    entrada = models.TimeField(null=True, blank=True)
    inicioAlmoco = models.TimeField(null=True, blank=True)
    fimAlmoco = models.TimeField(null=True, blank=True)
    horaSaida = models.TimeField(null=True, blank=True)
    diasTrabalhados = models.JSONField(null=True, blank=True)
    
    
    
    


class Produto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    descricao = models.CharField(max_length=255)
    categoria = models.PositiveIntegerField(null=True, blank=True)
    tipo = models.PositiveIntegerField(null=True, blank=True)
    codInterno = models.CharField(max_length=20)
    codBarras = models.CharField(max_length=20)
    codTributavel = models.CharField(max_length=20)

    ativo = models.BooleanField(null=True, blank=True)

    uniEntrada = models.PositiveIntegerField(null=True)
    saida = models.PositiveIntegerField(null=True)
    uniSaida = models.PositiveIntegerField(null=True)

    finalidade = models.PositiveIntegerField(null=True, blank=True)
    movimentar = models.BooleanField(null=True, blank=True)

    imobilizado = models.PositiveIntegerField(null=True, blank=True) #
    consumo = models.PositiveIntegerField(null=True, blank=True) #
    revenda = models.PositiveIntegerField(null=True, blank=True) #
    minimoRevenda = models.PositiveIntegerField(null=True, blank=True)
    maximoRevenda = models.PositiveIntegerField(null=True, blank=True)
  
    valor = models.PositiveIntegerField(null=True, blank=True)

    infoFiscais = models.JSONField(default={}, null=True, blank=False)
    tributacao = models.JSONField(default={}, null=True, blank=False)
    grupoComb = models.JSONField(default={}, null=True, blank=False)

    valCustos = models.JSONField(default={}, null=True, blank=False)
    atributosArray = models.JSONField(default={}, null=True, blank=False)
    composicoesArray = models.JSONField(default={}, null=True, blank=False)
    totalComp = models.DecimalField(null=True, max_digits=10, decimal_places=4)
    
    fornecedoresArray = models.JSONField(default={}, null=True, blank=False)

    class Meta:
        ordering = ('descricao', )
       
    def get_absolute_url(self):
        return f'/{self.descricao}/'

class Ncm(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    codigo = models.CharField(max_length=10)
    descricao = models.TextField()
    
    tributacao = models.JSONField(default={}, null=True, blank=False)
    grupoComb = models.JSONField(default={}, null = True, blank = False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('descricao', )
        
    def __str__(self):
        return self.descricao
    
    def get_absolute_url(self):
        return f'/{self.id}/'

 


    
class Empresa(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cpnj_cpf = models.CharField(max_length=14)
    razao_social = models.CharField(max_length=255)
    fantasia = models.CharField(max_length=255) 
    ie = models.CharField(max_length=9)
    seguimento = models.PositiveIntegerField()
    isento = models.BooleanField()
    data_instituicao = models.DateField()
    tipo = models.PositiveIntegerField()
    crt = models.PositiveIntegerField()
    imunicipal = models.CharField(max_length=15, blank=True, null=True)
    rntrc = models.CharField(max_length=10, blank=True, null=True)
    ciot = models.CharField(max_length=10, blank=True, null=True)

    endereco = models.JSONField(default={}, null=True, blank=False)
    metadata = models.JSONField(default=None, null=True, blank=False)

    """ user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE) """
    
    #revenda = models.UUIDField()
    """ filial = models.ForeignKey(
        "self", on_delete=models.CASCADE, blank=True, null=True) """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('fantasia', )

    def __str__(self):
        return self.fantasia 

    def get_absolute_url(self):
        return f'/{self.id}/'










class CategoriaConta(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    categoria = models.CharField(max_length=21)
class ContaPagarReceber(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tipoLancamento = models.CharField(max_length=8, blank=True)
    situacao = models.CharField(max_length=10)
    nDocumento = models.CharField(max_length=14, null = True, blank=True)
    parcelas =  models.JSONField(default={}, null=True, blank=False)
    vencimento = models.DateField(null=True, blank=True)
    funcionario = models.CharField(null=True, blank=True, max_length=18)
    formaPagamento = models.CharField(null=True, max_length=12)
    
    descricao = models.CharField(max_length=28)
    valorBruto = models.CharField(max_length=10)
    valorRecebido = models.CharField(max_length=10, null=True, blank=True)
    valorPago = models.CharField(max_length=10, null=True, blank=True)
    observacoes = models.TextField(null=True, blank=True)
    
    categoria = models.ForeignKey(CategoriaConta, related_name='categorias', on_delete = models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
            ordering = ('created_at', )
 
    def get_absolute_url(self):
        return f'/{self.id}/'


class SerieFiscal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cnpj = models.CharField(max_length=14)
    codSerieFiscal = models.PositiveIntegerField(null=True, blank=False)
    sequencia = models.PositiveIntegerField(null=True, blank=False)
    modeloDocumentoFiscal = models.CharField(max_length=10, null=True, blank=False)
    sistema = models.CharField(null=True, blank=False, max_length=10)
    infoComplementares = models.CharField(null=True, blank=False, max_length=10) 
class Caixa(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    numero = models.PositiveIntegerField()
    serie = models.ForeignKey(SerieFiscal, related_name='caixas', on_delete = models.CASCADE)
class configIcones(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    icones = models.JSONField()
    


class ConfiguracaoPDV(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    #tipoDocumento = models.JSONField(null=True, blank=True)
    cnpj = models.CharField(max_length=18, null=True, blank=True)
    numeroCaixa =  models.ForeignKey(Caixa, on_delete = models.CASCADE)
    
    cfe = models.BooleanField(null=True, blank=True)
    nfce = models.BooleanField(null=True, blank=True)
    mfe = models.BooleanField(null=True, blank=True)
    dav = models.BooleanField(null=True, blank=True)
    
    #impressora = models.
    tipoDesconto = models.PositiveIntegerField(null=True, blank=False)
    #caminhoCertificado = models.
    senhaCertificado = models.CharField(max_length=12, null=True, blank=True)
    #tipoEmissor = models.
    
    
class DevolucaoTroca(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tipoOperacao = models.PositiveIntegerField()
    
    totalTroca = models.PositiveIntegerField(null=True, blank=True)
    listaTroca = models.JSONField(null=True, blank=True)
    
    listaDevolucao = models.JSONField(null=True, blank=True)
    totalDevolucao = models.PositiveIntegerField(null=True, blank=True)
    
    

class CaixasPdv(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    status = models.BooleanField(null=True, blank=True)
    abertura = models.CharField(null=True, max_length=18)
    fechamento = models.CharField(null=True, max_length=18)
    
    saldo = models.PositiveIntegerField(null=True, blank=False)
    saldoFinal = models.PositiveIntegerField(null=True, blank=False)
    gaveta = models.PositiveIntegerField(null=True, blank=False)
    turno = models.PositiveIntegerField(null=True, blank=False)
    
    funcionario = models.JSONField(null=True, blank=False)
    historico = models.JSONField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('created_at', )
        
class VendaPdv(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    listaProdutos = models.JSONField(default={}, null = True, blank = False)
    valorVenda = models.CharField(max_length=8)
    valorPago = models.CharField(max_length=8)
    valorRecebido = models.CharField(max_length=8)
    troco = models.CharField(max_length=8)
    tipoDocumento = models.CharField(max_length=8)
    turno = models.PositiveIntegerField(null=True, blank=True)
    numero = models.PositiveIntegerField(null=True, blank=True)
    operacao = models.CharField(max_length=22)
    dataRegistro = models.DateField(null=True, blank=True)
    dataPagamento = models.DateField(null=True, blank=True)
    
    formaPagamento = models.CharField(null=True, max_length=12)
    tipoBandeira = models.CharField(null=True, max_length=12)
    #parcelas = models.PositiveIntegerField(null=True, blank=False)
    
    caixa = models.ForeignKey(CaixasPdv, related_name='caixas', on_delete = models.CASCADE, null=True)
    #produtos = models.ManyToManyField(Produto, null=True, blank=True)    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ('created_at', )

    def __str__(self):
        return json.dumps(self.listaProdutos) + ', Valor total: ' + json.dumps(self.valorVenda)

    def get_absolute_url(self):
        return f'/{self.id}/'
    
class VendaProduto(models.Model):
    produto = models.ForeignKey(Produto, on_delete = models.CASCADE)
    quantidade = models.PositiveBigIntegerField()
    
    
class BanderiraCartao(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    configuracaoBandeira = models.JSONField()
    

class GerenciaNet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.URLField()
    historico = models.JSONField(null=True, blank=True)
    
    
class tokenGerenciaNet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sandbox = models.BooleanField()
    client_id = models.CharField(max_length=255, blank=True)
    client_secret = models.CharField(max_length=255, blank=True)
    
    


class MovimentacaoProduto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    produto = models.ForeignKey(Produto, on_delete = models.CASCADE)
    quantidade = models.PositiveIntegerField()
    
    tipo = models.PositiveIntegerField(null=True, blank=True)
    numero = models.CharField(max_length = 14,null=True, blank=False)
    situacao = models.CharField(max_length=16, null=True, blank=True)
    dataCriacao = models.DateField(null=True, blank=True) 
    dataConfirmacao = models.DateField(null=True, blank=True) 
    dataVencimento = models.DateField(null=True, blank=True)
    clienteFornecedor = models.CharField(max_length=34, null=True)
    cpfCnpj = models.CharField(max_length=16, null=True)
    itensArr = models.JSONField(null=True, blank=True)
    observacoes = models.TextField(null=True, blank=True)
    valorFrete = models.PositiveIntegerField(null=True, blank=True)
    outrasDespesas = models.PositiveIntegerField(null=True, blank=True)
    totalAjusteGeral = models.PositiveIntegerField(null=True, blank=True)
    
    valorPago = models.PositiveIntegerField(null=True, blank=True)
    valorRecebido = models.PositiveIntegerField(null=True, blank=True)
    
    valorParcela = models.PositiveIntegerField(null=True, blank=True)
    quantidadeParcelas = models.PositiveIntegerField(null=True, blank=True)
    parcelas = models.JSONField(null=True, blank=True)
    formaPagamento = models.CharField(max_length=18, null=True, blank=False)
    totalItens = models.PositiveIntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('created_at', )
        


class GerenciaNetBolix(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    barcode = models.CharField(max_length=64)
    pix = models.JSONField(null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    pdf = models.JSONField(null=True, blank=True)
    expire_at = models.DateField(null=True, blank=True)
    charge_id = models.PositiveIntegerField()
    status = models.CharField(max_length=12, null=True, blank=True)
    total = models.PositiveIntegerField(null=True, blank=True)
    payment = models.CharField(max_length=24, null=True, blank=True)
    cliente = models.JSONField(null=True, blank=True)
    
    metadata = models.JSONField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('created_at', )
    

class GerenciaNetCarnes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    carnet_id = models.PositiveIntegerField()
    cover = models.URLField()
    status = models.CharField(max_length=12, null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    pdf = models.JSONField(null=True, blank=True)
    charges = models.JSONField(null=True, blank=True)
    cliente = models.JSONField(null=True, blank=True)
    
    metadata = models.JSONField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('created_at', )    
        
class AjusteEstoque(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tipo = models.PositiveIntegerField(null=True, blank=True)
    numero = models.CharField(max_length = 14,null=True, blank=False)
    situacao = models.CharField(max_length=16, null=True, blank=True)
    dataCriacao = models.DateField(null=True, blank=True) 
    dataConfirmacao = models.DateField(null=True, blank=True) 
    dataVencimento = models.DateField(null=True, blank=True)
    clienteFornecedor = models.CharField(max_length=34, null=True)
    cpfCnpj = models.CharField(max_length=16, null=True)
    itensArr = models.JSONField(default=listaProdutos, null=True, blank=True)
    observacoes = models.TextField(null=True, blank=True)
    valorFrete = models.PositiveIntegerField(null=True, blank=True)
    outrasDespesas = models.PositiveIntegerField(null=True, blank=True)
    totalAjusteGeral = models.PositiveIntegerField(null=True, blank=True)
    
    valorPago = models.PositiveIntegerField(null=True, blank=True)
    valorRecebido = models.PositiveIntegerField(null=True, blank=True)
    
    valorParcela = models.PositiveIntegerField(null=True, blank=True)
    quantidadeParcelas = models.PositiveIntegerField(null=True, blank=True)
    parcelas = models.JSONField(default=parcelas, null=True, blank=True)
    formaPagamento = models.CharField(max_length=18, null=True, blank=False)
    totalItens = models.PositiveIntegerField(null=True)
    
    produtos = models.ManyToManyField(MovimentacaoProduto)
    
    url = models.URLField(null=True, blank=True)
    
    bolix = models.OneToOneField(GerenciaNetBolix,
        null=True,
        on_delete=models.CASCADE,)    
    
    carne = models.OneToOneField(GerenciaNetCarnes, 
        null=True,                    
        on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('created_at', )

class ConfiguracoesSistema(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cnpj = models.CharField(max_length=18)
    razaoSocial = models.CharField(max_length=38)
    status = models.PositiveIntegerField()
    nomeFantasia = models.CharField(max_length=32)
    apelido = models.CharField(max_length=32, null=True, blank=True)
    suframa = models.CharField(max_length=18, null=True, blank=True)
    dataFundacao = models.DateField(null=True)
    inscricaoEstadual = models.CharField(max_length=15, null=True, blank=True)
    inscricaoMunicipal = models.CharField(max_length=15, null=True, blank=True)
    isentoIe = models.PositiveIntegerField(null=True, blank=True)
    
    icones = models.JSONField(null=True, blank=True)
    enderecos = models.JSONField(null=True, blank=True)
    dadosProp = models.JSONField(null=True, blank=True)
    customizacao = models.JSONField(null=True, blank=True) 
    tributacao = models.JSONField(null=True, blank=True)
    substituicaoTributaria = models.JSONField(null=True, blank=True)
    cfops = models.JSONField(null=True, blank=True)
    cupomFiscal = models.JSONField(null=True, blank=True)
    configNfce = models.JSONField(null=True, blank=True)
    opcoesVenda = models.JSONField(null=True, blank=True)
    configuracaoBandeiraArr = models.JSONField(null=True, blank=True)
    serieFiscal = models.JSONField(null=True, blank=True)
    credenciaisGerenciaNet = models.JSONField(null=True, blank=True)
    contaGerenciaNet = models.JSONField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('created_at', )
        


        
    
class Orcamentos(models.Model):
    #Dados
    
    #Identificao pedido orcamento
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    numero = models.CharField(max_length = 14,null=True, blank=False) #
    dataCriacao = models.DateField(null=True, blank=True) # 
    dataConfirmacao = models.DateField(null=True, blank=True) # 
    status = models.CharField(max_length=18, null=True, blank=False) #
    departamento = models.CharField(max_length=18, null=True)
    
    #Vendedor
    vendedor = models.CharField(max_length=24, null=True)
    
    #Cliente
    cliente = models.CharField(max_length=32, null=True) #
    cpfCnpj = models.CharField(max_length=16, null=True) #
    
    #Entrega
    data = models.DateField(null=True, blank=True) # 
    
    #Itens
    itens = models.JSONField(default=listaProdutos, null=True, blank=False) #
    
    #Observacoes
    observacoes = models.TextField(null=True, blank=False) 
    
    #Extras
    descontoMonetario = models.PositiveIntegerField(null=True, blank=False) #
    descontoPercentual = models.PositiveIntegerField(null=True, blank=False) #
    valorFrete = models.PositiveIntegerField(null=True, blank=False)
    endereco = models.JSONField(default={}, null=True, blank=False) #
    
    #Total
    total = models.PositiveIntegerField()
    
    
    
    #Faturamento
    formaPagamento = models.CharField(max_length=18 ,null=True, blank=False) #
    quantidadeParcelas = models.PositiveIntegerField(null=True, blank=False) #
    parcelas = models.JSONField(default={}, null=True, blank=False) #
    valorPedidoOrcamento = models.PositiveIntegerField(null=True, blank=False) #
    
    bolix = models.OneToOneField(GerenciaNetBolix,
        null=True,
        on_delete=models.CASCADE,)    
    
    carne = models.OneToOneField(GerenciaNetCarnes, 
        null=True,                    
        on_delete=models.CASCADE)
    
    url = models.URLField(null=True, blank=True)
    