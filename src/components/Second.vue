<template>
    <section class="hero is-success is-medium">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">
                    Token
                </h1>
                <h2 class="subtitle">
                    To apply leave on blockchain you need ETECH Tokens!
                </h2>
                <p v-if="tokenBalance !== 0">
                        
                        You'r token balnce {{tokenBalance}}
                </p>
                <p v-if="tokenBalance === 0">
                        Oops!! You don't have any tokens?
                        <br/>
                        Authenticate your account with our hr system and maybe we will reward you with some free tokens :)
                        <br/><br/>
                        <a @click="authenticate" class="button">Authenticate</a>

                        <br/>
                        ..... or ....
                        <br/>

                        Or you just want to try out the system?
                        <br/><br/>
                        <a class="button" @click="tryout">Try out!</a>
                        
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: "Second",
  props: ["tokenBalance"],
  methods: {
    tryout: function() {},
    authenticate: function(){
        this.$router.push("/auth");
    }
  }
};
</script>
