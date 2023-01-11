import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime, timedelta

presentday = datetime.now()
wave = []
#dateToBeCheck = presentday + timedelta(day)

for day in range(1,7):
    dateToBeCheck = presentday + timedelta(day)
    
    URL = "https://maritim.bmkg.go.id/prakiraan/satu_minggu_kedepan/?hari=" + str(day)

    #GET
    response = requests.get(URL)

    #BEAUTIFY RESPONSE
    soup = BeautifulSoup(response.text, 'html.parser')
    wave_types = soup.findAll('div', attrs={"class":"blog-img-title"}) #GET FROM DIV

    for wave_type in wave_types:
        if ("AREA PERAIRAN DENGAN GELOMBANG" in wave_type.text.upper()) :
            WaveheightTitle = wave_type.find('h4').text
            ListOfSea = wave_type.find('ul').text

            WaveHeightRange = re.findall(r"[-+]?\d*\.?\d+|\d+", WaveheightTitle) #Get The Wave Height From Returned String
            AverageWaveHeight = (float(WaveHeightRange[0]) + float(WaveHeightRange[1]))/2.0
            #WaveEnergy => #https://greener4life.com/Wave-Energy-Calculator => E = ρ*g*H2/16, [J/m2] => J/s = 1W = 1 J/s
            WaveEnergy = 1025.00 * 9.81 * (AverageWaveHeight*AverageWaveHeight) * (1/16)

            ArrayListOfSea = ListOfSea.splitlines() #Convert UL_String to Array
            ArrayListOfSeaTrim = [item.strip() for item in ArrayListOfSea]  #Trim Trailing Empty Char in each items

            ArrayListOfSeaTrim.remove('') #Delete empty string

            wavedict = {
                "Prediction_Date": dateToBeCheck.strftime('%d/%m/%Y'),
                "Wave_Height_Title": wave_type.find('h4').text,
                "Wave_Height_Lower": WaveHeightRange[0],
                "Wave_Height_Upper": WaveHeightRange[1],
                "Average_Wave_Height": AverageWaveHeight,
                "Wave_Energy (in J/m2)": WaveEnergy,
                "Sea_Names": ArrayListOfSeaTrim
            }

            wave.append(wavedict)
        
        
json.dumps(wave)
