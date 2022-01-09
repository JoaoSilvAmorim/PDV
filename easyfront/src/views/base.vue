<template>
    <div id="Base">
        <el-container>

             <el-header style="background-color: #E4E7ED; line-height:12px; height: 140px;">
                <el-row style="display: contents;"> 
                    <el-col :span="7" style="text-align: left;">
                      <el-link href="">
                        <el-image
                            style="width: 120px; margin-top: 10px"
                            :fit='fits'
                            src="https://uploaddeimagens.com.br/images/003/402/542/full/favicon-5.png">
                        </el-image>
                      </el-link>
                    </el-col>

                    <el-col :span="17" style="text-align: left">
<br><br>  
                       <h2>Nome da empresa</h2>
                       <span>ROYAL DESK</span>
                    </el-col>
                </el-row>
            </el-header>
 
            <el-tabs  type="border-card" class="el-menu-principal">
                <el-tab-pane label="Cadastros" style="padding: 0px;">

                    <el-menu mode="horizontal"  style="display: inline-block;" :router="true">
                        
                        <el-submenu index="1">
                          <template slot="title">
                            <i class="fi-rr-edit"></i>
                            Clientes
                          </template>
                          <router-link to="/cadastros/cadastroCliente/cliente"><el-menu-item index="0.1-1" :route="{name: 'CadastroCliente'}">Clientes</el-menu-item></router-link>
                          <el-menu-item index="1-2">Classificação de clientes</el-menu-item>
                          <el-menu-item index="1-3">Fornecedores</el-menu-item>
                          <el-menu-item index="1-4">Transportadoras</el-menu-item>
                          <el-menu-item index="1-5">Representantes</el-menu-item>
                          <el-menu-item index="1-6">Funcionários</el-menu-item>
                          <el-menu-item index="1-7">Parceiros comerciais</el-menu-item>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                            <i class="fi-rr-shopping-bag"></i>
                              Produtos
                            </template>
                            
                            <router-link to="/cadastros/cadastroProduto/produtoCadastro">
                              <el-menu-item index="0.2-1" :route="{name: 'ProdutoCadastro'}">Cadastrar Produto</el-menu-item>
                            </router-link>

                            <router-link to="/cadastros/produtosLista">
                              <el-menu-item index="2-2" :route="{name: 'listaProdutos'}">Produtos</el-menu-item> 
                            </router-link>

                            <el-menu-item index="2-3">item three</el-menu-item>
                            <el-submenu index="2-4">
                              <template slot="title">item four</template>
                              <el-menu-item index="2-4-1">item one</el-menu-item>
                              <el-menu-item index="2-4-2">item two</el-menu-item>
                              <el-menu-item index="2-4-3">item three</el-menu-item>
                            </el-submenu>
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title">
                            <i class="fi-rr-dollar"></i>
                              Preços
                            </template>
