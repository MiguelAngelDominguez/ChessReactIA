import React, { Component } from "react"
import { Presentation } from "./Presentation"
import { ChessboardRandom } from './ChessboardRandom.jsx'
import { ChessboardBody } from './ChessboardBody.jsx'
import Chessboard from "chessboardjsx"
import { Tools } from './Tools.jsx'
import { roughSquare } from "./customRough"
import './Body.css';
import chessLogo from "./assets/logo.png"

export const Body = () => {
    return (
        <div className="Body" >
            <Presentation />
            <div className="CarruselInfo">
                <div style={boardsContainer} class="ChessboardRandom">
                    <ChessboardRandom />
                </div>
                <div className="Frase_Img">
                    <h1 className="titleMain">
                        " La Mejor Pagina de Chess React Impulsado por IA "
                    </h1>
                    <img src={chessLogo} alt="" className="LogoImg" />
                </div>
                <div class="Item Item1">
                    <h3 class="ItemTitle">
                        Jugar Partidas de Ajedrez en Línea contra una IA Avanzada
                    </h3>
                    <p class="ItemText">
                        Sumérgete en Duelos Virtuales: Disfruta de emocionantes partidas de ajedrez en línea enfrentándote a una inteligencia artificial de alto nivel. ¡Demuestra tu destreza ajedrecística!
                    </p>
                </div>
                <div class="Item Item2">
                    <h3 class="ItemTitle">
                        Explorar Partidas Históricas y Famosas de Ajedrez
                    </h3>
                    <p class="ItemText">
                        Viaja en el Tiempo Ajedrecista: Adéntrate en el pasado y revive las partidas más icónicas de la historia del ajedrez. Descubre las estrategias de los grandes maestros.
                    </p>
                </div>
                <div class="Item Item3">
                    <h3 class="ItemTitle">
                        Publicar y Compartir tus Propias Partidas con la Comunidad
                    </h3>
                    <p class="ItemText">
                        Comparte tu Genialidad Ajedrecística: Comparte tus partidas con la comunidad ajedrecista y recibe comentarios de jugadores de todo el mundo. ¡Tu talento en el tablero merece ser visto!
                    </p>
                </div>

                <div className="carruselBoardChess">
                    {/* 
                    De esta forma podemos darle el mismo efecto de le 
                    <ChessboardBody w={200} position={"1b6/np4r1/7P/P6p/K3Q1p1/P7/2pk1q2/3NR3 w - - 0 1"} roughSquare={roughSquare}/>
                     */
                    }
                    <ChessboardBody w={300} position={"2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"} id={"board1"} />
                    <ChessboardBody w={300} position={"1b6/np4r1/7P/P6p/K3Q1p1/P7/2pk1q2/3NR3 w - - 0 1"} id={"board2"} />
                    <ChessboardBody w={300} position={"1KB3n1/8/1p2P2P/P3pP2/1q1Pk3/7r/1B6/3R3N w - - 0 1"} id={"board3"} />
                    <ChessboardBody w={300} position={"2r1N3/4P1Bp/2q1pP2/1k1p4/5K2/2pPP3/2BP4/8 w - - 0 1"} id={"board4"} />
                    <ChessboardBody w={300} position={"1R2b3/4P2B/3PQpPN/5P2/5P2/B2R4/p1k3K1/8 w - - 0 1"} id={"board5"} />
                </div>
            </div>
            {/* <Tools /> */}
        </div>
    )
}

const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10
};
