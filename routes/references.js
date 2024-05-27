import express from "express";
var references = express.Router();
import { Preference, MercadoPagoConfig } from "mercadopago";


/* GET home page. */
export default function setReferences(client) {
  references.post('/', async (req, res, next) => {
    let peticion = req.body;
    console.log('Igresosssss*********', peticion);


    try {
      const preference = await new Preference(client).create({ body: peticion });
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


