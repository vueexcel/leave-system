<template>
    <b-notification :active="error_msg.length > 0" type="is-danger">
        {{error_msg}}
        <br/>
        You need to setup metamask on your browser to be able to use your ethereum wallet
        <br/>
        Visit this to install meta task <a href="https://metamask.io/" target="_blank">https://metamask.io/</a>

        <br/>

        If you have already install metamask, make sure you have logged into it and can access your accounts

        <Br/>
        <a href="https://github.com/vueexcel/leave-system/wiki/Setting-Up" target="_blank">Read the guide</a> to setup your ethereum account properly.
        
    </b-notification>
</template>

<script>
export default {
  name: "ErrorMetamask",
  props: ["error_msg"]
};
</script>