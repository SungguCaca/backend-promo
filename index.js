const express = require('express');
const mongoose = require('mongoose');
const foodRoutes = require('./routes/food.routes.js');
const promoRoutes = require('./routes/promo.routes.js');

const app = express();

// Database connection
mongoose.connect('mongodb+srv://sunggu:sungguminasa@foods.rhcj8rq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/foods', foodRoutes);
app.use('/api/promos', promoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

// Server listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// Meng-import beberapa library yang digunakan, yaitu express dan mongoose.
// Membuat instance dari aplikasi Express dengan memanggil fungsi express().
// Melakukan koneksi ke database MongoDB dengan menggunakan mongoose.connect(). Di sini, saya menggunakan database dengan nama food-beverage-service, 
// dan juga menambahkan beberapa opsi konfigurasi untuk memastikan koneksi yang aman dan efisien.
// Menggunakan middleware express.json() untuk meng-parse request body dalam format JSON.
// Menggunakan router yang telah dibuat pada file food.routes.js dan promo.routes.js dengan memanggil app.use() dan menetapkan prefix URL yang digunakan.
// Menambahkan middleware error handling yang akan menangkap dan menangani error yang terjadi pada aplikasi. 
// Middleware ini akan menerima parameter err, req, res, dan next, dan akan mengembalikan response dengan status code 500 dan pesan error jika terjadi error pada aplikasi.
// Menentukan port server yang akan digunakan dan memulai server dengan memanggil app.listen().
//  Di sini, saya menggunakan port 8000 sebagai default, namun juga menyediakan opsi untuk menggunakan port yang disediakan oleh sistem operasi dengan process.env.PORT.