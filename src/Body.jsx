import React, { Component } from "react";
import { Presentation } from "./Presentation";
import { ChessboardBody } from './ChessboardBody.jsx'
import { Tools } from './Tools.jsx'
import './Body.css';

export const Body = () => {
    return (
        <div className="Body" >
            <Presentation />
            <div className="Demostration">
                <div style={boardsContainer} class="ChessboardBody">
                    <ChessboardBody />
                </div>
                <div className="logoBig">
                    <img src="/src/assets/logo.png" alt="" className="LogoImg" />
                    <h1 className="titleMain">
                        ChessReact 
                    </h1>
                </div>

            </div>
            <Tools />
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
