import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    marka: '',
    seri: '',
    kilometre: '',
    vites_tipi: '',
    yakit_tipi: '',
    kasa_tipi: '',
    renk: '',
    motor_hacmi: '',
    motor_gucu: '',
    cekis: '',
    ort_yakit_tuketimi: '',
    yakit_deposu: '',
    kimden: '',
    arac_yasi: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [animatedMin, setAnimatedMin] = useState(0);
  const [animatedMax, setAnimatedMax] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [seriler, setSeriler] = useState([]);
  const [markaSeriMap, setMarkaSeriMap] = useState({});

  const markalar = [
    'Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Hyundai', 
    'Mercedes-Benz', 'Nissan', 'Opel', 'Peugeot', 'Renault', 
    'Toyota', 'Volkswagen', 'Volvo', 'Citroen', 'Mazda', 
    'Seat', 'Skoda', 'Dacia', 'Kia'
  ];

  const vitesler = ['Düz', 'Otomatik', 'Yarı Otomatik'];
  const yakitlar = ['Benzin', 'Dizel', 'LPG & Benzin', 'Hybrid', 'Elektrik'];
  const kasalar = ['Sedan', 'Hatchback/3', 'Hatchback/5', 'SUV', 'Station wagon', 'Coupe', 'MPV', 'Cabrio'];
  const renkler = ['Beyaz', 'Siyah', 'Gri', 'Gümüş', 'Mavi', 'Kırmızı', 'Kahverengi', 'Yeşil', 'Sarı', 'Turuncu', 'Bordo'];
  const cekisler = ['Önden Çekiş', 'Arkadan İtiş', '4WD (Sürekli)', 'AWD (Elektronik)'];
  const kimdenler = ['Sahibinden', 'Galeriden'];

  // Marka-seri map'ini yükle
  useEffect(() => {
    fetch('http://127.0.0.1:8000/marka-seri')
      .then(res => res.json())
      .then(data => setMarkaSeriMap(data))
      .catch(err => console.error('Marka-seri yüklenemedi:', err));
  }, []);

  // Marka seçildiğinde serileri güncelle
  useEffect(() => {
    if (formData.marka && markaSeriMap[formData.marka]) {
      setSeriler(markaSeriMap[formData.marka]);
      // Marka değişirse seriyi sıfırla
      if (formData.seri && !markaSeriMap[formData.marka].includes(formData.seri)) {
        setFormData(prev => ({ ...prev, seri: '' }));
      }
    } else {
      setSeriler([]);
    }
  }, [formData.marka, markaSeriMap]);

  // Animasyonlu sayı sayımı
  useEffect(() => {
    if (prediction) {
      const priceValue = parseInt(prediction.price.replace(/[^0-9]/g, ''));
      const minValue = parseInt(prediction.min.replace(/[^0-9]/g, ''));
      const maxValue = parseInt(prediction.max.replace(/[^0-9]/g, ''));
      
      const duration = 800;
      const steps = 30;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedPrice(Math.floor(priceValue * easeOutQuart));
        setAnimatedMin(Math.floor(minValue * easeOutQuart));
        setAnimatedMax(Math.floor(maxValue * easeOutQuart));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedPrice(priceValue);
          setAnimatedMin(minValue);
          setAnimatedMax(maxValue);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [prediction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const payload = {
        ...formData,
        kilometre: parseInt(formData.kilometre),
        ort_yakit_tuketimi: parseFloat(formData.ort_yakit_tuketimi),
        yakit_deposu: parseInt(formData.yakit_deposu),
        arac_yasi: parseInt(formData.arac_yasi)
      };

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Tahmin alınırken bir hata oluştu');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <div className="location-badge">
            <span className="location-icon">📍</span>
            <span className="location-text">İzmir</span>
          </div>
          <div className="icon">🚗</div>
          <h1>İkinci El Araç Fiyat Tahmini</h1>
          <p className="subtitle">Aracınızın değerini makine öğrenmesi ile hesaplayın</p>
          <p className="region-info">İzmir bölgesine özel fiyatlandırma</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-grid">
            <div className="form-group">
              <label>Marka</label>
              <select name="marka" value={formData.marka} onChange={handleChange} required>
                <option value="">Seçiniz</option>
                {markalar.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Seri</label>
              {seriler.length > 0 ? (
                <select 
                  name="seri" 
                  value={formData.seri} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Seçiniz</option>
                  {seriler.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              ) : (
                <input 
                  type="text" 
                  name="seri" 
                  value={formData.seri} 
                  onChange={handleChange}
                  placeholder="Önce marka seçiniz"
                  required 
                  disabled={!formData.marka}
                />
              )}
            </div>

            <div className="form-group">
              <label>Kilometre</label>
              <input 
                type="number" 
                name="kilometre" 
                value={formData.kilometre} 
                onChange={handleChange}
                placeholder="Örn: 50000"
                required 
              />
            </div>

            <div className="form-group">
              <label>Araç Yaşı</label>
              <input 
                type="number" 
                name="arac_yasi" 
                value={formData.arac_yasi} 
                onChange={handleChange}
                placeholder="Örn: 5"
                required 
              />
            </div>

            <div className="form-group">
              <label>Vites Tipi</label>
              <select name="vites_tipi" value={formData.vites_tipi} onChange={handleChange} required>
                <option value="">Seçiniz</option>
                {vitesler.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Yakıt Tipi</label>
              <select name="yakit_tipi" value={formData.yakit_tipi} onChange={handleChange} required>
                <option value="">Seçiniz</option>
                {yakitlar.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Kasa Tipi</label>
              <select name="kasa_tipi" value={formData.kasa_tipi} onChange={handleChange} required>
                <option value="">Seçiniz</option>
                {kasalar.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Renk</label>
              <select name="renk" value={formData.renk} onChange={handleChange} required>
                <option value="">Seçiniz</option>
                {renkler.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Motor Hacmi</label>
              <input 
                type="text" 
                name="motor_hacmi" 
                value={formData.motor_hacmi} 
                onChange={handleChange}
                placeholder="Örn: 1.6, 2.0"
                required 
              />
            </div>

            <div className="form-group">
              <label>Motor Gücü (HP)</label>
              <input 
                type="text" 
                name="motor_gucu" 
                value={formData.motor_gucu} 
                onChange={handleChange}
                placeholder="Örn: 120, 150"
                required 
              />
            </div>

            <div className="form-group">
              <label>Çekiş</label>
              <select name="cekis" value={formData.cekis} onChange={handleChange} required>
                <option value="">Seçiniz</option>
                {cekisler.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Ortalama Yakıt Tüketimi (L/100km)</label>
              <input 
                type="number" 
                step="0.1"
                name="ort_yakit_tuketimi" 
                value={formData.ort_yakit_tuketimi} 
                onChange={handleChange}
                placeholder="Örn: 6.5"
                required 
              />
            </div>

            <div className="form-group">
              <label>Yakıt Deposu (L)</label>
              <input 
                type="number" 
                name="yakit_deposu" 
                value={formData.yakit_deposu} 
                onChange={handleChange}
                placeholder="Örn: 50"
                required 
              />
            </div>

            <div className="form-group">
              <label>Kimden</label>
              <select name="kimden" value={formData.kimden} onChange={handleChange} required>
                <option value="">Seçiniz</option>
                {kimdenler.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Hesaplanıyor...
              </>
            ) : (
              <>
                <span className="btn-icon">💰</span>
                Fiyat Tahmini Al
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="error-box">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {prediction && (
          <>
            <div className="modal-overlay" onClick={() => setPrediction(null)}>
              <div className="result-modal" onClick={(e) => e.stopPropagation()}>
                {showConfetti && (
                  <div className="confetti-container">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className="confetti" 
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 0.3}s`,
                          backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 3)]
                        }}
                      />
                    ))}
                  </div>
                )}
                <button className="close-btn" onClick={() => setPrediction(null)}>×</button>
                <div className="result-header">
                  <span className="result-icon">🎉</span>
                  <h2>Tahmin Tamamlandı!</h2>
                </div>
                <div className="result-content">
                  <div className="price-main">
                    <div className="price-label">Tahmini Değer</div>
                    <div className="price-value animated-number">
                      {animatedPrice.toLocaleString('tr-TR')} TL
                    </div>
                  </div>
                  <div className="price-range">
                    <div className="range-item">
                      <span className="range-label">Minimum</span>
                      <span className="range-value">{animatedMin.toLocaleString('tr-TR')} TL</span>
                    </div>
                    <div className="range-item">
                      <span className="range-label">Maksimum</span>
                      <span className="range-value">{animatedMax.toLocaleString('tr-TR')} TL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
