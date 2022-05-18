<template>
  <div id="app">
    <NavBar />

    <router-view />

    <FooterView />
  </div>
</template>

<script>
import NavBar from "./views/NavBar";
import FooterView from "./views/FooterView";

export default {
  name: "App",
  components: {
    NavBar,
    FooterView,
  },
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
