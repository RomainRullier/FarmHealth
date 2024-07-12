from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import logging

app = FastAPI()

# Configurer le logger
logging.basicConfig(level=logging.INFO)

# Charger le modèle TFLite
interpreter = tf.lite.Interpreter(model_path="./model/plant_disease_model.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Dictionnaire des classes
class_names = {
    0: 'Apple___Apple_scab', 1: 'Apple___Black_rot', 2: 'Apple___Cedar_apple_rust', 3: 'Apple___healthy',
    4: 'Blueberry___healthy', 5: 'Cherry_(including_sour)___Powdery_mildew', 6: 'Cherry_(including_sour)___healthy',
    7: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 8: 'Corn_(maize)___Common_rust_',
    9: 'Corn_(maize)___Northern_Leaf_Blight', 10: 'Corn_(maize)___healthy', 11: 'Grape___Black_rot',
    12: 'Grape___Esca_(Black_Measles)', 13: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 14: 'Grape___healthy',
    15: 'Orange___Haunglongbing_(Citrus_greening)', 16: 'Peach___Bacterial_spot', 17: 'Peach___healthy',
    18: 'Pepper,_bell___Bacterial_spot', 19: 'Pepper,_bell___healthy', 20: 'Potato___Early_blight',
    21: 'Potato___Late_blight', 22: 'Potato___healthy', 23: 'Raspberry___healthy', 24: 'Soybean___healthy',
    25: 'Squash___Powdery_mildew', 26: 'Strawberry___Leaf_scorch', 27: 'Strawberry___healthy',
    28: 'Tomato___Bacterial_spot', 29: 'Tomato___Early_blight', 30: 'Tomato___Late_blight', 31: 'Tomato___Leaf_Mold',
    32: 'Tomato___Septoria_leaf_spot', 33: 'Tomato___Spider_mites Two-spotted_spider_mite', 34: 'Tomato___Target_Spot',
    35: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 36: 'Tomato___Tomato_mosaic_virus', 37: 'Tomato___healthy'
}

def predict(image_bytes):
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    except Exception as e:
        logging.error(f"Error opening image: {e}")
        raise e

    img = img.resize((224, 224))  # Redimensionner selon les exigences de votre modèle
    img_array = np.array(img) / 255.0  # Normaliser l'image
    img_array = np.expand_dims(img_array, axis=0)  # Ajouter la dimension batch

    interpreter.set_tensor(input_details[0]['index'], img_array.astype(np.float32))
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    
    predicted_class_index = np.argmax(output_data[0])
    predicted_class_name = class_names[predicted_class_index]
    
    # Séparer le type de plante et la condition
    plant_type, condition = predicted_class_name.split('___')
    
    return output_data[0].tolist(), plant_type, condition

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        if file.content_type.startswith('image/'):
            image_bytes = await file.read()
            logging.info(f"Received file: {file.filename}, size: {len(image_bytes)} bytes")
            predictions, plant_type, condition = predict(image_bytes)
            return JSONResponse(content={
                "predictions": predictions,
                "plant_type": plant_type,
                "condition": condition,
                "classes": class_names
            })
        else:
            logging.error("Uploaded file is not an image")
            return JSONResponse(content={"error": "File is not an image."}, status_code=400)
    except Exception as e:
        logging.error(f"Error processing prediction: {e}")  # Log the error
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5001)