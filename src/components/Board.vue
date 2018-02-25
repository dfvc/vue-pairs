<template>
    <section class="section">
        <div class="container">
            <div class="board">
                <card-holder v-for='(card, index) in cards' :key='index' :card='card'></card-holder>
            </div>
        </div>
    </section>
</template>


<script>
    import CardHolder from './CardHolder.vue';

    export default {
        components: {
            CardHolder
        },

        computed: {
            numCards() {
                let nCards = this.nCards > 100 ? 100 : this.nCards;
                nCards = nCards % 2 === 0 ? nCards : nCards + 1;
                return nCards;
            },

            cardSide() {
                let nCols = Math.ceil(Math.sqrt(this.numCards));
                return (nCols * 100) / (nCols * nCols);
            }
        },

        data() {
            return {
                nCards: 16,
                srcIconList: null,
                iconList: null,
                cards: [],
                totalFlips: 0,
                time: null,
                currentTime: null,
                timer: null
            }
        },

        created() {
            Event.$on('flipCard',
                (flippedCard) => this.tryCardsPair(flippedCard)
            );

            Event.$on('restartGame',
                (nCards, time) => {
                    this.nCards = nCards !== undefined ? nCards : this.nCards;
                    this.time = time !== undefined ? time : this.time;
                    this.initCards();
                    this.updateGameProgress();
                    this.startTimer();
                    this.updateTotalFlips('reset');
                }
            );
        },

        mounted() {
            this.initBoard();
        },

        methods: {
            initBoard() {
                this.fetchIcons().then(this.parseIcons).then(this.initCards).then(this.hideLoader);
                this.updateGameProgress();
                this.startTimer();
                this.updateTotalFlips('reset');
            },

            fetchIcons() {
                let iconsUrl = 'src/vendor/fontawesome-free-5.0.6/advanced-options/metadata/icons.json';
                return fetch(iconsUrl).then(
                    (response) => response.ok ? response.json() : Promise.reject(response.json())
                );
            },

            parseIcons(json) {
                this.srcIconList = Object.keys(json).map(
                    (key) => {
                        let icon = json[key].styles.includes('brands') ? 'fab' : 'fas';
                        icon += ' fa-' + key;
                        return icon;
                    }
                );
            },

            initCards() {
                // Keep original list to avoid multiple fetching
                this.iconList = this.srcIconList;
                // Generate 1st half of the cards
                this.cards = Array(this.numCards / 2).fill().map(
                    (_, id) => this.initCard(id, false)
                );
                // Generate 2nd half of the cards (clones)
                let cardsClone = Array(this.numCards / 2).fill().map(
                    (_, id) => this.initCard(id, true)
                );
                // Merge cards arrays
                this.cards = [...this.cards, ...cardsClone];
                // Shuffle cards
                this.cards = this.cards.sort(
                    () => Math.random() - 0.5
                );
            },

            initCard(id, clone) {
                let icon = clone ? this.cards[id].icon : this.getRandomIcon();

                return {
                    id: id,
                    icon: icon,
                    side: this.cardSide,
                    flipped: false,
                    matched: false
                }
            },

            getRandomIcon() {
                let iconIndex = Math.floor(Math.random() * this.iconList.length);
                let randomIcon = this.iconList[iconIndex];
                this.$delete(this.iconList, iconIndex);

                return randomIcon;
            },

            tryCardsPair(flippedCard) {
                if (!flippedCard.flipped && !flippedCard.matched) {
                    this.flipCard(flippedCard);
                    this.checkCardsPair(flippedCard);
                    this.unflipCards();
                    this.checkGameOver();
                }
            },

            getFlippedCards() {
                return this.cards.filter(
                    (card) => card.flipped && !card.matched
                );
            },

            getCheckedCards() {
                return this.cards.filter(
                    (card) => card.matched
                );
            },

            flipCard(flippedCard) {
                flippedCard.flipped = this.getFlippedCards().length < 2;
                this.updateTotalFlips('add');
            },

            checkCardsPair(flippedCard) {
                let pair = this.cards.filter(
                    (card) => card.id === flippedCard.id && card.flipped && flippedCard.flipped
                );

                if (pair.length === 2) {
                    pair.map(
                        (card) => card.matched = true
                    );
                }
            },

            unflipCards() {
                let flipped = this.getFlippedCards();

                if (flipped.length > 1) {
                    setTimeout(
                        () => flipped.map(
                            (card) => card.flipped = false
                        ), 1000
                    );
                }
            },

            updateGameProgress() {
                let pairedCards = this.getCheckedCards().length;
                let gameProgress = Math.ceil((pairedCards / this.numCards) * 100);
                let pairsLeft = (this.numCards - pairedCards) / 2;

                Event.$emit('updateGameProgress', gameProgress, pairsLeft);

                return gameProgress;
            },

            startTimer() {
                Event.$emit('updateGameTime', this.time);
                clearInterval(this.timer);

                if (this.time !== null) {
                    this.currentTime = 100;
                    Event.$emit('updateGameTime', this.currentTime);
                    let decrement = 100 / this.time;

                    this.timer = setInterval(
                        () => {
                            this.currentTime -= decrement;
                            Event.$emit('updateGameTime', this.currentTime);
                            if (this.currentTime < 0) {
                                clearInterval(this.timer);
                                Event.$emit('showStats', true, this.getScore());
                            }
                        }, 1000
                    );
                }
            },

            updateTotalFlips(mode) {
                this.totalFlips = (mode === 'reset') ? 0 : this.totalFlips + 1;
            },

            getScore() {
                let score = Math.ceil((this.getCheckedCards().length * 100) / this.totalFlips);
                return isNaN(score) ? 0 : score;
            },

            checkGameOver() {
                if (this.updateGameProgress() === 100) {
                    clearInterval(this.timer);
                    Event.$emit('showStats', true, this.getScore());
                }
            },

            showLoader() {
                Event.$emit('showLoader', true);
            },

            hideLoader() {
                Event.$emit('showLoader', false);
            }
        }
    }
</script>


<style lang="scss">

</style>
