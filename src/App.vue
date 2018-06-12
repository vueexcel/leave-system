<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import Home from "./pages/Home.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Home
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  mounted: function() {
    if (this.isLoggedIn) {
      this.$router.push("/profile");
    }
  }
};
</script>
