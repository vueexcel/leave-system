<template>
    <section>
        <p class="title has-text-dark">Transactions</p>
        <p class="subtitle has-text-dark">View your transactions on blockchain</p>

        <p>
            <a href="https://rinkeby.etherscan.io/token/0x8bc0978b628c93c86ae79e53017b30363fe81840" target="_blank">Token Details on blockchain</a>
        </p>
        <p>
            <a href="https://rinkeby.etherscan.io/address/0x2ec395e0db6549ab204b7a67fe68bc966e80b9b5" target="_blank">Leave Smart Contract on blockchain</a>
        </p>

        <div v-for="tx in txs" :key="tx.id" :class="{notification: true, 'is-primary': tx.complete, 'is-danger': tx.error, 'is-info':tx.pending}">
            
            
                <div class="is-size-7">
                    <div class="media is-primary">
                        
                        <div class="media-content">
                                <div v-if='tx.pending'>
                                    <p class="title is-4">Processing...</p>
                                    <p class="subtitle"> {{tx.time | moment("h:mm:ss a, MMMM Do")}}</p>
                                </div>
                                <div v-if='tx.complete'>
                                    <p class="title is-4">Complete</p>
                                    <p class="subtitle"> {{tx.time | moment("h:mm:ss a, MMMM Do")}}</p>
                                </div>
                                <div v-if='tx.error'>
                                    <p class="title is-4">Error</p>
                                    <p class="subtitle"> {{tx.time | moment("h:mm:ss a, MMMM Do")}}</p>
                                </div>
                                
                        </div>
                    </div>

                    <div class="content">
                        Transaction On Blockchain for 
                        <br/>
                        <b>{{tx.message}}</b>

                        <br/>

                        <div v-if='tx.complete && tx.data.tx'>
                            Check transation on ethereum network at 
                            <a target="_blank" v-bind:href='"https://rinkeby.etherscan.io/tx/" + tx.data.tx'>{{tx.data.tx}}</a>
                        </div>
                        <div v-if='tx.complete && !tx.data.tx'>
                            {{tx.data}}
                        </div>
                        <br/>
                        <div v-if='tx.error'>
                            {{tx.err.message}}
                        </div>
                        <div v-if='tx.pending'>
                            <button class="button is-light is-loading"></button>
                        </div>
                        
                    </div>
                </div>
            
        </div>

        <a v-if="showNextTx" @click="nextPage">Next</a>
        <a v-if="showBackTx" @click="previousPage">Back</a>
    </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Tx",
  computed: {
    ...mapGetters({
      txs: "tx",
      open_ui: "open_ui",
      currentPage: "currentPage",
      pageSize: "pageSize",
      countTx: "countTx",
      showBackTx: "showBackTx",
      showNextTx: "showNextTx"
    })
  },
  methods: {
    ...mapMutations(["nextPage", "previousPage"])
  }
};
</script>

<style>
</style>
