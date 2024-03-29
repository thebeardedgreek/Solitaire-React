// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import './index.css';
import { handleDrop, handleDragOver, canAddToFoundation, canAddToTableau } from './components/Utils';

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Create a deck of cards
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const deck = [];
for (const suit of suits) {
    for (const value of values) {
        deck.push({ suit, value });
    }
}

// Shuffle the deck
const shuffledDeck = shuffleArray(deck);

// Distribute cards to tableau and stock
const tableau = [];
const stock = [];
for (let i = 0; i < 7; i++) {
    tableau.push(shuffledDeck.splice(0, i + 1));
}
stock.push(...shuffledDeck);

const handleDropEvent = (destination, suit, value) => {
    handleDrop(destination, suit, value, tableau, canAddToFoundation, canAddToTableau); // Pass tableau to canAddToTableau
};

const handleDragOverEvent = (event) => {
    handleDragOver(event);
};

ReactDOM.render(
    <Board
        tableau={tableau}
        stock={stock}
        onDrop={handleDropEvent} // Pass handleDropEvent, not onDrop directly
        onDragOver={handleDragOverEvent}
        canAddToFoundation={canAddToFoundation}
        canAddToTableau={canAddToTableau}
    />,
    document.getElementById('root')
);
