// Declaración de variables
var board = null // Variable para el tablero
var game = new Chess() // Inicialización del juego
var positionCount = 0 // Contador de posiciones

// Colores para las casillas
var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'

// Función para contar las piezas en el tablero
function piecesCount(board) {
    // Vaciar los contenedores de piezas blancas y negras
    $(".whitePieces").empty()
    $(".blackPieces").empty()

    // Contadores para cada tipo de pieza negra
    var countPawnsBlack = 0
    var countRocksBlack = 0
    var countKnightsBlack = 0
    var countQueenBlack = 0
    var countBishopsBlack = 0

    // Contadores para cada tipo de pieza blanca
    var countPawnsWhite = 0
    var countKnightsWhite = 0
    var countBishopsWhite = 0
    var countRooksWhite = 0
    var countQueenWhite = 0

    // Recorrer el tablero
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            var piece = board[i][j] // Obtener la pieza en la posición actual

            // Si no hay pieza, continuar con la siguiente iteración
            if (piece === null) {
                continue
            }

            // Si la pieza es un peón
            if (piece.type === 'p') {
                // Si es blanco, incrementar el contador de peones blancos
                if (piece.color === 'w') {
                    countPawnsWhite++
                } else { // Si no, incrementar el contador de peones negros
                    countPawnsBlack++
                }
            }

            // Si la pieza es un caballo
            if (piece.type === 'n') {
                // Si es blanco, incrementar el contador de caballos blancos
                if (piece.color === 'w') {
                    countKnightsWhite++
                } else { // Si no, incrementar el contador de caballos negros
                    countKnightsBlack++
                }
            }

            // Si la pieza es un alfil
            if (piece.type === 'b') {
                // Si es blanco, incrementar el contador de alfiles blancos
                if (piece.color === 'w') {
                    countBishopsWhite++
                } else { // Si no, incrementar el contador de alfiles negros
                    countBishopsBlack++
                }
            }

            // Si la pieza es una torre
            if (piece.type === 'r') {
                // Si es blanco, incrementar el contador de torres blancas
                if (piece.color === 'w') {
                    countRooksWhite++
                } else { // Si no, incrementar el contador de torres negras
                    countRocksBlack++
                }
            }

            // Si la pieza es una reina
            if (piece.type === 'q') {
                // Si es blanco, incrementar el contador de reinas blancas
                if (piece.color === 'w') {
                    countQueenWhite++
                } else { // Si no, incrementar el contador de reinas negras
                    countQueenBlack++
                }
            }
        }
    }

    // Agregar las imágenes de las piezas blancas y negras a sus respectivos contenedores
    for (var i = 0; i < 8 - countPawnsWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wP.png" alt="" width="30px" height="30px">')
    for (var i = 0; i < 8 - countPawnsBlack; i++) $(".blackPieces").append('<img  style="float: left;" src="img/chesspieces/chess24/bP.png" alt="" width="30px" height="30px">')
    for (var i = 0; i < 2 - countRooksWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wR.png" alt="" width="30px" height="30px">')
    for (var i = 0; i < 2 - countRocksBlack; i++) $(".blackPieces").append('<img src="img/chesspieces/chess24/bR.png" alt="" width="30px" height="30px">')
    for (var i = 0; i < 2 - countBishopsWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wB.png" alt="" width="30px" height="30px">')
    for (var i = 0; i < 2 - countBishopsBlack; i++) $(".blackPieces").append('<img src="img/chesspieces/chess24/bB.png" alt="" width="30px" height="30px">')
    for (var i = 0; i < 2 - countKnightsWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wN.png" alt="" width="30px" height="30px">')
    for (var i = 0; i < 2 - countKnightsBlack; i++) $(".blackPieces").append('<img src="img/chesspieces/chess24/bN.png" alt="" width="30px" height="30px">')
    for (var i = 0; i < 1 - countQueenWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wQ.png" alt="" width="30px" height="30px">')
    for (var i = 0; i < 1 - countQueenBlack; i++) $(".blackPieces").append('<img src="img/chesspieces/chess24/bQ.png" alt="" width="30px" height="30px">')
}

// Función para remover el color gris de las casillas
function removeGreySquares() {
    $('#myBoard .square-55d63').css('background', '')
}

// Función para colorear una casilla de gris
function greySquare(square) {
    var $square = $('#myBoard .square-' + square) // Obtener la casilla

    var background = whiteSquareGrey // Color por defecto
    if ($square.hasClass('black-3c85d')) { // Si la casilla es negra, cambiar el color
        background = blackSquareGrey
    }

    $square.css('background', background) // Aplicar el color
}

// Función que se ejecuta al iniciar el arrastre de una pieza
function onDragStart(source, piece, position, orientation) {
    // No permitir mover piezas si el juego ha terminado
    if (game.game_over()) {
        return false
    }

    // Solo permitir mover piezas blancas
    if (piece.search(/^b/) !== -1) return false
}

// Función para renderizar el historial de movimientos
function renderMoveHistory(moves) {
    var historyElement = $('#move-history').empty(); // Obtener el elemento del historial y vaciarlo
    historyElement.empty();
    for (var i = 0; i < moves.length; i = i + 2) { // Recorrer los movimientos
        // Agregar cada movimiento al historial
        historyElement.append('<span>' + moves[i] + ' ' + (moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
    }
    // Hacer scroll al final del historial
    historyElement.scrollTop(historyElement[0].scrollHeight);
}

// Función para hacer el mejor movimiento
function makeBestMove() {
    positionCount = 0 // Reiniciar el contador de posiciones
    var depth = 3 // Profundidad de la búsqueda

    var bestMove = minimaxRoot(depth, game, true) // Obtener el mejor movimiento

    game.move(bestMove) // Realizar el movimiento
    board.position(game.fen()) // Actualizar la posición del tablero
    
    // Si el juego ha terminado, mostrar un mensaje
    if (game.game_over()) {
        swal("Se termino el juego!", "");
    }
    return bestMove
}

// Función para obtener el mejor movimiento usando el algoritmo minimax
function minimaxRoot(depth, game, isMaximisingPlayer) {
    var gameMoves = game.moves() // Obtener los movimientos posibles
    var bestValue = -100000 // Valor inicial del mejor valor
    var bestMove = null // Movimiento inicial del mejor movimiento
    for (var i = 0; i < gameMoves.length; i++) { // Recorrer los movimientos
        var newMove = gameMoves[i] // Obtener el movimiento actual
        game.move(newMove) // Realizar el movimiento

        // Obtener el valor del movimiento
        var value = minimax(depth - 1, game, -100000, 100000, !isMaximisingPlayer)
        game.undo() // Deshacer el movimiento

        // Si el valor es mayor o igual al mejor valor, actualizar el mejor valor y el mejor movimiento
        if (value >= bestValue) {
            bestValue = value
            bestMove = newMove
        }
    }

    return bestMove // Devolver el mejor movimiento
}

// Función para el algoritmo minimax
function minimax(depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++; // Incrementar el contador de posiciones
    if (depth === 0) { // Si la profundidad es 0, devolver la evaluación del tablero
        return -evaluateBoard(game.board());
    }

    var newGameMoves = game.moves() // Obtener los movimientos posibles

    if (isMaximisingPlayer) { // Si es el jugador que maximiza
        var bestMove = -9999; // Valor inicial del mejor movimiento
        for (var i = 0; i < newGameMoves.length; i++) { // Recorrer los movimientos
            game.move(newGameMoves[i]); // Realizar el movimiento
            // Actualizar el mejor movimiento
        }
    }
    if (isMaximisingPlayer) { // Si es el jugador que maximiza
        var bestMove = -9999; // Valor inicial del mejor movimiento
        for (var i = 0; i < newGameMoves.length; i++) { // Recorrer los movimientos
            game.move(newGameMoves[i]); // Realizar el movimiento
            // Actualizar el mejor movimiento
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo(); // Deshacer el movimiento
            alpha = Math.max(alpha, bestMove); // Actualizar alpha
            if (beta <= alpha) { // Si beta es menor o igual a alpha
                return bestMove; // Retornar el mejor movimiento
            }
        }
        return bestMove; // Retornar el mejor movimiento
    } else { // Si es el jugador que minimiza
        var bestMove = 9999; // Valor inicial del mejor movimiento
        for (var i = 0; i < newGameMoves.length; i++) { // Recorrer los movimientos
            game.move(newGameMoves[i]); // Realizar el movimiento
            // Actualizar el mejor movimiento
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo(); // Deshacer el movimiento
            beta = Math.min(beta, bestMove); // Actualizar beta
            if (beta <= alpha) { // Si beta es menor o igual a alpha
                return bestMove; // Retornar el mejor movimiento
            }
        }
        return bestMove; // Retornar el mejor movimiento
    }
}


function onDrop(source, target) {
    // Verificar si el movimiento es legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTA: siempre promover a una reina por simplicidad del ejemplo
    })

    // Movimiento ilegal
    if (move === null) return 'snapback'

   
    // Hacer un movimiento legal aleatorio para el negro
    window.setTimeout(makeBestMove, 250)
}


// Función para obtener el valor de una pieza
function getPieceValue(piece, x, y) {
    // Si no hay pieza, el valor es 0
    if (piece === null) {
        return 0
    }

    // Si la pieza es un peón, su valor es 10 más la evaluación correspondiente
    if (piece.type === 'p') {
        return piece.color === 'w' ? 10 + pawnEvalWhite[x][y] : -10 - pawnEvalBlack[x][y]
    }

    // Si la pieza es un caballo, su valor es 30 más la evaluación correspondiente
    if (piece.type === 'n') {
        return piece.color === 'w' ? 30 + knightEval[x][y] : -30 - knightEval[x][y]
    }

    // Si la pieza es un alfil, su valor es 31 más la evaluación correspondiente
    if (piece.type === 'b') {
        return piece.color === 'w' ? 31 + bishopEvalWhite[x][y]: -31 - bishopEvalBlack[x][y]
    }

    // Si la pieza es una torre, su valor es 50 más la evaluación correspondiente
    if (piece.type === 'r') {
        return piece.color === 'w' ? 50 + rookEvalWhite[x][y] : -50 - rookEvalBlack[x][y]
    }

    // Si la pieza es una reina, su valor es 90 más la evaluación correspondiente
    if (piece.type === 'q') {
        return piece.color === 'w' ? 90 + evalQueen[x][y]: -90 - evalQueen[x][y]
    }

    // Si la pieza es un rey, su valor es 1000 más la evaluación correspondiente
    if (piece.type === 'k') {
        return piece.color === 'w' ? 1000 + kingEvalWhite[x][y] : -1000 - kingEvalBlack[x][y]
    }
}

// Función para evaluar el tablero
function evaluateBoard(board) {
    var totalEvaluation = 0
    // Recorrer el tablero y sumar el valor de todas las piezas
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
        }
    }

    // Retornar la evaluación total
    return totalEvaluation
}

// Función que se ejecuta cuando el mouse sale de una casilla
function onMouseoutSquare(square, piece) {
    // Remover el color gris de las casillas
    removeGreySquares()
}

// Función que se ejecuta al finalizar el arrastre de una pieza
function onSnapEnd() {
    // Contar las piezas en el tablero
    piecesCount(game.board())
    // Actualizar la posición del tablero
    board.position(game.fen())
    
}

function onMouseoverSquare(square, piece) {
    // Obtener la lista de movimientos posibles para esta casilla
    var moves = game.moves({
        square: square,
        verbose: true
    })

    // Salir si no hay movimientos disponibles para esta casilla
    if (moves.length === 0) return

    // Resaltar la casilla sobre la que pasaron el mouse
    greySquare(square)

    // Resaltar las casillas posibles para esta pieza
    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to)
    }
}


