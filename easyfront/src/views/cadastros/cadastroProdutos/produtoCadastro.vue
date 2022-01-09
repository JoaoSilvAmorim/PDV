<template>
<div id="produtosCadastro">
<el-main>
    <el-row>

        <el-col :span="2" style="...">
            <el-button  type="primary" @click="cadastrarProduto" size="mini">Salvar</el-button>
        </el-col>

    </el-row>
</el-main>
<el-form :rules="rules"  ref="form" :model="form" id="form" method="POST">

    <el-tabs  type="border-card"  class="el-menu-window-form">

        <el-tab-pane label="Produto">
            <el-row>
               
            <el-col :span="24">
              <fieldset>
                <legend>Produto</legend>
                <el-card style="margin-block: 8px;" class="box-card" shadow="hover">
                    <el-row :gutter="2">
                        <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                            <el-form-item label="Descrição principal" prop="descricao" size="mini">
                                <el-input v-model="form.descricao" name="descricao" placeholder="">
                                </el-input>
                            </el-form-item>
                        </el-col>
                               
                        <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                            <el-form-item label="Categoria"  size="mini" style="">
                                <el-select filterable v-model="form.categoria" name="categoria"
                                    placeholder="Escolher" size="mini">
                                    <el-option v-for="item in categorias" :key="item.value"
                                        :label="item.label" :value="item.value">
                                    </el-option> 
                                </el-select>
                            </el-form-item>
                        </el-col>

                       <!--  <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                            <el-form-item label="Tipo" size="mini">
                                <el-select filterable v-model="form.tipo" name="tipo" placeholder=""
                                    size="mini">
                                    <el-option v-for="item in tipo" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option> 
                                </el-select>
                            </el-form-item>
                        </el-col> -->

                    </el-row>
                           

                    <el-row :gutter="2">
                        <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                            <el-form-item label="Codigo interno" prop="codInterno" size="mini">
                                <el-input v-model="form.codInterno" name="codInterno"
                                    placeholder=""></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                            <el-form-item label="Cód.Barras(EAN)" prop="codBarras" size="mini">
                                <el-input v-model="form.codBarras" name="codBarras"
                                    placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </fieldset>
            </el-col>

            <!-- <el-col :span="10">
                <el-row :gutter="3">
                <fieldset>
                    <legend>Unidades</legend>
                    <el-card style="height: 100px" class="box-card" shadow="hover">

                        <el-col :span="8">
                            <el-form-item label="Entrada" prop="uniEntrada" size="mini">
                                <el-select filterable v-model="form.uniEntrada" name="uniEntrada"
                                    placeholder="UNIDADE" size="mini">
                                        <el-option v-for="item in unidades" :key="item.value"
                                        :label="item.label" :value="item.value">
                                    </el-option> 
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="Saida" size="mini" prop="saida">
                                <el-input v-model="form.saida" name="saida" placeholder="0"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item size="mini" label="Unidade de saída" prop="uniSaida">
                                <el-select filterable v-model="form.uniSaida" name="uniSaida"
                                    placeholder="UNIDADE">
                                    <el-option v-for="item in unidades" :key="item.value"
                                        :label="item.label" :value="item.value">
                                    </el-option> 
                                </el-select>
                            </el-form-item>
                        </el-col>

                    </el-card>
                </fieldset>
                </el-row>
            </el-col> -->

            <el-col :span="4">
               <fieldset>
                    <legend> Ativo </legend>
                    <el-card style="height: 100px; text-align: center" class="box-card" shadow="hover">
                        <br>
                         <el-radio-group v-model="form.ativo" name="status" size="medium">
                            <el-radio-button :label="true">Sim</el-radio-button>
                            <el-radio-button :label="false">Não</el-radio-button>
                        </el-radio-group>
                    </el-card>
                </fieldset>
            </el-col>

             <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4"> 
                <fieldset>
                    <legend>Estoques</legend>
                    <el-card class="box-card" shadow="hover">
                    <el-col >
                        <el-form-item label="Estoque" prop="imobilizado" size="mini">
                            <el-input v-model="form.imobilizado" name="imobilizado" placeholder="0">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    </el-card>
                </fieldset>
            </el-col>
        
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                <fieldset>
                    <legend>Valor de Venda</legend>
                    <el-card class="box-card" shadow="hover">
                        <el-col>
                        <el-form-item  size="mini" prop="valor" label="Valor">
                            <el-input v-model="form.valor" name="valor" placeholder="R$"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-card>
                </fieldset>
            </el-col>
        </el-row>

        </el-tab-pane>

   


    </el-tabs>
</el-form>
</div>

</template>


<script>
import produtoCadastro from '../../../js/cadastros/cadastroProdutos/produtosCadastro'

export default {
    //name: 'Componente',
    mixins: [produtoCadastro],
    created(){
        console.log(this.$data)
    }
}
</script>


<style scoped>
fieldset 
{
    border:1px solid #e9dff8;
    -moz-border-radius:3px;
    -webkit-border-radius:3px;	
    border-radius:3px;	
}


.el-menu-window-form fieldset {
  background: #f2f4f8;
}
</style>
