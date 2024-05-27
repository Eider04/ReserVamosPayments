import express from "express";

import { Payment } from "mercadopago";

export const setPayment = (client) => {
    var payment = express.Router();
    payment.post('/', (req, res, next) => {
        try {
            /*         const body = {
                        transaction_amount: 12.34,
                        description: '<DESCRIPTION>',
                        payment_method_id: '<PAYMENT_METHOD_ID>',
                        payer: {
                            email: '<EMAIL>'
                        },
                    };
             */

            let peticion = req.body;
            console.log('Request pago', peticion);

            const payment = new Payment(client);

            payment.create({ body: peticion })
                .then((response) => {
                    console.log('responsepago', response);
                    res.json(response);
                })
                .catch((error) => {
                    console.error('error', error);
                    res.json(error);
                });

        } catch (error) {
            res.json(error);
        }
    });

    return payment;
}



export const getPayment = (client) => {
    var payment = express.Router();
    payment.post('/', (req, res, next) => {
        try {
            let peticion = req.body.id;
            console.log('Request Getpago', peticion);

            const payment = new Payment(client);

            payment.get({ id: peticion })
                .then((response) => {
                    console.log('get responsepago', response);
                    res.json(response);
                })
                .catch((error) => {
                    console.error('get pago error', error);
                    res.json(error);
                });

        } catch (error) {
            res.json(error);
        }
    });

    return payment;
}