<!-- 
                            <router-link to="/cadastros/orcamentos/orcamentosCad">
                                    <el-menu-item index="0.3-1" :route="{name: 'OrcamentoCad'}">Lançar orçamento</el-menu-item>
                            </router-link>

                            <router-link to="/cadastros/orcamentos/listaOrcamentos">
                                    <el-menu-item index="3-2" :route="{name: 'listaOrcamentos'}">Orçamentos</el-menu-item>
                            </router-link> -->

                            <el-menu-item index="3-3">item three</el-menu-item>
                            <el-submenu index="3-4">
                              <template slot="title">item four</template>
                              <el-menu-item index="3-4-1">item one</el-menu-item>
                              <el-menu-item index="3-4-2">item two</el-menu-item>
                              <el-menu-item index="3-4-3">item three</el-menu-item>
                            </el-submenu>
                        </el-submenu>

                        <el-menu-item index="4"><i class="fi-rr-package"></i> Serviços</el-menu-item>

                        <el-submenu index="5">
                            <template slot="title">
                            <i class="fi-rr-mode-portrait"></i>
                              Funcionários
                            </template>
                            <el-menu-item index="5-1">item one</el-menu-item>
                            <el-menu-item index="5-2">item two</el-menu-item>
                            <el-menu-item index="5-3">item three</el-menu-item>
                            <el-submenu index="5-4">
                              <template slot="title">item four</template>
                              <el-menu-item index="5-4-1">item one</el-menu-item>
                              <el-menu-item index="5-4-2">item two</el-menu-item>
                              <el-menu-item index="5-4-3">item three</el-menu-item>
                            </el-submenu>
                        </el-submenu>

                        <el-submenu index="6">
                            <template slot="title">
                            <i class="fi-rr-cloud-download"></i>
                              Importação
                            </template>
                            <el-menu-item index="6-1">item one</el-menu-item>
                            <el-menu-item index="6-2">item two</el-menu-item>
                            <el-menu-item index="6-3">item three</el-menu-item>
                            <el-submenu index="6-4">
                              <template slot="title">item four</template>
                              <el-menu-item index="6-4-1">item one</el-menu-item>
                              <el-menu-item index="6-4-2">item two</el-menu-item>
                              <el-menu-item index="6-4-3">item three</el-menu-item>
                            </el-submenu>
                        </el-submenu>

                        <el-submenu index="7">
                            <template slot="title">
                            <i class="fi-rr-settings"></i>
                              Geral
                            </template>
                            <el-menu-item index="7-1">item one</el-menu-item>
                            <el-menu-item index="7-2">item two</el-menu-item>
                            <el-menu-item index="7-3">item three</el-menu-item>
                            <el-submenu index="7-4">
                              <template slot="title">item four</template>
                              <el-menu-item index="7-4-1">item one</el-menu-item>
                              <el-menu-item index="7-4-2">item two</el-menu-item>
                              <el-menu-item index="7-4-3">item three</el-menu-item>
                            </el-submenu>
                        </el-submenu>
      
                    </el-menu>
                    <div class="line"></div>  
                    
                </el-tab-pane>
                <el-tab-pane label="Vendas">

                <el-menu :router="true"  mode="horizontal" style="display: inline-block;">
                    <el-menu-item @click="novaGuiaPdv">
                      <i class="fi-rr-edit"></i>
                    PDV</el-menu-item>

                    <el-submenu index="3">
                        <template slot="title">
                        <i class="fi-rr-dollar"></i>
                          Orçamentos/Pedidos
                        </template>

                        <router-link to="/cadastros/orcamentos/orcamentosCad">
                                <el-menu-item index="0.3-1" :route="{name: 'OrcamentoCad'}">Lançar orçamentos/pedido</el-menu-item>
                        </router-link>

                        <router-link to="/cadastros/orcamentos/listaOrcamentos">
                                <el-menu-item index="3-2" :route="{name: 'listaOrcamentos'}">Listar orçamentos/pedido</el-menu-item>
                        </router-link>

                        <el-menu-item index="3-3">item three</el-menu-item>
                        <el-submenu index="3-4">
                          <template slot="title">item four</template>
                          <el-menu-item index="3-4-1">item one</el-menu-item>
                          <el-menu-item index="3-4-2">item two</el-menu-item>
                          <el-menu-item index="3-4-3">item three</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>

                </el-tab-pane>
                <el-tab-pane label="Liberty Pagamento"></el-tab-pane>


                <el-tab-pane label="Estoque">
                  <el-menu :router="true" mode="horizontal" style="display: inline-block;">
                    <router-link to="/cadastros/estoque">
                       <el-menu-item index="0.1" :route="{name :'Estoque'}">
                        <i class="el-icon-sort"></i>
                        Atualização de Estoque</el-menu-item> </router-link>
                  </el-menu>

                  <el-menu :router="true" mode="horizontal" style="display: inline-block;">
                    <router-link to="/cadastros/estoque/listaEstoque">
                       <el-menu-item index="0.1" :route="{name :'listaEstoque'}">
                        Lista estoque</el-menu-item> </router-link>
                  </el-menu>
                </el-tab-pane>

                <el-tab-pane label="Relatórios">
                <el-menu :router="true" mode="horizontal" style="display: inline-block;">
                  <router-link to="/relatorio/vendas/relatorioVendas">
                    <el-menu-item index="1" :route="{name: 'RelatorioVendas'}">
                      <i class="fi-rr-shopping-cart-check"></i>
                     Vendas</el-menu-item> </router-link>
                    
                </el-menu>

                <el-menu :router="true" mode="horizontal" style="display: inline-block;">
                  <router-link to="/relatorio/financeiro/relatoriFinanceiro">
                      <el-menu-item index="0.2" :route="{name: 'RelatorioFinanceiro'}">
                      <i class="fi-rr-dollar"></i> 
                      Financeiro</el-menu-item> 
                  </router-link>
               </el-menu>

               <el-menu :router="true" mode="horizontal" style="display: inline-block;">
                 <router-link to="/relatorio/estoque/relatorioEstoque">
                    <el-menu-item index="0.3" :route="{name: 'RelatorioEstoque'}">
                    <i class="el-icon-sort"></i>
                     Estoques</el-menu-item> 
                  </router-link>
               </el-menu>

                <el-menu :router="true" mode="horizontal" style="display: inline-block;">
                  <router-link to="/relatorio/fiscal/relatorioFiscal">
                    <el-menu-item index="0.4" :route="{name: 'RelatorioFiscal'}">
                    <i class="el-icon-document"></i>
                     Fiscal</el-menu-item>
                  </router-link>
                </el-menu>
              </el-tab-pane>

                <el-tab-pane label="Financeiro">

                  <el-menu :router="true" mode="horizontal" style="display: inline-block;">
                    <el-submenu index="1">
                     <template slot="title">
                       <i class="fi-rr-edit"></i>
                       Contas 
                     </template>
                     <router-link to="/financeiro/contasPagarReceber">
                        <el-menu-item index="0.1-1" :route="{name: 'ContasPagarReceber'}">Contas a Pagar/Receber</el-menu-item> 
                     </router-link>
                   </el-submenu>

               </el-menu>

                </el-tab-pane>

                <el-tab-pane label="Fiscal">Fiscal</el-tab-pane>
                <el-tab-pane label="Contabilidade">Contabilidade</el-tab-pane>
                <el-tab-pane label="Configurações">
                    <el-menu :router="true" mode="horizontal" style="display: inline-block;">
                         <el-submenu index="1">
                          <template slot="title">
                            <i class="fi-rr-edit"></i>
                            Usuarios
                          </template>

                          <router-link to="/configuracoes/usuarios"> 
                            <el-menu-item index="0.1-1" :route="{name: 'Usuarios'}">Usuarios</el-menu-item>
                          </router-link>

                          <router-link to="/configuracoes/permissaoUsuario">
                            <el-menu-item index="0.1-2" :route="{name: 'PermissaoUsuario'}">Permissões</el-menu-item> 
                          </router-link>
                        </el-submenu>

                         <el-submenu index="2">
                          <template slot="title">
                            <i class="fi-rr-edit"></i>
                            Gerais
                          </template>

                          <router-link to="/configuracoes/sistema">
                              <el-menu-item index="0.1-2" :route="{name: 'Sistema'}">Sistema</el-menu-item>
                          </router-link>
                        </el-submenu>

                    </el-menu>
                </el-tab-pane>
                <el-tab-pane label="Loja de App">Loja de App</el-tab-pane>
            </el-tabs>
            <br>
            <el-footer style="font-size: 15px;">mwti.com.br / royalsistema.com.br</el-footer>
        </el-container>
    </div>

