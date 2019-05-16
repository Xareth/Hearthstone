export default class DeckModel {
    constructor(cards) {
        this.cards = cards;
        this.deck = [];
        this.cardsInDeckNum = 0;
        this.deckManaChart = {}
    }

    updateDeckManaChart() {
        const initialManaChart = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
        }

        for (let card of this.deck) {
            const cardManaCost = card.cost;
            const cardOccuresOneTimeInDeck = card.occurance === 1;
            const manaCountToIncrease = cardOccuresOneTimeInDeck ? 1 : 2;

            initialManaChart[cardManaCost] += manaCountToIncrease;
        }
        this.deckManaChart = {...initialManaChart}
    }

    checkIfCardCanBeAdded(cardInDeck) {
        const cardRarity = cardInDeck.rarity;
        if (cardInDeck.occurance === 1 && cardRarity !== "LEGENDARY") {
            return true;
        } else {
            return false;
        }
    }

    addCardToDeck(cardId) {
        const cardInDeck = this.deck.find(card => card.id === cardId);

        if (cardInDeck) {
            const isAnotherCardCanBeAdded = this.checkIfCardCanBeAdded(cardInDeck);
            if (isAnotherCardCanBeAdded) {
                cardInDeck.occurance += 1;
                this.cardsInDeckNum += 1;
                this.updateDeckManaChart();
            }
        } else {
            const card = this.cards.filter(card => card.id === cardId)[0];
            card.occurance = 1;
            this.deck.push(card);
            this.cardsInDeckNum += 1;
            this.updateDeckManaChart();
        }
        console.log(this.deck)
        console.log(`There are ${this.cardsInDeckNum} cards in the deck`)
    }

    removeCardFromDeck(cardId) {
        const cardInDeck = this.deck.find(card => card.id === cardId);

        if (cardInDeck) {
            if(cardInDeck.occurance === 2) {
                cardInDeck.occurance -= 1;
                this.cardsInDeckNum -= 1;
                this.updateDeckManaChart();
            } else {
                this.deck = this.deck.filter(card => card.id !== cardId)
                this.cardsInDeckNum -= 1;
                this.updateDeckManaChart();
            }
        }
        console.log(this.deck)
        console.log(`There are ${this.cardsInDeckNum} cards in the deck`)
    }
}