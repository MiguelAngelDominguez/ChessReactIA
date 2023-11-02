import React from 'react'
import chessLogo from "./assets/logo.png"
import './Header.css'

export const Header = () => {
    return (
        <div className='headerMain' id='blurredHeader'>
            <span className='logo'>
                <img src={chessLogo} className="logoImg" alt="ChessReact logo" />
                <h1 className='logoText'>
                    ChessReact
                </h1>
            </span>

            <div className='menu'>
                <a href="" className='menuOpc'>
                    Juega
                </a>
                <a href="" className='menuOpc'>
                    Como Funciona
                </a>
                <a href="" className='menuOpc'>
                    ¿Quienes Somos?
                </a>
            </div>
        </div>
    )
}
