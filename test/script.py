import tensorflow as tf
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

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

# Charger le modèle TFLite
tflite_model_path = 'plant_disease_model.tflite'
interpreter = tf.lite.Interpreter(model_path=tflite_model_path)
interpreter.allocate_tensors()

# Obtenir les détails des entrées et sorties
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Charger et prétraiter l'image
image_path = '../src/corn_healthy.jpg'
image = Image.open(image_path).resize((224, 224))  # Redimensionner l'image selon les besoins de votre modèle
image = np.array(image) / 255.0  # Normaliser l'image

# Vérifier que l'image est dans le bon format (batch_size, height, width, channels)
if len(image.shape) == 3:
    image = np.expand_dims(image, axis=0)

# Définir les valeurs d'entrée pour le modèle
interpreter.set_tensor(input_details[0]['index'], image.astype(np.float32))

# Exécuter l'inférence
interpreter.invoke()

# Obtenir les résultats
output_data = interpreter.get_tensor(output_details[0]['index'])
predicted_class_index = np.argmax(output_data)
predicted_class_name = class_names[predicted_class_index]

print(f"The model predicts the class: {predicted_class_name} with a probability of {output_data[0][predicted_class_index]}")

# Afficher l'image et la classe prédite
plt.imshow(image[0])
plt.title(f"Predicted: {predicted_class_name}")
plt.show()