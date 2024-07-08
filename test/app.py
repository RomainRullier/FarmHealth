import streamlit as st
import requests
from PIL import Image
from io import BytesIO

st.title("Plant Disease Detection")

uploaded_files = st.file_uploader("Choose images...", type="jpg", accept_multiple_files=True)

if uploaded_files:
    cols = st.columns(2)  # Créer deux colonnes pour l'affichage
    
    files = [("files", uploaded_file.getvalue()) for uploaded_file in uploaded_files]
    
    # Envoyer les images à l'API FastAPI
    response = requests.post(
        "http://127.0.0.1:8000/predict",
        files=files
    )

    if response.status_code == 200:
        results = response.json()
        
        for i, uploaded_file in enumerate(uploaded_files):
            with cols[i % 2]:  # Alterner entre les colonnes
                image = Image.open(uploaded_file)
                st.image(image, caption=f'Uploaded Image {i+1}', use_column_width=True)
                st.write("")
                st.write("Classifying...")

                data = results[i]  # Récupérer les données pour chaque image
                prediction = data["predicted_class"]
                predictions = data["predictions"]
                classes = data["classes"]
                
                # Trouver l'indice et le pourcentage de la classe prédite
                predicted_index = classes.index(prediction)
                predicted_percentage = predictions[predicted_index] * 100
                
                # Afficher la prédiction principale et son pourcentage
                st.write(f"Prediction: {prediction} ({predicted_percentage:.2f}%)")
                
                # Afficher les probabilités pour toutes les classes
                st.write("Probabilities:")
                for cls, prob in zip(classes, predictions):
                    st.write(f"{cls}: {prob*100:.2f}%")
    else:
        st.write("An error occurred.")