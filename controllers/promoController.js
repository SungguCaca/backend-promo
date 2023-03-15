const Promo = require('../models/promoModel.js');

exports.checkPromo = async (req, res) => {
  const { promoCode, userId } = req.params;
  try {
    // Check promo validity
    const promo = await Promo.findOne({ code: promoCode });
    if (!promo) {
      return res.status(404).json({ message: 'Promo not found' });
    }
    const now = new Date();
    const promoStart = new Date(promo.start);
    const promoEnd = new Date(promo.end);
    if (now < promoStart || now > promoEnd) {
      return res.status(400).json({ message: 'Promo is not available' });
    }

    // Check promo usage
    const userPromo = await Promo.findOne({ userId });
    if (userPromo && userPromo.usedAt.toDateString() === now.toDateString()) {
      return res.status(400).json({ message: 'Promo has been used today' });
    }

    // Check promo stock
    if (promo.stock <= 0) {
      return res.status(400).json({ message: 'Promo stock is empty' });
    }

    // Update promo usage and stock
    promo.stock--;
    promo.usedBy.push(userId);
    promo.save();

    res.status(200).json({ message: 'Promo is valid' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Meng-import model Promo yang dibutuhkan dari file promo.model.js.
// Mendefinisikan fungsi controller checkPromo yang melayani request untuk memeriksa validitas promo berdasarkan promo code dan user ID yang diterima pada request parameter dan request body.
// Fungsi checkPromo akan melakukan beberapa pengecekan validitas promo, yaitu:
// Promo code yang diterima harus valid, artinya terdapat promo dengan code tersebut dalam database. Jika tidak ditemukan, maka akan mengembalikan response dengan status code 404.
// Promo hanya tersedia dalam rentang waktu tertentu, yaitu antara waktu mulai dan waktu berakhir promo yang tercatat dalam database. 
// Jika promo tidak tersedia pada waktu yang diminta, maka akan mengembalikan response dengan status code 400.
// Seorang user hanya dapat menggunakan promo sekali dalam sehari. Jika user tersebut sudah menggunakan promo pada hari yang sama, 
// maka akan mengembalikan response dengan status code 400.
// Promo hanya tersedia stok yang tercatat dalam database. Jika stok promo habis, maka akan mengembalikan response dengan status code 400.
// Jika promo valid, maka fungsi checkPromo akan melakukan update pada penggunaan promo dan stok promo dalam database.
//  Penggunaan promo akan tercatat pada array usedBy dan stok promo akan dikurangi satu. 
// Kemudian, fungsi checkPromo akan mengembalikan response dengan status code 200 dan pesan bahwa promo valid.