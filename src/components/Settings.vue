<template>
    <div class="modal" :class="{'is-active': displaySettings}">
        <div class="modal-background"></div>
        <div class="modal-card settings">
            <header class="modal-card-head settings-header">
                <p class="modal-card-title">Game Settings</p>
            </header>
            <section class="modal-card-body settings-body">
                <div class="buttons has-addons">
                    <span v-for="level in levels" @click="selectLevel(level)"
                        class="button" :class="{'is-selected': level.selected}">
                        {{ level.name }}
                    </span>
                </div>
            </section>
            <footer class="modal-card-foot settings-footer">
                <button class="button" @click="cancelSettings">Cancel</button>
                <button class="button is-info" @click="applySettings">Apply and Restart</button>
            </footer>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                displaySettings: false,
                currentLevelSelected: this.getSelectedLevel(),
                levels: [
                    { name: 'Peanuts', nCards: 4, selected: false},
                    { name: 'Easy', nCards: 16, selected: true},
                    { name: 'Medium', nCards: 36, selected: false},
                    { name: 'Hard', nCards: 64, selected: false},
                    { name: 'Insane', nCards: 100, selected: false}
                ]
            }
        },

        created() {
            Event.$on('showSettings',
                (show) => {
                    this.displaySettings = show;
                    this.currentLevelSelected = this.getSelectedLevel();
                }
            );
        },

        methods: {
            selectLevel(selectedLevel) {
                this.levels.map(
                    (level) => level.selected = (level === selectedLevel)
                );
            },

            cancelSettings() {
                this.levels.map(
                    (level) => level.selected = (level.name === this.currentLevelSelected.name)
                );
                this.displaySettings = false;
            },

            applySettings() {
                Event.$emit('restartGame', this.getSelectedLevel().nCards);
                this.displaySettings = false;
            },

            getSelectedLevel() {
                if (this.levels === undefined) {
                    return { name: 'Easy', nCards: 16, selected: true};
                }

                return this.levels.filter(
                    (level) => level.selected
                )[0];
            }
        }
    }
</script>


<style lang="scss">

</style>
