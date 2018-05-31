<template>
    <div class='card-holder' :style='{width: card.side + "%"}' @click='flipCard' v-if="this.render"
         :class='{"card-holder--unflipped": !card.flipped, "card-holder--matched": card.matched}'>
        <div class='card card-holder__card-face card-holder__card-face--front'>
            <i class='fa-fw' :class='card.icon'></i>
        </div>
        <div class='card card-holder__card-face card-holder__card-face--back'></div>
    </div>
</template>


<script>
    export default {
        props: [
            'card'
        ],

        data() {
            return {
                render: true
            }
        },

        created() {
            Event.$on('restartGame',
                () => {
                    this.render = false;
                    setTimeout(
                        () => this.render = true,
                        10
                    );
                }
            );
        },

        methods: {
            flipCard() {
                Event.$emit('flipCard', this.card);
            },
        }
    }
</script>


<style lang="scss">

</style>
