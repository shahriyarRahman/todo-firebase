<template>
    <router-view />
</template>
<script>
export default {
    name: "App",
    // data(){
    //   return{

    //   }
    // },
    computed: {
        loggedIn() {
            console.log(this.isLoggedIn, "simple");
            console.log(this.$isLoggedIn, "new");
            return true;
        }
    }
};
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
