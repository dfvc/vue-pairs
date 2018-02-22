<template>
    <div id="app">
        <section class="section page-loader" :class="{'page-loader--hidden': !displayLoader}">
            <img class="spinner" src="src/assets/img/tail-spin.svg">
        </section>

        <header class="hero is-dark is-bold game-header">
            <div class="container">
                <div class="hero-body game-header__middle">
                    <div class="game-header__middle--left">
                        <h1 class="title">Pairs</h1>
                        <h2 class="subtitle">wow, the game never seen before...</h2>
                    </div>
                    <div class="game-header__middle--right">
                        <a class="button is-large" @click="restartGame" v-show="gameProgress === 100">
                            <span>Restart</span>
                            <span class="icon is-medium"><i class="fas fa-sync-alt"></i></span>
                        </a>
                    </div>
                </div>

                <div class="hero-foot game-header__bottom">
                    <progress class="progress is-large game-header__progress" :value="gameProgress" max="100"></progress>
                    <span class="tag is-info game-header__pairs-left">{{ gameProgress }}%</span>
                    <span class="tag is-link game-header__pairs-left">Pairs left: {{ pairsLeft }}</span>
                </div>
            </div>
        </header>

        <main>
            <board :n-cards="16"></board>
        </main>
    </div>
</template>


<script>
    import Board from './components/Board.vue'

    export default {
        name: 'app',

        components: {
            Board
        },

        data() {
            return {
                displayLoader: true,
                gameProgress: 0,
                pairsLeft: 0
            }
        },

        created() {
            Event.$on('showLoader',
                (show) => this.displayLoader = show
            );

            Event.$on('updateGameProgress',
                (gameProgress, pairsLeft) => {
                    this.gameProgress = gameProgress;
                    this.pairsLeft = pairsLeft;
                }
            );
        },

        methods: {
            restartGame() {
                Event.$emit('restartGame');
            },
        }
    }
</script>


<style lang="scss">

</style>
