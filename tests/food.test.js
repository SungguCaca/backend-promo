const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const Food = require('../models/foodModel.js');

describe('Food API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://sunggu:sungguminasa@foods.rhcj8rq.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     // useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Food.deleteMany();
  });

  describe('GET /food', () => {
    it('should return an empty array', async () => {
      const response = await request(app).get('/food');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return an array of foods', async () => {
      await Food.create({ name: 'Food A', price: 10000 });
      await Food.create({ name: 'Food B', price: 20000 });

      const response = await request(app).get('/food');
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(2);
      expect(response.body[0].name).toEqual('Food A');
      expect(response.body[0].price).toEqual(10000);
      expect(response.body[1].name).toEqual('Food B');
      expect(response.body[1].price).toEqual(20000);
    });
  });

  describe('POST /food', () => {
    it('should create a new food', async () => {
      const response = await request(app)
        .post('/food')
        .send({ name: 'Food A', price: 10000 });

      expect(response.status).toBe(201);
      expect(response.body.name).toEqual('Food A');
      expect(response.body.price).toEqual(10000);

      const food = await Food.findOne({ name: 'Food A' });
      expect(food).toBeDefined();
      expect(food.name).toEqual('Food A');
      expect(food.price).toEqual(10000);
    });

    it('should return 400 if request body is invalid', async () => {
      const response = await request(app)
        .post('/food')
        .send({ name: 'Food A' });

      expect(response.status).toBe(400);
    });
  });
});


// Meng-import library supertest, mongoose, dan model Food.
// Menggunakan function describe() untuk membuat kelompok test case yang terkait dengan fungsi-fungsi pada food.controller.js.
// Menggunakan function beforeAll(), afterAll(), dan afterEach() untuk melakukan konfigurasi dan setup sebelum test case berjalan. 
// Pada contoh di atas, kita melakukan koneksi ke database MongoDB dengan nama test sebelum menjalankan seluruh test case, menutup koneksi setelah seluruh test case selesai dijalankan, 
// dan menghapus semua dokumen pada collection foods setelah setiap test case selesai dijalankan.
// Menggunakan function it() untuk mendefinisikan test case dengan deskripsi yang jelas dan terkait dengan fungsionalitas pada food.controller.js.