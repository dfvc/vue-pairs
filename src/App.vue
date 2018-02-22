<template>
    <div id="app">
        <page-loader></page-loader>
        <header class="hero is-dark is-bold game-header">
            <game-header></game-header>
        </header>
        <main>
            <board :n-cards="16"></board>
        </main>
    </div>
</template>


<script>
    import PageLoader from './components/PageLoader.vue';
    import GameHeader from './components/GameHeader.vue';
    import Board from './components/Board.vue';

    export default {
        name: 'app',

        components: {
            PageLoader,
            GameHeader,
            Board
        }
    }
</script>


<style lang="scss">

</style>
