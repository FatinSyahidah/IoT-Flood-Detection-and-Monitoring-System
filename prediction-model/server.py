from distutils.log import debug
from flask import Flask, request
import pandas as pd
import time

from neuralprophet import NeuralProphet
import json
from json import JSONEncoder


app = Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route("/forecast")
def forecast():

    if request.method == 'POST':
        nDays = int(request.form['period'])

    else:
        nDays = 100
        
    df = pd.read_csv('SgKuantan.csv')
    df['Date'] = pd.to_datetime(df ['Timestamps'])

    new_column = df[['Timestamps', 'WaterLevelAvg']]
    new_column.dropna(inplace=True)
    new_column.columns = ['ds', 'y']

    n = NeuralProphet()
    model = n.fit(new_column, freq='D')
    future = n.make_future_dataframe(new_column, periods=30)
    forecast = n.predict(future)

    #historical temperature
    arr_temp = df.WaterLevelAvg.to_numpy()
    temp_list = arr_temp.tolist()

    date_list = df.Timestamps.tolist()

    #forecast temperature
    forecast_df = forecast[['ds', 'yhat1']]
    date_forecast_list = forecast_df.ds.tolist()

    level_forecast_list = forecast.yhat1.round().tolist()

    return {
    "temp": temp_list,
    "timestamps": date_list,
    "forecastDate": date_forecast_list,
    "forecastLevel": level_forecast_list}


if __name__ == "__main__":
    app.run(debug=True)