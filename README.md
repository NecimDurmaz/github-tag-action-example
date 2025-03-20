# Commit Mesajları ile Otomatik Sürüm Yükseltme (Auto Versioning)

Bu proje, commit mesajlarını kullanarak sürüm numarasını otomatik olarak artırır. GitHub Actions tarafından belirlenen kurallara göre commit mesajlarının içeriğine bağlı olarak **major, minor veya patch** seviyesinde yeni bir sürüm etiketi oluşturulur.

## 🚀 Sürüm Numaralandırma Kuralları

Sürüm numaraları **SemVer (Semantic Versioning)** formatında belirlenir:

```
MAJOR.MINOR.PATCH
```

- **MAJOR** (Ana Sürüm) → Geriye dönük uyumsuz büyük değişiklikler
- **MINOR** (Alt Sürüm) → Yeni özellik eklemeleri (geriye uyumlu)
- **PATCH** (Hata Düzeltmeleri) → Küçük düzeltmeler ve performans iyileştirmeleri

## 📌 Commit Mesajlarına Göre Versiyon Artırımı

Aşağıda commit mesajı yazım kuralları ve etkileri listelenmiştir:

### 1️⃣ **MAJOR (Ana Sürüm) Artırma**

- Eğer commit mesajında **`#breaking_change`** etiketi varsa, MAJOR sürümü artırır.
- Örnek commit mesajları:
  ```
  feat: API'nin v2.0 versiyonuna geçildi #breaking_change
  ```
  ```
  breaking: Eski API kaldırıldı, yeni API eklendi #breaking_change
  ```
  **Önce:** `1.2.3` → **Sonra:** `2.0.0`

### 2️⃣ **MINOR (Alt Sürüm) Artırma**

- Eğer commit mesajında **`#new_feature`** etiketi varsa, MINOR sürümü artırır.
- Örnek commit mesajları:
  ```
  feat: Kullanıcı profili sayfasına yeni sekme eklendi #new_feature
  ```
  ```
  feature: Yeni filtreleme seçeneği eklendi #new_feature
  ```
  **Önce:** `1.2.3` → **Sonra:** `1.3.0`

### 3️⃣ **PATCH (Hata Düzeltme) Artırma**

- Eğer commit mesajında **`#bug_fix`** etiketi varsa, PATCH sürümü artırır.
- Örnek commit mesajları:
  ```
  fix: Giriş formundaki hata düzeltildi #bug_fix
  ```
  ```
  bugfix: Kullanıcı avatarı yüklenmiyordu, düzeltildi #bug_fix
  ```
  **Önce:** `1.2.3` → **Sonra:** `1.2.4`

### 4️⃣ **Sürüm Artırımı Yapmadan Commit Ekleme**

- Eğer commit mesajında **`#none`** etiketi varsa, sürüm artırılmaz.
- Örnek commit mesajları:
  ```
  docs: README güncellendi #none
  ```
  ```
  chore: Kod formatı düzenlendi #none
  ```
  **Önce:** `1.2.3` → **Sonra:** `1.2.3` (değişmez)

## 🛠 Örnek Kullanım

### Yeni Özellik Eklemek

```bash
git commit -m "feat: Yeni bildirim sistemi eklendi #new_feature"
```

Bu commit, mevcut MINOR sürümü **1 artırır.** Örneğin `1.2.3` → `1.3.0` olur.

### Büyük Değişiklik ve Geriye Dönük Uyumsuzluklar

```bash
git commit -m "breaking: API endpoint değiştirildi #breaking_change"
```

Bu commit, **MAJOR sürümü artırır.** Örneğin `1.2.3` → `2.0.0` olur.

### Küçük Hata Düzeltmeleri

```bash
git commit -m "fix: Sayfa yükleme hatası giderildi #bug_fix"
```

Bu commit, **PATCH sürümü artırır.** Örneğin `1.2.3` → `1.2.4` olur.

### Versiyon Artırmadan Commit

```bash
git commit -m "docs: Kullanım kılavuzu güncellendi #no_version_change"
```

Bu commit, sürümü değiştirmez. (`1.2.3` → `1.2.3` olarak kalır)

## 🎯 Otomatik Etiketleme Sistemi

Bu işlemler GitHub Actions ile otomatik olarak yürütülmektedir. Yeni bir commit yapıldığında belirlenen commit mesajı kurallarına göre **otomatik bir versiyon etiketi (tag) oluşturulur**.

Bu sayede manuel olarak sürüm numarası belirlemeye gerek kalmaz, kod değişikliklerinin türüne göre otomatik olarak belirlenir. 🚀
