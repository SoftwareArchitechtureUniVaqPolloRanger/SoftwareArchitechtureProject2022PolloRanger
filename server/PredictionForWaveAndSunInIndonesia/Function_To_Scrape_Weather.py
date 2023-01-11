import urllib
import xmltodict
from datetime import datetime
import json
from flask import Flask, jsonify, request
import pandas as pd

def convert_timerange(timerange):
	datetimeobj = datetime.strptime(timerange, '%Y%m%d%H%M')
	return datetimeobj.strftime('%d %B %Y %H:%M')

def convert_kode_cuaca(weather_code):
	weather_code_list = {
		'0':'Bright',
		'1':'Bright-Cloudy',
		'2':'Bright-Cloudy',
		'3':'Cloudy',
		'4':'Thick Cloud',
		'5':'Little fog',
		'10':'Smoke',
		'45':'Fod',
		'60':'Small Rain',
		'61':'Moderate Rain',
		'63':'Heavy Rain',
		'80':'Local Rain',
		'95':'Storm with Thunder',
		'97':'Storm with Thunder',
	}
	func=weather_code_list.get(weather_code,lambda :'Invalid')
	return func
	'''match weather_code:
		case 0:
			return "1|Bright"
		case 1:
			return "2|Bright-Cloudy-1"
		case 2:
			return "3|Bright-Cloudy-2"
		case 3:
			return "4|Cloudy"
		case 4:
			return "5|Thick Cloud"
		case 5:
			return "6|Little fog"
		case 10:
			return "7|Smoke"
		case 45:
			return "8|Fog"
		case 60:
			return "9|Small Rain"
		case 61:
			return "10|Moderate Rain"
		case 63:
			return "11|Heavy Rain"
		case 80:
			return "12|Local Rain"
		case 95:
			return "13|Storm with Thunder-1"
		case 97:
			return "14|Storm with Thunder-2"
		case _:
			return "Unknown Weather"'''

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

	print(weather_BMKG)
	#return jsonify(weather_BMKG)

if __name__ == '__main__':
	print (getIndonesiaWeatherEnergy())


