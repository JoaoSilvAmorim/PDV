import gerencianet
from rest_framework import status
from rest_framework import pagination
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.conf import settings
from .models import *
from  .serializers import *
from .help import *
import webbrowser 
from gerencianet import Gerencianet
from django.db.models import Q

from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView

    
    
               
class configuracoesSistema(APIView):
    def get_configuracao(id):
        try:
            return ConfiguracoesSistema.objects.filter(id=id).get()
        except:
           return Response(status=status.HTTP_400_BAD_REQUEST) 
    
    def get(self, request, id=None):
        if id == None:
            data = ConfiguracoesSistema.objects.last()
            serializer = ConfiguracoesSistemaSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = ConfiguracoesSistemaSerializer(self.get_configuracao(id))
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        data = ConfiguracoesSistema.objects.last()
        serializer = ConfiguracoesSistemaSerializer(data=request.data)
        if data == None:
            if serializer.is_valid():
                serializer.create(request.data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                serializer.validate(request.data)
        else:
            if serializer.is_valid():
                serializer.update(data, request.data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                serializer.validate(request.data)


class Produtos(APIView):
    def get_produto(self, id):
        try: 
            return Produto.objects.filter(id=id).get()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        serializer = ProdutoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('ajlsdhaçlshd')
            serializer.validate(request.data)

    def get(self, request, id=None):
        if id == None:
            produto = Produto.objects.all()
            serializer = ProdutoSerializer(produto, many=True)
            return Response(serializer.data)
        else:
            serializer = ProdutoSerializer(self.get_produto(id))
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        serializer = ProdutoSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            produto = Produto.objects.filter(id=id).get()
            serializer.update(produto, request.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer.validate(request.data)
        
    def delete(self, request, id=None):
        print(id)
        produto = self.get_produto(id)
        produto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#PDV
class FinalizarVenda(APIView):
    def post(self, request):
        if request.method == 'POST':
            serializer = VendaSerializer(data=request.data)
            if serializer.is_valid():
                serializer.create(request.data)
                descontaEstoqueHelp(request.data)
                return Response(status=status.HTTP_200_OK)
            else:
                print(serializer.errors)
                return Response({'msg' : serializer.errors},  status=status.HTTP_400_BAD_REQUEST)
         
    

        
class ConfiguracoesPdv(APIview):
    
    def post(self, request):
        serieCaixa = Caixa.objects.filter(numero=int(request.data['numeroCaixa'])).get()
        caixaId = serieCaixa.id
        request.data['numeroCaixa'] = caixaId
        serializer = ConfiguracaoPdvSerializer(data=request.data)
        if serializer.is_valid():
            data = ConfiguracaoPDV.objects.all()[0:1]
            if not data:
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)     
            else:
                data[0].nfce = request.data['nfce']
                data[0].cfe = request.data['cfe']
                data[0].dav = request.data['dav']
                data[0].mfe = request.data['mfe']
                data[0].tipoDesconto = request.data['tipoDesconto']
                data[0].numeroCaixa = serieCaixa
                data[0].save()
                return Response(status=status.HTTP_201_CREATED)  
    def get(self, request, id=None):
        configCaixa = ConfiguracaoPDV.objects.all()
        serializer = ConfiguracaoPdvSerializerGet(configCaixa, many=True)
        return Response(serializer.data)


    
class AberturaCaixa(APIView):
    def post(self, request):
        ultCaixa = CaixasPdv.objects.last()
        if ultCaixa != None:
            if ultCaixa.status == False and intervalCaixa(request.data['abertura']) == True:
                request.data['turno'] += 1
                serializer = CaixasPdvSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_201_CREATED)
                else:
                    print(serializer.errors)
        else:
            serializer = CaixasPdvSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
                    
    def get(self, request, id =None):
        data = CaixasPdv.objects.last()
        serializer = CaixasPdvSerializer(data)
        return Response(serializer.data)
    
    ultCaixa = None  
    
class FechamentoCaixa(APIView):
    def post(self, request):
        ultCaixa = CaixasPdv.objects.last()
        ultCaixa.status = False
        ultCaixa.gaveta = request.data['gaveta']
        ultCaixa.saldo = request.data['saldoFinal']
        ultCaixa.fechamento = request.data['fechamento']
        ultCaixa.saldoFinal = request.data['sobra']
        ultCaixa.save()
        return Response(status=status.HTTP_201_CREATED)
#FIm pdv
   
@api_view(['GET', 'POST'])
def configGerenciaNet(request):
    print("configGerenciaNet" + request.method)
    if request.method == 'POST':
        gerenciaNetConta = {}
        try:
            gerenciaNetConta = tokenGerenciaNet.objects.last()
            gerenciaNetConta.delete()
            serializer = tokenGerenciaNetSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
        except:
            serializer = tokenGerenciaNetSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
    
    elif request.method == 'GET':
        conta = tokenGerenciaNet.objects.all()
        serializer = tokenGerenciaNetSerializer(conta, many=True)
        return Response(serializer.data)


#Graficos
class GraficoVendaPeriodo(ListAPIView):
    queryset = VendaPdv.objects.raw(""" SELECT id, CASE 
        WHEN strftime('%m', dataRegistro) = '01' THEN 'Janeiro' 
        WHEN strftime('%m', dataRegistro) = '02' THEN 'Fevereiro' 
        WHEN strftime('%m', dataRegistro) = '03' THEN 'Março'
        WHEN strftime('%m', dataRegistro) = '04' THEN 'Abril'
        WHEN strftime('%m', dataRegistro) = '05' THEN 'Maio' 
        WHEN strftime('%m', dataRegistro) = '06' THEN 'Junho'
        WHEN strftime('%m', dataRegistro) = '07' THEN 'Julho' 
        WHEN strftime('%m', dataRegistro) = '08' THEN 'Agosto' 
        WHEN strftime('%m', dataRegistro) = '09' THEN 'Setembro'
        WHEN strftime('%m', dataRegistro) = '10' THEN 'Outubro' 
        WHEN strftime('%m', dataRegistro) = '11' THEN 'Novembro'
        WHEN strftime('%m', dataRegistro) = '12' THEN 'Dezembro'
        ELSE 'Sem dados' END mes, count('*') AS contador, dataRegistro, 
        sum(valorVenda) AS valor FROM royal_vendapdv WHERE dataRegistro 
        BETWEEN date('now', '-1 year') AND date('now') GROUP BY  strftime('%Y-%m', dataRegistro) """)
    serializer_class = VendaPeriodoSerializer
    pagination_class = PageNumberPagination


class GraficoProdutosVendidos(ListAPIView):
    queryset = VendaProduto.objects.raw(""" SELECT * FROM royal_vendaproduto ORDER BY quantidade DESC LIMIT 5 """)
    serializer_class = ProdutoVendidoSerializer
    pagination_class = PageNumberPagination
    
    
    
class GerenciaNetBoleto(APIView):
    def post(self, request):
        conta = tokenGerenciaNet.objects.last()
        credentials = {
            'client_id': conta.client_id,
            'client_secret':  conta.client_secret,
            'sandbox': True
        }
        gn = Gerencianet(credentials)
        print(request.data)
        body = {
            'items': request.data['itens'],
            'shippings': [
                {'name': request.data['detalhesFrete'], 'value': request.data['frete']}
            ],
            'payment': {
                'banking_billet': {
                    'customer': {
                        'name': request.data['nomeCompleto'],
                        'cpf': request.data['cpf'],
                        'email': request.data['email'],
                        
                        'juridical_person': {
                            "corporate_name": request.data['razaoSocial'],
                            "cnpj": request.data['cnpj']
                        },
                        'address':{
                            'street': request.data['endereco']['logradouro'],
                            'city': request.data['endereco']['localidade'],
                            'complement':request.data['endereco']['complemento'],
                            'state': request.data['endereco']['uf'],
                        },
                    },
                    'expire_at': request.data['dataVencimento'],
                   
                    'discount': {
                        'type': request.data['tipoDesconto'],
                        'value': request.data['desconto']
                    },
                    'message': request.data['observacoes']
                }
            }
        }
        
        #(remove_empty_from_dict) é uma função que remove chaves vazias do objeto passado como parametro 
        body = remove_empty_from_dict(body)
        print(body)
        
        #Gerando bolix orcamento/ajusteEstoque
        try:
            id = request.data['idInstancia']
            if request.data['origem'] == 'orcamento':
                try:
                    response = gn.create_charge_onestep(params=None, body=body)
                    GerenciaNetBolix.objects.create(**response['data'], cliente=body)
                    orcamento = Orcamentos.objects.filter(id=request.data['idInstancia']).get()
                    orcamento.bolix = GerenciaNetBolix.objects.last()
                    orcamento.save()
                    
                    if request.data['formaEnvio'][0] == 0:
                        webbrowser.open(response['data']['link'], new=0, autoraise=True)
                        
                    return Response(response, status=status.HTTP_200_OK)
                    
                except:
                    return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            elif request.data['origem'] == 'estoque':
                try:
                    response = gn.create_charge_onestep(params=None, body=body)
                    GerenciaNetBolix.objects.create(**response['data'], cliente=body)
                    ajuste = AjusteEstoque.objects.filter(id=request.data['idInstancia']).get()
                    ajuste.bolix = GerenciaNetBolix.objects.last()
                    ajuste.save()
                    
                    if request.data['formaEnvio'][0] == 0:
                        webbrowser.open(response['data']['link'], new=0, autoraise=True)
                        
                    return Response(response, status=status.HTTP_200_OK)
                    
                except:
                    return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            else:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        #Boleto avulso 
        except:
            response = gn.create_charge_onestep(params=None, body=body)
            GerenciaNetBolix.objects.create(**response['data'], cliente=body)
            if request.data['formaEnvio'][0] == 0:
                webbrowser.open(response['data']['link'], new=0, autoraise=True)
                
            return Response(response, status=status.HTTP_200_OK)
          
          
          

class BolixEmitidos(ListAPIView):
    queryset = GerenciaNetBolix.objects.get_queryset().order_by('id')
    serializer_class = GerenciaNetBolixSerializer
    pagination_class = PageNumberPagination

    
    

class GerenciaNetCarne(APIView):
    def post(self, request):
        conta = tokenGerenciaNet.objects.last()
        credentials = {
            'client_id': conta.client_id,
            'client_secret':  conta.client_secret,
            'sandbox': True
        }
        gn = Gerencianet(credentials)
        print(request.data)
        body = {
            'items': request.data['itens'],
            'customer': {
                'name': request.data['nomeCompleto'],
                'cpf': request.data['cpf'],
                'email': request.data['email'],
                
                'juridical_person': {
                    "corporate_name": request.data['razaoSocial'],
                    "cnpj": request.data['cnpj']
                },
                    
                'address':{
                    'street': request.data['endereco']['logradouro'],
                    'city': request.data['endereco']['localidade'],
                    'complement':request.data['endereco']['complemento'],
                    'state': request.data['endereco']['uf'],
                },
            },
            'repeats': request.data['numeroParcelas'],
            'expire_at': request.data['primeiroVencimento'],
            'discount': {
                'type': request.data['tipoDesconto'],
                'value': request.data['desconto']
            },
            'message': request.data['observacoes']
        }
        
        #(remove_empty_from_dict) é uma função que remove chaves vazias do objeto passado como parametro 
        body = remove_empty_from_dict(body)
        print(body)
        
        #Gerando carnê orcamento/ajusteEstoque
        try:
            id = request.data['idInstancia']
            if request.data['origem'] == 'orcamento':
                try:
                    response = gn.create_carnet(params=None, body=body)
                    print(response)
                    GerenciaNetCarnes.objects.create(**response['data'], cliente=body)
                    orcamento = Orcamentos.objects.filter(id=request.data['idInstancia']).get()
                    orcamento.carne = GerenciaNetCarnes.objects.last()
                    orcamento.save()
                    
                    if request.data['formaEnvio'][0] == 0:
                        webbrowser.open(response['data']['link'], new=0, autoraise=True)
                        
                        return Response(response, status=status.HTTP_200_OK)
                    
                except:
                    return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
            elif request.data['origem'] == 'estoque':
                try:
                    response = gn.create_carnet(params=None, body=body)
                    GerenciaNetCarnes.objects.create(**response['data'], cliente=body)
                    ajuste = AjusteEstoque.objects.filter(id=request.data['idInstancia']).get()
                    ajuste.carne = GerenciaNetCarnes.objects.last()
                    ajuste.save()
                    
                    if request.data['formaEnvio'][0] == 0:
                        webbrowser.open(response['data']['link'], new=0, autoraise=True)
                        
                    return Response(response, status=status.HTTP_200_OK)
                    
                except:
                    return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            else:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        #Carnê avulso 
        except:
            response = gn.create_carnet(body=body)
            print(response)
            GerenciaNetCarnes.objects.create(**response['data'], cliente=body)
            
            print(response)
            if request.data['formaEnvio'][0] == 0:
                webbrowser.open(response['data']['link'], new=0, autoraise=True)
                return Response(response, status=status.HTTP_200_OK)
        
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    
        

class CarnesEmitidos(ListAPIView):
    queryset = GerenciaNetCarnes.objects.get_queryset().order_by('id')
    serializer_class = GerenciaNetCarneSerializer
    pagination_class = PageNumberPagination
    
    

class AcaoGerenciaNet(APIView):
    
    def post(self, request):
        
        conta = tokenGerenciaNet.objects.last()
        credentials = {
            'client_id': conta.client_id,
            'client_secret':  conta.client_secret,
            'sandbox': True
        }
        gn = Gerencianet(credentials)
       
        
        try:
            params = {
            'id': request.data['id']
            }
            
            body = {
                'email': request.data['email']
            }
            
            if request.data['tipo'] == 'bolix':
                response = gn.resend_billet(params=params, body=body)
            elif request.data['tipo'] == 'carne':
                response =  gn.resend_carnet(params=params, body=body)
                
            elif request.data['tipo'] == 'parcela':
                params = {
                    'id': request.data['id'],
                    'parcel': request.data['parcel']
                }
                response =  gn.resend_carnet(params=params, body=body)
                
            print(response)
            return Response(status=status.HTTP_200_OK)
            
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        
        
    def put(self, request):
        print(request.data)
        conta = tokenGerenciaNet.objects.last()
        credentials = {
            'client_id': conta.client_id,
            'client_secret':  conta.client_secret,
            'sandbox': True
        }
        gn = Gerencianet(credentials)
        
        #Carne, pagamento de parcela
        try:
            parcela = request.data['parcel']
            response = gn.settle_carnet_parcel(params=request.data)
            return Response(status=status.HTTP_200_OK)
        except:
            pass
        
        #Transacao comum não parcelada
        try:
            response = gn.settle_charge(params=request.data)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        