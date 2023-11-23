import React, { Component } from "react";  // Importar React y Component desde "react"
import PropTypes from "prop-types";  // Importar PropTypes desde "prop-types"
import { Chess } from "chess.js"; // Importar Chess desde "chess.js"

import Chessboard from "chessboardjsx";  // Importar Chessboard desde "chessboardjsx"

const pieceSquareTable = {
    p: [
        0, 0, 0, 0, 0, 0, 0, 0,
        50, 50, 50, 50, 50, 50, 50, 50,
        10, 10, 20, 30, 30, 20, 10, 10,
        5, 5, 10, 25, 25, 10, 5, 5,
        0, 0, 0, 20, 20, 0, 0, 0,
        5, -5, -10, 0, 0, -10, -5, 5,
        5, 10, 10, -20, -20, 10, 10, 5,
        0, 0, 0, 0, 0, 0, 0, 0
    ],
    n: [
        -50, -40, -30, -30, -30, -30, -40, -50,
        -40, -20, 0, 0, 0, 0, -20, -40,
        -30, 0, 10, 15, 15, 10, 0, -30,
        -30, 5, 15, 20, 20, 15, 5, -30,
        -30, 0, 15, 20, 20, 15, 0, -30,
        -30, 5, 10, 15, 15, 10, 5, -30,
        -40, -20, 0, 5, 5, 0, -20, -40,
        -50, -40, -30, -30, -30, -30, -40, -50
    ],
    b: [
        -20, -10, -10, -10, -10, -10, -10, -20,
        -10, 0, 0, 0, 0, 0, 0, -10,
        -10, 0, 5, 10, 10, 5, 0, -10,
        -10, 5, 5, 10, 10, 5, 5, -10,
        -10, 0, 10, 10, 10, 10, 0, -10,
        -10, 10, 10, 10, 10, 10, 10, -10,
        -10, 5, 0, 0, 0, 0, 5, -10,
        -20, -10, -10, -10, -10, -10, -10, -20
    ],
    r: [
        0, 0, 0, 0, 0, 0, 0, 0,
        5, 10, 10, 10, 10, 10, 10, 5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        0, 0, 0, 5, 5, 0, 0, 0
    ],
    q: [
        -20, -10, -10, -5, -5, -10, -10, -20,
        -10, 0, 0, 0, 0, 0, 0, -10,
        -10, 0, 5, 5, 5, 5, 0, -10,
        -5, 0, 5, 5, 5, 5, 0, -5,
        0, 0, 5, 5, 5, 5, 0, -5,
        -10, 5, 5, 5, 5, 5, 0, -10,
        -10, 0, 5, 0, 0, 0, 0, -10,
        -20, -10, -10, -5, -5, -10, -10, -20
    ],
    k_midgame: [
        -30, -40, -40, -50, -50, -40, -40, -30,
        -30, -40, -40, -50, -50, -40, -40, -30,
        -30, -40, -40, -50, -50, -40, -40, -30,
        -30, -40, -40, -50, -50, -40, -40, -30,
        -20, -30, -30, -40, -40, -30, -30, -20,
        -10, -20, -20, -20, -20, -20, -20, -10,
        20, 20, 0, 0, 0, 0, 20, 20,
        20, 30, 10, 0, 0, 10, 30, 20
    ],
    k_endgame: [
        -50, -40, -30, -20, -20, -30, -40, -50,
        -30, -20, -10, 0, 0, -10, -20, -30,
        -30, -10, 20, 30, 30, 20, -10, -30,
        -30, -10, 30, 40, 40, 30, -10, -30,
        -30, -10, 30, 40, 40, 30, -10, -30,
        -30, -10, 20, 30, 30, 20, -10, -30,
        -30, -30, 0, 0, 0, 0, -30, -30,
        -50, -30, -30, -30, -30, -30, -30, -50
    ],
};

class HumanVsHuman extends Component {  // Crear la clase HumanVsHuman que extiende de Component
    state = {
        fen: "start",  // Estado inicial del tablero de ajedrez
        // Estilos de los cuadros para el cuadro de destino activo
        dropSquareStyle: {},
        // Estilos de los cuadros personalizados
        squareStyles: {},
        // Cuadro con la pieza clickeada actualmente
        pieceSquare: "",
        // Cuadro clickeado actualmente
        square: "",
        // Arreglo de movimientos pasados del juego
        history: []
    };

