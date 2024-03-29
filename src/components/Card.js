// Card.js

import React from 'react';
import '../styles/Card.scss';

const Card = ({ suit, value, isFaceDown, onClick }) => {
    const handleDragStart = (event) => {
        // Set data to transfer when dragging starts
        event.dataTransfer.setData('text/plain', `${suit}-${value}`);
    };

    return (
        <div
            className={`card ${suit} ${isFaceDown ? 'face-down' : ''}`}
            draggable={!isFaceDown} // Only draggable if face up
            onDragStart={handleDragStart}
            onClick={onClick}
        >
            <span className="value">{value}</span>
            <span className="suit">{suit}</span>
        </div>
    );
};

export default Card;
