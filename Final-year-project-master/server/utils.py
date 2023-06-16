from io import BytesIO
from fastapi import File,UploadFile
from PIL import Image
import numpy as np
from pydantic import BaseModel

def read_image_file_as_array(file) -> np.ndarray:
    image =  Image.open(BytesIO(file))
    imageAsArray = np.array(image)
    return imageAsArray

classesOf = {
    'apple':['Apple Scab','Apple Black Rot','Cedar Apple Rust','Healty'],
    'pepper':['Bell Bacterial Spot','Healty'],
    'potato':['Early Blight','Healty','Late Blight'],
    'strawberry':['Healty','Scorch Leaf'],
    'tomato':['Bacterial Spot','Early Blight','Healty','Late Blight','Leaf Mold','Septoria Leaf Spot','Spider Mite','Target Spot','Mosaic Virus','Yellow Leaf'],
    'corn':['Cercospora Spot Grey','Common Rust','Healty','Northern Leaf Blight'],
    'grape':['Grape Black Root','Grape Esca','Healty','Leaf Blight'],
    'peach':['Bacterial Spot','Healty'],
    'cherry':['Healty','Powdery Mildew']
}

cropsList = ['rice','maize','chickpea','kidneybeans','pigeonpeas','mothbeans','mungbean','blackgram','lentil','pomegranate','banana','mango','grapes','watermelon','muskmelon','apple','orange','papaya','coconut','cotton','jute','coffee']
