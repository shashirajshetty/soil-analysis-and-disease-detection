from fastapi import FastAPI,File,UploadFile,Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import pandas as pd
from pydantic import BaseModel

import tensorflow as tf
import xgboost as xgb
import numpy as np

# UTILS
from utils import read_image_file_as_array,classesOf,cropsList
from data.updatedstore import plant_diseases
from data.store import crops

app =FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

class SoilAnalysisParameters(BaseModel):
    N:float
    P:float
    K:float
    temperature:float
    humidity:float
    ph:float
    rainfall:float

@app.get('/')
def home():
    return {"message":"Hello! this is 'Plants disease detection and Soil analysis API, Written in FastAPI."}

@app.post('/soil-analysis')
async def soilAnalysis(parameters:SoilAnalysisParameters):
    try:
        model = xgb.Booster()
        model.load_model('models/soil-analysis/soil.json')
        row_to_predict = [[parameters.N,parameters.P,parameters.K,parameters.temperature,parameters.humidity,parameters.ph,parameters.rainfall]]
        data = pd.DataFrame(row_to_predict , columns = model.feature_names)
        prediction = model.predict(xgb.DMatrix(data))
        return {
            "success":True,
            # "prediction":"rice"
            "prediction":cropsList[np.argmax(prediction[0]).item()]
        }
    except:
        return {
            "success":False,
            "message":"Something went wrong! Please provide a valid image"
        }


@app.post('/disease_detection')
async def diseaseDetection(
    file:UploadFile=File(...),plant:str=Form()
):
    imageBytes = read_image_file_as_array(await file.read())
    batch_img = np.expand_dims(imageBytes,0)

    try:
        model = tf.keras.models.load_model('models/'+plant.lower())
        prediction = model.predict(batch_img)
        confidence = np.max(prediction[0])
        predicted_disease=classesOf[plant][np.argmax(prediction[0])]
        return {
            "success":True,
            'prediction':predicted_disease,
            "data":plant_diseases[predicted_disease],
            'confidence':float(confidence)
        }
    except:
        return {
            "success":False,
            "message":"Something went wrong! Please provide a valid image"
        }
    
@app.get('/crop/{crop_name}')
async def getCrop(crop_name):
    if(crop_name in crops):
        return {
            "success":True,
            "data": crops[crop_name]
        }
    else:
        return {
            "success":False,
            "message":"The crop you are looking is not available in our website"
        }

if __name__ == "__main__":
    uvicorn.run("main:app",host='localhost',port=7000,reload=True)