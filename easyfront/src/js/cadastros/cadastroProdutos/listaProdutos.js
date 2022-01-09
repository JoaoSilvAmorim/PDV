import axios from 'axios'
const listaProdutos = {
    data:() => {
        return {
          tabelaProdutos: []
        }
      },

      mounted(){
          this.alterBarraTopo()
          this.getProdutos()
      },

      methods:{

          alterBarraTopo(){
            //document.getElementById("teste").innerHTML = "PRODUTOS";
        },

        getProdutos(){
            axios.get('/api/v1/listarProdutos',
            ).then((response) =>{
                console.log(response)
                this.tabelaProdutos = response.data
            }).catch((erro) => {
                console.log("Error" + erro)
            })
        },

        abrirEdicao(id){
            let routeData = this.$router.push(`/cadastros/editarProduto/${id}`)
        },

       async deletarProduto(id){
            if(id){
            this.$confirm('Deseja deletar este Produto?', 'Atenção', {
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    this.loading = true
                    console.log(id)
                    let res = axios.delete(`/api/v1/deletarProduto/${id}`)
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
      }
    }
export default listaProdutos
