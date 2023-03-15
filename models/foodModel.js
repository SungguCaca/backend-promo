const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;


// Meng-import library mongoose.
// Mendefinisikan schema untuk model Food menggunakan mongoose.Schema(). 
// Schema ini terdiri dari beberapa field yang merepresentasikan atribut dari entitas makanan, yaitu name, price, dan createdAt.
// Menggunakan schema yang telah dibuat untuk membuat model Food dengan menggunakan mongoose.model().
//  Model ini akan digunakan untuk berinteraksi dengan collection foods pada database MongoDB. Nama collection ini dihasilkan secara otomatis berdasarkan nama model.
// Export model Food agar dapat digunakan pada file-file lain dalam aplikasi.