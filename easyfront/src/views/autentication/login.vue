<template>
    <div>
    <div id="app">
        <el-container style="height: 100vh;">
        <el-container>
            <el-container>
                <el-main>

                    <el-row style="position: relative;
                    top: 50%;
                    transform: translateY(-50%);">
                        <el-col :span="10" style="position: relative;
                        left: 50%;
                        transform: translateX(-50%);">
                            <el-image
                                style="width: 300px;filter: brightness(0) invert(1);"
                                :src="logo"
                                fit="fit">
                            </el-image>

                            <el-card class="box-card">
                                <p class="login-title">
                                  Bem-vindo ao Royal Desk
                                </p>


                                <el-form  ref="form" :model="form" id="form" method="POST">

                                    <el-form-item prop="username">
                                        <el-input name="username" v-model="form.username">
                                            <template slot="prepend">login</template>
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item prop="password">
                                        <el-input name="password" v-model="form.password" show-password>
                                            <template slot="prepend">senha</template>
                                        </el-input>
                                    </el-form-item>

                                </el-form>

                                <div style="text-align: right;">
                                    <el-button type="primary" style="margin-top: 12px;" @click="login('form')">Entrar</el-button>
                                </div>
                              </el-card>
                              <p style="font-size: 11px; color: #fff;">O melhor sistema de gestão para sua empresa</p>
                        </el-col>
                    </el-row>

                </el-main>
            </el-container>
        </el-container>
        <el-footer style="font-size: 11px;">mwti.com.br / royalsistema.com.br</el-footer>
        </el-container>
    </div>


    </div>
</template>


<script>
 import logo from "../../assets/logo-royal.png"
  export default {
    data() {
      return {
        logo: logo,
        form: {
            username: '',
            password: '',
        }
      }
    },


    methods: {
        login () {
                this.fullscreenLoading = true;
                this.$store.dispatch('auth/login', { 'username': this.form.username, 'password': this.form.password }).then((mensagem) => {
                    this.fullscreenLoading = false;
                    this.username = ''
                    this.password = ''
                    this.$router.push('/home')
                }).catch((mensagem) => {
                    this.fullscreenLoading = false;
                    this.$notify.error({
                        title: 'Erro',
                        message: mensagem
                    });
                })
            }
        }
  }
</script>

<style scoped>
  @import './../../assets/theme-chalk.css';

    body{
        padding: 0;
        margin: 0;
        font-family: 'Roboto', sans-serif;
        /* background:url('login-bg.png') no-repeat center #63439A; */
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

    .login-title {
        font-weight: 700;
        font-size: 30px;
        color: #545454;
    }



    /* Modify css  */
    .el-header, .el-footer {
        /* background-color: #B3C0D1; */
        color: #fff;
        text-align: center;
        line-height: 60px;
    }
    .el-form-item__label {
        color: #ccc;
    }
    .el-input__inner{
        height: 50px;
    }
    .el-button--primary{
        background-color: #5e3c97;
        border-color: #5e3c97;
    }

    .el-button--primary:hover {
        background-color: #4a2d7c;
        border-color: #4a2d7c;
    }
</style>
