<template>
  <div id="app">
      <div class="columns">
          <div class="column is-three-quarters">
            <router-view></router-view>
          </div>
          <div class="column">
              <Tx />
          </div>
      </div>
  </div>
</template>

<script>
import Home from "./pages/Home.vue";
import Tx from './components/Tx.vue';
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Home,
    Tx
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  mounted: function() {
  }
};
</script>
