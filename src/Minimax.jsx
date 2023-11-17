import { useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";

export const Minimax = () => {
  // Initialize the chess game
  const game = new Chess();

  // Define the position function
  const position = () => {
    return game.fen();
  };

  // Define the onDrop function
  const onDrop = ({ sourceSquare, targetSquare }) => {
    // Verificar si es el turno del algoritmo para mover
    if (game.turn() === "b") {
      // Llamar al algoritmo minimax-alfabeta para hacer un movimiento
      const bestMove = minimax(game, 3, -Infinity, Infinity, true).move;
      game.move(bestMove);
      setFen(game.fen());
      console.log("Es el turno de las negras");
      return;
    }
    if (game.turn() === "w") {
      console.log("Es el turno de las blancas");
      // Si es el turno del jugador, manejar el movimiento
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      // siempre promover a una reina por simplicidad del ejemplo

      // Si hubo un error, imprimir de quién era el turno y devolver la ficha movida a su posición anterior
      if (move === null) {
        console.log("Es el turno de las negras");
        game.undo();
        return;
      }

      // Si el movimiento es ilegal, retornar
      if (move === null) return;

      // Hacer el movimiento para el algoritmo minimax-alfabeta
      game.move(move);

      // Llamar al algoritmo minimax-alfabeta para hacer un movimiento
      const bestMove = minimax(game, 3, -Infinity, Infinity, true).move;
      game.move(bestMove);

      // Actualizar el tablero
      setFen(game.fen());
    }
  };

  // Define the minimax-alfabeta algorithm
  const minimax = (game, depth, alpha, beta, maximizingPlayer) => {
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
    const board = game.board();
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
  const [fen, setFen] = useState(game.fen());
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
      orientation="white"
    />
  );
};
