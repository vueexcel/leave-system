<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <router-link to="/">VUE</router-link>
                </div>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <div @click="openTx" class="navbar-item" v-if="account">
                      # {{account}}
                    </div>
                </div>
            </div>
            <b-modal :active.sync="isImageModalActive">
              <section>
                  <b-notification type="is-warning" has-icon>
                      It seems you have changed your wallet address to # {{new_account}}, do you wish to reload the page?
                  </b-notification>
                  <a class="button" @click="isImageModalActive = false;">Close</a>
                  <a class="button is-primary" @click="reload">Ok</a>
              </section>
            </b-modal>
        </nav>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Header",
  props: ["account", "balance"],
  data: function() {
    return {
      isImageModalActive: false
    };
  },
  mounted: function() {
    setInterval(() => {
      this.checkWeb3();
    }, 5000);
    this.getProfile();
    this.initWeb3();
  },
  watch: {
    account: function(val){
      if(val){
        this.initLeaveContract();
        this.initTokenContract();
      }
    },
    new_account: function() {
      this.isImageModalActive = true;
    },
    isLoggedIn: function(val) {
      if (!val) {
        this.$snackbar.open(`You need to login again, token expired!`);
        this.$router.push("/second");
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    }),
    new_account: function() {
      return this.$store.state.eth.new_account;
    }
  },
  methods: {
    ...mapActions({
      dologout: "logout",
      checkWeb3: "checkWeb3",
      initWeb3: "initWeb3",
      getProfile: "getProfile",
      initLeaveContract: "initLeaveContract",
      initTokenContract: "initTokenContract"
    }),
    login: function() {
      this.$router.push("login");
    },
    logout: function() {
      this.dologout();
      this.$router.push("/");
    },
    reload: function() {
      this.isImageModalActive = false;
      window.location.reload(); //neet to see better way for this
    },
    ...mapMutations({
      openTx: "openUI"
    })
  }
};
</script>

<style>
</style>
