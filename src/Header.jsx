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
                <a href="/#home" className='menuOpc'>
                    Inicio
                </a>
                <a href="/#about" className='menuOpc'>
                    ¿Quienes Somos?
                </a>
                <a href="/#benef" className='menuOpc'>
                    Beneficios
                </a>
                <a href="/#play" className='menuOpc'>
                    Juega Ahora
                </a>
            </div>
        </div>
    )
}
