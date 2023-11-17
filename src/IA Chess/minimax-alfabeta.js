export function minimaxAlfaBeta(tablero, profundidad, alfa, beta, jugadorMaximizador) {
  if (profundidad === 0) {
    return -evaluarTablero(tablero);
  }

  let movimientosPosibles = obtenerMovimientosPosibles(tablero);

  if (jugadorMaximizador) {
    let maxEvaluacion = -Infinity;
    for (let movimiento of movimientosPosibles) {
      let evaluacion = minimaxAlfaBeta(moverPieza(tablero, movimiento), profundidad - 1, alfa, beta, false);
      maxEvaluacion = Math.max(maxEvaluacion, evaluacion);
      alfa = Math.max(alfa, evaluacion);
      if (beta <= alfa) {
        break;
      }
    }
    return maxEvaluacion;
  } else {
    let minEvaluacion = Infinity;
    for (let movimiento of movimientosPosibles) {
      let evaluacion = minimaxAlfaBeta(moverPieza(tablero, movimiento), profundidad - 1, alfa, beta, true);
      minEvaluacion = Math.min(minEvaluacion, evaluacion);
      beta = Math.min(beta, evaluacion);
      if (beta <= alfa) {
        break;
      }
    }
    return minEvaluacion;
  }
}