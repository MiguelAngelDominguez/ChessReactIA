import React, { useState } from "react";
import { Chess } from "chess.js";
import PropTypes from "prop-types";
import Chessboard from "chessboardjsx";
// Initialize the chess game
const game = new Chess();

export const Minimax = () => {

  const [fen, setFen] = useState("start");

  // Define the position function
  const position = () => {
    return game.fen();
  };

  if (game.turn() === "w") {
    const moves = game.moves();
    const randomIndex = Math.floor(Math.random() * moves.length);
    const randomMove = moves[randomIndex];
    game.move(randomMove);
  }

  // Define the onDrop function
  const onDrop = ({ sourceSquare, targetSquare }) => {


    if (game.turn() === "b") {
      console.log("It's black's turn");
      console.log(`Black player moved from ${sourceSquare} to ${targetSquare}`);
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (move === null) {
        console.log("Invalid move by black player: ", move);
        return;
      }

      game.move(move);
      setFen(game.fen());
      console.log("It's black's turn");

    }
    if (game.turn() === "w") {
      console.log("It's white's turn");
      // Handle white player's move
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (move === null) {
        console.log("Invalid move by white player");
        return;
      }

      game.move(move);
      setFen(game.fen());
      console.log("It's white's turn");
      // Call the minimax algorithm for the white player here
      const bestMove = minimax(game, 3, -Infinity, Infinity, true).move;
      game.move(bestMove);
      setFen(game.fen());
    }
    return new Promise(resolve => {
      this.setState({ fen: game.fen() });  // Actualiza el estado del tablero de ajedrez
      resolve();
    }).then(() => this.engineGame().prepareMove());
  };

  // Define the minimax-alfabeta algorithm
  const minimax = (game, depth, alpha, beta, maximizingPlayer) => {
    console.log("se usa minimax")
    if (depth === 0 || game.game_over()) {
      return { move: null, value: evaluateBoard(game) };
    }

    let bestMove = null;
    let bestValue = maximizingPlayer ? -Infinity : Infinity;

    const moves = game.moves();
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      game.move(move);
      const value = minimax(
        game,
        depth - 1,
        alpha,
        beta,
        !maximizingPlayer
      ).value;
      game.undo();

      if (maximizingPlayer) {
        if (value > bestValue) {
          bestMove = move;
          bestValue = value;
        }
        alpha = Math.max(alpha, value);
      } else {
        if (value < bestValue) {
          bestMove = move;
          bestValue = value;
        }
        beta = Math.min(beta, value);
      }

      if (beta <= alpha) {
        break;
      }
    }

    return { move: bestMove, value: bestValue };
  };

  // Define the evaluation function
  const evaluateBoard = (game) => {
    // Count the material
    let material = 0;
    const board = game.board ? game.board() : [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const piece = board[i][j];
        if (piece !== null) {
          const value = piece.color === "w" ? piece.value : -piece.value;
          material += value;
        }
      }
    }
    return material;
  };

  // Initialize the board state
  const boardStyle = {
    borderRadius: "5px",
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
  };
  return (
    <Chessboard
      id="minimax"
      position={position()}
      width={320}
      onDrop={({ sourceSquare, targetSquare }) =>
        onDrop(sourceSquare, targetSquare)
      }
      boardStyle={boardStyle}
      orientation="black"
    />
  );
};
