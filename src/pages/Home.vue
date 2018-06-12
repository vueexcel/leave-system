<template>
    <div id="home">
        <Header />
        <Welcome />
    </div>
</template>

<script>
import Header from './../components/Header'
import Welcome from './../components/Welcome'
export default {
  name: "Home",
  components: {
      Header,
      Welcome
  }
};
</script>

<style>
</style>
