import React from 'react'
import { ChessboardBody } from './ChessboardBody.jsx'
import './CarruselChess.css';

export const CarruselChess = () => {
    const widthTable = 400;
    return (
        <div>
            <figure class="tarjetas">
                <div class="tarjetas__contenido">
                    <div class="tarjetas__elemento">
                        <ChessboardBody w={widthTable} position={"2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"} id={"board1"} />
                    </div>
                    <div class="tarjetas__elemento">
                        <ChessboardBody w={widthTable} position={"1b6/np4r1/7P/P6p/K3Q1p1/P7/2pk1q2/3NR3 w - - 0 1"} id={"board2"} />
                    </div>
                    <div class="tarjetas__elemento">
                        <ChessboardBody w={widthTable} position={"1KB3n1/8/1p2P2P/P3pP2/1q1Pk3/7r/1B6/3R3N w - - 0 1"} id={"board3"} />
                    </div>
                </div>
            </figure>
        </div>
    )
}
