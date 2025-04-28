import React, { useState } from 'react'
import Calendar from 'react-calendar'
import './Calendar.css'
import MealCard from './MealCard';

function CalendarSection() {
    const [value, onChange] = useState(new Date());

    React.useEffect(() => {
        console.log(`${value.getUTCMonth() + 1}/${value.getUTCDate()}`);
    }, [value]);

    const mealplan_data = {
        calories: 2009,
        breakfast: {
            calories: 542,
            meals: ['Peach and Blueberry Parfait', 'Buttered Toast']
        },
        lunch: {
            calories: 542,
            meals: ['Raspberries and Blackberries Protein Smoothie', 'Pinto Bean Salad']
        },
        dinner: {
            calories: 542,
            meals: ['Kahuku Shrimp', 'Easy Spinach and Scallion Salad']
        }
    }

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'row',
            height: '100%',
            width: '100%'
        }}>
            <div style={{
                width: '33.33%',
                backgroundColor: '#fffff',
                padding: '1rem',
                border: '1px solid black'
            }}>
                <MealCard meals={mealplan_data} date={value} />
            </div>
            <div style={{ 
                width: '66.67%', 
                padding: '1rem', 
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Calendar
                    className="Calendar"
                    onChange={onChange} 
                    value={value} 
                />
            </div>
        </div>
    )
}

export default CalendarSection
