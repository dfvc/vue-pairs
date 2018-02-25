<template>
    <div class="modal" :class="{'is-active': displaySettings}">
        <div class="modal-background"></div>
        <div class="modal-card settings">
            <header class="modal-card-head settings-header">
                <h2 class="modal-card-title">Game Settings</h2>
            </header>
            <section class="modal-card-body settings-body">
                <div class="settings-body__cards">
                    <h3 class="settings-body__cards--title is-size-5">Difficulty</h3>
                    <div class="buttons has-addons settings-body__cards--buttons">
                        <span v-for="level in levels" @click="selectLevel(level)"
                            class="button" :class="{'is-selected': level.selected}">
                            {{ level.name }}
                        </span>
                    </div>
                </div>
                <div class="settings-body__time">
                    <h3 class="settings-body__time--title is-size-5">Time</h3>
                    <div class="buttons has-addons settings-body__time--buttons">
                        <span v-for="time in times" @click="selectTime(time)"
                              class="button" :class="{'is-selected': time.selected}">
                            {{ time.name }}
                        </span>
                    </div>
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
                currentTimeSelected: this.getSelectedTime(),
                levels: [
                    { name: 'Peanuts', nCards: 4, selected: false},
                    { name: 'Easy', nCards: 16, selected: true},
                    { name: 'Medium', nCards: 36, selected: false},
                    { name: 'Hard', nCards: 64, selected: false},
                    { name: 'Insane', nCards: 100, selected: false}
                ],
                times: [
                    { name: '30 sec.', time: 30, selected: false},
                    { name: '1 min.', time: 60, selected: false},
                    { name: '3 min.', time: 180, selected: false},
                    { name: '5 min.', time: 320, selected: false},
                    { name: 'Infinite', time: null, selected: true}
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

            selectTime(selectedTime) {
                this.times.map(
                    (time) => time.selected = (time === selectedTime)
                );
            },

            cancelSettings() {
                this.levels.map(
                    (level) => level.selected = (level.name === this.currentLevelSelected.name)
                );
                this.times.map(
                    (time) => time.selected = (time.name === this.currentTimeSelected.name)
                );
                this.displaySettings = false;
            },

            applySettings() {
                Event.$emit('restartGame',
                    this.getSelectedLevel().nCards,
                    this.getSelectedTime().time
                );
                this.displaySettings = false;
            },

            getSelectedLevel() {
                if (this.levels === undefined) {
                    return { name: 'Easy', nCards: 16, selected: true};
                }

                return this.levels.filter(
                    (level) => level.selected
                )[0];
            },

            getSelectedTime() {
                if (this.times === undefined) {
                    return { name: 'Infinite', time: null, selected: true};
                }

                return this.times.filter(
                    (time) => time.selected
                )[0];
            }
        }
    }
</script>


<style lang="scss">

</style>
