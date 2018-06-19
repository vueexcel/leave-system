<template>
    <div>
        <Header v-bind="{account,balance}" />
        <SecondHero v-bind="{account, error_msg,balance,tokenBalance}" />
    </div>
</template>

<script>
import SecondHero from "./../components/Second";
import Header from "./../components/Header";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Second",
  components: { Header, SecondHero },
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
      tokenBalance: "getTokenBalance"
    }),
    account: function() {
      return this.$store.state.eth.account;
    },
    balance: function() {
      return this.$store.state.eth.balance;
    },
    error_msg: function() {
      return this.$store.state.eth.error;
    }
  }
};
</script>
