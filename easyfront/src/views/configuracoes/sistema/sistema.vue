<template>
<div>
<el-main>

    <el-row>

        <el-col :span="12" style="">
            <el-button type="primary" @click="cadastrarConfiguracao()" size="mini">Salvar</el-button>
        </el-col>

    </el-row>

</el-main>

<el-form :rules="rules" ref="form" :model="form" id="form" method="POST" action="" v-loading="loading">
        
            <el-tabs tab-position="left">
                <el-tab-pane label="Dados gerais">
                    <el-row :gutter="2">
                        <fieldset>
                            <el-card class="box-card" shadow="hover">
                                <legend style="font-size: large; font-weight: bold;">Dados gerais</legend>
<br>
                                <legend>Defina nos campos abaixo os dados gerais da sua
                                    empresa.
                                    Estas informações serão necessárias na emissão de seus cupons e notas fiscais.
                                </legend>
<br>
                                <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                                    <el-form-item label="CNPJ" size="mini" prop="cnpj">
                                        <el-input @change="consultaCNPJ(form.cnpj)" v-mask="['##.###.###/####-##']" size="mini"
                                            v-model="form.cnpj" name="dadosGerais[cnpj]">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                                    <el-form-item label="Razão social" size="mini" prop="razaoSocial">
                                        <el-input size="mini" v-model="form.razaoSocial" name="dadosGerais[razaoSocial]">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                                    <legend>Status</legend>
                                    <el-col style="margin-top: 14px;">
                                        <el-col :span="10">
                                            <el-radio v-model="form.status" size="mini" label=1 name="dadosGerais[ativo]" border>
                                                Ativo
                                            </el-radio>
                                        </el-col>

                                        <el-col :offset="2" :span="10">
                                            <el-radio v-model="form.ativo" size="mini" label=0 name="dadosGerais[ativo]" border>
                                                Inativo
                                            </el-radio>
                                        </el-col>
                                    </el-col>
                                </el-col>

                                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                                    <el-form-item label="Nome fantasia" size="mini" prop="nomeFantasia">
                                        <el-input v-model="form.nomeFantasia" name="dadosGerais[nomeFantasia]" size="mini">
                                        </el-input>
                                    </el-form-item>

                                </el-col>

                                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                                    <el-form-item label="Apelido" size="mini">
                                        <el-input v-model="form.apelido" name="dadosGerais[apelido]" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>


                                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                                    <el-form-item label="Data de fundação" size="mini" prop="dataFundacao">
                                        <el-date-picker size="mini" style="width:100%"
                                            v-model="form.dataFundacao" type="date" format="dd/MM/yyyy" placeholder=""
                                            value-format="dd/MM/yyyy" name="dadosGerais[dataFundacao]">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>

                             
                            </el-card>
                        </fieldset>
                    </el-row>


                    <el-row :gutter="6">
                        <fieldset>
                            <el-card>
                                <legend style="font-size: large; font-weight: bold;">Endereços</legend>
<br>
                                <legend>Informe também o endereço onde a sua empresa está localizada</legend>
<br>
                                <!--Ini-->
                                <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                                    <el-form-item label="CEP" size="mini">
                                        <el-input @change="searchCep(form.enderecos.cep)" v-model="form.enderecos.cep" size="mini" name="enderecos[cep]"></el-input>
                                    </el-form-item>
                                </el-col>


                                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                    <el-form-item label="Inscrição municipal" size="mini">
                                        <el-input v-model="form.enderecos.inscricaoMunicipal" size="mini"
                                            name="enderecos[inscricaoMunicipal]">
                                        </el-input>
                                    </el-form-item>
                                </el-col>


                                <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                                    <el-form-item label="Número" size="mini">
                                        <el-input v-model="form.enderecos.numero" size="mini" name="enderecos[numero]"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!--Fim-->

                                <!--Ini-->
                                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                    <el-form-item label="Bairro" size="mini">
                                        <el-input v-model="form.enderecos.bairro" size="mini" name="enderecos[bairro]"></el-input>
                                    </el-form-item>
                                </el-col>


                                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                    <el-form-item label="Complemento" size="mini">
                                        <el-input v-model="form.enderecos.complemento" name="enderecos[complemento]" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!--Fim-->

                                <!--Ini-->
                                <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                                    <el-form-item label="Estado" size="mini">
                                        <el-select fieltrable v-model="form.enderecos.uf" name="enderecos[estado]" placeholder="Escolher"
                                            size="mini">
                                            <el-option v-for="item in 26" :key="item.value" :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                    <el-form-item label="Cidade" size="mini">
                                        <el-input v-model="form.enderecos.localidade" size="mini" name="enderecos[cidade]"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!--Fim-->
                            </el-card>
                        </fieldset>
                        
                    </el-row>

                </el-tab-pane>

                <el-tab-pane label="Customização">

                    <el-row>
                        <el-col>
                            <fieldset>
                                <el-card class="box-card" shadow="hover">
                                    <legend style="font-size: large; font-weight: bold;">Customização</legend>
<br> 
                                    <legend  style="color: darkblue; font-size: small;">É possível customizar a sua Loja com imagens para as impressões de documentos,
                                    frente de caixa, etc.</legend>
<br>

                                    <el-col v-if="form.imgCaixa != ''">
                                        <el-image
                                            v-if="form.imgCaixa"
                                            style= "display: block;
                                            margin-left: auto;
                                            margin-right: auto; width: 400px; height: 300px"
                                            error="Carregue uma imagem"
                                            :src="url"></el-image> 
                                    </el-col>

                                    <el-col :offset="9" :span="6">
<br>
                                        <el-input type="file" v-model="form.customizacao.imgCaixa" name="customizacao[imgCaixa]"></el-input>
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
import sistema from '../../../js/configuracoes/sistema/sistema'
export default {
    mixins: [sistema],
    setup() {
        
    },
}
</script>

<style scoped>

</style>