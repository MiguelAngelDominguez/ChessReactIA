import React from 'react'
import './scoreboardchess.css'

export const ScoreBoardChess = ({scoreWhite}) => {

    const validaScore= () => {
        const score = Math.floor(Math.random() * 100) + 1;
        return score;
    };
    return (
        <div className='scorechess' score={scoreWhite = validaScore()}>
            <div className='scoreWhite' style={{width: scoreWhite+"%", transition: "all 0.5s",}} >
                {scoreWhite}
            </div> 
            <div className='scoreBlack' style={{width: 100-scoreWhite+"%",transition: "all 0.5s",}}>
                {100 - scoreWhite}
            </div>      
        </div>
    )
}
