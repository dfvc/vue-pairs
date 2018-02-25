<template>
    <div>
        <div class="container hero-body game-header__middle">
            <div class="game-header__middle--left">
                <h1 class="title">Pairs</h1>
                <h2 class="subtitle">wow, the game never seen before...</h2>
            </div>
            <div class="game-header__middle--right">
                <a class="button is-dark" @click="showSettings">
                    <span class="icon is-medium"><i class="fas fa-cog"></i></span>
                </a>
                <a class="button" @click="restartGame">
                    <span>Restart</span>
                    <span class="icon is-medium"><i class="fas fa-sync-alt"></i></span>
                </a>
            </div>
        </div>

        <div class="hero-foot game-header__bottom">
            <div class="game-header__bottom-timer" v-if="gameTime !== null">
                <progress class="progress is-large" :value="gameTime" max="100"></progress>
            </div>
            <div class="game-header__bottom-progress">
                <progress class="progress is-large" :value="gameProgress" max="100"></progress>
                <span class="tag is-info">{{ gameProgress }}%</span>
                <span class="tag is-link">Pairs left: {{ pairsLeft }}</span>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                gameTime: null,
                gameProgress: 0,
                pairsLeft: 0
            }
        },

        created() {
            Event.$on('updateGameTime',
                (gameTime) => this.gameTime = gameTime
            );

            Event.$on('updateGameProgress',
                (gameProgress, pairsLeft) => {
                    this.gameProgress = gameProgress;
                    this.pairsLeft = pairsLeft;
                }
            );
        },

        methods: {
            showSettings() {
                Event.$emit('showSettings', true);
            },

            restartGame() {
                Event.$emit('restartGame');
            }
        }
    }
</script>


<style lang="scss">

</style>
