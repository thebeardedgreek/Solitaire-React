import React, { useState } from 'react';
import Stack from './Stack';
import Foundation from './Foundation';
import Card from './Card';
import { handleStockCardClick, handleDrop, handleDragOver, onDrop } from './Utils';
import '../styles/Board.scss';

const Board = ({ stacks, tableau, stock, canAddToFoundation, canAddToTableau, onDrop }) => {
    const [stockPile1, setStockPile1] = useState(stock);
    const [stockPile2, setStockPile2] = useState([]);

    const handleStockClick = () => {
        handleStockCardClick(stockPile1, stockPile2, setStockPile1, setStockPile2);
    };

    const handleDropEvent = (event) => {
        const data = event.dataTransfer.getData('text/plain');
        const [suit, value] = data.split('-');
        handleDrop('tableau', suit, value, tableau, canAddToFoundation, canAddToTableau, onDrop);
    };

    return (
        <div className="board" onDragOver={handleDragOver} onDrop={handleDropEvent}>
            {/* Foundation piles */}
            <div className="foundation-piles">
                <Foundation suit="hearts" cards={[]} onDrop={onDrop} />
                <Foundation suit="diamonds" cards={[]} onDrop={onDrop} />
                <Foundation suit="clubs" cards={[]} onDrop={onDrop} />
                <Foundation suit="spades" cards={[]} onDrop={onDrop} />
            </div>

            {/* Tableau and stock piles */}
            <div className="tableau-stock">
                {/* Tableau */}
                <div className="tableau">
                    {tableau.map((stack, index) => (
                        <Stack key={index} cards={stack} onDrop={onDrop} />
                    ))}
                </div>

                {/* Stock piles */}
                <div className="stock">
                    <div className="stock-pile">
                        {stockPile1.map((card, index) => (
                            <Card
                                key={index}
                                suit={card.suit}
                                value={card.value}
                                isFaceDown={index !== stockPile1.length - 1}
                                onClick={handleStockClick}
                            />
                        ))}
                    </div>
                    <div className="stock-pile">
                        {stockPile2.map((card, index) => (
                            <Card key={index} suit={card.suit} value={card.value} isFaceDown={true} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Board;
