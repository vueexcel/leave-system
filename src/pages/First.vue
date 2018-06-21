<template>
    <First v-bind="{account, error_msg, balance}" />   
</template>

<script>
import First from "./../components/First";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    First
  },
  updated: function() {
    this.initWeb3();
  },
  mounted: function() {},
  computed: {
    ...mapGetters(["account", "error_msg", "balance"])
  },
  methods: {
    ...mapActions(["initWeb3"])
  }
};
</script>