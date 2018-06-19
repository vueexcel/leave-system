<template>
    <div id="home">
        <Header v-bind="{account , balance}"/>
        <Buy v-bind="{account, error_msg , balance}" />
    </div>
</template>

<script>
import Header from "./../components/Header";
import Buy from "./../components/Buy";
import { mapActions } from "vuex";
export default {
  name: "BuyPage",
  components: {
    Header,
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
    account: function() {
      return this.$store.state.eth.account;
    },
    error_msg: function() {
      return this.$store.state.eth.error;
    },
    balance: function() {
      return this.$store.state.eth.balance;
    }
  },
  methods: {
    ...mapActions(["initWeb3"])
  }
};
</script>