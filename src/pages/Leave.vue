<template>
    <div id="leave">
        <Header v-bind="{account , balance}"/>
        <ApplyLeave v-bind="{account, error_msg, balance}" />
    </div>
</template>

<script>
import Header from "./../components/Header";
import ApplyLeave from "./../components/ApplyLeave";
export default {
  name: "Leave",
  components: {
    Header,
    ApplyLeave
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
  }
};
</script>