import React from 'react'
import { BsCake } from "react-icons/bs";

function Meal( {meal_info}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <BsCake style={{flexShrink: 0}} />
            <div>
                <p>{meal_info.name}</p>
                <p>{meal_info.extra_info}</p>
            </div>
        </div>
    )
}

export default Meal
