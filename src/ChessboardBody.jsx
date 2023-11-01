import React, { Component } from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js"
import Chessboard from "chessboardjsx";
import { roughSquare } from "./customRough";

const chess = new Chess()

class RandomVsRandom extends Component {
  static propTypes = { children: PropTypes.func };

  state = { fen: "start" };

  componentDidMount() {
    this.game = new Chess();
    setTimeout(() => this.makeRandomMove(), 1000);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer());
  }

  timer = () => window.setTimeout(this.makeRandomMove, 1000);

  makeRandomMove = () => {
    let possibleMoves = this.game.moves();

    // exit if the game is over
    if (
      this.game.isGameOver() === true ||
      this.game.isDraw() === true ||
      possibleMoves.length === 0
    )
      return;

    let randomIndex = Math.floor(Math.random() * possibleMoves.length);
    this.game.move(possibleMoves[randomIndex]);
    this.setState({ fen: this.game.fen() });

    this.timer();
  };

  render() {
    const { fen } = this.state;
    return this.props.children({ position: fen });
  }
}

export const ChessboardBody = () => {

  return (
    <div>
      <RandomVsRandom>
        {({ position }) => (
          <Chessboard
            // Esta linea de codigo coloca piezas de muestra 
            // fuera del tablero
            // sparePieces={true}
            width={500}
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
        )}
      </RandomVsRandom>
    </div>
  )
}
