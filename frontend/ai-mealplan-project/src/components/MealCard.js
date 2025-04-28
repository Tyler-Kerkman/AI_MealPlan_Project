import React from 'react'
import Meal from './Meal';

/**
 * 
 *  meals is an object with in the format
 *  {
 *    breakfast: {
 *      meals: [],
 *      calories: int,
 *      nutrition: []
 *    },
 *    lunch: {
 *      meals: [],
 *      calories: int,
 *      nutrition: []
 *    },
 *    dinner: {
 *      meals: [],
 *      calories: int,
 *      nutrition: []
 *    },
 *    calories: int
 *  }
 * 
 */
function MealCard( {meals, date} ) {
    // Format the date to a readable string
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <h1>{formattedDate}'s Meal Plan</h1>
            <p className='calories'>Total Calories: {meals.calories}</p>
            <h1>Breakfast</h1>
            <p className='calories'>{meals.breakfast.calories} calories</p>
            {
                meals.breakfast.meals.map((meal, index) => (
                    <Meal key={index} meal_info={{name: meal}} />
                ))
            }
            <h1>Lunch</h1>
            <p className='calories'>{meals.lunch.calories} calories</p>
            {
                meals.lunch.meals.map((meal, index) => (
                    <Meal key={index} meal_info={{name: meal}} />
                ))
            }
            <h1>Dinner</h1>
            <p className='calories'>{meals.dinner.calories} calories</p>
            {
                meals.dinner.meals.map((meal, index) => (
                    <Meal key={index} meal_info={{name: meal}} />
                ))
            }
        </>
    )
}

export default MealCard
