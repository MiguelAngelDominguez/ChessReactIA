import React, { Component } from "react"
import { Presentation } from "./Presentation"
import { ChessboardRandom } from './ChessboardRandom.jsx'
import { CarruselChess } from "./CarruselChess"
import { CardInformation } from "./CardInformation"
import { ChessboardPlay } from "./ChessboardPlay"
import { Tools } from './Tools.jsx'
import { roughSquare } from "./customRough"
import './Body.css';
import chessLogo from "./assets/logo.png"

export const Body = () => {
    return (
        <div className="Body" >
            <Presentation />
            <div id="about" className="CarruselInfo">
                <div style={boardsContainer} className="ChessboardRandom">
                    <ChessboardRandom />
                </div>
                <div className="Frase_Img">
                    <h1 className="titleMain">
                        " La Mejor Pagina de Chess React Impulsado por IA "
                    </h1>
                    <img src={chessLogo} alt="" className="LogoImg" />
                </div>
                <div className="Item Item1">
                    <h3 className="ItemTitle">
                        Jugar Partidas de Ajedrez en Línea contra una IA Avanzada
                    </h3>
                    <p className="ItemText">
                        Sumérgete en Duelos Virtuales: Disfruta de emocionantes partidas de ajedrez en línea enfrentándote a una inteligencia artificial de alto nivel. ¡Demuestra tu destreza ajedrecística!
                    </p>
                </div>
                <div className="Item Item2">
                    <h3 className="ItemTitle">
                        Explorar Partidas Históricas y Famosas de Ajedrez
                    </h3>
                    <p className="ItemText">
                        Viaja en el Tiempo Ajedrecista: Adéntrate en el pasado y revive las partidas más icónicas de la historia del ajedrez. Descubre las estrategias de los grandes maestros.
                    </p>
                </div>
                <div className="Item Item3">
                    <h3 className="ItemTitle">
                        Publicar y Compartir tus Propias Partidas con la Comunidad
                    </h3>
                    <p className="ItemText">
                        Comparte tu Genialidad Ajedrecística: Comparte tus partidas con la comunidad ajedrecista y recibe comentarios de jugadores de todo el mundo. ¡Tu talento en el tablero merece ser visto!
                    </p>
                </div>
            </div>
            <div id="benef" className="CardsBenefits">
                <div className="information sm:max-w-lg">
                    <h1 className="text-4xl tracking-tight text-gray-900 sm:text-6xl">
                        Conoce los beneficios de usar ChessReact
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                    Explora y potencia tu juego de ajedrez con ChessReact, descubriendo beneficios que mejorarán tus habilidades estratégicas y tácticas rápidamente.
                    </p>
                </div>
                <CardInformation 
                title={"Experiencia de aprendizaje mejorada"}
                text={"Los usuarios pueden mejorar sus habilidades de ajedrez jugando contra una IA"}
                icon={"gg-bot"}
                />
                <CardInformation 
                title={"Comodidad y accesibilidad"}
                text={"Los jugadores pueden disfrutar de una partida de ajedrez en cualquier momento y en cualquier lugar"}
                icon={"gg-laptop"}
                />
                <CardInformation 
                title={"Entrenamiento personalizado"}
                text={"La IA puede proporcionar comentarios y análisis personalizados de los movimientos del jugador"}
                icon={"gg-list-tree"}
                />
                <CardInformation
                title={"Construcción de la comunida"}
                text={"El sitio web puede fomentar una comunidad de entusiastas del ajedrez, permitiendo a los jugadores conectarse, competir y aprender unos de otros"}
                icon={"gg-globe-alt"}
                />
                <CardInformation 
                title={"Características innovadoras"}
                text={"La integración de la IA puede permitir funciones únicas como el análisis del juego en tiempo real, el seguimiento de movimientos históricos y los niveles de dificultad "}
                icon={"gg-terminal"}
                />
                <CardInformation
                title={"Investigación y desarrollo"}
                text={"El sitio web puede servir como plataforma para la investigación y el desarrollo de la IA en el campo de los algoritmos de ajedrez"}
                icon={"gg-sync"}
                />
            </div>
            <div id="play" className="carruselBoardChess">
                <div className="information sm:max-w-lg">
                    <h1 className="text-4xl tracking-tight text-white sm:text-6xl">
                        ¿Que esperas para empezar a Jugar con ChessReact?
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Con ChessReact, explora infinitas estrategias y desafíos, mejorando tu juego de ajedrez con experiencias únicas y educativas.
                    </p>
                </div>
                {
                    /* 
                    De esta forma podemos darle el mismo efecto de le 
                    <ChessboardBody w={200} position={"1b6/np4r1/7P/P6p/K3Q1p1/P7/2pk1q2/3NR3 w - - 0 1"} roughSquare={roughSquare}/>
                    */
                }
                <CarruselChess />
            </div>
            {/* <Tools /> */}
        </div >
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
