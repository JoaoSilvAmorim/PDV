<template>
  <div id="app">
   <!--  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif; 
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>


<script>
  export default {
    data() {
      return {
        
      }
    },


    computed: {
      isLogged() {
        alert("porra")
        return this.$store.getters.isLogged
      }
    },

    methods: {
        




    }
  }
</script>

