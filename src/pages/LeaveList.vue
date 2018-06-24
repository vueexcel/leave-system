<template>
    <LeaveList v-bind="{account, error_msg, balance}" />
</template>

<script>
import LeaveList from "./../components/LeaveList";
import { mapGetters } from "vuex";
export default {
  name: "LeaveListPage",
  components: {
    LeaveList
  },
  computed: {
    ...mapGetters(["error_msg", "account", "balance"])
  }
};
</script>