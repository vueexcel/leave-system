<template>
    <SecondHero v-bind="{account, error_msg,balance,tokenBalance}" />
</template>

<script>
import SecondHero from "./../components/Second";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Second",
  components: { SecondHero},
  beforeCreate: function() {
    if (!this.$store.state.eth.account) {
      this.$router.push("first");
    }
  },
  watch: {
    account: function() {
      this.getTokenBalance();
    }
  },
  mounted: function() {
    this.initTokenContract();
  },
  methods: {
    ...mapActions({
      initTokenContract: "initTokenContract"
    })
  },
  computed: {
    ...mapGetters({
      tokenBalance: "getTokenBalance",
      account: "account",
      balance: "balance",
      error_msg: "error_msg",
    })
  }
};
</script>
