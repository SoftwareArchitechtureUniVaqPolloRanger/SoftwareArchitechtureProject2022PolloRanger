# SoftwareArchitechtureProject2022PolloRanger

Go to Energy-main and then frontend folder , inside frontend run "npm install" then "npm start" , it will open frontend on browser

the project has multiple backends, each backend needs to be run individually 
 
in the project root, go to server folder ,  locate PowerPlantService, and do "npm install" then "node index.js", it will run this service , it has port 3001

locate SmartGridService, then go inside UserConsumptionService and do "npm install" then "node index" , it will run this service, it has port 4000

locate PowerDistributorService, then go inside PowerDistribution service , do "npm install", then "node index", it has port 4002

locate PredictionForWaveAndSunInIndonesia, inside it do "python API_Prediction.py", you will receive errors, fix them by installing necessary packages with command "pip install   BeautifulSoup" or "pip install flask"

run "python API_Prediction" again and test it on postman using the endpoint "http://localhost:8001/sun" and "http://localhost:8001/marine"

install Mongodb Atlas , create database cluster in it and import the data files as json
