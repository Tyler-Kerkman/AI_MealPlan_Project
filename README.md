## AI_MealPlan_Project
### Steps to Run Locally
#### Backend
1. Navigate to AI_MealPlan_Project/backend in your terminal
2. Run "pip install -r requirements.txt" to install the required imports
3. On line 24 of model.py, input your own Google API key
4. Run "uvicorn model:app --reload" to start the app
5. Upon startup, the app will prompt you to input "api" or "df" which refers to using the OpenFoodFacts API (fast startup & slow queries) or a local pandas dataframe (RAM intensive, slow stratup, & fast queries)
6. If using the API, the app will start will no further steps
7. If using a dataframe, you must download the dataset at https://world.openfoodfacts.org/data and extract it to the backend folder
### Frotend
1. Navigate to AI_MealPlan_Project/frontend in a separate terminal
2. Run "npm install" to install the required packages
3. Run "npm start" to start the app on localhost
