import React, { Component } from "react";
import Chessboard from "chessboardjsx";
import Stockfish from "./Stockfish";

export const ChessboarPLay = () => {
    const boardsContainer = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    };
    const boardStyle = {
        borderRadius: "5px",
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
    };
    return (
        <div style={boardsContainer}>
            <Stockfish>
                {({ position, onDrop }) => (
                    <Chessboard
                        id="stockfish"
                        position={position}
                        width={320}
                        onDrop={onDrop}
                        boardStyle={boardStyle}
                        orientation="black"
                    />
                )}
            </Stockfish>
        </div>
    )
}


