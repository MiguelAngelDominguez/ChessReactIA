import React, { Component } from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js"
import Chessboard from "chessboardjsx";


const chess = new Chess()

export const ChessboardBody = ({w,position,roughSquare,id}) => {

  return (
    <div id={id} className="board">
      <Chessboard
        // Esta linea de codigo coloca piezas de muestra 
        // fuera del tablero
        // sparePieces={true}
        width={w}
        id="random"
        
        position={position}
        transitionDuration={300}
        roughSquare={roughSquare}
        boardStyle={{
          borderRadius: "5px",
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
        }}
        lightSquareStyle={{ backgroundColor: "rgba(25, 202, 233, 0.671)" }}
        darkSquareStyle={{ backgroundColor: "rgb(20, 75, 92)" }}
      />
    </div>
    
  )
}
