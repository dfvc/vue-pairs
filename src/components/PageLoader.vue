<template>
    <section class="section page-loader" :class="{'page-loader--hidden': !displayLoader}">
        <img class="spinner" src="src/assets/img/tail-spin.svg">
    </section>
</template>


<script>
    export default {
        data() {
            return {
                displayLoader: true
            }
        },

        created() {
            Event.$on('showLoader',
                (show) => this.displayLoader = show
            );
        }
    }
</script>


<style lang="scss">

</style>
