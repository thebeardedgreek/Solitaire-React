// Utils.js

export const canAddToFoundation = (suit, value, foundationPiles) => {
    // Get the top card of the foundation pile for the given suit
    const topCard = foundationPiles[suit][foundationPiles[suit].length - 1];

    // If the foundation pile is empty, the card must be an Ace to be added
    if (!topCard) {
        return value === 'A';
    }

    // Determine the expected next value for the given suit
    const expectedValue = getNextFoundationCardValue(topCard.value);

    // Check if the value of the card being added is the expected next value
    return value === expectedValue;
};

// Helper function to get the next expected value for the foundation pile
const getNextFoundationCardValue = (currentValue) => {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const currentIndex = values.indexOf(currentValue);
    return values[currentIndex + 1]; // Return the next value in the sequence
};


export const canAddToTableau = (suit, value, tableau) => {
    // Check if the tableau is empty
    if (tableau.length === 0) {
        // Only allow adding a King to an empty tableau
        return value === 'K';
    }

    // Get the top card of the last stack in the tableau
    const topCard = tableau[tableau.length - 1][tableau[tableau.length - 1].length - 1];

    // Check if the value of the card being added is one less than the value of the top card
    // and the colors are different (red and black)
    if (
        parseInt(value) === parseInt(topCard.value) - 1 &&
        ((suit === 'hearts' || suit === 'diamonds') && (topCard.suit === 'clubs' || topCard.suit === 'spades')) ||
        ((suit === 'clubs' || suit === 'spades') && (topCard.suit === 'hearts' || topCard.suit === 'diamonds'))
    ) {
        return true;
    }

    return false;
};

export const onDrop = (destination, suit, value) => {
    // Logic for handling the drop event
    console.log(`Dropped card ${value} of ${suit} to ${destination}`);
    // Implement state update or other logic here
};


export const handleStockCardClick = (stockPile1, stockPile2, setStockPile1, setStockPile2) => {
    // Check if there are cards in the first stock pile
    if (stockPile1.length > 0) {
        // Get the last card from the first stock pile
        const lastCard = stockPile1[stockPile1.length - 1];

        // Remove the last card from the first stock pile
        const newStockPile1 = stockPile1.slice(0, -1);

        // Add the last card to the second stock pile
        const newStockPile2 = [...stockPile2, lastCard];

        // Update the stock piles state
        setStockPile1(newStockPile1);
        setStockPile2(newStockPile2);
    }
};

export const handleDrop = (destination, suit, value, tableau, canAddToFoundation, canAddToTableau, onDrop) => {
    // Logic for handling the drop based on the destination
    switch (destination) {
        case 'foundation':
            // Check if the dropped card can be added to the Foundation pile
            if (canAddToFoundation(suit, value)) {
                // Implement state update logic here for adding card to Foundation pile
                console.log(`Card added to Foundation: ${value} of ${suit}`);
            } else {
                console.log('Cannot add card to Foundation');
            }
            break;
        case 'tableau':
            // Check if the dropped card can be added to the Tableau stack
            if (canAddToTableau(suit, value, tableau)) {
                // Implement state update logic here for adding card to Tableau stack
                const newTableau = [...tableau];
                const stackIndex = newTableau.findIndex(stack => stack.length > 0 && stack[stack.length - 1].suit === suit);
                newTableau[stackIndex] = [...newTableau[stackIndex], { suit, value }];
                onDrop(destination, suit, value, newTableau); // Call onDrop callback with updated tableau state
                console.log(`Card added to Tableau: ${value} of ${suit}`);
            } else {
                console.log('Cannot add card to Tableau');
            }
            break;
        default:
            console.log('Invalid destination');
    }
};



export const handleDragOver = (event) => {
    // Prevent default behavior to allow dropping
    event.preventDefault();
};


