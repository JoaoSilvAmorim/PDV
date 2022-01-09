import moment from 'moment'
import axios from 'axios'

const gerenciaNet = {
    data:() => {
        return { 
            editableTabsValue: '0',
            loading: false,
            dialogCatalogo: false,
            dialogReevioEmailBolix: false,
            dialogReevioEmailCarne: false,
            dialogReevioEmailParcela: false,
            dialogParcelasCarne: false,
            dialogTipoPessoa: false,
            beforeUrl: '',
            produtos: [],

            //Item  
                descricao: '',
                quantidade: '',
                preco: '',
            //Fim item 


            //item do catalogo
                itemCobranca: {},
                itemQuantidade: '',
                itemValor: '',
            //Fim item catalogo


            //Lista cobrancas 
                tabelaCobrancasBoletos: [],
                tabelaCobrancasCarnes: [],
            //Fim cobrancas

            //Dados do menu topo tab cobrancas (BOLIX)
                bolixBusca: {
                    status: '',
                    busca: '',
                },
            //Fim cobrancas (BOLIX)


                transacaoId: '',
            //Bolix data
                bolixId: '',
            //Fim data (Bolix)

            //Carne data, parcelas
                carneId: '',
                parcela: '',
                carneParcelas: [],
            //Fim data, parcelas

            //Tab cobrancas
                filtroTipoCobranca: [0],
            //Fim tab cobrancas


            totalCobranca: '0.00',

            "uf": [
                {"nome": "Acre", "sigla": "AC"},
                {"nome": "Alagoas", "sigla": "AL"},
                {"nome": "Amapá", "sigla": "AP"},
                {"nome": "Amazonas", "sigla": "AM"},
                {"nome": "Bahia", "sigla": "BA"},
                {"nome": "Ceará", "sigla": "CE"},
                {"nome": "Distrito Federal", "sigla": "DF"},
                {"nome": "Espírito Santo", "sigla": "ES"},
                {"nome": "Goiás", "sigla": "GO"},
                {"nome": "Maranhão", "sigla": "MA"},
                {"nome": "Mato Grosso", "sigla": "MT"},
                {"nome": "Mato Grosso do Sul", "sigla": "MS"},
                {"nome": "Minas Gerais", "sigla": "MG"},
                {"nome": "Pará", "sigla": "PA"},
                {"nome": "Paraíba", "sigla": "PB"},
                {"nome": "Paraná", "sigla": "PR"},
                {"nome": "Pernambuco", "sigla": "PE"},
                {"nome": "Piauí", "sigla": "PI"},
                {"nome": "Rio de Janeiro", "sigla": "RJ"},
                {"nome": "Rio Grande do Norte", "sigla": "RN"},
                {"nome": "Rio Grande do Sul", "sigla": "RS"},
                {"nome": "Rondônia", "sigla": "RO"},
                {"nome": "Roraima", "sigla": "RR"},
                {"nome": "Santa Catarina", "sigla": "SC"},
                {"nome": "São Paulo", "sigla": "SP"},
                {"nome": "Sergipe", "sigla": "SE"},
                {"nome": "Tocantins", "sigla": "TO"}
            ],

            form:{
                tipoCobranca: [],
                formaEnvio: [],
                itens: [],
                dataVencimento: '',

                primeiroVencimento: '',
                numeroParcelas: '',

                //descontoParcela: '',
                
                detalhesFrete: '',
                frete: '',

                tipoDesconto: [],
                desconto: '',
                observacoes: '',

                tipoPessoa: [],

                email: '',
                nomeCompleto: '',
                cpf: '',
                cnpj: '',
                razaoSocial: '',
                celular: '',

               
                endereco:{
                    cep:'',
                    ieMunicipal: '',
                    logradouro: '',
                    numero: '',
                    bairro: '',
                    complemento: '',
                    uf: '',
                    localidade: '',
                },

            },//Fim form



            rules:{
                nomeCompleto: [
                   { required: true, message: 'Inserir', trigger: 'blur' },
                ],
                cpf: [
                   { required: true, message: 'Inserir', trigger: 'blur' },
                ],
                cnpj: [
                   { required: true, message: 'Inserir', trigger: 'blur' },
                ],
                estado: [
                   { required: true, message: 'Inserir', trigger: 'blur' },
                ],
                cidade: [
                   { required: true, message: 'Inserir', trigger: 'blur' },
                ],
            }//Fim rules

        }
    },

    computed:{
        calcTotalCobranca: function(){
                if(this.form.itens.length > 0){
                    let soma = 0
                    this.form.itens.forEach(element => {
                    soma += +element.amount * +element.value
                });
                return soma
            }else{
                return '0.00'
            }
        },

        
      
    },


    mounted(){
      this.getProdutos()
      this.getBolix()
      this.getCarne()
      this.selectGetData()
      this.beforeUrlFunc()
    },

    methods: {
        menuClickTab: function(tab, event) {
            console.log(tab, event);
        },

        teste(){
            console.log(this.form.numeroParcelas)
        },

        selectGetData: function(){
            let urlOrigem = this.beforeUrlFunc()
            console.log(urlOrigem)
            try{
                eval(`this.${urlOrigem}(${('')})`)
            }catch(e){
                console.log(e)
            }
        },

        orcamento: async function() {
        if(this.$route.params.id){
            let pedidoOrcamento;
            
            let res = await axios.get(`/api/v1/listarOrcamentos/${this.$route.params.id}/`).then((response) =>{
                    pedidoOrcamento = response.data
                    console.log(response.data)
                    this.loading = false
                }).catch((erro) => {
                    console.log("Error" + erro)
            })
           console.log(pedidoOrcamento)
           try {
               this.form.tipoCobranca = [0]
               this.form.formaEnvio = [0]
                if(pedidoOrcamento.itens.length > 0){
                    pedidoOrcamento.itens.forEach(element => {
                        this.form.itens.push({
                            name: element.produto.descricao,
                            amount: +element.quantidade,
                            value: +element.valorUnitario
                        })
                    })
                }
                if(pedidoOrcamento.data){
                   this.form.dataVencimento = pedidoOrcamento.data
                }
                if(pedidoOrcamento.valorFrete > 0){
                    this.form.frete = pedidoOrcamento.valorFrete
                }
                if(pedidoOrcamento.cliente.length > 0){
                    this.form.nomeCompleto = pedidoOrcamento.cliente 
                }
                if(pedidoOrcamento['endereco'].cep.length == 8)
                    this.form['endereco'].cep = pedidoOrcamento['endereco'].cep

                if(pedidoOrcamento.cpfCnpj.length > 12){
                    this.form.cnpj = pedidoOrcamento.cpfCnpj
                }else{
                    this.form.cpf = pedidoOrcamento.cpfCnpj
                }
            }
            catch (e) {
                console.log(e)
            }
            }
        },

        estoque: async function() {
        if(this.$route.params.id){
            console.log("asd")

            let pedidoOrcamento;
            
            let res = await axios.get(`/api/v1/ajusteEstoque/${this.$route.params.id}/`).then((response) =>{
                    pedidoOrcamento = response.data
                    console.log(response.data)
                    this.loading = false
                }).catch((erro) => {
                    console.log("Error" + erro)
            })
           console.log(pedidoOrcamento)
           try {
               this.form.tipoCobranca = [0]
               this.form.formaEnvio = [0]
                if(pedidoOrcamento.itensArr.length > 0){
                    pedidoOrcamento.itensArr.forEach(element => {
                        this.form.itens.push({
                            name: element.produto,
                            amount: +element.quantidade,
                            value: +element.valor
                        })
                    })
                }
                if(pedidoOrcamento.data){
                   this.form.dataVencimento = pedidoOrcamento.data
                }
                if(pedidoOrcamento.valorFrete > 0){
                    this.form.frete = pedidoOrcamento.valorFrete
                }
                if(pedidoOrcamento.clienteFornecedor.length > 0){
                    this.form.nomeCompleto = pedidoOrcamento.clienteFornecedor 
                }
                if(pedidoOrcamento['endereco'].cep.length == 8)
                    this.form['endereco'].cep = pedidoOrcamento['endereco'].cep

                if(pedidoOrcamento.cpfCnpj.length > 12){
                    this.form.cnpj = pedidoOrcamento.cpfCnpj
                }else{
                    this.form.cpf = pedidoOrcamento.cpfCnpj
                }
            }
            catch (e) {
                console.log(e)
            }
            }
        },


        getBolix: async function(){
            await axios.get('api/v1/boletosEmitidos/').then((res) => {
            //console.log(res)
            //console.log(res.data.results[2].cliente['payment'].banking_billet['customer'].name)
                res.data.results.forEach(element => {
                    element.total /= 100
                    this.tabelaCobrancasBoletos.push(element)
                });
            }).catch((erro) => {
                console.log(erro)
            })
        },

        getCarne: async function(){
            await axios.get('api/v1/carnesEmitidos/').then((res) => {
            //console.log(res)
                res.data.results.forEach(element => {
                    //console.log(element)
                    element['charges'].forEach(element => {
                        element.value /= 100
                    });
                    this.tabelaCobrancasCarnes.push(element)
                });
            }).catch((erro) => {
                console.log(erro)
            })
        },

        marcarPagoParcelaCarne: async function(id, parcela){
            let obj = {
                'id': id,
                'parcel': parcela
            }
            
            this.loading = true
            await axios.post('api/v1/acaoGerenciaNet/', obj).then(async (res) =>{
                this.loading = false
                    this.$notify({
                        title: 'Parcela',
                        message: 'Status: OK',
                        type: 'success'
                    });
            }).catch((erro) =>{
                this.loading = false
                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                })
            })
        },


        marcarComoPagoTransacao: async function(id){
            let obj = {
                'id': id,
            }
            this.loading = true
            await axios.put('api/v1/acaoGerenciaNet/', obj).then(async (res) =>{
                this.loading = false
                await this.$notify({
                        title: 'Boleto',
                        message: 'Status: OK',
                        type: 'success'
                    });
            }).catch((erro) =>{
                this.loading = false
                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                })
            })
        },

        reenvioEmailBolix: async function() {
            let obj = {
                'id': this.transacaoId,
                'email': this.form.email,
                'tipo': 'bolix'
            }
            this.dialogReevioEmailBolix = false
            this.loading = true

            await axios.post('api/v1/reeviarEmailGerenciaNet/', obj).then(async (res) =>{
                this.loading = false
                await this.$notify({
                        title: 'Reenvio do email',
                        message: 'Status: OK',
                        type: 'success'
                    });
            }).catch((erro) =>{
                this.loading = false
                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                })
            })
            this.form.email = ''
        },

        reenvioEmailCarne: async function() {
            let obj = {
                'id': this.transacaoId,
                'email': this.form.email,
                'tipo': 'carne'
            }
            this.dialogReevioEmailCarne = false
            this.loading = true

            await axios.post('api/v1/reeviarEmailGerenciaNet/', obj).then(async (res) =>{
                this.loading = false
                await thisloadingnotify({
                        title: 'Reenvio do email',
                        message: 'Status: OK',
                        type: 'success'
                    });
            }).catch((erro) =>{
                this.loading = false
                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                })
            })
            this.form.email = ''
        },

        reenvioEmailParcela: async function() {
            let obj = {
                'id': this.carneId,
                'parcel': this.parcela,
                'email': this.form.email,
                'tipo': 'parcela'
            }
            this.dialogReevioEmailCarne = false
            this.loading = true

            await axios.post('api/v1/reeviarEmailGerenciaNet/', obj).then(async (res) =>{
                this.loading = false
                await this.$notify({
                        title: 'Reenvio do email',
                        message: 'Status: OK',
                        type: 'success'
                    });
            }).catch((erro) =>{
                this.loading = false
                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                })
            })
            this.form.email = ''
        },
        
        

        gerarBoleto: async function(){
            this.loading = true

            let obj = {}
            obj = this.form
            //Alterando valores para centavos (Padrão gerencia NET)
            obj.itens.forEach(element => {
                element.value = +element.value * 100
            });
            //Fim

obj.tipoDesconto = this.form.tipoDesconto[0] == 'currency' ? 'currency' : this.form.tipoDesconto[0] == 'percentage' ? 'percentage' : ''
            obj.desconto = +this.form.desconto * 100
            obj.frete = +this.form.frete * 100
            obj.cpf = obj.cpf.replace(/\D/g, '')
            obj.cnpj = obj.cnpj.replace(/\D/g, '')
            
            try{
                obj['idInstancia'] = this.$route.params.id
                obj['origem'] = this.beforeUrlFunc()
            }catch(e){
                console.log(e)
            }
            await axios.post('api/v1/gerarBoletoAvulso/', obj).then(async (res) =>{
                this.loading = false

                await this.$notify({
                        title: 'Boleto',
                        message: 'Status: OK',
                        type: 'success'
                    });
            }).catch((erro) =>{
                this.loading = false

                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                })
            })
            document.getElementById("form").reset();
            this.form.itens = []
            this.form.frete = ''
            this.form.desconto = ''
        },


        gerarCarne: async function(){
            this.loading = true

            let obj = {}
            obj = this.form
            //Alterando valores para centavos (Padrão gerencia NET)
            obj.itens.forEach(element => {
                element.value = +element.value * 100
            });
            //Fim

obj.tipoDesconto = this.form.tipoDesconto[0] == 'currency' ? 'currency' : this.form.tipoDesconto[0] == 'percentage' ? 'percentage' : ''
            obj.desconto = +this.form.desconto * 100
            obj.frete = +this.form.frete * 100
            obj.cpf = obj.cpf.replace(/\D/g, '')
            obj.cnpj = obj.cnpj.replace(/\D/g, '')

            try{
                obj['idInstancia'] = this.$route.params.id
                obj['origem'] = this.beforeUrlFunc()
            }catch(e){
                console.log(e)
            }

            await axios.post('api/v1/gerarCarneAvulso/', obj).then(async (res) =>{
                this.loading = false

                await this.$notify({
                        title: 'Carnê',
                        message: 'Status: OK',
                        type: 'success'
                    });
            }).catch((erro) =>{
                this.loading = false

                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                })
            })
            document.getElementById("form").reset();
            this.form.itens = []
            this.form.frete = ''
            this.form.desconto = ''
        },


        beforeUrlFunc: function() {
            let url = window.location.href
            url = url.split('/')
            let orcamento = url.includes('orcamentos')
            let estoque = url.includes('estoque')

            if(orcamento){
                this.beforeUrl = 'orcamento'
            }
            else if(estoque){
                 this.beforeUrl = 'estoque'
            }
            else{
                this.beforeUrl = ''
            }

            return this.beforeUrl
        },

        getProdutos: async function() {
            let res = await axios.get('/api/v1/listarProdutos').then(response => {
                this.produtos = response.data
            }).catch(error => {
                console.log(error)
            })
        },

        addProdutoAvulso: function(){
            this.form.itens.push({
                name: this.descricao,
                amount: +this.quantidade,
                value: +this.preco,
            })
            this.descricao = ''
            this.quantidade = ''
            this.preco = ''
        },

        addProdutoCatalogo: function(){
            this.form.itens.push({
                name: this.itemCobranca.descricao,
                amount: +this.itemQuantidade,
                value: +this.itemCobranca.valor,
            })
            this.itemQuantidade = ''
            this.itemValor = ''
        },

        preecherProduto: function(){
            this.itemValor = this.itemCobranca.valor
        },

        popUpDialogPessoa: function(){
            this.$confirm('Finalizar?').then(() => {
                    this.dialogTipoPessoa = false
                }).catch((erro) => {
                    this.dialogTipoPessoa = true
                    console.log(erro)
            });
        },

        searchCep: async function () {
            if(this.form.endereco.cep.length == 8) {
                await axios.get(`https://viacep.com.br/ws/${ this.form.endereco.cep }/json/`).then( response =>  {
                    console.log(response.data)
                    this.form.endereco = response.data
                })
                .catch( error => {
                    console.log(error)
                })
            }
        },

        jsonp(url, timeout) {
            // Gera um nome aleatório para a função de callback
            const func = 'jsonp_' + Math.random().toString(36).substr(2, 5);

            return new Promise(function (resolve, reject) {
                // Cria um script
                let script = document.createElement('script');

                // Cria um timer para controlar o tempo limite
                let timer = setTimeout(() => {
                    reject('Tempo limite atingido');
                    document.body.removeChild(script);
                }, timeout);

                // Cria a função de callback
                window[func] = (json) => {
                    clearTimeout(timer);
                    resolve(json);
                    document.body.removeChild(script);
                    delete window[func];
                };

                // Adiciona o script na página para inicializar a solicitação
                script.src = url + '?callback=' + encodeURI(func);
                document.body.appendChild(script);
            });
        },

        consultaCNPJ(cnpj) {
            // Limpa o CNPJ para conter somente numeros, removendo traços e pontos
            cnpj = cnpj.replace(/\D/g, '');
            this.form.cpfCnpj = cnpj

            // Consulta o CNPJ na ReceitaWS com 60 segundos de tempo limite
            return this.jsonp('https://www.receitaws.com.br/v1/cnpj/' + encodeURI(cnpj), 60000).then((json) => {
                    if (json['status'] === 'ERROR') {
                        return Promise.reject(json['message']);
                    } else {
                        console.log(json)
                        this.form.nomeCompleto = json.fantasia
                        this.form.razaoSocial = json.nome
                        this.form.email = json.email

                        this.endereco.logradouro = json.bairro
                        this.endereco.uf = json.uf
                        this.endereco.localidade = json.municipio
                    }
                });
        },

        exibirDialogCarneParcelas: function(row){
            console.log(row)
            this.carneId = row.carnet_id
            this.carneParcelas = row
            this.dialogParcelasCarne = true

        },
        
    },
  }


  export default gerenciaNet