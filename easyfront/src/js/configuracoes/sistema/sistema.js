import axios from 'axios'
import moment from 'moment'

const sistema = {

    data:() => {
        

        return {

            editableTabsValue: '0',
            loading: true,

            dialogSerieFiscal: false,
            //Caixas ini
            arrCaixas: [
            ],
            numeroCaixa: '',
            serieFiscal: '',
            arrSerieFiscal: [],
            //Caixas fim 

            //Check TEF ini
            configTef: '',
            auxConfigTef: false,
            editarBandeiraDialog: false,
            idBandeiraEdicao: '',
            //Check TEF fim

            //Home icones
           
            icones: [],

             iconesArr: [
                {
                value: 'el-icon-shopping-cart-2',
                label: 'Pdv'
                }, 

                {
                value: 'el-icon-setting',
                label: 'Sistema'
                }, 

                {
                value: 'el-icon-sort',
                label: 'Estoque'
                }, 
            ],
       

            perfilAcesso:[{"label": "perfil1",
            "value": 1}],

            prazoRecebimento:[{"label": "perfil1",
            "value": 1}],

            configuracaoBandeira:{
                nomeBandeira: '',
                adquirencia: '',
                contaReceber: '',
                prazoRecebimento: '',
            },

          
            form:{

                icones: {
                    icones: [],
                },
               

                //Ini
                
                cnpj: '',
                razaoSocial: '',
                status: '',
                nomeFantasia: '',
                apelido: '',
                suframa: '123',
                dataFundacao: null,
                inscricaoMunicipal: 'ie',
                inscricaoEstadual: 'ie',

                enderecos:{
                    cep:'',
                    ieMunicipal: '',
                    numero: '',
                    bairro: '',
                    complemento: '',
                    uf: '',
                    localidade: '',
                },

                dadosProp:{
                    cpf: '',
                    nomeCompleto: '',
                    dataNascimento: '',
                    email: '',
                    genero: '',
                    celular: '',
                },

                customizacao:{
                    imgCaixa: '',
                    imgPedidos: '',
                    imgDanfeComDados: '',
                    imgDanfeSemDados: '',
                },

                tributacao: {
                    //Ini Regime tributario
                        regimeTributario: '',
                        csosn: '',
                        aliquotaSimplesNacional: '',
                    //Fim regime triburario
                    
                    //Ini pis e cofins
                        situacaoTributario: '',
                        aliquotaPis: '',
                        aliquotaCofins: '',
                    //Fim pis e confins

                    //Ini Speed
                        incidenciaTributaria: '',
                        indicadorTipoAtividade: '',
                        indicadorTipoAtividade: '',
                    //Fim tipo atividade
                },

                substituicaoTributaria:{
                    incidenciaTributaria: '',
                    ieSubstituicao: ''
                },

                cfops:{
                    devolucaoComICms: '',
                    devolucaoSubstituicaoTributaria: '',
                    emissaoNotaCupom: '',
                    entradaParticionamento: '',
                    entregaFatura: '',
                    faturamentoSimples: '',
                    retornoCosignacao: '',
                    saidaCosignacao: '',
                    saidaParticionamento: '',
                    saidaPerda: '',
                    transferenciaEstoque: '',
                    vendaCombustives: '',
                    produtosIcms: '',
                    produtosIcmsSubstituicao: '',
                    produtosProducaoPropria: '',
                    produtosProducaoPropriaSubstituicaoTributaria: '',
                    vendaInterestadualProducaoPropria: '',
                    vendaInterestadualNaoContribuinte: '',
                },

                cupomFiscal:{
                    mensagemCupom: '',
                    incentivoConsumidor: '',
                    vendaCaixa: '',
                    identificarCliente: '',
                    exibirNomeOperador: '',
                    soliciatarSuprimentoCaixa: '',
                    extratoDivida: '',
                    imprimirConfissao: '',
                    exibirGrade: '',
                    exibirCestNcm: '',
                },

                configNfce:{
                    numeroIdentificacao: '',
                    tokenContribuinte: '',
                    numeroCaixa: '',
                    serieFiscal: '',
                },

                opcoesVenda:{
                    localEstoqueFilial: '',

                    tefVendas: '',
                    erCodeVendas: '',
                    dinheiroVendas: '',
                    devolucaoVendas: '',
                    crediarioVendas: '',
                    chequeVendas: '',
                    voucherVendas: '',
                    debitoVendas: '',
                    creditoVendas: '',

                    tefRecebimento: '',
                    tefVendas: '',

                    qrCodeRecebimento: '',
                    dinheiroRecebimento: '',
                    devoulucaoRecebimento: '',
                    crediarioRecebimento: '',
                    chequeRecebimento: '',
                    voucherRecebimento: '',
                    debitoRecebimento: '',
                    creditoRecebimento: '',

                    numeroViasVendas: '',
                    tipoTefVendas: '',
                    caminhoRequisicaoVendas: '',
                    caminhoRespostasVendas: '',
                    caminhoExecutavelVendas: '',

                    confissaoDivida: '',
                    vizualizarFatura: '',
                    vizualizarPedidoVenda: '',
                    vizualizarPedido: '',

                    comissaoVendas: '',
                    tabelaPreco: '',
                    baixaEstoque: '',
                    insumoProducao: '',
                    entradaAjusteEstoque: '',
                    entradaEstoqueProducao: '',
                    estoqueDevolucao: '',
                    retornoCosignacao: '',
                    ajusteEstoque: '',
                    saidaConsignacao: '',
                    recebimentos: '',
                }, //Fim

                

                configuracaoBandeiraArr: [],

                serieFiscal:{
                    cnpj: '',
                    codSerieFiscal: '',
                    sequencia: '',
                    modeloDocumentoFiscal: '',
                    sistema: '',
                    infoComplementares: '',
                },

                credenciaisGerenciaNet: {
                    sandbox: true,
                    client_id: '',
                    client_secret: '',
                },
                contaGerenciaNet: []
                

           }, //Fim Form*/




            rules:{

                cnpj:[
                    {required: true, message: 'Inserir', trigger: 'blur'}
                ],
                razaoSocial:[
                    {required: true, message: 'Inserir', trigger: 'blur'}
                ],
                nomeFantasia:[
                    {required: true, message: 'Inserir', trigger: 'blur'}
                ],
                apelido:[
                    {required: true, message: 'Inserir', trigger: 'blur'}
                ],
                dataFundacao:[
                    {required: true, message: 'Inserir', trigger: 'blur'}
                ],
               

            }// Fim rules
      
        }
        
    },

    //Retornar último elemento do array
    computed:{
      calcArray(){
          return this.form.itens.length - 1
      },

    },

    async mounted(){
        await this.getBandeiras()
        await this.getSerieFiscal()
        await this.getCaixas()
        await this.getContaGerenciaNet()
        await this.getConfiguracao()
    },


    //Metodos para funcionamento da tela
    methods:{
        menuClickTab: function(tab, event) {
            console.log(tab, event);
        },


        cadastrarConfiguracao: async function(){
            this.$confirm('Deseja finalizar configuração?', 'Atenção', {
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                type: 'warning'
                }).then(async (res) => {
                    console.log('submit!!');
                    this.form.dataFundacao = moment(this.form.dataFundacao, 'DD/MM/YYYY').format("YYYY-MM-DD")
                    await axios.post('/api/v1/configuracaoSistema/', this.form).then((res) => {
                            this.$router.go()
                            }).catch((erro) =>{

                            console.log(erro)
                            this.$notify({
                                title: 'Atenção',
                                message: Object.keys(erro.response.data) + ': ' + erro.response.data[Object.keys(erro.response.data)],
                                type: 'warning'
                            });
                    })
                }).catch(() => {
                    this.$notify({
                        title: 'Atenção',
                        message: 'Ação cancelada',
                        type: 'warning'
                    });
            }); 
        },

        getConfiguracao: async function(){
            let data = []
            await axios.get('/api/v1/configuracaoSistema/').then((response) => {
                this.form = response.data
                this.form.dataFundacao = moment(this.form.dataFundacao, 'YYYY-MM-DD').format('DD/MM/YYYY')
                this.form.status = this.form.status.toString()
                this.form.isentoIe = this.form.isentoIe.toString()
                this.loading = false
                console.log(response.data)
            }).catch((erro) => {
                console.log(erro)
            })

            console.log()
        },

        //Inicio bandeiras
        cadastrarBandeira: function(obj){
              this.$confirm('Deseja cadstrar esta Bandeira?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    console.log('submit!!');
                    axios.post('/api/v1/cadastrarBandeira/', obj)
                    document.getElementById("form").reset();
                    this.$router.go()
                }).catch(() => {
                    this.$notify({
                        title: 'Atenção',
                        message: 'Ação cancelada',
                        type: 'warning'
                    });
                }); 
        },
        

        addBandeira: function(){
            let obj = {
                configuracaoBandeira:{ nomeBandeira: this.configuracaoBandeira.nomeBandeira,
                                       adquirencia: this.configuracaoBandeira.adquirencia,
                                       vincularBandeiraConta: this.configuracaoBandeira.contaReceber,
                                       prazoRecebimento: parseInt(this.configuracaoBandeira.prazoRecebimento),
                                    }
            }
            this.cadastrarBandeira(obj)
        },
        getBandeiras: async function(){
            let data = []
            await axios.get('/api/v1/cadastrarBandeira/').then((response) => {
                data = response.data
            }).catch((error) =>{
                console.log(error)
            })
            data.forEach(element => {
                this.form.configuracaoBandeiraArr.push(element)
            });
           
        },//Fim bandeiras


        //Inicio serie fiscal
        cadastrarSerieFiscal: async function(){
            this.$confirm('Deseja cadastrar esta serie?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    console.log('submit!!');
                    axios.post('/api/v1/serieFiscal/', this.form.serieFiscal)
                    document.getElementById("form").reset();
                    this.$router.go()
                }).catch(() => {
                    this.$notify({
                        title: 'Atenção',
                        message: 'Ação cancelada',
                        type: 'warning'
                    });
                }); 
        },

        deletarSerieFiscal(row){
            this.$confirm('Deseja apagar esta serie fiscal?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    console.log('submit!!');
                    axios.delete(`/api/v1/deletarSerieFiscal/${row.id}`)
                    document.getElementById("form").reset();
                    this.$router.go()
                }).catch(() => {
                    this.$notify({
                        title: 'Atenção',
                        message: 'Ação cancelada',
                        type: 'warning'
                    });
                }); 
            
        },


        //Caixas  
        cadCaixa(){
            let serieCaixa = this.arrCaixas[this.arrCaixas.length - 1];
            let obj = {
                numero: serieCaixa.numeroCaixa,
                serie: serieCaixa.serieFiscal['id']
               
            }
            this.$confirm('Deseja cadastrar este caixa?', 'Atenção', {
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
                console.log('submit!!');
                axios.post('/api/v1/caixa/', obj)
                document.getElementById("form").reset();
                this.$router.go()
            }).catch(() => {
                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                });
            }); 
        },
        deletarCaixa(id){
            this.$confirm('Deseja deletar este caixa?', 'Atenção', {
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
                console.log('submit!!');
                axios.delete(`/api/v1/deletarCaixa/${id}`)
                document.getElementById("form").reset();
                this.$router.go()
            }).catch(() => {
                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                });
            });  
        },
        //Fim caixas


        getCaixas(){
            axios.get('/api/v1/caixa/').then((response) => {
                this.arrCaixas = response.data
            }).catch((error) =>{
                console.log(error)
            })
        },


        getSerieFiscal: function(){
            axios.get('/api/v1/serieFiscal/').then((response) => {
                this.arrSerieFiscal = response.data
            }).catch((error) => {
                console.log(error)
            })
        },

        editarBandeira: function(id){
            //let objeto = this.form.configuracaoBandeira.find(objaux => obj.id == id)
            this.editarBandeiraDialog = true
            this.idBandeiraEdicao = id
        },
        finalizarEdicaoBandeira: function(objeto){
            let obj = {
                configuracaoBandeira:{ nomeBandeira: this.configuracaoBandeira.nomeBandeira,
                                       adquirencia: this.configuracaoBandeira.adquirencia,
                                       vincularBandeiraConta: this.configuracaoBandeira.contaReceber,
                                       prazoRecebimento: parseInt(this.configuracaoBandeira.prazoRecebimento),
                                    }
            }
            //this.edi
            axios.post(`/api/v1/editarBandeira/${this.idBandeiraEdicao}/`, obj);
        },


        testeC(){
            console.log(this.arrCaixas)
        },


        //Validar formulario, falar com marcelo para ver se é necessario
        submitForm(forName){
            this.$refs[forName].validate((valid) =>{
                console.log('Valid' + valid)
                console.log('for name' + forName)
                if(valid){
                    alert('submit!');
                }else{
                    console.log('error submit!!!')
                    return false
                }
            })
        },//fim submitForm

        //Limpar formulario
        resetForm(forName){
            this.$refs[forName].resetFields();
        },//fim resetForm


        addCaixas(){
            this.arrCaixas.push({
                numeroCaixa: this.numeroCaixa,
                serieFiscal: this.serieFiscal
            })
            this.cadCaixa()
        },

        removeCaixas(index){
            this.arrCaixas.splice(index, 1)
        },

        cadastrarContaGerenciaNet: function(){
            let obj = this.form.credenciaisGerenciaNet

            this.$confirm('Deseja finalizar esta conta no Gerencianet?', 'Atenção', {
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
                console.log('submit!!');
                let res = axios.post('/api/v1/gerenciaNetConfig/', obj)

                document.getElementById("form").reset();
                this.$router.go()
            }).catch(() => {
                this.$notify({
                    title: 'Atenção',
                    message: 'Ação cancelada',
                    type: 'warning'
                });
            });  
            
        },

        getContaGerenciaNet: function(){
            let res = axios.get('/api/v1/gerenciaNetConfig/').then((response) => {
                this.form.contaGerenciaNet = response.data
            }).catch((error) => {
                console.log("Error" + error)
            })
        },

        searchCep () {
            if(this.form.enderecos.cep.length == 8) {
                axios.get(`https://viacep.com.br/ws/${ this.form.enderecos.cep }/json/`).then( response =>  {
                    console.log(response.data)
                    this.form.enderecos = response.data
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
                        //console.log(json)
                        this.form.nomeFantasia = json.fantasia
                        this.form.dataFundacao = json.abertura
                        this.form.enderecos.cep = json.cep
                        this.form.enderecos.complemento = json.municipio
                        this.form.enderecos.localidade = json.municipio
                        this.form.enderecos.rua = json.logradouro
                        this.form.enderecos.bairro = json.bairro
                        this.form.enderecos.cidade = json.municipio
                        this.form.enderecos.uf = json.uf
                        this.form.enderecos.nome = json.nome
                        this.form.enderecos.email = json.email
                    }
                });
        },


        configIconesInicial(){
            this.form.icones.icones = this.icones
            let res = axios.post('/api/v1/configIcones/', this.form.icones).then((data) => {
                console.log(data.data['msg'])
            }).catch((erro) => {
                alert(erro)
            })
        }

    }// Fim methods


  }

  export default sistema

            /*     cnpj: '',
                razaoSocial: '',
                status: '',
                nomeFantasia: '',
                apelido: '',
                suframa: '',
                dataFundacao: null,
                inscricaoMunicipal: '',
                inscricaoEstadual: '',

                enderecos:{
                    cep:'',
                    ieMunicipal: '',
                    numero: '',
                    bairro: '',
                    complemento: '',
                    uf: '',
                    localidade: '',
                }, */
