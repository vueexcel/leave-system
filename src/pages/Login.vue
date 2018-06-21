<template>
    <AuthComp v-bind="{account,balance,tokenBalance,error_msg}" />
</template>

<script>
import AuthComp from "./../components/Auth";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: { AuthComp },
  beforeCreate: function() {
    if (!this.$store.state.eth.account) {
      this.$router.push("first");
    }
  },
  computed: {
    ...mapGetters({
      tokenBalance: "getTokenBalance",
      account: "account",
      balance: "balance",
      error_msg: "error_msg"
    })
  }
};
</script>

