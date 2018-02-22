<template>
    <div>
        <div class="container hero-body game-header__middle">
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
</template>


<script>
    export default {
        data() {
            return {
                gameProgress: 0,
                pairsLeft: 0
            }
        },

        created() {
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
