## 🔧 Kurulum

### Gereksinimler
- Python 3.8+
- Node.js 14+
- npm

### Backend Kurulumu

```bash
cd backend
pip install fastapi uvicorn catboost pandas numpy
```

### Frontend Kurulumu

```bash
cd frontend
npm install
```

## ▶️ Çalıştırma

### Terminal 1: Backend Başlatma
```bash
cd backend
python -m uvicorn main:app --reload
```
Backend: http://127.0.0.1:8000

### Terminal 2: Frontend Başlatma
```bash
cd frontend
npm start
```
Frontend: http://localhost:3000

## 📊 Proje Yapısı

```
car-price-predictor/
├── backend/
│   ├── main.py              # FastAPI uygulaması
│   ├── best_model.cbm       # Eğitilmiş CatBoost modeli
│   ├── model_metrics.pkl    # Model performans metrikleri
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.js           # Ana React komponenti
│   │   ├── App.css          # Stil dosyası
│   │   └── index.js
│   ├── package.json
│   └── public/
└── README.md
```

## 🎯 Kullanım

1. Aracın **markaını** seçin
2. Seçilen markaya göre **seri** otomatik gelecek
3. Diğer bilgileri (kilometre, yaşı, vb.) girin
4. **"Fiyat Tahmini Al"** butonuna tıklayın
5. Tahmin edilen fiyat ve güven aralığı gösterilecek

## 📈 Model Performansı

- **R² Score:** 0.89 (Açıklanan Varyans: %89)
- **RMSE:** 302,903 TL
- **MAE:** Ortalama Hata
- **Güven Aralığı:** ± MAE

## 🤝 Katkı Sağlamak

1. Projeyi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişiklikleri commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'e push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında sunulmuştur.

---

**Not:** Model performansını iyileştirmek için daha fazla veri ve feature engineering yapılabilir.
