<template>
    <section class="hero is-light is-medium">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">
                    Buy ETECH Tokens
                </h1>
                <h2 class="subtitle" v-if="exchangeRate">
                    Current exchange rate is {{exchangeRate}} Token per ETH                 
                </h2>
                <div v-if="exchangeRate">
                     <b-field label="How many tokens you want to buy?">
                        <b-input v-model="tokentobuy"></b-input>
                    </b-field>

                    <i v-if="eth" class="is-size-7">You need to spending {{eth}} ETH</i>
                    <br/>
                    <a @click="buytoken" :class="{'button': true, 'is-loading': isBuyingToken}">Buy </a>
                </div>

                <div v-if="!exchangeRate">
                    <p>Getting Exchange Rates</p>
                    <a class="button is-light is-loading"></a>

                    
                </div>
                
                <br/>
                <br/>

                <a @click="back">Back</a>

                <ErrorMetamask :error_msg="error_msg" />
                     
                <div>

                </div>
                    
                
            </div>
        </div>
    </section>
</template>

<script>
import ErrorMetamask from "../generic/ErrorMetamask";
import { mapActions , mapMutations } from "vuex";
export default {
  name: "Buy",
  components: { ErrorMetamask },
  props: ["account", "error_msg", "balance"],
  mounted: function() {
    this.initLeaveContract();
  },
  computed: {
    isBuyingToken: {
      get: function() {
        return this.$store.state.leaves.buying_token;
      }
    },
    eth: {
      get: function() {
        return this.tokentobuy / this.exchangeRate;
      }
    },
    exchangeRate: {
      get: function() {
        return this.$store.state.leaves.rate;
      }
    },
    tokentobuy: {
      get: function() {
        return this.$store.state.leaves.token_to_buy;
      },
      set: function(val) {
        this.updateTokenToBuy(val);
      }
    }
  },
  methods: {
    buytoken: function() {
      this.buyToken(this.eth * 1);
    },
    back: function(){
        this.$router.go(-1);
    },
    ...mapActions(["initLeaveContract", "getExchangeRate", "buyToken"]),
    ...mapMutations(["updateTokenToBuy"])
  }
};
</script>

<style>
</style>