</template>


<script>
import base from '../js/cadastros/base'

export default {
    //name: 'Componente',
    mixins: [base],
}
</script>


<style>
#Base{
    text-align: center;
}

a {
  text-decoration: none;
}

.el-input__inner{
  color: black !important;
  font-size: medium !important
}

  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

.el-tooltip__popper {
  font-size: 16px !important;
}
body{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    /*background-color: #f2f4f8;*/
    user-select: none; /* supported by Chrome and Opera */
}
.el-tabs__nav-scroll{
  background: #E4E7ED;
}


.el-tabs__item{
  color: red;
  
}

/* New Items */
.errorlist{
  background-color: #fef0f0;
  color: #f56c6c;
  padding: 20px 60px;
  border-radius: 10px;
}
.errorlist li .errorlist{
  padding:5px;
}
.cliente-info span{
  padding: 4px 0;
  display: inline-block;
}
.licencas td {
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  padding: 10px 0;
}

.licencas td:nth-child(2){
  border-right:none;
  color: rgb(11, 202, 11);
}
.home-icon{
  text-align: center;
  cursor: pointer;
  color: #5e3c97;
}
.home-icon i {
  font-size: 35px;
}
.home-icon span {
  font-weight: 600;
}

.home-icon:hover{
  transform: scale(1.1);
  color: #ccc;
}
.menu-button-home {
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}
.el-input__inner-mini{
  height: 28px;
  line-height: 28px;
  font-size: 12px
}
fieldset
{
    border:1px solid #e9dff8;
    -moz-border-radius:3px;
    -webkit-border-radius:3px;	
    border-radius:3px;	
}
.el-menu-principal .el-submenu,
.el-menu-principal .el-menu-item {
  border-right: 1px solid #cccccc2e;
}
.el-menu-principal .el-submenu:last-child,
.el-menu-principal .el-menu-item:last-child {
  border-right: none;
}
.el-menu-principal .el-tabs__content{
  padding: 0;
  text-align: center;
  color: #5e3c97;
}
.el-menu-window-form fieldset {
  background: #f2f4f8;
}


/* Modify css  */
.el-step__title{
  font-size: 13px;
  color: #4a4a4a;
}
.el-header, .el-footer {
    color: #333;
    font-size: 11px;
    background-color: #fff;
}
.el-footer{
  height: 30px!important;
  line-height: 32px;
  bottom: 0;
  position: fixed;
  width: 100%;
}
.el-header {
  background-color: #5e3c97;
}
.el-form-item__label{
  font-size: 13px;
  margin-bottom: 5px;
  color: #4a4a4a;
  font-weight: 600;
}
.el-menu-vertical-demo{
  border-right: none;
  background-color: transparent;
}
.el-menu-vertical-demo .el-submenu__title i, 
.el-menu-vertical-demo .el-menu-item i{
  color: #5e3c97;
}
.el-menu-vertical-demo .el-menu-item, 
.el-menu-vertical-demo .el-submenu__title{
  color: #5e3c97;
  height: 45px;
  line-height: 45px;
  font-size: 12px;
  text-transform: uppercase;
}
.el-menu-vertical-demo .el-menu-item a{
  color: #5e3c97 !important;
  text-decoration: none;
}
.el-form-item__label{
  font-weight: 100;
}
.el-select {
  width: 100%;
}
h1,h2,h3,h4,h5,h6 {
  color: #5e3c97
}
.el-button a {
  color: #fff !important;
  text-decoration: none;
}
.el-table thead {
  color: #fff;
  background: #a0a0a0!important;
}
.el-table th, .el-table tr {
  background-color: transparent;
}
.el-table_1_column_1 .cell {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.el-loading-mask{
  background-color: rgb(255, 255, 255);
}


</style>
