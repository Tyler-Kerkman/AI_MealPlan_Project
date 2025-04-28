import React from 'react'

function WorkoutSection( {workout} ) {
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <h3>Workout</h3>
                <h3>{workout.type}</h3>
            </div>
            <hr style={{
                width: '100%',
                border: '1px solid #e5e7eb'
            }}/>
            <ul style={{
                listStyleType: 'none',
                padding: 0,
                margin: '1rem 0'
            }}>
                {workout.exercises.map((exercise, index) => (
                    <li key={index} style={{padding: '0.5rem 0'}}>
                        {exercise}
                    </li>
                ))}
            </ul>
            <hr style={{
                width: '100%',
                border: '1px solid #e5e7eb'
            }}/>
            <button style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                marginTop: '1rem'
            }}>
                See More
            </button>
        </div>
    )
}

export default WorkoutSection
