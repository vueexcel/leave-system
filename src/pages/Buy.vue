<template>
  <Buy v-bind="{account, error_msg , balance}" />
</template>

<script>
import Buy from "./../components/Buy";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BuyPage",
  components: {
    Buy
  },
  beforeCreate: function() {
    if (!this.$store.state.eth.account) {
      this.$router.push("first");
    }
  },
  mounted: function() {
    this.initWeb3();
  },
  computed: {
    ...mapGetters(["error_msg", "account", "balance"])
  },
  methods: {
    ...mapActions(["initWeb3"])
  }
};
</script>