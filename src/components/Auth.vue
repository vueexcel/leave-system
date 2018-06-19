<template>
    <section class="hero is-warning is-medium">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">
                    Authenticate
                </h1>
                <h2 class="subtitle">
                    Identify yourself!!
                </h2>
                
                    <ErrorMetamask :error_msg="error_msg" />
                    <div class="columns">
                        <div class="column"></div>
                        <div class="column">
                            <form @submit.prevent="dologin">
                                <b-field label="Username">
                                    <b-input required v-model="username" maxlength="30"></b-input>
                                </b-field>

                                <b-field label="Password"> 
                                    <b-input type="password" required
                                        v-model="password"
                                        password-reveal>
                                    </b-input>
                                </b-field>

                                <button type="submit" :class="{'button': true,'is-loading': login_progress}">Login</button>
                            </form>
                            
                        </div>
                        <div class="column"></div>
                    </div>
                    
                
            </div>
        </div>
    </section>
</template>

<script>
import ErrorMetamask from "../generic/ErrorMetamask";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "Auth",
  components: { ErrorMetamask },
  mounted: function() {
    if (this.isLoggedIn) {
      this.$router.push("/second");
    }
  },
  watch: {
    isLoggedIn: function(val) {
      if (val) {
        this.$router.push("/second");
      }
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    username: {
      get: function() {
        return this.$store.state.login.username;
      },
      set: function(val) {
        this.updateUsername(val);
      }
    },
    password: {
      get: function() {
        return this.$store.state.login.password;
      },
      set: function(val) {
        this.updatePassword(val);
      }
    },
    login_progress: function() {
      return this.$store.state.login.login_progress;
    },
    error_msg: function() {
      return this.$store.state.login.error;
    }
  },
  methods: {
    ...mapMutations(["updateUsername", "updatePassword"]),
    ...mapActions({
      login: "login"
    }),
    dologin: function() {
      this.login({
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style>
</style>
