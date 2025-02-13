# Blog Backend

## Deskripsi
Backend ini menangani proses autentikasi pengguna (login & register) serta memungkinkan pengguna untuk membuat dan melihat postingan mereka sendiri. Backend dikembangkan menggunakan **Node.js**, **Express.js**, dan **MongoDB**.

## Fitur Utama
- **Registrasi Pengguna**: Pengguna dapat mendaftar dengan nama, email, dan password.
- **Login Pengguna**: Autentikasi menggunakan email dan password dengan JWT.
- **Membuat Postingan**: Pengguna yang telah login dapat membuat postingan (dibatasi maksimal 3 per user).
- **Menampilkan Postingan**: Setiap pengguna hanya bisa melihat postingan yang mereka buat sendiri.

## Teknologi yang Digunakan
- **Node.js** - Runtime JavaScript untuk backend
- **Express.js** - Framework backend untuk membangun API
- **MongoDB** - Database NoSQL untuk menyimpan data pengguna dan postingan
- **bcryptjs** - Untuk mengenkripsi password
- **jsonwebtoken (JWT)** - Untuk autentikasi pengguna

## Instalasi
1. **Clone Repository**
   ```bash
   git clone https://github.com/halozra/Debug-Daily-Backend.git
   cd Debug-Daily-Backend
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Buat file `.env`** dan tambahkan variabel berikut:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```
4. **Jalankan Server**
   ```bash
   npm start
   ```
   atau untuk development mode:
   ```bash
   npm run dev
   ```

## API Endpoints

### Autentikasi
- **[POST] /api/auth/register** → Mendaftarkan pengguna baru
- **[POST] /api/auth/login** → Login pengguna dan mendapatkan token JWT

### Postingan
- **[POST] /api/posts/create** → Membuat postingan (hanya untuk user login, dibatasi 3 post)
- **[GET] /api/posts** → Menampilkan semua postingan pengguna yang sedang login

## Struktur Proyek
```
Backend/
├── middleware/
│   ├── verifyToken.js
├── models/
│   ├── User.js
│   ├── Post.js
├── routes/
│   ├── auth.js
│   ├── posts.js
├── server.js
├── package.json
├── .env (harus dibuat manual)
```

## Lisensi
Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan pribadi. 🚀

