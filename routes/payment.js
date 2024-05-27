import express from "express";
var payment = express.Router();
import { Payment } from "mercadopago";

export default function setPayment(client) {
    payment.post('/', function (req, res, next) {
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
            const payment = new Payment(client);
            let peticion = req.body;

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
