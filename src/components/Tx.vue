<template>
    <section class="section">
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

                        <div v-if='tx.complete'>
                            Check transation on ethereum network at 
                            <a target="_blank" v-bind:href='"https://rinkeby.etherscan.io/tx/" + tx.data.tx'>{{tx.data.tx}}</a>
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
    </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Tx",
  computed: {
    ...mapGetters({ txs: "tx", open_ui: "open_ui" })
  }
};
</script>

<style>
</style>
