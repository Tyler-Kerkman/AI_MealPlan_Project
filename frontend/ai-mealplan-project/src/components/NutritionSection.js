import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

function NutritionSection() {
    return (
        <div style={{ 
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '.5rem'
        }}>
            <h2>Today's Nutrition</h2>
            <p>Total Calories: </p>
            <div style={{ 
                width: '100%', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 25, label: 'Protein' },
                                { id: 1, value: 25, label: 'Carbs' },
                                { id: 2, value: 25, label: 'Fat' },
                            ],
                        }
                    ]}
                    width={300}
                    height={300}
                    slotProps={{
                        legend: {
                            direction: 'column',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: 0,
                            itemMarkWidth: 10,
                            itemMarkHeight: 10,
                            markGap: 5,
                            itemGap: 10,
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default NutritionSection
