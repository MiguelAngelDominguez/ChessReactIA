import { useState } from "react";
import React, { Component } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { Minimax } from "./Minimax";
import {Stockfish} from "./integrations/Stockfish.jsx";



export const ChessboardPlay = () => {
  const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  return (
    <div style={boardsContainer}>
      <Minimax />
    </div>
    // <div style={boardsContainer}>
    //   <Stockfish>
    //     {({ position, onDrop }) => (
    //       <Chessboard
    //         id="stockfish"
    //         position={position}
    //         width={320}
    //         onDrop={onDrop}
    //         boardStyle={boardStyle}
    //         orientation="black"
    //       />
    //     )}
    //   </Stockfish>
    // </div>
  );
};
