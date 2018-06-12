<template>
    <div id="home">
        <Header v-bind="{account , balance}"/>
        <First v-bind="{account, error_msg, balance}" />
    </div>
</template>

<script>
import Header from "./../components/Header";
import First from "./../components/First";
import { mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    Header,
    First
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