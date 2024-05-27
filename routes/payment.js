import express from "express";
var payment = express.Router();
import { Payment, MercadoPagoConfig } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' }  });

/* GET users listing. */
payment.post('/', function(req, res, next) {
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
    
    
            payment.create({ req })
            .then((response) => {   
                console.log('responsepago', response);      
                res.json(response);
            })
            .catch((error)=>{
                console.error('error', error);      
                res.json(error);
            });
    
        } catch (error) {
            res.json(error);
        }
});

//module.exports = router;
export default payment;
