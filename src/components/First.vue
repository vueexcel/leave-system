<template>
    <section class="hero is-info is-medium">
        <div class="hero-body">
            <div class="container has-text-centered">
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
            <b-notification :active.sync="error_msg.length > 0" type="is-danger">
                {{error_msg}}
                <br/>
                You need to setup metamask on your browser to be able to use your ethereum wallet
                <br/>
                Visit this to install meta task <a href="https://metamask.io/" target="_blank">https://metamask.io/</a>
            </b-notification>
            <a @click="$router.push('/second')" class="button">Next</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: "First",
  props: ["account", "balance", "error_msg"]   
};
</script>