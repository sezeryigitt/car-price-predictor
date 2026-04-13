# 🤝 Katkıda Bulunma Rehberi

Bu rehber, projeye nasıl katkıda bulunacağınızı ve katkılarınızın GitHub katkı grafiğinde doğru şekilde görünmesini nasıl sağlayacağınızı açıklar.

---

## 📋 İçindekiler

- [Katkı Adımları](#katkı-adımları)
- [Commit Mesaj Formatı](#commit-mesaj-formatı)
- [GitHub Katkı Grafiği (Yeşil Ekran)](#github-katkı-grafiği-yeşil-ekran)
- [Geçmiş Commit E-postasını Düzeltme](#geçmiş-commit-e-postasını-düzeltme)
- [Sorun Giderme (Troubleshooting)](#sorun-giderme-troubleshooting)

---

## Katkı Adımları

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

---

## Commit Mesaj Formatı

```
feat:     Yeni özellik
fix:      Hata düzeltmesi
docs:     Dokümantasyon güncellemesi
style:    Kod formatı değişikliği
refactor: Kod yeniden yapılandırma
test:     Test ekleme/güncelleme
chore:    Bakım işleri
```

---

## GitHub Katkı Grafiği (Yeşil Ekran)

GitHub profil sayfasındaki katkı grafiği her commit'i otomatik olarak saymaz. Commit'lerinizin grafikte görünmesi için aşağıdaki üç koşulun sağlanması gerekir:

### 1. "Include private contributions" ayarını açın

Private (özel) repolara yaptığınız commit'lerin grafikte görünmesi için bu ayarın açık olması gerekir:

**GitHub → Settings → Profile → "Include private contributions on my profile"** kutucuğunu işaretleyin.

> Bu ayar açıldığında commit **sayısı** grafikte görünür; repo adı ve içeriği gizli kalır.

### 2. Commit e-postanızın GitHub'daki doğrulanmış e-postayla eşleştiğinden emin olun

Commit'lerin size atfedilebilmesi için Git'in kullandığı e-posta, GitHub hesabınızda **doğrulanmış (verified)** olarak kayıtlı olmalıdır.

**Mevcut ayarı kontrol edin:**
```bash
git config --global user.name
git config --global user.email
```

**Gerekirse güncelleyin:**
```bash
git config --global user.name "Ad Soyad"
git config --global user.email "github-adresiniz@ornek.com"
```

GitHub'da kayıtlı ve doğrulanmış e-postalarınızı görmek için:  
**GitHub → Settings → Emails**

**Son commit'e ait e-postayı doğrulamak için:**
```bash
git log -1 --pretty=format:"%an <%ae>"
```

### 3. Commit'lerin default branch'te olduğundan emin olun

Katkı grafiği yalnızca **default branch** (genellikle `main` veya `master`) üzerindeki commit'leri sayar. Feature branch'teki commit'ler, o branch `main`'e merge edilene kadar grafiğe yansımaz.

### 4. Geçmiş commit'ler için bekleme süresi

"Include private contributions" ayarını açtıktan sonra **geçmişte yaptığınız commit'ler herhangi bir işlem gerektirmeksizin otomatik olarak grafiğe yansır.** GitHub'ın grafiği güncellemesi birkaç dakika ila birkaç saat sürebilir; geçmişi yeniden yazmanıza (rewrite) gerek yoktur.

---

## Geçmiş Commit E-postasını Düzeltme

> ⚠️ **Uyarı:** Bu işlem Git geçmişini yeniden yazar (rewrite). Başkalarıyla paylaştığınız veya fork'lanmış repolarda uygulamadan önce ekibinizle koordinasyon sağlayın.

Yalnızca **kendi özel reponuzda** ve geçmişi yeniden yazmayı göze alıyorsanız aşağıdaki yöntemi kullanabilirsiniz.

### `git filter-branch` ile e-posta düzeltme

```bash
git filter-branch --env-filter '
OLD_EMAIL="eski-email@ornek.com"
CORRECT_NAME="Ad Soyad"
CORRECT_EMAIL="github-adresiniz@ornek.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

İşlem tamamlandıktan sonra:
```bash
git push --force --tags origin 'refs/heads/*'
```

> **Alternatif:** `git-filter-repo` aracı daha hızlı ve güvenlidir. Kurulum için: `pip install git-filter-repo`

---

## Sorun Giderme (Troubleshooting)

### ❌ Commit'ler grafikte görünmüyor

| Olası Neden | Kontrol | Çözüm |
|---|---|---|
| "Include private contributions" kapalı | GitHub → Settings → Profile | İlgili kutucuğu işaretleyin |
| Commit e-postası doğrulanmamış | `git log -1 --pretty=format:"%ae"` | `git config --global user.email` ile güncelleyin |
| Commit default branch'te değil | `git branch` | Feature branch'i `main`'e merge edin |
| Commit fork'ta ve PR merge olmadı | GitHub PR sayfasını kontrol edin | PR'ı upstream repoya merge edin |
| Grafik henüz güncellenmedi | Birkaç saat bekleyin | Sayfayı yenileyin |

### ❌ E-posta GitHub'da kayıtlı ama hâlâ görünmüyor

GitHub'da e-postanızın **Verified** (doğrulanmış) durumda olduğundan emin olun:

1. GitHub → Settings → Emails sayfasına gidin.
2. E-postanızın yanında **Verified** etiketi olmalıdır.
3. Etiket yoksa, gelen doğrulama e-postasındaki bağlantıya tıklayın.

### ❌ `git config` değişikliği sonrası eski commit'ler hâlâ görünmüyor

`git config` yalnızca **yeni** commit'leri etkiler. Eski commit'lerin güncellenmesi için yukarıdaki [Geçmiş Commit E-postasını Düzeltme](#geçmiş-commit-e-postasını-düzeltme) bölümündeki adımları uygulayın.

### ❌ Private repo commit sayısı doğru ama tarihler yanlış

Makinenizin sistem saatini ve saat dilimini kontrol edin:
```bash
date
```
Yanlışsa işletim sistemi ayarlarından düzeltin; commit zamanı sistem saatine göre kaydedilir.

---

Herhangi bir sorunuz varsa [Issues](../../issues) bölümünden bildirin.
