<template>
    <section class="hero is-primary is-large">
        <div class="hero-body">
            <div class="container has-text-centered">
            <h1 class="title">
                WELCOME
            </h1>
            <h2 class="subtitle">
                Apply leaves on blockchain using ETECH Tokens!
            </h2>
            <p>
                This is a demo project to explore how blockchain works.        
                <br/>
                As an excellence employee you can apply leaves here instead of using the hr system
                <br/>
                ....
            </p>

            <a @click="$router.push('/first')" class="button">Start</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: "Welcome"
};
</script>
