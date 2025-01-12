# Social Platform UI

SoMedia, kullanıcıların sosyal medya etkileşimlerini kolay ve etkili bir şekilde gerçekleştirebileceği bir platformdur. Kullanıcı dostu bir arayüz sunarak, kullanıcıların paylaşım yapabilmesini, hikaye paylaşabilmesini, beğeniler ve yorumlar yapabilmesini. Proje, React kütüphanesi ile geliştirilmiştir. Kimlik doğrulama ve yetkilendirme işlemleri için JWT (JSON Web Token) kullanılır ve arka uçta [.NET Social Platform API](https://github.com/mevlutayilmaz/social-platform-api) ile entegre çalışır.


https://github.com/user-attachments/assets/27219fde-dc18-4eeb-b920-f93798fcab8e


## Özellikler

- **1. Kullanıcı Yönetimi**
  - Kullanıcılar kayıt olabilir ve giriş yapabilir.
  - Kullanıcılar profillerini görüntüleyebilir ve düzenleyebilir. 
- **2. Post Paylaşımı ve Etkileşimler:**
  - Kullanıcılar post paylaşabilir, resim ekleyebilir.
  - Postlara yorum yapılabilir ve beğeni bırakılabilir.
  - Beğenilen ve yorum yapılan postlar anlık olarak güncellenir.
- **3. Story (Hikaye) Paylaşımı**
  - Kullanıcılar kısa süreli hikaye paylaşabilir.
  - Hikayeler ana sayfada kullanıcı avatarlarının üzerinde görüntülenir.
- **4. Takip ve Takipçi Yönetimi**
  - Kullanıcılar diğer kullanıcıları takip edebilir.
  - Takip edilen kullanıcıların gönderileri anasayfada görüntülenir.

## Teknolojiler

- **React:** JavaScript kütüphanesi
- **SCSS:** CSS framework
- **Axios:** HTTP istekleri için
- **JWT (JSON Web Token):** Kimlik doğrulama ve yetkilendirme
- **.NET E-Ticaret API'si:** Backend API

## Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/mevlutayilmaz/social-platform-ui.git
   ```

2. **Proje dizinine gidin:**
   ```bash
   git social-platform-ui
   ```

3. **Gerekli bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Projeyi çalıştırın:**
   ```bash
   npm start
   ```

## Ekran Görüntüleri

<table style="border-spacing: 0; border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/76464147-37d3-49ba-9fcf-e057c7c74078" width="400" />
      <p style="text-align: center;">Login</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/7961ceab-bab4-4f05-8c3f-f359c4633546" width="400" />
      <p style="text-align: center;">Register</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/af417928-a053-41cb-a7a6-86c7519551c9" width="400" />
      <p style="text-align: center;">Ana Sayfa</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/1dd6591f-0643-45f9-9d43-6320461657ed" width="400" />
      <p style="text-align: center;">Profil</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/22183187-4297-45c5-b442-332c9ddf2a15" width="400" />
      <p style="text-align: center;">Profil Güncelleme</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/b6f43519-2552-4153-a293-03638f2cc7ae" width="400" />
      <p style="text-align: center;">Profil-2</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/5817e22c-02e1-4ecc-80f3-fd06e17d9786" width="400" />
      <p style="text-align: center;">Hikaye</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/fabb5e3c-bc17-46e4-9872-79727d366ff3" width="400" />
      <p style="text-align: center;">Hikaye Paylaşma</p>
    </td>
  </tr>
</table>


