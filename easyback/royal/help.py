from .models import Produto
from datetime import datetime


def remove_empty_from_dict(d):
    if type(d) is dict:
        return dict((k, remove_empty_from_dict(v)) for k, v in d.items() if v and remove_empty_from_dict(v))
    elif type(d) is list:
        return [remove_empty_from_dict(v) for v in d if v and remove_empty_from_dict(v)]
    else:
        return d




def descontaEstoqueHelp(venda):
    listaProdutos = venda['listaProdutos']
    for produto in list(listaProdutos):
        instance = Produto.objects.filter(id=produto['id']).get()
        if produto['ativo']:
            instance.revenda = int(instance.revenda) - int(produto['quantidade'])
            instance.vendido = int(produto['quantidade'])
            instance.save()
        else:
            print('Estoque inativo')
            

            
            
def ajusteEstoqueHelp(produtos, tipo):
    for i in produtos:
        if tipo == '1': #Compra 
            produto = Produto.objects.filter(id=i['id']).get()
            if i['tipoEstoque'] == 1:
                    produto.imobilizado += int(i['quantidade'])
                    produto.save()
                    
            elif i['tipoEstoque'] == 2:
                    produto.consumo += int(i['quantidade'])
                    produto.save() 
        
            elif i['tipoEstoque'] == 3:
                    produto.revenda += int(i['quantidade'])
                    produto.save()
           
           
        elif tipo == '2': #Devolução
            produto = Produto.objects.filter(id=i['id']).get()
            if i['tipoEstoque'] == 1:
                    produto.imobilizado -= int(i['quantidade'])
                    produto.save()
                    
            elif i['tipoEstoque'] == 2:
                    produto.consumo -= int(i['quantidade'])
                    produto.save() 
        
            elif i['tipoEstoque'] == 3:
                    produto.revenda -= int(i['quantidade'])
                    produto.save()
        
        
        elif tipo == '3': #Entrada
            produto = Produto.objects.filter(id=i['id']).get()
            if i['tipoEstoque'] == 1:
                    produto.imobilizado += int(i['quantidade'])
                    produto.save()
                    
            elif i['tipoEstoque'] == 2:
                    produto.consumo += int(i['quantidade'])
                    produto.save() 
        
            elif i['tipoEstoque'] == 3:
                    produto.revenda += int(i['quantidade'])
                    produto.save()
      
        
        elif tipo == '4': #Saida
            produto = Produto.objects.filter(id=i['id']).get()
            if i['tipoEstoque'] == 1:
                    produto.imobilizado -= int(i['quantidade'])
                    produto.save()
                    
            elif i['tipoEstoque'] == 2:
                    produto.consumo -= int(i['quantidade'])
                    produto.save() 
        
            elif i['tipoEstoque'] == 3:
                    produto.revenda -= int(i['quantidade'])
                    produto.save()



def intervalCaixa(data=None):
    dataAtual = datetime.today().strftime('%d-%m-%Y %H:%M')
    dataAtual = dataAtual.split(' ')
    dataPy = dataAtual[0].split('-')
    #horaPy = dataAtual[1].split(':')
    
    data = data.split(' ')
    dataFechamento = data[0].split('/')
    #horaFechamento = data[1].split(':')
    
    if dataFechamento[0] == dataPy[0] and dataFechamento[1] == dataPy[1] and dataFechamento[2] == dataPy[2]:
        return True
    else:
        return False
    