    componentDidMount() {  // Método que se ejecuta después de que el componente es montado
        this.game = new Chess();  // Inicializar el juego de ajedrez
    }

    // Mantener el estilo del cuadro clickeado y remover los cuadros de sugerencia
    removeHighlightSquare = () => {
        this.setState(({ pieceSquare, history }) => ({
            squareStyles: squareStyling({ pieceSquare, history })  // Aplicar estilos al cuadro
        }));
    };

    // Mostrar los movimientos posibles
    highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background:
                                "radial-gradient(circle, #fffc00 36%, transparent 40%)",  // Estilo de fondo
                            borderRadius: "50%"  // Estilo de borde
                        }
                    },
                    ...squareStyling({
                        history: this.state.history,
                        pieceSquare: this.state.pieceSquare
                    })  // Aplicar estilos al cuadro
                };
            },
            {}
        );

        this.setState(({ squareStyles }) => ({
            squareStyles: { ...squareStyles, ...highlightStyles }  // Aplicar estilos al cuadro
        }));
    };


    onDrop = ({ sourceSquare, targetSquare }) => {
        // Realiza el movimiento en el juego de ajedrez
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "k"  // Siempre promover a una reina por simplicidad
        });
        console.log(this.game.history().length)
        console.log(this.game.turn())
        if (this.game.turn() === "w" && this.game.history().length === 0) {
            const moves = this.game.moves({ verbose: true });
            const randomIndex = Math.floor(Math.random() * moves.length);
            const randomMove = moves[randomIndex];
            this.game.move(randomMove);
            this.setState(({ history, pieceSquare }) => ({
                fen: this.game.fen(),
                history: this.game.history({ verbose: true }),
                squareStyles: squareStyling({ pieceSquare, history })
            }));
        }

        // Verifica si el movimiento es ilegal
        if (move === null) return;
        // Actualiza el estado del tablero y el historial del juego
        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));
        // Implementa la función minimax para el turno de las blancas
        if (this.game.turn() === "w") {
            const { move: bestMove, value: bestValue } = this.minimax(this.game, 4, -Infinity, Infinity, true);
            console.log("bestMove: ", bestMove)
            console.log("bestValue: ", bestValue)

            this.game.move(bestMove);
            this.setState(({ history, pieceSquare }) => ({
                fen: this.game.fen(),
                history: this.game.history({ verbose: true }),
                squareStyles: squareStyling({ pieceSquare, history })
            }));
        }
    };

    minimax = (game, depth, alpha, beta, maximizingPlayer, lastPieceSquare) => {
        if (depth === 0 || game.game_over()) {
            return { move: null, value: this.evaluateBoard(game) };
        }

        let bestMove = null;
        let bestValue = maximizingPlayer ? -Infinity : Infinity;

        const playerColor = maximizingPlayer ? "w" : "b";
        const moves = [];

        // Generar todos los movimientos posibles para las piezas del jugador actual
        game.SQUARES.forEach((square) => {
            const piece = game.get(square);

            if (piece && piece.color === playerColor) {
                const pieceMoves = game.moves({ square, verbose: true });

                pieceMoves.forEach((move) => {
                    moves.push(move);
                });
            }
        });

        for (let i = 0; i < moves.length; i++) {
            const move = moves[i];

            game.move(move);
            const value = this.minimax(
                game,
                depth - 1,
                alpha,
                beta,
                !maximizingPlayer,
                move.to
            ).value;
            game.undo();

            // Introduce una probabilidad ponderada para elegir entre diferentes piezas
            const probability = Math.random();
            const useDifferentPiece = probability > 0.7;

            if (useDifferentPiece || i === 0) {
                bestMove = move;
                bestValue = value;
            } else if (maximizingPlayer && value > bestValue) {
                bestMove = move;
                bestValue = value;
            } else if (!maximizingPlayer && value < bestValue) {
                bestMove = move;
                bestValue = value;
            }

            if (maximizingPlayer) {
                alpha = Math.max(alpha, bestValue);
            } else {
                beta = Math.min(beta, bestValue);
            }

            if (beta <= alpha) {
                break;
            }
        }

        return { move: bestMove, value: bestValue };
    };

    // minimax = (game, depth, alpha, beta, maximizingPlayer) => {
    //     if (depth === 0 || game.game_over()) {
    //         return { move: null, value: this.evaluateBoard(game) };
    //     }

    //     let bestMove = null;
    //     let bestValue = maximizingPlayer ? -Infinity : Infinity;

    //     const playerColor = maximizingPlayer ? "w" : "b";
    //     const moves = game.moves({ verbose: true });

    //     // Shuffle the array of moves for randomness
    //     for (let i = moves.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [moves[i], moves[j]] = [moves[j], moves[i]];
    //     }

    //     for (let i = 0; i < moves.length; i++) {
    //         const move = moves[i];

    //         if (game.get(move.from).color === playerColor) {
    //             game.move(move);
    //             const value = this.minimax(
    //                 game,
    //                 depth - 1,
    //                 alpha,
    //                 beta,
    //                 !maximizingPlayer
    //             ).value;
    //             game.undo();

    //             if (maximizingPlayer) {
    //                 if (value > bestValue) {
    //                     bestMove = move;
    //                     bestValue = value;
    //                 }
    //                 alpha = Math.max(alpha, bestValue);
    //             } else {
    //                 if (value < bestValue) {
    //                     bestMove = move;
    //                     bestValue = value;
    //                 }
    //                 beta = Math.min(beta, bestValue);
    //             }

    //             if (beta <= alpha) {
    //                 break;
    //             }
    //         }
    //     }

    //     return { move: bestMove, value: bestValue };
    // };

    isSquareProtected = (game, square, protectorColor) => {
        const opponentsColor = protectorColor === "w" ? "b" : "w";

        // Obtener todas las piezas del oponente
        const opponentsPieces = game.SQUARES.map((s) => game.get(s)).filter(
            (piece) => piece && piece.color === opponentsColor
        );

        // Verificar si alguna de las piezas del oponente protege la casilla
        for (const opponentPiece of opponentsPieces) {
            const opponentMoves = game.moves({
                square: opponentPiece.square,
                verbose: true,
            });

            for (const move of opponentMoves) {
                if (move.to === square) {
                    return true; // La casilla está protegida por una pieza más grande
                }
            }
        }

        return false;
    };


    canCapturePiece = (game, square) => {
        const piece = game.get(square);
        const opponentColor = piece.color === "w" ? "b" : "w";

        // Obtener movimientos posibles para la pieza
        const moves = game.moves({ square, verbose: true });

        // Evaluar cada movimiento para ver si captura una pieza del oponente
        for (const move of moves) {
            const targetSquare = move.to;
            const targetPiece = game.get(targetSquare);

            if (targetPiece && targetPiece.color === opponentColor) {
                // Comprobar si la pieza objetivo está en una posición vulnerable
                if (!this.isSquareProtected(game, targetSquare, opponentColor)) {
                    return true; // Puede capturar una pieza del oponente
                }
            }
        }

        return false;
    };

    evaluateBoard = (game) => {
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

        // Add positional evaluation based on piece-square tables
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const piece = board[i][j];
                if (piece !== null) {
                    const value =
                        piece.color === "w"
                            ? piece.value + pieceSquareTable[piece.type][i * 8 + j]
                            : -piece.value - pieceSquareTable[piece.type][i * 8 + j];
                    material += value;
                }
            }
        }

        // Evaluar oportunidades de captura
        const canCapture = game.SQUARES.some((square) => {
            const piece = game.get(square);
            return piece && piece.color === "w" && this.canCapturePiece(game, square);
        });

        // Ponderar la evaluación basada en las oportunidades de captura
        material += canCapture ? 10 : 0;

        return material;
    };


    onMouseOverSquare = (square) => {
        // Obtener la lista de movimientos posibles para este cuadro
        let moves = this.game.moves({
            square: square,
            verbose: true
        });

        // Salir si no hay movimientos disponibles para este cuadro
        if (moves.length === 0) return;

        let squaresToHighlight = [];
        for (var i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }

        this.highlightSquare(square, squaresToHighlight);  // Resaltar el cuadro con los movimientos posibles
    };

    onMouseOutSquare = (square) => this.removeHighlightSquare(square);  // Remover el resaltado del cuadro

    // Los cuadros centrales obtienen diferentes estilos de dropSquare
    onDragOverSquare = (square) => {
        this.setState({
            dropSquareStyle:
                square === "e4" || square === "d4" || square === "e5" || square === "d5"
                    ? { backgroundColor: "cornFlowerBlue" }  // Estilo de fondo
                    : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }  // Estilo de sombra
        });
    };

    onSquareClick = (square) => {
        this.setState(({ history }) => ({
            squareStyles: squareStyling({ pieceSquare: square, history }),  // Aplicar estilos al cuadro
            pieceSquare: square  // Actualizar el cuadro de la pieza
        }));

        let move = this.game.move({
            from: this.state.pieceSquare,
            to: square,
            promotion: "q"  // Siempre promover a una reina por simplicidad
        });

        // Movimiento ilegal
        if (move === null) return;

        this.setState({
            fen: this.game.fen(),  // Actualizar el estado del tablero
            history: this.game.history({ verbose: true }),  // Actualizar el historial del juego
            pieceSquare: ""  // Reiniciar el cuadro de la pieza
        });
    };

    onSquareRightClick = (square) =>
        this.setState({
            squareStyles: { [square]: { backgroundColor: "deepPink" } }  // Aplicar estilos al cuadro
        });

    render() {
        const { fen, dropSquareStyle, squareStyles } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            onMouseOverSquare: this.onMouseOverSquare,
            onMouseOutSquare: this.onMouseOutSquare,
            onDrop: this.onDrop,
            dropSquareStyle,
            onDragOverSquare: this.onDragOverSquare,
            onSquareClick: this.onSquareClick,
            onSquareRightClick: this.onSquareRightClick
        });
    }
}


