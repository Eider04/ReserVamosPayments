import express from "express";
var references = express.Router();
import { Preference, MercadoPagoConfig } from "mercadopago";


/* GET home page. */
export default function guardarReferencia(client) {
  references.post('/', async (req, res, next)=> {
    console.log('Igresosssss*********');
      
    try {
        const preference = await new Preference(client).create({ req });
        console.log('preference', preference);  
        res.status(200).send(preference);
    } catch (error) {
        console.error('error', error);      
        res.json(error);
    }
  });
  
  return references;
}

//module.exports = references;


