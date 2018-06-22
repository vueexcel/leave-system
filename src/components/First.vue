<template>
            <div>
                <h1 class="title">
                    Ethereum
                </h1>
                <h2 class="subtitle">
                    The blockchain we are using is ethereum, so you need to have a wallet!
                </h2>
                <p v-if="error_msg.length === 0 && account">
                    Cool! You already have an ethereum wallet!
                    <br/>
                    Account # {{account}}
                    <br/>
                    Balance {{balance}} ETH
                    <br/>
                    
                </p>
                <ErrorMetamask :error_msg="error_msg" />
                <a v-if="isRinkeby" @click="$router.push('/second')" class="button">Next</a>

                <div v-if="!isRinkeby" class="notification is-warning">
                   You need to be connected to <strong>Rinkeby Network</strong> in metamask to be able to use this app.
                   <br/>
                   All our contracts are deployed on rinkeby network.
                </div>
            </div>
        </template>

<script>
import ErrorMetamask from "../generic/ErrorMetamask";
import { mapGetters } from "vuex";
export default {
  name: "First",
  components: { ErrorMetamask },
  props: ["account", "balance", "error_msg"],
  computed: {
    ...mapGetters(["isRinkeby"])
  }
};
</script>