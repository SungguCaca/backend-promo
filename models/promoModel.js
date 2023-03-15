const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Promo = mongoose.model('Promo', promoSchema);

module.exports = Promo;


// Meng-import library mongoose.
// Mendefinisikan schema untuk model Promo menggunakan mongoose.Schema().
//  Schema ini terdiri dari beberapa field yang merepresentasikan atribut dari entitas promo, yaitu code, stock, startTime, endTime, dan createdAt.
// Menggunakan schema yang telah dibuat untuk membuat model Promo dengan menggunakan mongoose.model(). 
// Model ini akan digunakan untuk berinteraksi dengan collection promos pada database MongoDB.
//  Nama collection ini dihasilkan secara otomatis berdasarkan nama model.
// Export model Promo agar dapat digunakan pada file-file lain dalam aplikasi.