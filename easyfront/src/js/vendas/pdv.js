import axios from 'axios'
import moment from 'moment'

const pdv = {
  name: 'pdv',
  components: {
    
  },
    data: () => {
          return {
            id: '',
            historico: [],
            value: 1,
            keyword: '',
            dialogAberturaCaixa: false,


            operacoesPdv: [],
            pesquisar: '',
            bandeiras: [],
            configPDV: [],
            testeCheck: false,
            caixa: '',
            operacoesCaixa: '',
            sobra: 0,

   
            editableTabsValue: '0',
           /*  url: `${base_url}/static/img/logo-royal.png`, */
            urlLogo: '../assets/favicon-5.png',
            fits: 'scale-down',
            loading: false,
            tabPosition: 'bottom',

            exibirClientes: false,
            exibirVendedores: false,
            avisoProdutos: false,
            fecharCaixa: false,
            confirmarTroca: false,
            meioPagamento: false,
            compraFinalizada: false,
            pedido: false,
            selecionarBandeira: false,
            checarFormaPagamento: false, 

            abrirDescontoItem: false, 

            exibirConfiguracoes: false,  
            exibirMenuFiscalVar: false,

            cfe: false,
            dav: false,
            nfce: true,
            mfe: false,

            
            tipoPessoa:[
            {"label": "Pessoa Fisica", "value": 1},
            ],

            produtos:[ 
            ],

            tipoData:[
                {"label": "Tipo1", "value": 5},
                {"label": "Tipo2", "value": 3}    
            ],


            //Consulta preço
            precoConsulta: '',
            codigoConsulta: '',
            descricaoConsulta: '',
            estoqueConsulta: '',
            situacaoConsulta: '',
            unidadeConsulta: '',
            operacaoPdv: '',

            // Fim Consultas preços
            form:{
 //Variavel para controle da pagina 

                alter: '',
                menuBase: '',

                statusCaixa: false,
                totalCaixa: 0,

//-----------------------------------------------------------//
                //Home
                produtos: '',
                produto: '',
                quantidade: '',
                valorItem: '',
                valorPago: 0,
                troco: 0,
                formaPagamento: [],
                parcelas: 0,
                listaProdutos:[
                    //Array Vazio
                ],
                totalLista: '',
                descontoItem: '',

                descontoPercentual: '',
                descontoBruto: '',
                
                produtoDesconto: '',
                desconto: '',
                tipoDocumento: '',
                tipoBandeira: [],
                //Fim home
//------------------------------------------------------------//

                //Definir Cliente
                pessoa: '',
                cpf: '',
                nomeCliente: '',
                endereco: '',
                observacaoCliente: '',
                //Fim Definir CLiente
//------------------------------------------------------------//    

                //Definir Vendedor
                nomeUsuario: '',
                //Fim Definir Vendedor
//------------------------------------------------------------//                

                //Sangria
                data: '',
                caixa: '',
                operacao: '',
                especie: '',
                valorSangriaSuprimento: 0,
                //Fim Sangria
//------------------------------------------------------------//

                //Devolução
                //produto: '', (Já existe)
                //quantidade: '', (Já existe)
                //valorUnitario: '', (igual valorItem)
                tipoDevolucao: 1,
                listaDevolucao: [

                ],
                listaTroca:[

                ],
                totalDevolucao: 0,
                totalTroca: 0,
                //Fim Devolução
//-----------------------------------------------------------//
              
                //Fechar Caixa
                nomeOperador: '',
                dataFechamento: '',
                turno: '',
                sicronizarGestao: '',
                valorGaveta: '',
                meioPagamento: '',

                //Fim Fechar Caixa
//----------------------------------------------------------//

                //Pedido
                tipoData: '',
                dataPedidoInicio: '',
                dataPedidoFim: '',

                tabelaPedido:[/*{
                    numero: '12345',
                    cliente: 'severino biu 123',
                    geracao: '22/06/2021',
                    situacao: 'nao faturado',
                    valorTotal: '100',
                    saldo: '0.00',
                    operacao: 'venda',
                }*/],
                //Fim Pedido
//----------------------------------------------------------//

                //Configuracoes
                configuracoes:{
                    numeroCaixa: '',
                    impressora: '',
                    tipoDesconto: '',

                    
                    caminhoCertificado: '',
                    senhaCertificado: '',
                    tipoEmissaoArr: []
                },



                //Menu fiscal
                operacoes:{
                    tipoOperacao: '',
                    nDocFiscal: '',
                    filtroData: '',
                    nDocFiscal1: '',
                    nDocFiscal2: '',
                },


                aberturaCaixa:{
                    saldoInicial: '',
                    turno: 1,
                    funcionario: ''

                }
            },

             rules:{
                produtos: [{required: true, message: 'Preencha todos os campos', trigger: 'blur'}]

            }  
            
        }
    },


    async mounted() {
        await this.getAberturaCaixa()
        await this.getProdutos()
        await this.getBandeiras()
        await this.getConfiguracao()
    },

    computed: {
            keymap () {
                return {
                    'esc': this.exibirHome,
                    'ctrl + f1':this.ffecharCaixa,
                    'f1': this.fexibirClientes,
                    'f2': this.fexibirVendedores,
                    'f3': this.finalizar,
                    'f4': this.exibirConsulta,
                    //'f5': this.exibirPedido,
                    //'f6': this.exibirGaveta,
                    'f7': this.exibirDevolucao,
                    'f8': this.exibirSangria,
                    'f9': this.exibirFuncoes,
                    'f10': this.exibirMenuFiscal,
                    'numpad1': this.formaDinheiro,
                    'numpad2': this.formaCredito,
                    'numpad3': this.formaDebito,
                    'numpad4': this.formaCrediario,
                    'numpad5': this.formaQRCodePix,

                    'numpad7': this.formaCheque,
                    'numpad6': this.formaDevolucao,
                    'numpad8': this.formaDesconto,
                }
            
            },

            listOperacoes(){
                if (this.form.operacoes.filtroData == null || this.form.operacoes.filtroData == '') {
                    return this.operacoesPdv
                } else {
                const tblAux = []
                if(this.form.operacoes.filtroData != null){
                    let inicio = this.form.operacoes.filtroData[0].split("/");
                    let fim = this.form.operacoes.filtroData[1].split("/")
                    for(var i = 0; i < this.operacoesPdv.length; i++){
                    let aux = this.operacoesPdv[i].dataRegistro.split("/")
                        if(aux[0] >= inicio[0] && aux[0] <= fim[0]){
                                if(aux[1] >= inicio[1] && aux[1] <= fim[1]){
                                    if(aux[2] >= inicio[2] && aux[2] <= fim[2]){
                                        tblAux.push(this.operacoesPdv[i])
                                    }//Fim if ano
                                }//Fim if mes
                        }//Fim if dia
                    }
                    return tblAux
                    }
                }
            },

            basicList() {
            return this.produtos
            },
            list() {
            if (this.keyword === '') {
                return this.basicList;
            } else {
                return this.basicList.filter(item => {
                return ( 
                    String(item.descricao)
                    .toUpperCase()
                    .includes(this.keyword.toUpperCase()) ||
                    String(item.codInterno)
                    .toUpperCase()
                    .includes(this.keyword.toUpperCase())
                )  
                })
            }
            }
    },
    methods: {
        retDataPrazo(){
            let indexBandeira = this.bandeiras.findIndex(i => i.configuracaoBandeira.nomeBandeira == this.form.tipoBandeira);
            let data = moment(this.dataAtual()).add(this.bandeiras[indexBandeira].configuracaoBandeira.prazoRecebimento, 'days').format("YYYY-MM-DD")
            return data
        },
        emitirDocumento: async function(){
            this.form.operacaoPdv = "Venda concluída"
            this.form.turno = 1 
            let data = this.form.tipoBandeira == '' ? this.dataAtual() : this.retDataPrazo()
            let obj = {
                valorVenda: this.form.totalLista,
                listaProdutos: this.form.listaProdutos,
                valorPago: this.form.valorPago,
                valorRecebido: this.form.valorPago,
                troco: this.form.troco,
                tipoDocumento: 'Teste',
                turno: this.form.turno,
                numero: this.form.numero,
                operacao: this.form.operacaoPdv,
                dataRegistro: this.dataAtual(),
                dataPagamento: data,
                formaPagamento: this.form.formaPagamento[0],
               // parcelas: this.form.parcelas,
                tipoBandeira: this.form.tipoBandeira[0],
                caixa: this.caixa['id'],
            }
            await axios({
                method: 'post',
                url: 'api/v1/finalizarVenda/',
                data: obj
            }).then(() => {
                console.log('res')
                this.$router.go()
            }).catch((erro) => {
                let key = Object.keys(erro.response.data.msg)[0]
                let value = erro.response.data.msg[key]
                this.$notify({
                    title: 'Atenção',
                    message: key + ': ' + value,
                    type: 'warning'
                });
            })
            this.getOperacoes()
            this.form.totalCaixa += parseFloat(obj.valorVenda)
            this.form.totalLista = '' 
            this.form.valorPago = ''
            this.form.totalLista = ''
            this.form.troco = ''
            this.form.parcelas = ''
            this.compraFinalizada = false
            this.meioPagamento = false
            this.form.tipoBandeira = ''
            this.form.formaPagamento = []
            this.form.listaProdutos = []
            this.form.formaPagamento = []
        },

        aberturaCaixa: async function(){
            let obj = {
                status: true,
                saldoAbertura: this.form.aberturaCaixa.saldoInicial,
                saldoFinal: 0,
                abertura: this.dataAtual() + ' ' + this.horaAtual(),
               // fechamento:  this.dataAtual() + ' ' + this.horaAtual(),
                turno: this.form.aberturaCaixa.turno,
                funcionario: {},
                gaveta: this.form.aberturaCaixa.saldoInicial,
                caixa: this.form.configuracoes.numeroCaixa,
            }

            this.$confirm('Deseja Abrir o caixa?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    this.loading = true
                    let res = axios.post('/api/v1/aberturaCaixa/', obj)
                    this.$router.go()
                }).catch(() => {
                    this.$notify({
                        title: 'Atenção',
                        message: 'Ação cancelada',
                        type: 'warning'
                });
            });
        },

        


        fechamentoCaixa: function(data){
            data = {
                gaveta: this.form.valorGaveta,
                fechamento:  this.dataAtual() + ' ' + this.horaAtual(),
                saldoFinal: this.somaTotalOperacoes(),
                sobra: this.sobra
            }

            this.$confirm('Deseja fechar o caixa?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    this.loading = true
                    let res = axios.post('api/v1/fechamentoCaixa/', data)
                    this.$router.go()
                }).catch(() => {
                    this.$notify({
                        title: 'Atenção',
                        message: 'Ação cancelada',
                        type: 'warning'
                });
            });

            this.fecharCaixa = false;
        },

        getAberturaCaixa: async function(){
            let res = await axios.get('/api/v1/aberturaCaixa/').then((response) => {
                if(response.data['status'] == true){
                    this.caixa = response.data
                    this.form.aberturaCaixa.turno = response.data['turno']
                    this.form.statusCaixa = response.data['status']
                    this.dialogAberturaCaixa = false
                    this.form.gaveta = response.data['gaveta']
                    this.id = response.data['id']
                }else{
                     this.dialogAberturaCaixa = true
                }
            }).catch((error) => {
                console.log(error)
            })

            this.getOperacoes()
        },
    
        getConfiguracao: async function(){
            let data = await axios.get('/api/v1/configuracaoPdv/').then((response) =>{
                this.configPDV = response.data
            }).catch((error) => {
                console.log(error)
            })
            this.mfe = this.configPDV[0].mfe
            this.cfe = this.configPDV[0].cfe
            this.nfce = this.configPDV[0].nfce
            this.dav = this.configPDV[0].dav
            
            this.form.configuracoes.numeroCaixa = this.configPDV[0].numeroCaixa.numero
            this.form.configuracoes.tipoDesconto = this.configPDV[0].tipoDesconto
            this.form.configuracoes.senhaCertificado = this.configPDV[0].senhaCertificado
        },

        cadastrarConfiguracaoPdv: function(){
            this.form.configuracoes['cfe'] = this.cfe
            this.form.configuracoes['mfe'] = this.mfe
            this.form.configuracoes['nfce'] = this.nfce
            this.form.configuracoes['dav'] = this.dav

            this.$confirm('Deseja finalizar esta configuração?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    this.loading = true
                    let res = axios.post('/api/v1/configuracaoPdv/', this.form.configuracoes)
                    this.$router.go()
                }).catch(() => {
                    this.$notify({
                        title: 'Atenção',
                        message: 'Ação cancelada',
                        type: 'warning'
                });
            });
        },

        getOperacoes: async function(){
            let operacao = await axios.get(`/api/v1/operacoesCaixa/${this.caixa['id']}/`).then((response) =>{
               this.operacoesPdv = response.data
               this.operacoesPdv.forEach(element => {
                   console.log(element.dataRegistro)
                   element.dataRegistro = this.formatarData(element.dataRegistro, 'YYYYMMDD')
                   element.dataPagamento = this.formatarData(element.dataPagamento, 'YYYYMMDD')
               });
            }).catch((error) => {
                console.log(error)
            })
        },

        somaListaOperacoes(op){
            var soma = 0
            for(let i = 0; i < this.operacoesPdv.length; i++){
                console.log(this.operacoesPdv[i].valorVenda)
                if(this.operacoesPdv[i].formaPagamento == op){
                    soma += parseFloat(this.operacoesPdv[i].valorVenda)
                }
            }
            this.totalOperacoes = soma
            return soma
        },
        somaTotalOperacoes(){
            var soma = 0
            for(let i = 0; i < this.operacoesPdv.length; i++){
                soma += parseFloat(this.operacoesPdv[i].valorVenda)
            }
            return soma
        },

        orgOperacoes(){
            let obj = {
                total: '',
                formaPagamento: '',
                sobra: '',
            }
            var arr = []

            let dinheiro = this.somaListaOperacoes('Dinheiro')
            let credito = this.somaListaOperacoes('Credito')
            let debito = this.somaListaOperacoes('Debito')


            if(dinheiro > 0){
                let obj1 = {

                }
                obj1['total'] = dinheiro
                obj1['formaPagamento'] = "Dinheiro"
                arr.push(obj1)
            }
            if(credito > 0){
                  let obj2 = {
                    
                }
                obj2['total'] = credito
                obj2['formaPagamento'] = "Credito"
                arr.push(obj2)
            }
            if(debito > 0){
                  let obj3 = {
                    
                }
                obj3['total'] = debito
                obj3['formaPagamento'] = "Debito"
                arr.push(obj3)
            }
            this.operacoesCaixa = arr
        },

        calcSobraGaveta: function(fp){
            let aux = 0
            for(let i = 0; i < this.operacoesCaixa.length; i++){
                if(this.operacoesCaixa[i].formaPagamento == 'Dinheiro'){
                    this.sobra = parseFloat(this.operacoesCaixa[i].total) - parseFloat(this.form.valorGaveta)
                }
            }
        },

        getBandeiras: async function(){
            let res = await axios.get('/api/v1/cadastrarBandeira/').then((response) =>{
                this.bandeiras = response.data
            }).catch((error) =>{
                console.log(error)
            })
        },

        getProdutos: async function() {
            let res = await axios.get('/api/v1/listarProdutos').then(response => {
                this.produtos = response.data
            }).catch(error => {
                console.log(error)
            })
        },


        //Finalizar compra
        finalizar: function(){
           if(this.form.alter == "7" && (this.form.tipoDevolucao == "0" || this.form.tipoDevolucao == "1")){
               this.confirmarTroca = true
           }
           else if(this.form.alter == ''){
               this.meioPagamento = true
           }
        },//Fim finalizar compra


        //Consultar preços
        preecherConsultaPreco(){
            this.precoConsulta= this.form.produtos.valor
            this.codigoConsulta= this.form.produtos.codBarras
            this.descricaoConsulta= this.form.produtos.descricao
            this.estoqueConsulta= this.form.produtos.consumo
            this.situacaoConsulta= this.form.produtos.ativo
            this.unidadeConsulta= this.form.produtos.saida
        },
        //Fim consultar preços


        //sangria suprimento inicio
        async addSangria(){
            if(this.form.valorSangriaSuprimento > 0 && this.form.operacao === 2){
                
                this.form.totalCaixa = parseInt(this.form.valorSangriaSuprimento, 10) + parseInt(this.form.totalCaixa, 10)
                this.form.statusCaixa = true
                this.$notify({
                        title: 'Suprimento',
                        message: 'Suprimento efetuado ' + 'R$' + this.form.valorSangriaSuprimento,
                        type: 'success'
                    });
                    let operacao = await axios.patch(`/api/v1/operacoesCaixa/${this.id}/`,{
                        valor: this.form.valorSangriaSuprimento, 
                        tipo: 'suprimento', 
                        historico: {
                            operacao: 'Suprimento',
                            valor:  this.form.valorSangriaSuprimento,
                    }})
                    this.exibirHome()

            } else if(this.form.valorSangriaSuprimento > 0 && this.form.operacao === 1){
                
                if(this.form.valorSangriaSuprimento > this.form.gaveta){
                    this.$notify({
                        title: 'Atenção',
                        message: 'Operação invalida, valor na gaveta inferior!!!',
                        type: 'warning'
                    });
                }else{
                    this.form.totalCaixa = parseInt(this.form.totalCaixa, 10) - parseInt(this.form.valorSangriaSuprimento)
                    let operacao = await axios.patch(`/api/v1/operacoesCaixa/${this.id}/`,{valor: this.form.valorSangriaSuprimento, tipo: 'sangria',
                     historico: {
                            operacao: 'Sangria',
                            valor:  this.form.valorSangriaSuprimento,
                    }})
                    this.$notify({
                        title: 'Sangria efetuada com sucesso!!!',
                        message: 'Valor ' + 'R$' + this.form.valorSangriaSuprimento,
                        type: 'success'
                    });
                    }
                } 
                this.form.data= ''
                this.form.caixa= ''
                this.form.operacao= ''
                this.form.especie= ''
                this.form.valorSangriaSuprimento= 0
                this.form.observacao= ''
        },
        //Sangria suprimento fim



        //Home
        //Adicionar produtos a lista
        preecherProduto(){
            if(this.form.produtos){
                this.form.produto = this.form.produtos
                this.form.valorItem = this.form.produtos.valor
                this.form.quantidade  = 1
                this.form.produtos = this.form.produto.descricao

            }else{
                this.form.produto = ''
                this.form.valorItem = ' '
                this.form.quantidade = ''
                this.form.produtos = '1'
            }
        },
        addProdutos: function(){
            if(this.form.valorItem === '' || this.form.quantidade === ''){
                this.avisoProdutos = true
            }else{ 
                this.form.listaProdutos.push({ 
                    id: this.form.produto.id,
                    nomeProduto: this.form.produto.descricao,
                    ativo: this.form.produto.ativo,
                    valor: this.form.produto.valor,
                    quantidade: this.form.quantidade,
                })
            }
            this.form.produtos = ''
            this.form.valorItem = ''
            this.form.quantidade = ''
            this.calcLista()

        },
        removeProduto: function(index){
            this.form.listaProdutos.splice(index, 1)
            this.calcLista()
        },
        editProduto: function(index){
            this.form.produto = this.form.listaProdutos[index].nomeProduto
            this.form.listaProdutos[index].valor = this.form.valorItem   
            this.form.listaProdutos[index].quantidade = this.form.quantidade 
            this.form.listaProdutos.splice(index, 1)
        },
        //Fim home




        //Devolucao
        //Adicionar produtos à serem devolvidos
        trocaDevolucao: async function(){
            let obj = {
                listaTroca: this.form.listaTroca,
                totalTroca: this.form.totalTroca,
                listaDevolucao: this.form.listaDevolucao,
                totalDevolucao: this.form.totalDevolucao,

                tipoOperacao: this.form.tipoDevolucao
            }

            this.$confirm('Deseja finalizar esta operacão?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    this.loading = true
                    let data = axios.post('/api/v1/devolucaoTroca/', obj)
                    this.$router.go()
                }).catch(() => {
                    this.$notify({
                        title: 'Atenção',
                        message: 'Ação cancelada',
                        type: 'warning'
                });
            });

        },

        calcListDevolucao(){
            let soma = 0
            for(let i = 0; i < this.form.listaDevolucao.length; i++){
                soma += this.form.listaDevolucao[i].valor * this.form.listaDevolucao[i].quantidade
            }
            this.form.totalDevolucao = soma
        },

        calcListTroca(){
            let soma = 0
            for(let i = 0; i < this.form.listaTroca.length; i++){
                soma += this.form.listaTroca[i].valor * this.form.listaTroca[i].quantidade
            }
            this.form.totalTroca = soma
        },
        addProdutosDevolucao: function(){
            if(this.form.tipoDevolucao == "1" || this.form.tipoDevolucao == ''){
                console.log(this.form.produto)
                this.form.listaDevolucao.push({
                    nomeProduto: this.form.produto.descricao,
                    valor: parseFloat(this.form.valorItem),
                    quantidade: this.form.quantidade,
                })
              
                this.calcListDevolucao()
            }else if(this.form.tipoDevolucao == "0"){
                this.form.listaTroca.push({
                    nomeProduto: this.form.produto.descricao,
                    valor: parseFloat(this.form.valorItem),
                    quantidade: this.form.quantidade,
                })
               
                this.calcListTroca()
            }else{
                //nada
            }
            this.form.produto = ''
            this.form.valorItem = ''
            this.form.quantidade = ''
        },
        removeListaDevolucao: function(index){
            this.form.listaDevolucao.splice(index, 1)
            this.calcListDevolucao()
        },
        editListaDevolucao: function(index){
            this.form.produto = this.form.listaTroca[index].nomeProduto
            this.form.listaTroca[index].valor = this.form.valorItem   
            this.form.listaTroca[index].quantidade = this.form.quantidade 
            this.form.listaTroca.splice(index, 1)
        },
        removeListaTroca: function(index){
            this.form.listaTroca.splice(index, 1)
            this.calcListTroca()
        },
        editListaTroca: function(index){
            this.form.produto = this.form.listaTroca[index].nomeProduto
            this.form.listaTroca[index].valor = this.form.valorItem   
            this.form.listaTroca[index].quantidade = this.form.quantidade 
            this.form.listaTroca.splice(index, 1)
        },
        //Fim devolução

        
        //Desconto inicio
        abrirDescontoItemFunc(item){
            this.abrirDescontoItem = true
            this.form.produtoDesconto = item
        },
        descontoItem(){
            this.form.desconto = parseFloat(this.form.desconto)
            this.form.descontoItem = parseFloat(this.form.descontoItem)
            this.form.totalLista = parseFloat(this.form.totalLista)
            
            this.form.descontoBruto = parseFloat(this.form.descontoBruto)

            if(this.form.descontoBruto > 0){
                for(let i = 0; i < this.form.listaProdutos.length; i++){
                   
                    if(this.form.listaProdutos[i].id == this.form.produtoDesconto.id){
                        this.form.listaProdutos[i].valor = parseFloat(this.form.produtoDesconto.valor) - parseFloat(this.form.descontoBruto)
                    }
                }
            }else if(this.form.descontoPercentual > 0){
                  for(let i = 0; i < this.form.listaProdutos.length; i++){
                   
                    if(this.form.listaProdutos[i].id == this.form.produtoDesconto.id){ 
                        this.form.listaProdutos[i].valor = (parseFloat(this.form.produtoDesconto.valor) / 100) * (100 - parseFloat(this.form.descontoPercentual))
                    }
                }
            }else{
                //nada
            }
            this.calcLista()
            this.form.descontoBruto = ''
            this.form.descontoPercentual = ''
            this.abrirDescontoItem = false
        },
        calcDescontoTotal(){
            if(this.form.descontoPercentual > 0){
                this.form.totalLista = (parseFloat(this.form.totalLista) / 100) * (100 - parseFloat(this.form.descontoPercentual))
            }else{
                 this.form.totalLista -= this.form.descontoBruto
            }
            this.form.descontoBruto = ''
            this.form.descontoPercentual = ''
        },
        //Desconto fim


        calcTotal: function(){
            let soma = this.form.totalLista
            this.form.troco = 0
            if(this.form.listaProdutos.length > 0 && this.form.formaPagamento[0] === 'Dinheiro'){
                this.form.troco = this.form.valorPago - soma 
            }
        },
        calcLista(){
            let soma = 0
            for(let i = 0; i < this.form.listaProdutos.length; i++){
                soma += this.form.listaProdutos[i].valor * this.form.listaProdutos[i].quantidade
            }
            this.form.totalLista = soma
        },

        dataAtual(){
            const agora = moment();
            return moment(agora, "DD/MM/YYYY").format("YYYY-MM-DD") 
        },

        horaAtual(){
            var dNow = new Date();
            var hora =  dNow.getHours() + ':' + dNow.getMinutes();
            return hora;
        },

        intervalData(){
            let tabela = this.operacoesPdv
            const tblAux = []

            if(this.form.operacoes.filtroData != null){
                let inicio = this.form.operacoes.filtroData[0].split("/");
                let fim = this.form.operacoes.filtroData[1].split("/")
            
                for(var i = 0; i < this.operacoesPdv.length; i++){

                let aux = this.operacoesPdv[i].dataRegistro.split("-").reverse()
                    if(aux[0] >= inicio[0] && aux[0] <= fim[0]){

                            if(aux[1] >= inicio[1] && aux[1] <= fim[1]){

                                if(aux[2] >= inicio[2] && aux[2] <= fim[2]){

                                    tblAux.push(this.operacoesPdv[i])

                                }//Fim if ano

                            }//Fim if mes

                    }//Fim if dia
                }
                this.operacoesPdv = tblAux

            }else{
                this.getOperacoes()
            }
        }, 
        
        selecionarMeioPagamento(){
           if(this.form.formaPagamento[0] === 'Dinheiro'){
                this.compraFinalizada = true
           }
            if(this.form.formaPagamento[0] === 'Credito'){
                 this.compraFinalizada = false
                 this.checarFormaPagamento = true
                 this.form.valorRecebido = this.totalLista
                 this.valorPago = this.form.totalLista
                 this.form.parcelas = 1
            }
            if(this.form.formaPagamento[0] === 'Debito'){
                 this.compraFinalizada = false
                 this.checarFormaPagamento = true
                 this.form.valorRecebido = this.totalLista
                 this.valorPago = this.form.totalLista
                 this.form.parcelas = 1
            }
        },

        formatarData(data, format){
            data = data.replace(/[^0-9]/g,'').toString()
            return moment(data, format).format("DD/MM/YYYY")
        },

        checar: function(){
            console.log(this.form.tipoBandeira[0])
        },


        //Controle da pagina
        exibirHome(){
            this.form.alter = ''
        },

        fexibirClientes(){
            this.exibirClientes = true
        },

        fexibirVendedores(){
            this.exibirVendedores = true
        },

        ffecharCaixa(){
            this.form.alter = ''
            this.fecharCaixa = true
            this.orgOperacoes()
        },

        exibirConsulta(){
            this.form.alter = 4
        },

        exibirPedido(){
            this.pedido = true
            //this.form.alter = 5
        },

        exibirDevolucao(){
            this.form.alter = 7
        },

        exibirSangria(){
            this.form.alter = 8
        },

        exibirFuncoes(){
            if(this.form.menuBase != 9){
                this.form.menuBase = 9
            } 
            else{
                this.form.menuBase = ''
            }
           
        },

        exibirMenuFiscal(){
            this.exibirMenuFiscalVar = true
        },

        exibirFechamento(){
            this.form.alter = 11
        },

        //Checkbox forma pagamento atalhos
        formaDinheiro(){
            this.form.formaPagamento = []
            this.form.formaPagamento.push('Dinheiro')
        },
        
        formaCredito(){
            this.form.formaPagamento = []
            this.form.formaPagamento.push('Credito')
        },

        formaCheque(){
            this.form.formaPagamento = []
            this.form.formaPagamento.push('Cheque')

        },
        
        formaDevolucao(){
            this.form.formaPagamento = []
            this.form.formaPagamento.push('Devolucao')
        },

        formaQRCodePix(){
            this.form.formaPagamento = []
            this.form.formaPagamento.push('QRCode Pix')
        },

        formaCrediario(){
            this.form.formaPagamento = []
            this.form.formaPagamento.push('Crediario')
        },


        formaDebito(){
            this.form.formaPagamento = []
            this.form.formaPagamento.push('Debito')
        },


        formaDesconto(){
            this.form.formaPagamento = []
            this.form.formaPagamento.push('Desconto')
        },

        configuracoes(){
            this.exibirConfiguracoes = true
        },
        
        eventoTeclado: function(event){
            console.log(event.key)
        },

        selectItem: function(value){
            console.log("Ola mundo")
        },

        menuClickTab: function(tab, event) {
            console.log(tab, event);
        },


        finalizarConfiguracao(){
            this.exibirConfiguracoes = false;
            //Verificar quais documentos devem ser emitidios
            this.form.configuracoes.tipoEmissaoArr.forEach(element => {
                if(element === "NFC-E"){
                    this.nfce = true
                }
                else if(element === "CFE"){
                    this.cfe = true
                }
                else if(element === "DAV"){
                    this.dav = true

                }else if(element === "MFE"){
                    this.mfe = true

                }else{
                  //nada
                }
            });
        },
    }

}

export default pdv
