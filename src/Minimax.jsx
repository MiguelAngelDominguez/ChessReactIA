import { useState } from "react";
import { Chess } from "chess.js";


export default Minimax = () => {

    // Initialize the chess game
    const game = new Chess();


    // Define the position function
    const position = () => {
        return game.fen();
    };

    // Define the onDrop function
    const onDrop = ({ sourceSquare, targetSquare }) => {
        // Check if it's the algorithm's turn to move
        if (game.turn() === "b") {
            // Call the minimax-alfabeta algorithm to make a move
            const bestMove = minimax(game, 3, -Infinity, Infinity, true).move;
            game.move(bestMove);
            setFen(game.fen());
            return;
        }

        // If it's the player's turn, handle the move
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q" // always promote to a queen for example simplicity
        });

        // If the move is illegal, return
        if (move === null) return;

        // Make the move for the minimax-alfabeta algorithm
        game.move(move);

        // Call the minimax-alfabeta algorithm to make a move
        const bestMove = minimax(game, 3, -Infinity, Infinity, true).move;
        game.move(bestMove);

        // Update the board
        setFen(game.fen());
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
            const value = minimax(game, depth - 1, alpha, beta, !maximizingPlayer).value;
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
    
}
