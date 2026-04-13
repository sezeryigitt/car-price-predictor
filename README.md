# 🚗 İzmir İkinci El Araç Fiyat Tahmin Sistemi

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.2+-61DAFB.svg)](https://reactjs.org/)
[![CatBoost](https://img.shields.io/badge/CatBoost-ML-orange.svg)](https://catboost.ai/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**İzmir bölgesindeki ikinci el araç fiyatlarını tahmin eden, makine öğrenmesi tabanlı web uygulaması.**

Bu proje, CatBoost regresyon algoritması kullanarak araç özelliklerine göre gerçekçi fiyat tahminleri sunar. Modern bir React frontend ve FastAPI backend ile geliştirilmiştir.

---

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Veri Toplama](#-veri-toplama)
- [Model Geliştirme](#-model-geliştirme)
- [Model Performansı](#-model-performansı)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Proje Yapısı](#-proje-yapısı)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Bilinen Sorunlar ve Çözümler](#-bilinen-sorunlar-ve-çözümler)
- [Lisans](#-lisans)

---

## ✨ Özellikler

- 🎯 **Yüksek Doğruluk:** %89 R² skoru ile güvenilir fiyat tahminleri
- � **Dinamik Marka-Seri Seçimi:** Marka seçimine göre otomatik seri filtreleme
- 📊 **Güven Aralığı:** Her tahmin için minimum ve maksimum fiyat aralığı
- 🎨 **Modern UI/UX:** Kullanıcı dostu, responsive tasarım
- ⚡ **Hızlı API:** FastAPI ile milisaniyeler içinde tahmin
- 🔒 **CORS Desteği:** Güvenli cross-origin istekleri
- 📱 **Responsive Design:** Mobil ve masaüstü uyumlu

---

## 🛠 Teknolojiler

### Backend
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern, hızlı web framework
- **[CatBoost](https://catboost.ai/)** - Gradient boosting ML algoritması
- **[Pandas](https://pandas.pydata.org/)** - Veri manipülasyonu
- **[Uvicorn](https://www.uvicorn.org/)** - ASGI server
- **[Pydantic](https://pydantic-docs.helpmanual.io/)** - Veri validasyonu

### Frontend
- **[React](https://reactjs.org/)** 19.2+ - UI kütüphanesi
- **[React Scripts](https://create-react-app.dev/)** - Build tooling
- **CSS3** - Modern styling

### Machine Learning
- **CatBoost Regressor** - Eğitilmiş model (`best_model.cbm`)
- **14 Feature** - Marka, seri, kilometre, vites, yakıt tipi, vb.
- **İzmir Dataset** - Bölgesel veri seti ile eğitilmiş

---

## �️ Veri Toplama

Bu projedeki makine öğrenmesi modeli, **[arabam.com](https://www.arabam.com)** sitesinden **Puppeteer** kullanılarak otomatik olarak toplanan gerçek verilerle eğitilmiştir.

### Web Scraping Süreci

Veri toplama işlemi için ayrı bir Node.js projesi geliştirilmiştir. Bu proje, aynı repository sahibinde **[webScraper](https://github.com/kullaniciadi/webScraper)** başlığı ile paylaşılmıştır.

#### 🛠️ Kullanılan Teknolojiler
- **[Puppeteer](https://pptr.dev/)** 24.31.0 - Headless Chrome automation
- **[Puppeteer Extra](https://github.com/berstend/puppeteer-extra)** - Plugin desteği
- **[Puppeteer Stealth Plugin](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)** - Bot tespitini önleme

#### 📊 Veri Toplama İstatistikleri
- **Kaynak:** arabam.com (İzmir bölgesi)
- **Toplanan URL Sayısı:** ~1,500+ araç ilanı
- **Toplanan Veri:** CSV formatında 936 KB
- **Özellik Sayısı:** 14 farklı araç özelliği
- **Veri Formatı:** JSON ve CSV

#### 🔄 Scraping Workflow

1. **URL Toplama (`collectCarUrl.js`)**
   ```bash
   node collectCarUrl.js
   ```
   - İzmir bölgesindeki tüm araç ilanlarının URL'lerini toplar
   - `car_Urls.json` dosyasına kaydeder

2. **Veri Çekme (`testCar.js`)**
   ```bash
   node testCar.js
   ```
   - Toplanan URL'lerden araç detaylarını çeker
   - Her URL için 8 saniye bekleme süresi
   - `testCarResults.csv` dosyasına kaydeder

#### 📦 Toplanan Özellikler

| Özellik | Açıklama |
|---------|----------|
| **Marka** | Araç markası (Toyota, BMW, vb.) |
| **Seri** | Model serisi (Corolla, 3 Serisi, vb.) |
| **Kilometre** | Araç kilometresi |
| **Vites Tipi** | Manuel, Otomatik, Yarı Otomatik |
| **Yakıt Tipi** | Benzin, Dizel, Hibrit, Elektrik, LPG |
| **Kasa Tipi** | Sedan, Hatchback, SUV, Cabrio, vb. |
| **Renk** | Araç rengi |
| **Motor Hacmi** | cc cinsinden motor hacmi |
| **Motor Gücü** | HP cinsinden motor gücü |
| **Çekiş** | Önden, Arkadan, 4x4 |
| **Ort. Yakıt Tüketimi** | 100 km'de litre cinsinden |
| **Yakıt Deposu** | Litre cinsinden depo kapasitesi |
| **Kimden** | Sahibinden, Galeriden |
| **Araç Yaşı** | Yıl cinsinden araç yaşı |
| **Fiyat** | İlan fiyatı (TL) - **Hedef değişken** |

#### 🔗 Web Scraper Repository

Veri toplama kodlarına erişmek için:

**Repository:** [github.com/kullaniciadi/webScraper](https://github.com/kullaniciadi/webScraper)

```bash
# Web scraper projesini klonlama
git clone https://github.com/kullaniciadi/webScraper.git
cd webScraper
npm install

# Veri toplama
node collectCarUrl.js  # URL'leri topla
node testCar.js        # Araç verilerini çek
```

#### ⚠️ Önemli Notlar

- Web scraping işlemi **eğitim amaçlı** yapılmıştır
- Arabam.com'un kullanım şartlarına uygun davranılmalıdır
- Rate limiting ve bekleme süreleri uygulanmıştır
- Veriler yalnızca akademik ve eğitim amaçlı kullanılmıştır

---

## 🤖 Model Geliştirme

Model geliştirme süreci **Jupyter Notebook** (`Araba Fiyat Tahminleme.ipynb`) içerisinde detaylı olarak dokümante edilmiştir.

### 📊 Veri Ön İşleme (Data Preprocessing)

#### 1. Veri Temizleme
- **Gereksiz Kolonların Kaldırılması:** URL, İlan No, İlçe, İl, Takasa Uygun
- **Duplicate Kayıtlar:** 2 adet duplicate kayıt tespit edilip kaldırıldı
- **Eksik Veri Analizi:** Tüm kolonlar için eksik veri analizi yapıldı
  - Motor Hacmi: 120 eksik
  - Motor Gücü: 113 eksik
  - Çekiş: 109 eksik
  - Ort. Yakıt Tüketimi: 830 eksik
  - Yakıt Deposu: 739 eksik

#### 2. Feature Engineering
- **Araç Yaşı:** Üretim yılından araç yaşı hesaplandı
- **Veri Standartlaştırma:** 
  - Kilometre değerlerinden "km" ifadesi kaldırıldı
  - Motor hacmi ve güç değerleri sayısal formata dönüştürüldü
  - Renk, kasa tipi gibi kategorik değerler standardize edildi

#### 3. Veri Dönüşümleri
- **Kategorik Değişkenler:** Encoding işlemleri uygulandı
- **Sayısal Değişkenler:** RobustScaler ile ölçeklendirme
- **Outlier Tespiti:** Aykırı değerler analiz edildi

### 🧪 Test Edilen Modeller

Farklı makine öğrenmesi algoritmaları karşılaştırıldı:

| Model | Açıklama |
|-------|----------|
| **Linear Regression** | Temel doğrusal regresyon |
| **Ridge Regression** | L2 regularization ile |
| **Lasso Regression** | L1 regularization ile |
| **ElasticNet** | L1 + L2 regularization |
| **SVR** | Support Vector Regression |
| **KNN Regressor** | K-Nearest Neighbors |
| **Decision Tree** | Karar ağacı |
| **Random Forest** | Ensemble ağaç modeli |
| **AdaBoost** | Adaptive boosting |
| **Gradient Boosting** | Gradient boosting |
| **XGBoost** | Extreme gradient boosting |
| **LightGBM** | Light gradient boosting |
| **CatBoost** | ✅ **Seçilen Model** |

### 🎯 Model Seçimi: CatBoost

**CatBoost** modeli en iyi performansı gösterdiği için seçildi:

#### Avantajları:
- **Kategorik Değişken Desteği:** Kategorik değişkenleri otomatik işler
- **Overfitting Önleme:** Built-in regularization
- **Hızlı Eğitim:** GPU desteği ile hızlı
- **Yüksek Doğruluk:** Gradient boosting'in gelişmiş versiyonu

#### Hiperparametre Optimizasyonu:
- **RandomizedSearchCV** veya **GridSearchCV** kullanıldı
- En iyi parametreler belirlendi
- Cross-validation ile model doğrulandı

### 📁 Model Kaydetme

Eğitilen model `best_model.cbm` dosyası olarak kaydedildi:
- **Format:** CatBoost binary format
- **Boyut:** ~1 MB
- **Kullanım:** FastAPI backend'de yüklenir

---

## �📈 Model Performansı

| Metrik | Değer | Açıklama |
|--------|-------|----------|
| **R² Score** | 0.89 | Model, fiyat varyansının %89'unu açıklıyor |
| **RMSE** | 302,903 TL | Ortalama karesel hata |
| **MAE** | 122,701 TL | Ortalama mutlak hata |
| **Min Fiyat** | 50,000 TL | Tahmin edilen minimum fiyat sınırı |

### Desteklenen Markalar (20)
Audi, BMW, Citroen, Dacia, Fiat, Ford, Honda, Hyundai, Kia, Mazda, Mercedes-Benz, Nissan, Opel, Peugeot, Renault, Seat, Skoda, Toyota, Volkswagen, Volvo

### Toplam Seri Sayısı
100+ farklı araç serisi

---

## �🔧 Kurulum

### Gereksinimler

Sisteminizde aşağıdaki yazılımların kurulu olması gerekmektedir:

- **Python** 3.8 veya üzeri
- **Node.js** 14 veya üzeri
- **npm** 6 veya üzeri
- **Git** (projeyi klonlamak için)

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/kullaniciadi/car-price-predictor.git
cd car-price-predictor
```

### 2. Backend Kurulumu

#### Sanal Ortam Oluşturma (Önerilen)

```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

#### Bağımlılıkları Yükleme

```bash
pip install -r requirements.txt
```

**requirements.txt içeriği:**
```
fastapi
uvicorn[standard]
catboost
pandas
numpy
pydantic
```

### 3. Frontend Kurulumu

```bash
cd ../frontend
npm install
```

---

## ▶️ Kullanım

### Backend'i Başlatma

```bash
cd backend
python -m uvicorn main:app --reload
```

✅ Backend şu adreste çalışacak: **http://127.0.0.1:8000**

📚 API Dokümantasyonu: **http://127.0.0.1:8000/docs**

### Frontend'i Başlatma

**Yeni bir terminal açın:**

```bash
cd frontend
npm start
```

✅ Frontend şu adreste çalışacak: **http://localhost:3000**

### Uygulamayı Kullanma

1. Tarayıcınızda `http://localhost:3000` adresine gidin
2. **Marka** seçin (örn: Toyota)
3. **Seri** otomatik olarak yüklenecek, birini seçin (örn: Corolla)
4. Diğer araç bilgilerini doldurun:
   - Kilometre
   - Vites Tipi (Manuel/Otomatik)
   - Yakıt Tipi (Benzin/Dizel/Hibrit/Elektrik)
   - Kasa Tipi (Sedan/Hatchback/SUV/vb.)
   - Renk
   - Motor Hacmi
   - Motor Gücü
   - Çekiş (Önden/Arkadan/4x4)
   - Ortalama Yakıt Tüketimi
   - Yakıt Deposu
   - Kimden (Sahibinden/Galeriden)
   - Araç Yaşı
5. **"Fiyat Tahmini Al"** butonuna tıklayın
6. Tahmin edilen fiyat ve güven aralığı görüntülenecek

---

## � API Dokümantasyonu

### Base URL
```
http://127.0.0.1:8000
```

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "message": "CatBoost Araba Fiyat Tahmini API çalışıyor!"
}
```

---

#### 2. Marka-Seri Listesi
```http
GET /marka-seri
```

**Response:**
```json
{
  "Toyota": ["Corolla", "Yaris", "C-HR", "RAV4", "Auris", "Avensis"],
  "BMW": ["1 Serisi", "3 Serisi", "5 Serisi", "X1", "X3", "X5"],
  ...
}
```

---

#### 3. Fiyat Tahmini
```http
POST /predict
```

**Request Body:**
```json
{
  "marka": "Toyota",
  "seri": "Corolla",
  "kilometre": 85000,
  "vites_tipi": "Manuel",
  "yakit_tipi": "Dizel",
  "kasa_tipi": "Sedan",
  "renk": "Beyaz",
  "motor_hacmi": "1600",
  "motor_gucu": "116",
  "cekis": "Önden Çekiş",
  "ort_yakit_tuketimi": 5.2,
  "yakit_deposu": 50,
  "kimden": "Sahibinden",
  "arac_yasi": 5
}
```

**Response:**
```json
{
  "price": "450.000 TL",
  "min": "327.299",
  "max": "572.701"
}
```

**Hata Durumu:**
```json
{
  "price": "Hata oluştu",
  "min": "-",
  "max": "-"
}
```

---

## 📂 Proje Yapısı

```
car-price-predictor/
│
├── backend/                      # Backend uygulaması
│   ├── main.py                   # FastAPI ana dosyası
│   ├── best_model.cbm            # Eğitilmiş CatBoost modeli (1.04 MB)
│   ├── requirements.txt          # Python bağımlılıkları
│   └── __pycache__/              # Python cache (gitignore'da)
│
├── frontend/                     # Frontend uygulaması
│   ├── public/                   # Statik dosyalar
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/                      # React kaynak kodları
│   │   ├── App.js                # Ana React komponenti
│   │   ├── App.css               # Stil dosyası
│   │   ├── index.js              # React entry point
│   │   └── index.css
│   ├── package.json              # Node.js bağımlılıkları
│   ├── package-lock.json
│   └── node_modules/             # Node bağımlılıkları (gitignore'da)
│
├── .gitignore                    # Git ignore kuralları
├── README.md                     # Bu dosya
└── LICENSE                       # MIT Lisansı

```

---

## 🎯 Kullanım Senaryoları

### Senaryo 1: İkinci El Araç Alıcısı
Bir kullanıcı Toyota Corolla almayı düşünüyor. Satıcının istediği fiyatın piyasa değerine uygun olup olmadığını kontrol etmek için uygulamayı kullanır.

### Senaryo 2: Araç Satıcısı
Galerici, stoğundaki araçlar için rekabetçi fiyat belirlemek amacıyla tahmin sistemini kullanır.

### Senaryo 3: Piyasa Analizi
Araştırmacılar, İzmir bölgesindeki araç fiyat trendlerini analiz etmek için API'yi kullanır.

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Projeye katkıda bulunmak için:

1. **Fork** edin
2. Feature branch oluşturun:
   ```bash
   git checkout -b feature/YeniOzellik
   ```
3. Değişikliklerinizi commit edin:
   ```bash
   git commit -m 'feat: Yeni özellik eklendi'
   ```
4. Branch'inizi push edin:
   ```bash
   git push origin feature/YeniOzellik
   ```
5. **Pull Request** açın

### Commit Mesaj Formatı
```
feat: Yeni özellik
fix: Hata düzeltmesi
docs: Dokümantasyon güncellemesi
style: Kod formatı değişikliği
refactor: Kod yeniden yapılandırma
test: Test ekleme/güncelleme
chore: Bakım işleri
```

### 📊 GitHub Katkı Grafiği (Yeşil Ekran)

Private (özel) repolara yaptığınız commit'lerin GitHub profil sayfasındaki katkı grafiğinde görünmesi için aşağıdaki adımları izleyin:

#### 1. "Include private contributions" ayarını açın

GitHub'da profil sayfanıza gidin ve şu yolu izleyin:

**GitHub → Settings → Profile → "Include private contributions on my profile"** kutucuğunu işaretleyin.

Bu ayar açıldıktan sonra özel repolara yaptığınız commit sayısı grafik üzerinde görünür; repo adı ve içeriği gizli kalır.

#### 2. Commit e-postanızın GitHub'daki doğrulanmış e-postayla eşleştiğinden emin olun

Commit'lerin size atfedilebilmesi için Git'in kullandığı e-posta, GitHub hesabınızda **doğrulanmış (verified)** olarak kayıtlı olmalıdır.

Mevcut ayarı kontrol edin:
```bash
git config --global user.name
git config --global user.email
```

Gerekirse güncelleyin:
```bash
git config --global user.name "Ad Soyad"
git config --global user.email "github-adresiniz@ornek.com"
```

GitHub'da kayıtlı e-postalarınızı şu adresten görebilirsiniz:  
**GitHub → Settings → Emails**

#### 3. Geçmiş commit'ler için bekleme süresi

"Include private contributions" ayarını açtıktan sonra **geçmişte yaptığınız commit'ler herhangi bir işlem gerektirmeksizin otomatik olarak grafiğe yansır.** GitHub'ın grafiği güncellemesi birkaç dakika ila birkaç saat sürebilir; geçmişi yeniden yazmanıza (rewrite) gerek yoktur.

> **Not:** Commit e-postası yanlışsa yalnızca o tarihten sonraki commit'ler görünür. Eski commit'lerin e-postasını düzeltmek için geçmiş yeniden yazılmalıdır; bu işlem paylaşımlı (fork'lanmış veya ekip) repolarda risklidir. Detaylı rehber için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın.

---

## � Bilinen Sorunlar ve Çözümler

### Sorun 1: CORS Hatası
**Hata:** `Access to fetch at 'http://127.0.0.1:8000' from origin 'http://localhost:3000' has been blocked`

**Çözüm:** Backend'deki `main.py` dosyasında CORS ayarları zaten yapılandırılmış. Eğer farklı bir port kullanıyorsanız, `allow_origins` listesine ekleyin.

### Sorun 2: Model Dosyası Bulunamadı
**Hata:** `FileNotFoundError: best_model.cbm`

**Çözüm:** `backend/` klasöründe `best_model.cbm` dosyasının olduğundan emin olun. Projeyi klonladıysanız bu dosya otomatik gelmelidir.

### Sorun 3: Port Zaten Kullanımda
**Hata:** `Address already in use`

**Çözüm:** Farklı bir port kullanın:
```bash
uvicorn main:app --reload --port 8001
```

### Sorun 4: Private repo commit'leri katkı grafiğinde görünmüyor

**Belirti:** GitHub profil sayfasındaki yeşil katkı grafiğinde private repolara yaptığınız commit'ler eksik.

**Çözüm adımları:**

1. **"Include private contributions" ayarını açın:**  
   GitHub → Settings → Profile → *"Include private contributions on my profile"* kutucuğunu işaretleyin.

2. **Commit e-postasının doğru olduğunu doğrulayın:**
   ```bash
   git log -1 --pretty=format:"%an <%ae>"
   ```
   Çıktıdaki e-posta, GitHub → Settings → Emails sayfasında **Verified** olarak görünmelidir.

3. **Birkaç dakika bekleyin:** Ayar değişikliğinin ardından grafik otomatik olarak güncellenir.

### Sorun 5: Commit e-postası yanlış olduğu için eski katkılar görünmüyor

**Belirti:** `git log` çıktısındaki e-posta, GitHub hesabınızdaki doğrulanmış e-postadan farklı.

**Yeni commit'ler için çözüm (global ayar):**
```bash
git config --global user.email "github-adresiniz@ornek.com"
```

**Eski commit'ler için:** Geçmişi yeniden yazmak gerekir; bu işlem paylaşımlı repolarda risklidir ve dikkatli uygulanmalıdır. Ayrıntılı adımlar ve riskler için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasındaki *"Geçmiş Commit E-postasını Düzeltme"* bölümüne bakın.

---

## 📊 Gelecek Geliştirmeler

- [ ] Daha fazla marka ve model desteği
- [ ] Araç görseli yükleme ve analiz
- [ ] Fiyat geçmişi grafiği
- [ ] Kullanıcı hesapları ve favori araçlar
- [ ] E-posta ile fiyat değişikliği bildirimleri
- [ ] Mobil uygulama (React Native)
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Unit ve integration testleri
- [ ] Model versiyonlama ve A/B testing

---

## 📝 Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

```
MIT License

Copyright (c) 2026 İzmir İkinci El Araç Fiyat Tahmin Sistemi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Teşekkürler

- **CatBoost Team** - Harika ML kütüphanesi için
- **FastAPI** - Modern ve hızlı framework için
- **React Team** - Güçlü UI kütüphanesi için
---

<div align="center">

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın! ⭐**

Made with ❤️ in İzmir

</div>
