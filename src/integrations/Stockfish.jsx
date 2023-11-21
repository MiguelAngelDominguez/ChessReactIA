import React, { Component } from "react";
import PropTypes from "prop-types";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";


const STOCKFISH = window.STOCKFISH;
const game = new Chess();

class Stockfish extends Component {
  static propTypes = { children: PropTypes.func };

  state = { fen: "start" };

  componentDidMount() {
    this.setState({ fen: game.fen() });  // Establece el estado inicial del tablero de ajedrez
    this.engineGame().prepareMove();  // Prepara el movimiento del motor de ajedrez
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q"
    });  // Realiza el movimiento en el tablero de ajedrez

    if (move === null) return;  // Si el movimiento es inválido, no hace nada

    return new Promise(resolve => {
      this.setState({ fen: game.fen() });  // Actualiza el estado del tablero de ajedrez
      resolve();
    }).then(() => this.engineGame().prepareMove());  // Prepara el siguiente movimiento del motor de ajedrez
  };

  engineGame = options => {
    options = options || {};

    let engine =
      typeof STOCKFISH === "function"
        ? STOCKFISH()
        : new Worker(options.stockfishjs || "src/integrations/Stockfish.js");  // Inicializa el motor de ajedrez
    let evaler =
      typeof STOCKFISH === "function"
        ? STOCKFISH()
        : new Worker(options.stockfishjs || "src/integrations/Stockfish.js");  // Inicializa el evaluador del motor de ajedrez
    let engineStatus = {};  // Estado del motor de ajedrez
    let time = { wtime: 3000, btime: 3000, winc: 1500, binc: 1500 };  // Tiempo de juego
    let playerColor = "black";  // Color del jugador
    let clockTimeoutID = null;  // Identificador del temporizador
    let announced_game_over;  // Indica si el juego ha terminado

    setInterval(function () {
      if (announced_game_over) {
        return;  // Si el juego ha terminado, no hace nada
      }

      if (game.game_over()) {
        announced_game_over = true;  // Indica que el juego ha terminado
      }
    }, 500);  // Verifica periódicamente si el juego ha terminado

    function uciCmd(cmd, which) {


      (which || engine).postMessage(cmd);  // Envia un comando al motor de ajedrez
    }
    uciCmd("uci");  // Envia el comando UCI al motor de ajedrez

    function clockTick() {
      let t =
        (time.clockColor === "white" ? time.wtime : time.btime) +
        time.startTime -
        Date.now();  // Calcula el tiempo restante para el siguiente movimiento
      let timeToNextSecond = (t % 1000) + 1;  // Calcula el tiempo para el siguiente segundo
      clockTimeoutID = setTimeout(clockTick, timeToNextSecond);  // Establece el temporizador para el siguiente segundo
    }

    function stopClock() {
      if (clockTimeoutID !== null) {
        clearTimeout(clockTimeoutID);  // Detiene el temporizador
        clockTimeoutID = null;
      }
      if (time.startTime > 0) {
        let elapsed = Date.now() - time.startTime;  // Calcula el tiempo transcurrido
        time.startTime = null;
        if (time.clockColor === "white") {
          time.wtime = Math.max(0, time.wtime - elapsed);  // Actualiza el tiempo restante para las blancas
        } else {
          time.btime = Math.max(0, time.btime - elapsed);  // Actualiza el tiempo restante para las negras
        }
      }
    }

    function startClock() {
      if (game.turn() === "w") {
        time.wtime += time.winc;  // Actualiza el tiempo restante para las blancas
        time.clockColor = "white";  // Establece el color del reloj en blanco
      } else {
        time.btime += time.binc;  // Actualiza el tiempo restante para las negras
        time.clockColor = "black";  // Establece el color del reloj en negro
      }
      time.startTime = Date.now();  // Establece el tiempo de inicio
      clockTick();  // Inicia el temporizador
    }

    function get_moves() {
      let moves = "";
      let history = game.history({ verbose: true });  // Obtiene el historial de movimientos

      for (let i = 0; i < history.length; ++i) {
        let move = history[i];
        moves +=
          " " + move.from + move.to + (move.promotion ? move.promotion : "");  // Genera la representación de los movimientos
      }

      return moves;  // Devuelve los movimientos
    }

    const prepareMove = () => {
      stopClock();  // Detiene el temporizador

      let turn = game.turn() === "w" ? "white" : "black";  // Obtiene el turno actual
      if (!game.game_over()) {

        if (turn !== playerColor) {

          uciCmd("position startpos moves" + get_moves());  // Envia la posición actual al motor de ajedrez
          uciCmd("position startpos moves" + get_moves(), evaler);  // Envia la posición actual al evaluador del motor de ajedrez
          uciCmd("eval", evaler);  // Solicita una evaluación al evaluador del motor de ajedrez

          if (time && time.wtime) {
            uciCmd(
              "go " +
              (time.depth ? "depth " + time.depth : "") +
              " wtime " +
              time.wtime +
              " winc " +
              time.winc +
              " btime " +
              time.btime +
              " binc " +
              time.binc
            );  // Envia un comando de búsqueda al motor de ajedrez
          } else {
            uciCmd("go " + (time.depth ? "depth " + time.depth : ""));  // Envia un comando de búsqueda al motor de ajedrez
          }

        }
        if (game.history().length >= 2 && !time.depth && !time.nodes) {
          startClock();  // Inicia el temporizador
        }
      }
    };

    evaler.onmessage = function (event) {
      let line;

      if (event && typeof event === "object") {
        line = event.data;
      } else {
        line = event;
      }




      if (
        line === "uciok" ||
        line === "readyok" ||
        line.substr(0, 11) === "option name"
      ) {
        return;  // No hace nada
      }
    };

    engine.onmessage = event => {
      let line;

      if (event && typeof event === "object") {
        line = event.data;
      } else {
        line = event;
      }

      if (line === "uciok") {
        engineStatus.engineLoaded = true;  // Indica que el motor de ajedrez ha cargado
      } else if (line === "readyok") {
        engineStatus.engineReady = true;  // Indica que el motor de ajedrez está listo
      } else {
        let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);

        if (match) {

          game.move({ from: match[1], to: match[2], promotion: match[3] });  // Realiza el movimiento sugerido por el motor de ajedrez
          this.setState({ fen: game.fen() });  // Actualiza el estado del tablero de ajedrez
          prepareMove();  // Prepara el siguiente movimiento
          uciCmd("eval", evaler);  // Solicita una evaluación al evaluador del motor de ajedrez


        } else if (
          (match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))
        ) {
          engineStatus.search = "Depth: " + match[1] + " Nps: " + match[2];  // Actualiza el estado de búsqueda del motor de ajedrez
        }


        if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
          let score = parseInt(match[2], 10) * (game.turn() === "w" ? 1 : -1);  // Calcula el puntaje

          if (match[1] === "cp") {
            engineStatus.score = (score / 100.0).toFixed(2);  // Actualiza el puntaje

          } else if (match[1] === "mate") {
            engineStatus.score = "Mate in " + Math.abs(score);  // Indica un jaque mate en el puntaje
          }


          if ((match = line.match(/\b(upper|lower)bound\b/))) {
            engineStatus.score =
              ((match[1] === "upper") === (game.turn() === "w")
                ? "<= "
                : ">= ") + engineStatus.score;  // Actualiza el puntaje
          }
        }
      }

    };

    return {
      start: function () {
        uciCmd("ucinewgame");  // Envia el comando para iniciar una nueva partida al motor de ajedrez
        uciCmd("isready");  // Envia el comando para verificar si el motor de ajedrez está listo
        engineStatus.engineReady = false;  // Indica que el motor de ajedrez no está listo
        engineStatus.search = null;  // Reinicia el estado de búsqueda
        prepareMove();  // Prepara el siguiente movimiento
        announced_game_over = false;  // Indica que el juego no ha terminado
      },
      prepareMove: function () {
        prepareMove();  // Prepara el siguiente movimiento
      }
    };
  };

  render() {
    const { fen } = this.state;
    return this.props.children({ position: fen, onDrop: this.onDrop });  // Devuelve los elementos hijos con la posición actual y la función de realizar un movimiento
  }
}

export const StockfishChess = () => {
  return (
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
  )
};

const boardStyle = {
  borderRadius: "5px",
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
};