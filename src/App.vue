<template>
  <div id="app">
    <section :class="['hero','is-fullheight','is-bold',bodyClass]">
        <div class="hero-head">
            <Header v-bind="{account , balance}"/>
        </div>
        <div class="hero-body">
          <div :class="{columns: hasTx && open_ui}">
              <div :class="{column: hasTx && open_ui, 'is-three-quarters': hasTx && open_ui}">
                <div :class="{'container': !hasTx || !open_ui, 'has-text-centered': true}">
                  <router-view></router-view>
                </div>
              </div>
              <div class="column" v-if="hasTx && open_ui">
                  <Tx />
              </div>
          </div> 
        </div>
  </section>
  </div>
</template>

<script>
import Tx from "./components/Tx.vue";
import Header from "./components/Header.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Header,
    Tx
  },
  data: function() {
    return {
      bodyClass: "is-info"
    };
  },
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "account",
      "balance",
      "countTx",
      "hasTx",
      "open_ui"
    ])
  },
  updated: function() {
    if (this.$route.meta && this.bodyClass !== this.$route.meta) {
      this.bodyClass = this.$route.meta;
    }
  }
};
</script>