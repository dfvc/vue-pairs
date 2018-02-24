<template>
    <div class="modal" :class="{'is-active': displayStats}">
        <div class="modal-background"></div>
        <div class="modal-card stats">
            <section class="modal-card-body stats-body">
                <h2 class="title is-1 has-text-centered">Game Over</h2>
                <div class="has-text-centered">
                    <a class="button is-large" @click="restartGame">
                        <span>Restart</span>
                        <span class="icon is-medium"><i class="fas fa-sync-alt"></i></span>
                    </a>
                </div>
            </section>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                displayStats: false
            }
        },

        created() {
            Event.$on('showStats',
                (show) =>
                    setTimeout(() => this.displayStats = show, 500)
            );
        },

        methods: {
            restartGame() {
                Event.$emit('restartGame');
                this.displayStats = false;
            }
        }
    }
</script>


<style lang="scss">

</style>
