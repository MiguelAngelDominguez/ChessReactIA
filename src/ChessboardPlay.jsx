import { useState } from "react";
import React, { Component } from "react";
import Chessboard from "chessboardjsx";

import { Minimax } from "./Minimax";
import { StockfishChess } from "./integrations/Stockfish.jsx";
import { WithMoveValidation } from "./integrations/WithMoveValidation.jsx";



export const ChessboardPlay = () => {
  // const boardsContainer = {
  //   display: "flex",
  //   justifyContent: "space-around",
  //   alignItems: "center",
  // };

  const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100vw",
    marginTop: 30,
    marginBottom: 50
  };

  return (
    // <div style={boardsContainer}>
    //   <Minimax />
    // </div>
    // <div style={boardsContainer}>
    //   <StockfishChess/>
    // </div>
    <div style={boardsContainer}>
      <WithMoveValidation />
    </div>
  );
};
