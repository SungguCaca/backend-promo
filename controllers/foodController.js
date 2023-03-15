const Food = require('../models/foodModel.js');

exports.getFoodById = async (req, res) => {
  const foodId = req.params.foodId;

  try {
    const food = await Food.findById(foodId);
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFood = async (req, res) => {
  const food = new Food({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateFood = async (req, res) => {
  const foodId = req.params.foodId;

  try {
    const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, {
      new: true,
    });
    if (updatedFood) {
      res.status(200).json(updatedFood);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteFood = async (req, res) => {
  const foodId = req.params.foodId;

  try {
    const deletedFood = await Food.findByIdAndDelete(foodId);
    if (deletedFood) {
      res.status(200).json(deletedFood);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};





// Meng-import model Food yang dibutuhkan dari file food.model.js.
// Mendefinisikan empat fungsi controller yang berbeda untuk melayani request terkait food, yaitu getAllFoods, createFood, updateFood, dan deleteFood.
// Fungsi getAllFoods akan mengambil semua data food yang ada dalam database dan mengembalikan data tersebut sebagai response dengan status code 200.
// Fungsi createFood akan membuat data food baru berdasarkan request body yang diterima, menyimpan data tersebut dalam database, 
// dan mengembalikan data food baru yang telah disimpan sebagai response dengan status code 201.
// Fungsi updateFood akan memperbaharui data food yang sudah ada dalam database berdasarkan foodId yang diterima pada request parameter dan request body yang diterima,
//  dan mengembalikan data food yang telah diperbaharui sebagai response dengan status code 200. Jika data food dengan foodId tersebut tidak ditemukan dalam database, 
//  maka akan mengembalikan response dengan status code 404.
// Fungsi deleteFood akan menghapus data food yang ada dalam database berdasarkan foodId yang diterima pada request parameter, 
// dan mengembalikan data food yang telah dihapus sebagai response dengan status code 200. Jika data food dengan foodId tersebut tidak ditemukan dalam database, 
// maka akan mengembalikan response dengan status code 404.