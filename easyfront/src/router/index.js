import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

import Login from '../views/autentication/login.vue'
import NotFound from '../views/autentication/notFound.vue'

//Imports Raiz
import Base from '../views/base.vue'
//Fim imports raiz

//Imports Cadastros
import ProdutoCadastro from '../views/cadastros/cadastroProdutos/produtoCadastro.vue'
import ListaProdutos from '../views/cadastros/cadastroProdutos/listaProdutos.vue'
//Imports Cadastros fim

//Imports vendas
import Pdv from '../views/vendas/pdv.vue'
//Fim imports vendas


//Rotas Configiracoes
import Sistema from '../views/configuracoes/sistema/sistema.vue'
//fim rotas configuracoes

//Pagamentos
import GerenciaNet from '../views/pagamentos/gerenciaNet.vue'

//Fim pagamentos


Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes:
        [
            {
                path: '/',
                name: 'Default',
                redirect: '/home'
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            },

            {
                path: '/logout',
                beforeEnter(to, from, next) {
                    auth.logout()
                    next({path: '/login'})
                }

            },

            {
                path: '*',
                name: 'not-found',
                component: NotFound,

            },

            {
                path: '/home',
                name: 'Home',
                component: Home,

                meta: {
                    auth: true,
                }
            },

            {
                path: '/about',
                name: 'About',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
            },
            /*
              {
                path: '/',
                name: 'Home',
                component: Home
              },
             */

            {
                path: '/vendas/pdv',
                name: 'Pdv',
                component: Pdv,

                meta: {
                    auth: true,
                }
            },


//Rotas cadastros
       


        {
            path: '/cadastros/cadastroProduto/produtoCadastro',
            name: 'ProdutoCadastro',
            component: ProdutoCadastro,

            meta: {
                auth: true,
            }
        },

        {
            path: '/cadastros/produtosLista',
            name: 'listaProdutos',
            component: ListaProdutos,

            meta: {
                auth: true,
            }
        },


        {
            path: '/cadastros/editarProduto/:id',
            name: 'editarProduto',
            component: ProdutoCadastro,

            meta: {
                auth: true,
            }
        },
//fim rotas cadastros


//Rotas financeiro
        
//Fim rotas financeiro




//Ro

        {
            path: '/configuracoes/sistema',
            name: 'Sistema',
            component: Sistema,

            meta: {
                auth: true,
            }
        },



        //Pagamentos
        {
            path: '/pagamentos/gerenciaNet',
            name: 'gerenciaNet',
            component: GerenciaNet,

            meta: {
                auth: true,
            }
        },

        {
            path: '/pagamentos/orcamentos/:id',
            name: 'gerenciaNetOrcamento',
            component: GerenciaNet,

            meta: {
                auth: true,
            }
        },

        {
            path: '/pagamentos/estoque/:id',
            name: 'gerenciaNetEstoque',
            component: GerenciaNet,

            meta: {
                auth: true,
            }
        },

        {
            path: '/pagamentos/contas/:id',
            name: 'gerenciaNetContas',
            component: GerenciaNet,

            meta: {
                auth: true,
            }
        },
        
    ]
})


const auth = {
    loggedIn() {
        return store.getters['auth/loggedIn']
    },
    logout() {
        store.commit('auth/setLogout')
    }
}

router.beforeEach((to, from, next) => {
    let authrequired = false
    if (to && to.meta.auth)
        authrequired = true
    //console.log('authrequired', authrequired, to.name)

    if (authrequired) {
        if (auth.loggedIn()) {
            if (to.name === 'Login') {
                // window.location.href = '/'
                router.push({ name: 'Default' })
                return false
            } else {
                next()
            }
        } else {
            if (to.name !== 'Login') {
                // window.location.href = '/login'
                router.push({ name: 'Login' })
                return false
            } else {
               next()
            }

        }
    } else {
        console.log(auth.loggedIn())
        console.log(to.name)
        if (auth.loggedIn() && to.name == 'Login') {
            console.log('000000')
            // window.location.href = '/'
            router.push({ name: 'Default' })
            return false
        } else {
            console.log('1111')
            next()
        }
    }


})


export default router
