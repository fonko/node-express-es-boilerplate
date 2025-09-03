import httpStatus from 'http-status';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import catchAsync from '../utils/catchAsync.js';

// Crea una instancia del cliente de Mercado Pago
const client = new MercadoPagoConfig({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const createPreference = catchAsync(async (req, res) => {
  const preference = new Preference(client);
  const preferenceBody = {
    items: [
      {
        title: 'Producto de prueba',
        unit_price: 10,
        currency_id: 'UYU',
        quantity: 1,
      },
    ],
    back_urls: {
      success: 'http://localhost:3000/success',
      failure: 'http://localhost:3000/failure',
      pending: 'http://localhost:3000/pending',
    },
    auto_return: 'approved',
  };

  const response = await preference.create({ body: preferenceBody });
  res.status(httpStatus.CREATED).send({ id: response.id });
});

export default {
  createPreference,
};
