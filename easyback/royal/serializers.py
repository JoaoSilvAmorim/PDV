from django.db.models import fields
from rest_framework import serializers
from rest_framework.response import Response
from .models import *
from django.contrib.auth.hashers import make_password


class ConfiguracoesSistemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracoesSistema
        fields = '__all__'
        
    def create(self, validated_data):
        ConfiguracoesSistema.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        for chave, valor in validated_data.items():
            setattr(instance, chave, valor)
            instance.save()
        
    def validate(self, validated_data):
        if not validated_data['cnpj']:
            raise serializers.ValidationError({'CNPJ': 'NÃO PODE FICAR EM BRANCO'})
        
        elif not validated_data['razaoSocial']:
            raise serializers.ValidationError({'RAZÃO SOCIAL': 'NÃO PODE FICAR EM BRANCO'})
        
        elif not validated_data['status']:
            raise serializers.ValidationError({'ATIVO': 'VERIFIQUE SE O CAMPO FOI MARCADO CORRETAMENTE'})
        
        elif not validated_data['nomeFantasia']:
            raise serializers.ValidationError({'NOME FANTASIA': 'NÃO PODE FICAR EM BRANCO'})
        
        elif not validated_data['dataFundacao']:
            raise serializers.ValidationError({'DATA FUNDAÇÃO': 'NÃO PODE FICAR EM BRANCO'})
        
        return validated_data
    
class SerializadorGerenciaNet(serializers.ModelSerializer):
    def validate(self, validated_data):
        
        try: 
            data = validated_data['cliente']
        except:
            raise serializers.ValidationError({'CLIENTE': 'NÃO PODE FICAR EM BRANCO'})
            
        try: 
            data = validated_data['vencimento']
        except:
            raise serializers.ValidationError({'INFORME UMA DATA VALIDA PARA O VENCIMENTO'})    
        
        try: 
            data = validated_data['email']
        except:
            raise serializers.ValidationError({'EMAIL': 'NÃO PODE FICAR EM BRANCO'})
        
        try: 
            data = validated_data['tipoPessoa']
        except:
            raise serializers.ValidationError({'SELECIONE PESSOA FISÍCA/JURÍDICA'})
     
        #Validar se o cpf ou cnpj é validp
        """ elif validated_data['cnpj']:
            raise serializers.ValidationError({'CNPJ': 'NÃO PODE FICAR EM BRANCO'}) """
        
        return validated_data
        
    
class ProdutoSerializer(serializers.ModelSerializer): 
    
    class Meta:
        model = Produto
        fields = '__all__'
        
    def create(self, validated_data):
        del validated_data['atributos']
        del validated_data['infoFiscaisData']
        del validated_data['composicoes']
        del validated_data['fornecedores']
        del validated_data['operacoesInternas']
        del validated_data['operacoesExternas']
        Produto.objects.create(**validated_data)
        
    def update(self, instance, validated_data):
        for chave, valor in validated_data.items():
            setattr(instance, chave, valor)
            instance.save()
        
    def validate(self, validated_data):
        print("çuhbausdhgasoudgasiudgai")
        if not validated_data['descricao']:
            print('aõihsdasihod')
            raise serializers.ValidationError({'DESCRICÃO': 'NÃO PODE FICAR EM BRANCO'})
        
        elif not validated_data['categoria']:
            raise serializers.ValidationError({'CATEGORIA': 'NÃO PODE FICAR EM BRANCO'})
        
        elif not validated_data['codInterno']:
            raise serializers.ValidationError({'CÓDIGO INTERNO': 'NÃO PODE FICAR EM BRANCO'})
        
        elif not validated_data['valor']:
            raise serializers.ValidationError({'VALOR': 'NÃO PODE FICAR EM BRANCO'})
        
        return validated_data
        
        

#Inicio PDV
class VendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendaPdv
        
        fields = (
            "valorVenda", 
            "listaProdutos",
            "valorPago",
            "valorRecebido",
            "troco",
            "tipoDocumento",
            
            "turno",
            "numero",
            "operacao",
            "dataRegistro",
            "dataPagamento",
            "formaPagamento",
            "tipoBandeira",
            "caixa",
        )
        
    def create(self, validated_data):
        caixa = validated_data.pop('caixa')
        caixa = CaixasPdv.objects.filter(id=caixa).get()
        VendaPdv.objects.create(**validated_data, caixa = caixa)
        
        #Adicionando produtos ao model VendaProduto, responsavel por calcular o numero de vendas que foram feitas por produto.
        for item in validated_data['listaProdutos']:
            quantidade = int(item['quantidade'])
            produto = Produto.objects.filter(id=item['id']).get()
            try:
                venda = VendaProduto.objects.filter(produto__id__contains=produto.id).get()
                venda.quantidade += int(quantidade)
                venda.save()
            except:
                VendaProduto.objects.create(produto= produto, quantidade=quantidade)
    

