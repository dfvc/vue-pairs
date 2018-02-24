<template>
    <div id="app">
        <page-loader></page-loader>
        <header class="hero is-dark is-bold game-header">
            <game-header></game-header>
        </header>
        <main>
            <board></board>
            <settings></settings>
            <stats></stats>
        </main>
    </div>
</template>


<script>
    import PageLoader from './components/PageLoader.vue';
    import GameHeader from './components/GameHeader.vue';
    import Settings from './components/Settings.vue';
    import Stats from './components/Stats.vue';
    import Board from './components/Board.vue';

    export default {
        name: 'app',

        components: {
            PageLoader,
            GameHeader,
            Settings,
            Stats,
            Board
        }
    }
</script>


<style lang="scss">

</style>
