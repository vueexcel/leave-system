<template>
    <div>
        2222
        <div v-for="(leavegroup, i) in leavelist" :key="i" class="columns">
            <div v-for="(leave, j) in leavegroup" :key="i*100+j" class="column">
                <p>ID: {{leave.id}}</p>
                <p>ID: {{leave.by}}</p>
                <p>ID: {{leave.no_of_days}}</p>
                <p>ID: {{leave.approved}}</p>
                <p>ID: {{leave.action_by}}</p>
                <p>ID: {{leave.action_action_at}}</p>
            </div>

        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name : "LeaveListComponent",
  mounted: function(){
     
  },
  methods: {
      ...mapActions(["getLeaveList"])
  },
  computed: {
      ...mapGetters(["leavelist"])
  }
}
</script>