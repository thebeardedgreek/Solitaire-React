import React from 'react';
import Card from './Card';
import '../styles/Stack.scss';

const Stack = ({ cards, onDrop }) => {
    const handleDrop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const [suit, value] = data.split('-');
        onDrop(suit, value);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="stack" onDrop={handleDrop} onDragOver={handleDragOver}>
            {cards.map((card, index) => (
                <Card key={index} suit={card.suit} value={card.value} isFaceDown={index !== cards.length - 1} />
            ))}
        </div>
    );
};

export default Stack;
