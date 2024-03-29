import React from 'react';
import '../styles/Foundation.scss';

const Foundation = ({ suit, onDrop }) => {
    const symbols = {
        hearts: '♥',
        diamonds: '♦',
        clubs: '♣',
        spades: '♠'
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const [draggedSuit, draggedValue] = data.split('-');
        onDrop(draggedSuit, draggedValue);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className={`foundation ${suit}`} onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="foundation-symbol">
                {symbols[suit]}
            </div>
        </div>
    );
};

export default Foundation;