class VendaProdutoSerializer(serializers.ModelSerializer):
    produto = ProdutoSerializer(read_only=True)
    class Meta:
        model = VendaProduto
        
        fields = (
            "produto",
            "quantidade",
        )

        
class SerieFiscalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SerieFiscal
    
        fields = (
            "id",
            "cnpj",
            "codSerieFiscal",
            "sequencia",
            "modeloDocumentoFiscal",
            "sistema",
            "infoComplementares",
        )
        

    
        
    
#Caixa inicio
class CaixaSerializerGet(serializers.ModelSerializer):
    serie = SerieFiscalSerializer(read_only=True)
    
    class Meta:
        model = Caixa
    
        fields = (
            "id",
            "numero",
            "serie",
        )
class CaixaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caixa
    
        fields = (
            "id",
            "numero",
            "serie",
        )
#Fim caixa  
    
    
#Configuracao inicio
class ConfiguracaoPdvSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracaoPDV
        
        fields = (
            "id",
            #"tipoDocumento",
            "cnpj",
            "numeroCaixa",
            "tipoDesconto",
            "senhaCertificado",
            "mfe",
            "cfe",
            "dav",
            "nfce"
        )
class ConfiguracaoPdvSerializerGet(serializers.ModelSerializer):
    numeroCaixa = CaixaSerializerGet(read_only=True)
    class Meta:
        model = ConfiguracaoPDV
        
        fields = (
            "id",
            #"tipoDocumento",
            "cnpj",
            "numeroCaixa",
            "tipoDesconto",
            "senhaCertificado",
            "mfe",
            "cfe",
            "dav",
            "nfce",
        )
#Fim configuracao

#Fim PDV    


        
     



 

class CaixasPdvSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaixasPdv
        fields = '__all__'
       
       
class tokenGerenciaNetSerializer(serializers.ModelSerializer):
    class Meta:
        model = tokenGerenciaNet
        
        fields = (
            "id",
            "client_id",
            "sandbox",
            "client_secret"
        )
        

class GerenciaNetBolixSerializer(serializers.ModelSerializer):
    class Meta:
        model = GerenciaNetBolix
        fields = '__all__'
        
    def to_representation(self, instance):
        instance = GerenciaNetBolix.objects.filter(id=instance.id).values()[0]
        return instance
        
        

        

class GerenciaNetCarneSerializer(serializers.ModelSerializer):
    class Meta:
        model = GerenciaNetCarnes
        fields = '__all__'
    def to_representation(self, instance):
        instance = GerenciaNetCarnes.objects.filter(id=instance.id).values()[0]
        return instance
        
        



class MovimentacaoProdutoSerializer(serializers.ModelSerializer):
    produto = ProdutoSerializer(read_only=True)
    class Meta:
        model = MovimentacaoProduto
        fields = '__all__'
        
    def to_representation(self, instance):
        return {
            'descricao': instance.produto.descricao,
            'categoria': instance.produto.categoria,
            'quantidade': instance.quantidade,
            'numero': instance.numero,
            'dataHoraMov': instance.dataConfirmacao,
            'clienteFornecedor': instance.clienteFornecedor,
            'unidade': instance.produto.uniEntrada,
            'valor': instance.produto.valor,
            'observacao': instance.observacoes,
            'tipoMovimento': instance.tipo,
        }




class PosicaoEstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimentacaoProduto
        fields = '__all__'
        
    def to_representation(self, instance):
        produto = Produto.objects.filter(id=instance.produto_id).values()[0]
        return {
            'produto': produto,
            'dataMovimentacao': instance.dataConfirmacao,
        }
   
   


class VendaPeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendaPdv
        fields = '__all__'
        
    def to_representation(self, instance):
        return {
            'mes': instance.mes,
            'dataRegistro': instance.dataRegistro,
            'contador': instance.contador,
            'valor': instance.valor
        }
   
   

class ProdutoVendidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendaProduto
        fields = '__all__'
        
    def to_representation(self, instance):
        produto = Produto.objects.filter(id=instance.produto_id).values()[0]
        print(produto['descricao'])
        return {
            'produto': produto['descricao'],
            'quantidade': instance.quantidade
        }
   


