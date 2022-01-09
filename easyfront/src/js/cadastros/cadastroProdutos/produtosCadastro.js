import axios from 'axios'

const produtoCadastro = {
  name: 'produtosCadastro',

  components: {
    
  },
    data: () => {
          return {
            drawer: false,
            direction:'ltr',
            visible: false,

            editableTabsValue: '0',
            editableSubTabsValue: '0',

            fullscreenLoading: false,
            produtos: [],

            categorias: [
                {
                    "label": "Bebidas",
                    "value": 1
                },
                {
                    "label": "Laticíneos",
                    "value": 2
                },
                {
                    "label": "Frios",
                    "value": 3
                },
               
            ],

            unidades: [
                {
                    "label": "Tipo1",
                    "value": 1
                },
            ],

            finalidades: [
                {
                    "label": "finalidade1",
                    "value": 1
                }
            ],

            tipo: [
                {
                    "label": "Tipo1",
                    "value": 1
                },
            ],

            

            csta: [
                {
                    "label": "cstaTeste",
                    "value": 1
                },
            ],

            indicadorEscala: [
                {
                    "label": "indicadorTeste",
                    "value": 1
                },
            ],

            cstCofins: [
                {
                    "label": "cstCofins",
                    "value": 1
                },
            ],

            csons: [
                {
                    "label": "csons",
                    "value": 1
                },
            ],

            aliquotaPis: [
                {
                    "label": "aliquotaPis",
                    "value": 1
                },
            ],

            cstPis: [
                {
                    "label": "cstPis",
                    "value": 1
                },
            ],

         

            tipoVenda: [{
                //
            }],

            tipoProducao: [
                {
                    "label": "tipo1",
                    "value": 1
                },
            ],

            ncmData: [
            ],

            form:{
 //cad
                descricao: '',
                categoria: '',
                tipo: 1,
                codInterno: '123',
                codBarras: '',
                codTributavel: '123',

                ativo: '',

                uniEntrada: 10,
                saida: 10,
                uniSaida: 10,

                finalidade: 1,
                movimentar: true,

                imobilizado: '',
                consumo: 100,
                revenda: 100,
                minimoRevenda: 100,
                maximoRevenda: 100,

                valor: '',


                //Informaçoes fiscais
                infoFiscaisData:{},
                infoFiscais: {
                    ncm: '',
                    descricao: '',
                    cfop: '',
                    cest: '',
                    csta: '',
                    indicadorEscala: '',
                    cnpj: '',

                    cfopNfce: '',
                    codBeneficioFiscal: '',

                    redEfetivo: '',
                    aliquota: '',

                    cstPis: '',
                    aliquotaPis: '',

                    csons: '',
                    aliquotaCred: '',

                    cstCofins: '',

                    aliquotaIpi: '',
                    aliquotaFcp: '',

                    cfopInterno: '',
                    cfopExterno: '',
                },


                //Grupo combustivel
                tributacao: {
                    ncm: '',
                    descricao: '',

                    cest: '',
                    cfopNfce: '',
                    codBeneficioFiscal: '',

                    cstPis: '',

                    redEfetivo: '',
                    aliquota: '',

                    cstCofins: '',
                    aliquotaPis: '',

                    csons: '',
                    aliquotaCred: '',

                    aliquotaIpi: '',
                    aliquotaFcp: '',

                    cfopInterno: '',
                    cstaInterno: '',

                    cfopExterno: '',
                    cstaExterno: '',
                },

                grupoComb: {
                    vincularGrupoComb: '',

                    anp: '',
                    descricaoAnp: '',
                    ufConsumo: '',

                    percentualGlp: '',
                    percentualDerivados: '',
                    percentualImportado: '',

                    bcCide: '',
                    aliquotaCide: '',
                    valorCide: '',//
                },

                //Valores e custos
                valCustos: {
                    custoMedio: '',
                    despesasAcessorias: '',
                    outrasDespesas: '',
                    valorCusto: '',

                    tipoVenda: '',
                    lucroSugerido: '',
                    lucroUtilizado: '',
                    vendaSugerida: '',
                    valorVenda: '',
                },

                //Atributos
                atributos: {
                    peso: '',
                    largura: '',
                    altura: '',
                    comprimento: '',

                    garantia: '',
                    vendidoSeparadamente: '',
                    comercializavel: '',

                    tipoProducao: '',
                    cnpj: '',
                    dataCriacao: '',
                    dataAlteracao: '',
                    dataValidade: '',
                    descConteudo: '',
                    descCont: '',
                    localizacaoEstoque: '',
                    obervacaoProduto: '',
                },


                //Composicao
                composicoes: {
                    produtoComp: '',
                    quantidadeComp: '', 
                    unidadeComp: '',
                    vendaComp: '',
                    totalComp: '',
                },
                totalComp: '1.00',

                //fornecedores
                fornecedores: {
                    fornecedor: '',
                    cnpjCpfFornecedor: '',
                },

                // Array Atributos
                atributosArray: [{
                    //
                }], 

                // Array fornecedores
                 fornecedoresArray: [{
                    //
                }], 

                // Array Composição
                 composicoesArray: [
                     //
                ], 

                operacoesInternas: [
                    //
                ],


                operacoesExternas: [
                    //
                ]
            },

            rules: {

                //Produto
                descricao: [
                   { required: true, message: 'Inserir', trigger: 'blur' },
                ],
                categoria: [
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],
                 codInterno: [
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],
                 uniEntrada: [
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],
                 uniSaida: [
                     {required: true, message: 'Inserir', trigger: 'blue'}
                 ],
                 saida: [
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],
                 valor: [
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],
                 finalidades: [
                     {required: true, message:'Inserir', trigger: 'blur'}
                 ],
                 unidades:[
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],

                 estoque:[
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],

                imobilizado:[
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],

                revenda:[
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],

                consumo:[
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],

                maximoRevenda:[
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],

                minimoRevenda:[
                     {required: true, message: 'Inserir', trigger: 'blur'}
                 ],


            }// Fim rules 
            
        }
    },

    computed: {

        calcArray() {
            return this.form.composicoes.length - 1
        },

        count(index) {
            return this.form.operacoes.indexOf(index)
        },
    },

    mounted(){
        this.getTributacao()
        this.getEdicao()
        this.getProdutos()
        this.gerarNumero()
    },

    methods: {
        getEdicao: async function(){
            
        let obj = {}
        console.log(this.$route.params.id)
            if(this.$route.params.id){
                let res = await axios.get(`/api/v1/editarProduto/${this.$route.params.id}`).then((response) =>{
                    this.form.descricao = response.data.descricao
                    this.form.categoria = response.data.categoria
                    this.form.tipo = response.data.tipo
                    this.form.codInterno = response.data.codInterno
                    this.form.codBarras = response.data.codBarras
                    this.form.codTributavel = response.data.codTributavel
                    this.form.ativo = response.data.ativo
                    this.form.uniEntrada = response.data.uniEntrada
                    this.form.saida = response.data.saida
                    this.form.uniSaida = response.data.uniSaida
                    this.form.finalidade = response.data.finalidade
                    this.form.movimentar = response.data.movimentar
                    this.form.imobilizado = response.data.imobilizado
                    this.form.consumo = response.data.consumo
                    this.form.revenda = response.data.revenda
                    this.form.minimoRevenda = response.data.minimoRevenda
                    this.form.maximoRevenda = response.data.maximoRevenda
                    this.form.valor = +response.data.valor

                    this.form.infoFiscais = response.data.infoFiscais
                    this.form.tributacao = response.data.tributacao
                    this.form.grupoComb = response.data.grupoComb
                    this.form.valCustos = response.data.valCustos
                    this.form.atributosArray = response.data.atributosArray
                    this.form.composicoesArray = response.data.composicoesArray
                    this.form.totalComp = response.data.totalComp
                    this.form.fornecedoresArray = response.data.fornecedoresArray
                })
            }
        },

        getProdutos: async function() {
            let res = await axios.get('/api/v1/listarProdutos'
          /*{ 
                headers: { 'Authorization': 'Bearer ' + this.$store.getters['auth/getToken'] } 
            },
             */
            ).then(response => {
                this.produtos = response.data
            }).catch(error => {
                console.log(error)
            })
        },

        /* formataDinheiro() {
            var v = this.form.valor.replace(/\D/g,'');
            v = (v/100).toFixed(2) + '';
            v = v.replace(".", ".");
            v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
            v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
            this.form.valor = v;
        }, */

        formataDinheiro() {
            let int = parseInt(this.form.valor)
            var tmp = int+'';
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            if( tmp.length > 6 ){
                    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                }
            this.form.valor = tmp
        },

        cadastrarProduto: function(){
           if(!this.$route.params.id){
            this.$confirm('Deseja cadastrar este Produto?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(async () => {
                    console.log('submit!!');
                    this.loading = true
                    await axios({
                        method: 'post',
                        url: 'api/v1/cadastrarProduto/',
                        data: this.form
                    }).then((res) => {
                        console.log('res')
                        document.getElementById("form").reset();
                        this.$router.go()
                    }).catch((erro) => { 
                        console.log(erro.response.data)
                        let key = Object.keys(erro.response.data)
                        let value = erro.response.data[key]
                        this.$notify({
                            title: 'Atenção',
                            message: key + ': ' + value,
                            type: 'warning'
                        });
                    })
                    
                    //this.$router.go()
                }).catch((erro) => {
                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                });
            }); 
            }else{
                 this.$confirm('Deseja editar este Produto?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    console.log('submit!!');
                    this.loading = true
                    axios.put(`/api/v1/editarProduto/${this.$route.params.id}/`, this.form);
                    document.getElementById("form").reset();
                    this.$router.go()
                }).catch(() => {
                    this.$notify({
                        title: 'Atenção',
                        message: 'Ação cancelada',
                        type: 'warning'
                    });
                }); 
            } 

        },

        
        getTributacao(){ 
             axios.get('/api/v1/listarNcm/').then(response => {
                this.ncmData = response.data
            }).catch(error => {
                console.log(error)
            })
        },

        

        /* preencherNcmData(){
            this.form.ncm= '',
            this.form.descricao ='', 
            
            console.log(this.form.infoFiscaisData)
            console.log(this.form.infoFiscais.cest)
            this.form["infoFiscais"]["cest"] = '464646'
            console.log(this.form.infoFiscais.cest)
            this.form.infoFiscais['descricao'] = 'desgrca'
            this.form.infoFiscais = this.form.infoFiscaisData.ncm
            this.form.infoFiscais.cfop = this.form.infoFiscaisData.cfop 
            this.form.infoFiscais.cest = this.form.infoFiscais.tributacao.cest
            this.form.infoFiscais.csta =  this.form.infoFiscais.csta
            this.form.infoFiscais.indicadorEscala = this.infoFiscais.indicadorEscala
            this.form.infoFiscais.cnpj = this.ncmData.cnpj

            this.form.infoFiscais.cfopNfce = this.ncmData.cfopNfce
            this.form.infoFiscais.codBeneficioFiscal = this.ncm.codBeneficioFiscal

            this.form.infoFiscais.redEfetivo = this.ncmData.redEfetivo
            this.form.infoFiscais.aliquota = this.ncmData.aliquota

            this.form.infoFiscais.cstPis = this.ncmData.cstPis
            this.form.infoFiscais.aliquotaPis = this.ncmData.aliquotaPis

            this.form.infoFiscais.csons = this.ncmData.csons
            this.form.infoFiscais.aliquotaCred = this.ncmData.aliquotaCred

            this.form.infoFiscais.cstCofins = this.ncmData.cstCofins

            this.form.infoFiscais.aliquotaIpi = this.ncmData.aliquotaIpi
            this.form.infoFiscais.aliquotaFcp = this.ncmData. aliquotaFcp

            this.form.infoFiscais.cfopInterno = this.ncmData.cfopInterno
            this.form.infoFiscais.cfopExterno = this.ncmData.cfopExterno
        }, */

        /* buscacnpj: function(e){
            this.loading=true
            let data = axios.get(`https://ws.hubdodesenvolvedor.com.br/v2/cnpj/?cnpj=${e.target.value}&token=105856670JvqCImyKSL191121008`)
            .then(function (response) {
              return response.data
            })
            .catch(function (error) {
              return error.response.data
            });
            
            data.then((data)=>{
              let abertura = data.result.abertura.split("/")
              this.form.data_instituicao = abertura[2]+'/'+abertura[1]+'/'+abertura[0]

              this.form.fornecedor = data.result.nome
              console.log(this.form)
                  
              this.loading=false
            }).catch(()=>{
                this.loading=false
            })      
        }, */


        exibirCheck() {
            //
        },

        /* cad: function (form) {
        
            

            this.$refs[form].validate((valid, errors) => {
                    if (valid) {
                        document.querySelector("input[name=uniEntrada]").value = parseInt(this.form.uniEntrada);
                        document.querySelector("input[name=uniSaida]").value = parseInt(this.form.uniSaida);
                        document.querySelector("input[name=finalidade]").value = parseInt(this.form.finalidade);
                        document.querySelector("input[name=categoria]").value = parseInt(this.form.categoria);
                        document.querySelector("input[name=tipo]").value = parseInt(this.form.tipo);
                        this.$confirm('Deseja cadastrar este Produto?', 'Atenção', {
                            confirmButtonText: 'Continuar',
                            cancelButtonText: 'Cancelar',
                            type: 'warning'
                        }).then(() => {
                            console.log('submit!!');
                            this.loading = true
                            document.getElementById('form').submit()
                        }).catch(() => {
                            this.$notify({
                                title: 'Atenção',
                                message: 'Ação cancelada',
                                type: 'warning'
                            });
                        });


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }, */

         cadTrib: function (form) {
            //document.querySelector("input[name=tributacao[cstCofins]]") = parseInt(this.form.tributacao.cstCofins)
            this.$refs[form].validate((valid, errors) => {
                    if (valid) {
                        this.$confirm('Deseja cadastrar este tributação?', 'Atenção', {
                            confirmButtonText: 'Continuar',
                            cancelButtonText: 'Cancelar',
                            type: 'warning'
                        }).then(() => {
                            console.log('submit!!');
                            this.loading = true
                            document.getElementById('form').submit()
                        }).catch(() => {
                            this.$notify({
                                title: 'Atenção',
                                message: 'Ação cancelada',
                                type: 'warning'
                            });
                        });


                    } else {
                        console.log('error submit!!' + errors);
                        return false;
                    }
                });
            }, 

        addObj() {
            this.form.tributacao.ncm = '123'
            console.log(this.form.tributacao)
        },

         add() {
            this.form.atributosArray.push({
                descricao: '',
                conteudo: ''
            })
        }, 
        remove(index) {
            this.form.atributosArray.splice(index, 1)
        },


         addFornecedores() {
            this.form.fornecedoresArray.push({
                fornecedor: this.form.fornecedores.fornecedor,
                cnpjcpf: this.form.fornecedores.cnpjCpfFornecedor
            })

        }, 
        removeFornecedores(index) {
            this.form.fornecedoresArray.splice(index, 1)
        },

        preecherItemComp(){
            this.form.composicoes.quantidadeComp = 1
            this.form.composicoes.vendaComp = +this.form.composicoes.produtoComp.valor
        },
        calcTotalComp(){
            let soma = 0
            this.form.composicoesArray.forEach(element => {
                soma += +element.quantidade * +element.venda
            });
            this.form.totalComp = soma
        },
        addComposicao() {
            let obj = {
                produto: this.form.composicoes.produtoComp.descricao,
                quantidade: this.form.composicoes.quantidadeComp,
                venda: this.form.composicoes.vendaComp,
            }

            this.form.composicoesArray.push(obj)
            console.log(this.form.composicoesArray)
            this.form.composicoes.produtoComp = ''
            this.form.composicoes.quantidadeComp = ''
            this.form.composicoes.unidadeComp = ''
            this.form.composicoes.valorComp = ''
            this.form.composicoes.vendaComp = ''
            this.calcTotalComp()
        }, 
        removeComposicao(index) {
            this.form.composicoesArray.splice(index, 1)
            this.calcTotalComp()
        },


       /*  addOperacoesInternas(index) {
            this.form.operacoesInternas.push({
                cfopInterno: this.form.cfopInterno,
                csta: this.form.csta
            })

            this.form.cfopInterno = ''
            this.form.csta = ''
        }, */

        removeOperacoesInternas(index) {
            this.form.operacoesInternas.splice(index, 1)
        },


        /* addOperacoesExternas(index) {
            this.form.operacoesExternas.push({
                cfopExterno: this.form.cfopExterno,
                csta: this.form.csta
            })

            this.form.cfopExterno = ''
            this.form.csta = ''
        }, */

        removeOperacoesExternas(index) {
            this.form.operacoesExternas.splice(index, 1)
        },

        menuClickTab: function (tab, event) {
            console.log(tab, event);
        },

        subClickTab: function (tab, event) {
            console.log(tab, event)
        },

        submitForm(forName) {

            this.$refs[forName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!!')
                    return false
                }
            })
        },
        resetForm(forName) {
            this.$refs[forName].reset();
        },

        ativoTeste() {
            console.log(this.form.ativo)
        },

        gerarNumero(){
            let numero = this.horaAtual() + ' ' + this.dataAtual()
            numero = numero.replace(/\D/g, '');
            this.form.codInterno = numero.split('').sort(function(){
                return 0.5-Math.random()
            }).join('');
        },

        dataAtual(){
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, '0');
            var mes = String(data.getMonth() + 1).padStart(2, '0');
            var ano = data.getFullYear();
            let dataAtual = dia + '/' + mes + '/' + ano;
            return dataAtual
        },

        horaAtual(){
            var dNow = new Date();
            var hora =  dNow.getHours() + ':' + dNow.getMinutes() + dNow.getSeconds()
            return hora;
        },

    }

}

export default produtoCadastro