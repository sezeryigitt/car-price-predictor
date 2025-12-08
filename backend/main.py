# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from catboost import CatBoostRegressor

app = FastAPI(title="Araba Fiyat Tahmini")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model yükleme
model = CatBoostRegressor()
model.load_model("best_model.cbm")

# Marka-Seri eşleştirmesi (İzmir verilerine göre)
marka_seri_map = {
    'Audi': ['A3', 'A4', 'A5', 'A6', 'Q3', 'Q5', 'Q7', 'TT'],
    'BMW': ['1 Serisi', '3 Serisi', '5 Serisi', 'X1', 'X3', 'X5'],
    'Fiat': ['Egea', 'Tipo', '500', 'Doblo', 'Linea', 'Punto'],
    'Ford': ['Focus', 'Fiesta', 'Mondeo', 'Kuga', 'Transit', 'EcoSport'],
    'Honda': ['Civic', 'CR-V', 'Jazz', 'Accord'],
    'Hyundai': ['i20', 'i30', 'Tucson', 'Elantra', 'Accent', 'Bayon'],
    'Mercedes-Benz': ['C', 'E', 'A', 'CLA', 'GLA', 'GLC', 'GLE'],
    'Nissan': ['Qashqai', 'Juke', 'X-Trail', 'Micra'],
    'Opel': ['Astra', 'Corsa', 'Insignia', 'Mokka', 'Crossland'],
    'Peugeot': ['208', '308', '3008', '2008', '508'],
    'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Fluence', 'Taliant'],
    'Toyota': ['Corolla', 'Yaris', 'C-HR', 'RAV4', 'Auris', 'Avensis'],
    'Volkswagen': ['Golf', 'Passat', 'Polo', 'Tiguan', 'Jetta', 'Caddy'],
    'Volvo': ['S60', 'S80', 'V40', 'XC60', 'XC90'],
    'Citroen': ['C3', 'C4', 'C5', 'Berlingo', 'C-Elysee'],
    'Mazda': ['2', '3', '6', 'CX-3', 'CX-5'],
    'Seat': ['Ibiza', 'Leon', 'Ateca', 'Arona'],
    'Skoda': ['Fabia', 'Octavia', 'Superb', 'Kodiaq', 'Karoq'],
    'Dacia': ['Duster', 'Sandero', 'Logan', 'Lodgy'],
    'Kia': ['Rio', 'Ceed', 'Sportage', 'Picanto', 'Stonic']
}

class CarData(BaseModel):
    marka: str
    seri: str
    kilometre: int
    vites_tipi: str
    yakit_tipi: str
    kasa_tipi: str
    renk: str
    motor_hacmi: str
    motor_gucu: str
    cekis: str
    ort_yakit_tuketimi: float
    yakit_deposu: int
    kimden: str
    arac_yasi: int

@app.post("/predict")
async def predict(data: CarData):
    try:
        # Veriyi dataframe'e çevir ve düzenle
        df = pd.DataFrame([data.dict()])
        df = df[['marka', 'seri', 'kilometre', 'vites_tipi', 'yakit_tipi',
                 'kasa_tipi', 'renk', 'motor_hacmi', 'motor_gucu', 'cekis',
                 'ort_yakit_tuketimi', 'yakit_deposu', 'kimden', 'arac_yasi']]
        
        # Model tahmini
        prediction_value = model.predict(df)[0]
        pred = int(prediction_value)
        
        # Minimum fiyat kontrolü
        if pred < 50000:
            pred = 50000
        
        # MAE bazlı güven aralığı (MAE: 122,701 TL)
        mae = 122701
        min_price = max(50000, pred - mae)  # Minimum 50k olsun
        max_price = pred + mae
        
        return {
            "price": f"{pred:,}".replace(",", ".") + " TL",
            "min": f"{min_price:,}".replace(",", "."),
            "max": f"{max_price:,}".replace(",", ".")
        }
    except Exception as e:
        return {
            "price": "Hata oluştu",
            "min": "-",
            "max": "-"
        }

@app.get("/")
async def root():
    return {"message": "CatBoost Araba Fiyat Tahmini API çalışıyor!"}

@app.get("/marka-seri")
async def get_marka_seri():
    return marka_seri_map
