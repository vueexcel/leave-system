<template>
    
            <div>
                <h1 class="title">
                    Token
                </h1>
                <h2 class="subtitle">
                    To apply leave on blockchain you need ETECH Tokens!
                </h2>
                <div v-if="!tokenBalance && tokenBalance !== 0">
                    Getting Your Token Balance
                    <Br/>
                    <a class="is-loading is-success button"></a>
                </div>
                <div v-if="tokenBalance && tokenBalance !== 0">
                        
                        You'r token balance is {{tokenBalance}}

                        <div v-if="isLoggedIn">
                            Welcome {{profile.name}}
                            <br/>
                            <figure>
                                <img :src="profile.profileImage" />
                            </figure>
                            <i>Continue to apply leave</i>
                            <br/>
                            <a class="button" @click="applyleave">Apply Leave</a>
                        </div>
                        <div v-if="!isLoggedIn">
                            Authenticate your account with our hr system so you can apply some leaves
                            <br/><br/>
                            <a @click="authenticate" class="button">Authenticate</a>

                            <br/>
                            <div class="is-divider" data-content="OR"></div>

                            <br/>

                            Just try applying leave as a guest!
                            <br/>
                            <a class="button" @click="guest">Guest</a>

                        </div>
                </div>

                <ErrorMetamask :error_msg="error_msg" />
                <div v-if="tokenBalance === 0">
                        Oops!! You don't have any tokens?
                        <br/>

                        <div v-if="isLoggedIn">
                            Welcome {{profile.name}}
                            <br/>
                            <figure>
                                <img :src="profile.profileImage" />
                            </figure>
                            <i>Seems you have exhausted all your tokens :)</i>
                        </div>
                        <div v-if="!isLoggedIn">
                            Authenticate your account with our hr system and maybe we will reward you with some free tokens :)
                            <br/><br/>
                            <a @click="authenticate" class="button">Authenticate</a>
                        </div>

                        <br/>
                        <div class="is-divider" data-content="OR"></div>
                        <br/>

                        You buy some tokens with the ETH you have and try out the system?
                        <br/>
                        <i>Since its on testnet, all tokens are free!</i>
                        <br/>
                        <a class="button" @click="tryout">Try out!</a>

                        
                </div>
                <a class="button" @click="getFreeTokens">Free!</a>
            </div>
        
</template>

<script>
import ErrorMetamask from "../generic/ErrorMetamask";
import { mapGetters , mapActions } from "vuex";
export default {
  name: "Second",
  components: { ErrorMetamask },
  props: ["tokenBalance", "error_msg"],
  computed: {
    ...mapGetters(["profile", "isLoggedIn"])
  },
  methods: {
    guest: function() {},
    tryout: function() {
      this.$router.push("/buy");
    },
    authenticate: function() {
      this.$router.push("/auth");
    },
    applyleave: function(){
        this.$router.push("/leave");
    },
    ...mapActions(["getFreeTokens"])
  }
};
</script>
