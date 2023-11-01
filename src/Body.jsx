import React, { Component } from "react";
import { Presentation } from "./Presentation";
import { ChessboardBody } from './ChessboardBody.jsx'
import { Tools } from './Tools.jsx'
import './Body.css';

export const Body = () => {
    return (
        <div className="Body" >
            <Presentation />
            <div className="CarrucelInfo">
                <div style={boardsContainer} class="ChessboardBody">
                    <ChessboardBody />
                </div>
                <div className="Informacion">
                    <div className="Frase_Img">
                        <h1 className="titleMain">
                            " La Mejor Pagina de Chess React Impulsado por IA "
                        </h1>
                        <img src="/src/assets/logo.png" alt="" className="LogoImg" />
                    </div>
                    <div class="GroupItem">
                        <div class="Item">
                            <h3 class="ItemTitle">
                                Jugar Partidas de Ajedrez en Línea contra una IA Avanzada
                            </h3>
                            <p class="ItemText">
                                Sumérgete en Duelos Virtuales: Disfruta de emocionantes partidas de ajedrez en línea enfrentándote a una inteligencia artificial de alto nivel. ¡Demuestra tu destreza ajedrecística!
                            </p>
                        </div>
                        <div class="Item">
                            <h3 class="ItemTitle">
                                Explorar Partidas Históricas y Famosas de Ajedrez
                            </h3>
                            <p class="ItemText">
                                Viaja en el Tiempo Ajedrecista: Adéntrate en el pasado y revive las partidas más icónicas de la historia del ajedrez. Descubre las estrategias de los grandes maestros.
                            </p>
                        </div>
                        <div class="Item">
                            <h3 class="ItemTitle">
                            Publicar y Compartir tus Propias Partidas con la Comunidad
                            </h3>
                            <p class="ItemText">
                                Comparte tu Genialidad Ajedrecística: Comparte tus partidas con la comunidad ajedrecista y recibe comentarios de jugadores de todo el mundo. ¡Tu talento en el tablero merece ser visto!
                            </p>
                        </div>
                    </div>

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
