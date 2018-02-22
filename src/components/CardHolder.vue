<template>
    <div class='card-holder' :style='{width: card.side + "%"}' @click='flipCard'
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

        methods: {
            flipCard() {
                Event.$emit('flipCard', this.card);
            },
        }
    }
</script>

<style lang="scss">

</style>