export const WithMoveValidation = () => {  // Exportar la función WithMoveValidation
    return (  // Retornar
        <div>
            <HumanVsHuman>
                {({  // Desestructurar las propiedades y funciones necesarias
                    position,
                    onDrop,
                    onMouseOverSquare,
                    onMouseOutSquare,
                    squareStyles,
                    dropSquareStyle,
                    onDragOverSquare,
                    onSquareClick,
                    onSquareRightClick
                }) => (  // Función de renderizado
                    <Chessboard  // Componente Chessboard
                        id="humanVsHuman"  // ID "humanVsHuman"
                        width={600}  // Ancho 320
                        position={position}  // Posición
                        onDrop={onDrop}  // Función onDrop
                        onMouseOverSquare={onMouseOverSquare}  // Función onMouseOverSquare
                        onMouseOutSquare={onMouseOutSquare}  // Función onMouseOutSquare
                        boardStyle={{  // Estilo del tablero
                            borderRadius: "5px",  // Radio de borde 5px
                            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`  // Sombra
                        }}
                        squareStyles={squareStyles}  // Estilos de los cuadros
                        dropSquareStyle={dropSquareStyle}  // Estilo del cuadro de destino
                        onDragOverSquare={onDragOverSquare}  // Función onDragOverSquare
                        onSquareClick={onSquareClick}  // Función onSquareClick
                        onSquareRightClick={onSquareRightClick}  // Función onSquareRightClick
                        orientation="black"
                    />
                )}
            </HumanVsHuman>
        </div>
    );
}

export const squareStyling = ({ pieceSquare, history }) => {  // Exportar la función squareStyling con pieceSquare y history como parámetros
    const sourceSquare = history.length && history[history.length - 1].from;  // Obtener el cuadro de origen
    const targetSquare = history.length && history[history.length - 1].to;  // Obtener el cuadro de destino

    return {  // Retornar un objeto con los estilos de los cuadros
        [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },  // Establecer el fondo del cuadro clickeado
        ...(history.length && {  // Comprobar si hay historial
            [sourceSquare]: {  // Establecer el fondo del cuadro de origen
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        }),
        ...(history.length && {  // Comprobar si hay historial
            [targetSquare]: {  // Establecer el fondo del cuadro de destino
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        })
    };
};