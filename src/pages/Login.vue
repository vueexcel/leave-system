<template>
    <div>
        <Header v-bind="{account,balance}" />
        <AuthComp v-bind="{account,balance,tokenBalance}" />
    </div>
</template>

<script>
import AuthComp from "./../components/Auth";
import Header from "./../components/Header";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: { Header, AuthComp },
  beforeCreate: function() {
    if (!this.$store.state.eth.account) {
      this.$router.push("first");
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      tokenBalance: "getTokenBalance"
    }),
    account: function() {
      return this.$store.state.eth.account;
    },
    balance: function() {
      return this.$store.state.eth.balance;
    }
  }
};
</script>