// Función para invertir un array
var reverseArray = function(array) {
    return array.slice().reverse();
};

// Evaluación de posición para peones blancos
var pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  3,  3,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

// Evaluación de posición para peones negros
var pawnEvalBlack = reverseArray(pawnEvalWhite);

// Evaluación de posición para caballos
var knightEval =
    [
        [-5.0, -0, -3.0, -3.0, -3.0, -3.0, -0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

// Evaluación de posición para alfiles blancos
var bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

// Evaluación de posición para alfiles negros
var bishopEvalBlack = reverseArray(bishopEvalWhite);

// Evaluación de posición para torres blancas
var rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

// Evaluación de posición para torres negras
var rookEvalBlack = reverseArray(rookEvalWhite);

// Evaluación de posición para la reina
var evalQueen =
    [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

// Evaluación de posición para el rey blanco
var kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

// Evaluación de posición para el rey negro
var kingEvalBlack = reverseArray(kingEvalWhite);



// --- Inicio de ejemplo JS --------------------------------------------------------
// Crear una nueva instancia de ajedrez
const chess = new Chess();
// Configuración del tablero
var config = {
    draggable: true, // Las piezas son arrastrables
    position: 'start', // Posición inicial del tablero
    showNotation: true, // Mostrar notación
    pieceTheme: 'img/chesspieces/chess24/{piece}.png', // Tema de las piezas
    onDragStart: onDragStart, // Función que se ejecuta al iniciar el arrastre de una pieza
    onDrop: onDrop, // Función que se ejecuta al soltar una pieza
    onMouseoutSquare: onMouseoutSquare, // Función que se ejecuta cuando el mouse sale de una casilla
    onMouseoverSquare: onMouseoverSquare, // Función que se ejecuta cuando el mouse pasa sobre una casilla
    onSnapEnd: onSnapEnd // Función que se ejecuta al finalizar el arrastre de una pieza
}
// Crear el tablero
board = Chessboard('myBoard', config)
