const request = require('supertest');
const app = require('../app.js');

describe('Promo Endpoints', () => {
  describe('POST /promos', () => {
    it('should create a new promo', async () => {
      const res = await request(app)
        .post('/promos')
        .send({
          name: 'X Promo',
          description: 'Get a discount for every purchase during 8AM-11AM',
          discount: 10,
          maxDailyVouchers: 1000,
          voucherStocks: 1000,
          startTime: '08:00',
          endTime: '11:00'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual('X Promo');
      expect(res.body.voucherStocks).toEqual(1000);
    });

    it('should return error when promo with the same name already exists', async () => {
      const res = await request(app)
        .post('/promos')
        .send({
          name: 'X Promo',
          description: 'Get a discount for every purchase during 8AM-11AM',
          discount: 10,
          maxDailyVouchers: 1000,
          voucherStocks: 1000,
          startTime: '08:00',
          endTime: '11:00'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Promo with the same name already exists');
    });
  });

  describe('POST /promos/use', () => {
    it('should use a promo and reduce the voucher stocks', async () => {
      // create a new promo
      const createPromoRes = await request(app)
        .post('/promos')
        .send({
          name: 'X Promo',
          description: 'Get a discount for every purchase during 8AM-11AM',
          discount: 10,
          maxDailyVouchers: 1000,
          voucherStocks: 1000,
          startTime: '08:00',
          endTime: '11:00'
        });

      // use the promo
      const usePromoRes = await request(app)
        .post('/promos/use')
        .send({
          promoId: createPromoRes.body.id,
          userId: 1234
        });

      expect(usePromoRes.statusCode).toEqual(200);
      expect(usePromoRes.body).toHaveProperty('voucherStocks');
      expect(usePromoRes.body.voucherStocks).toEqual(999);
    });

    it('should return error when promo is not found', async () => {
      const res = await request(app)
        .post('/promos/use')
        .send({
          promoId: 'non-existent-id',
          userId: 1234
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Promo not found');
    });

    it('should return error when promo is not available', async () => {
      // create a new promo with 0 voucher stocks
      const createPromoRes = await request(app)
        .post('/promos')
        .send({
          name: 'X Promo',
          description: 'Get a discount for every purchase during 8AM-11AM',
          discount: 10,
          maxDailyVouchers: 1000,
          voucherStocks: 0,
          startTime: '08:00',
          endTime: '11:00'
        });

        // make a request to use the promo at 12PM
        const usePromoRes = await request(app)
          .post('/promos/use')
          .send({
            userId: 'user1'
          });
      
        // assert the response
        expect(usePromoRes.statusCode).toBe(400);
        expect(usePromoRes.body).toHaveProperty('message', 'Cannot use promo outside promo time');
      });
  });
});