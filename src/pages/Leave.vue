<template>
    <ApplyLeave v-bind="{account, error_msg, balance}" />
</template>

<script>
import ApplyLeave from "./../components/ApplyLeave";
import { mapGetters } from "vuex";
export default {
  name: "Leave",
  components: {
    ApplyLeave
  },
  computed: {
    ...mapGetters(["error_msg", "account", "balance"])
  }
};
</script>