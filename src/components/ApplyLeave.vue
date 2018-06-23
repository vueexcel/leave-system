<template>
    
            <div>
                <h1 class="title">
                    Leaves
                </h1>
                <h2 class="subtitle">
                    Apply Leave Now
                </h2>
                <div :class="{columns: !open_ui}">
                    <div  v-if="!open_ui" class="column"></div>
                    <div :class="{column:!open_ui}">

                            <div class="box">
                                <ErrorMetamask :error_msg="error_msg" />
                                <form @submit.prevent="leave"  v-if="steps === 0">
                                    <b-field label="From date">
                                        <b-datepicker
                                            required
                                            v-model="fromdate"
                                            placeholder="Click to select..."
                                            icon="calendar-today">
                                        </b-datepicker>
                                    </b-field>

                                    <b-field label="To date">
                                        <b-datepicker
                                            required
                                            v-model="todate"
                                            placeholder="Click to select..."
                                            icon="calendar-today">
                                        </b-datepicker>
                                    </b-field>

                                    <b-field label="Type">
                                        <b-select required v-model="type" placeholder="Select a name">
                                            <option
                                                v-for="option in options"
                                                :value="option.id"
                                                :key="option.id">
                                                {{ option.value }}
                                            </option>
                                        </b-select>
                                    </b-field>

                                    <b-field label="Reason">
                                        <b-input required v-model="reason"></b-input>
                                    </b-field>

                                    <button type="submit" :class="{button: true, 'is-loading': leavepplying}">Apply Leave</button>
                                </form>
                                <div v-if="steps === 1">
                                    There are multiple steps that will happen when your leave is applied.
                                    <br/>
                                        <a @click="nextStep">Walk me through the steps</a>
                                    <br/>
                                    <div class="is-divider" data-content="OR"></div>
                                    <br/>
                                        <a @click="finish">Just apply the leave</a>
                                        <br/>
                                        <a @click="backStep">Back</a>
                                </div>
                                <div v-if="steps === 2">
                                    First we will apply your leave on our hr system. 
                                    <br/>
                                    This leave will be will be stored on our database and a unique leave id will be generated
                                    <br/>
                                    <a v-if="steps > 1" @click="backStep">Back</a>
                                    <a v-if="steps < 5" @click="nextStep">Next</a>
                                </div>
                                <div v-if="steps === 3">
                                    Next, we will check your token balance to apply leave
                                    <br/>
                                    You will approve the number of tokens required to apply leaves for our contract.
                                    <br/>
                                    So if you apply 3 days leave, you will approve 3 tokens to be used by our contract
                                    <br/>
                                    This will require a transaction to occure, you would have to spend some GAS for this.
                                    <br/>
                                    Note at this step, tokens will not be deducted from your account
                                    <br/>
                                    <a v-if="steps > 1" @click="backStep">Back</a>
                                    <a v-if="steps < 5" @click="nextStep">Next</a>
                                </div>
                                <div v-if="steps === 4">
                                    Next, we will save your leave details on etherium blockchain.
                                    <br/>
                                    This will be a transaction on etherium network, hence GAS will be used.
                                    <br/>
                                    We will store the leave id from our database on the blockchain and send it for admin approval.
                                    <br/>
                                    <a v-if="steps > 1" @click="backStep">Back</a>
                                    <a v-if="steps < 5" @click="nextStep">Next</a>
                                </div>
                                <div v-if="steps === 5">
                                    So, to summarize you need to perform two transactions on the blockchain
                                    <br/>
                                    Your actual token balance will still be the same
                                    <br/>
                                    Once admin appoves the leave, you token balance will be deducted
                                    <a v-if="steps > 1" @click="backStep">Back</a>
                                    <a @click="finish">Next</a>
                                </div>
                                <div v-if="steps === 6">
                                    {{leaveapplymessage}}
                                </div>
                            </div>

                            <a @click="$router.go(-1)">Back</a>
                    </div>
                    <div v-if="!open_ui" class="column"></div>
                </div>
                
                
                
            </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import ErrorMetamask from "../generic/ErrorMetamask";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ApplyLeave",
  components: { ErrorMetamask },
  props: ["account", "error_msg", "balance"],
  data: function() {
    return {
      options: [
        { id: "Casual", value: "Casual" },
        { id: "Sick", value: "Sick" }
      ],
      steps: 0
    };
  },
  watch: {
    isLoggedIn: function(val) {
      if (val) {
        this.$router.push("/second");
      }
    },
    leaveerror: function(val) {
      if (val) {
        this.steps = 0;
        this.$snackbar.open(val);
      }
    }
  },
  methods: {
    leave: function() {
      let days =
        (new Date(this.todate).getTime() - new Date(this.fromdate).getTime()) /
        (1000 * 24 * 60 * 60);
      if (days <= 0) {
        this.$snackbar.open(
          `Select dates properly, leave applied should be more than 1day`
        );
        return;
      }
      this.steps = 1;
    },
    nextStep: function() {
      this.steps++;
    },
    backStep: function() {
      this.steps--;
    },
    finish: function() {
      this.steps = 6;
      let days =
        (new Date(this.todate).getTime() - new Date(this.fromdate).getTime()) /
        (1000 * 24 * 60 * 60);
      this.applyLeave({
        fromdate: this.fromdate,
        todate: this.todate,
        type: this.type,
        reason: this.reason,
        no_of_days: days
      });
    },
    ...mapActions(["applyLeave", "initLeaveContract", "initTokenContract"])
  },
  computed: {
    ...mapFields({
      fromdate: "applyleave.fromdate",
      todate: "applyleave.todate",
      type: "applyleave.type",
      reason: "applyleave.reason",
      leavepplying: "leave.applying",
      leaveerror: "leave.error",
      leaveapplymessage: "leave.message"
    }),
    ...mapGetters(["open_ui"])
  }
};
</script>