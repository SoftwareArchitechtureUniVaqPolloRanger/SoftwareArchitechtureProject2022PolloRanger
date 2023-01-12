#WAVE
import requests
from bs4 import BeautifulSoup
import re

#WEATHER
import urllib
import xmltodict
import pandas as pd

from flask_cors import CORS, cross_origin


from datetime import datetime, timedelta #TIME

#API
import json
from flask import Flask, jsonify, request


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def convert_timerange(timerange):
	datetimeobj = datetime.strptime(timerange, '%Y%m%d%H%M')
	return datetimeobj.strftime('%d %B %Y %H:%M')

def convert_kode_cuaca(weather_code):
	weather_code_list = {
		'0':'1|Bright',
		'1':'2|Bright-Cloudy-1',
		'2':'3|Bright-Cloudy-2',
		'3':'4|Cloudy',
		'4':'5|Thick Cloud',
		'5':'6|Little fog',
		'10':'7|Smoke',
		'45':'8|Fog',
		'60':'9|Small Rain',
		'61':'10|Moderate Rain',
		'63':'11|Heavy Rain',
		'80':'12|Local Rain',
		'95':'13|Storm with Thunder-1',
		'97':'14|Storm with Thunder-2',
	}
	func=weather_code_list.get(weather_code,lambda :'Invalid')
	return func

@app.route('/sun', methods=['GET'])
@cross_origin()
def getIndonesiaWeatherEnergy():
	xml_url = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Indonesia.xml'
	xml_data = urllib.request.urlopen(xml_url)
	dataset = xmltodict.parse(xml_data)
	weather_BMKG = []

	areas = pd.DataFrame(dataset['data']['forecast']['area'])
	latitude = areas['@latitude']
	longitude = areas['@longitude']
	city = areas['@description']
	weather = {}
	for i,area in areas['parameter'].iteritems():
		weathers = area[6]
		for w in weathers['timerange']:
			timerange = w['@datetime']
			timerange = convert_timerange(timerange)
			value = w['value']['#text']
			if timerange not in weather:
				weather[timerange] = {}
			if city[i] not in weather[timerange]:
				weather[timerange][city[i]] = {}
			weather[timerange][city[i]] = value
			weatherdict = {
						"Prediction_Date": timerange, #timerange.strftime('%d/%m/%Y'),
						"Location": city[i],
						"Weather": convert_kode_cuaca(value)
			}
			weather_BMKG.append(weatherdict)

	return jsonify(weather_BMKG)

@app.route('/wave', methods=['GET'])
@cross_origin()
def calculateIndonesiaWaveEnergy():
	if(request.method == 'GET'):
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
						"Wave_Height_Lower": float(WaveHeightRange[0]),
						"Wave_Height_Upper": float(WaveHeightRange[1]),
						"Average_Wave_Height": AverageWaveHeight,
						"Wave_Energy": WaveEnergy,
						"Sea_Names": ArrayListOfSeaTrim
					}

					wave.append(wavedict)
				
		return jsonify(wave)
		#return json.dumps(wave)
  
  
if __name__ == '__main__':
	app.run(debug=True, port=8001)


