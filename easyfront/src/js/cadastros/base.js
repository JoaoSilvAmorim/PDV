import axios from 'axios'
import logo from "../../assets/logo-royal.png"

const base = {
  name: 'base',

  components: {
    
  },

    data: () => {
          return {

            tipoGraf: [
            {
              label: 'Vendas',
              tipoGraf: [
                {label: 'Vendas anual', value: 'VendasAnual'},
                {label: 'Evolução do faturamento', value: 'EvolucaoFaturamento'},
              ]
            },

            {
              label: 'Produtos',
              tipoGraf:[
                {label: 'Produtos vendidos', value: 'ProdutosVendidos'},
              ]
            },
            
            {
              label: 'Financeiro',
              tipoGraf: [
               /*  {label: 'Contas a pagar', value: 'ContasPagar'},
                {label: 'Contas a receber', value: 'ContasReceber'}, */
                {label: 'Histórico de faturamento', value: 'HistoricoFaturamento'}
              ]
            }
            
            ],
            logo: logo,
            urlLogo: '../assets/favicon-5.png',
            fits: 'scale-down',
            tabPosition: 'left',
            icons: [
            ],
            graf: 'HistoricoFaturamento',
            loading: false,

            form:{
 
            }
        }
    }, 

    computed: {
      myStyles () {
      return {
        height: `${this.height}px`,
        position: 'relative',
        background: 'white',
        height: '405px !important',
        width: '99%'

      }
    }
    },

    mounted(){
      document.title = "EasyClient"
      this.carregarIcons()
    },


    methods: {

      carregarIcons: async function(){
        this.loading = true
        let res = await axios.get('/api/v1/configIcones/').then((response) => {
          this.icons = response.data
          this.loading = false
        })
        let aux = []

        this.icons[0]['icones'].forEach(element => {
          aux.push(element)
        });


        this.icons = aux
      },

      novaGuiaPdv(){
        let routeData = this.$router.resolve({name: 'Pdv'});
        window.open(routeData.href, '_blank');
      },

       handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    }

}

export default base