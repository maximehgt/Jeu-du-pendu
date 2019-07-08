import React from 'react'
import './Drawing.css'

const Drawing = ({ counter }) => (
    <svg className="game_drawing" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="160" x2="80" y2="160" className={counter < 1 ? 'hide' : ''}/>
        <line x1="60" y1="20" x2="60" y2="160" className={counter < 2 ? 'hide' : ''}/>
        <line x1="60" y1="20" x2="140" y2="20" className={counter < 3 ? 'hide' : ''}/>
        <line x1="60" y1="50" x2="90" y2="20" className={counter < 4 ? 'hide' : ''}/>
        <line x1="140" y1="20" x2="140" y2="40" className={counter < 5 ? 'hide' : ''}/>
        <g stroke="red" className={counter < 6 ? 'hide' : ''}>
            <circle cx="140" cy="50" r="10" fill="none"/>
            <line x1="140" y1="60" x2="140" y2="100"/>
            <line x1="140" y1="70" x2="130" y2="90"/>
            <line x1="140" y1="70" x2="150" y2="90"/>
            <line x1="140" y1="100" x2="130" y2="120"/>
            <line x1="140" y1="100" x2="150" y2="120"/>
        </g>
    </svg>
)
  
export default Drawing