import express from "express";
var references = express.Router();
import { Preference, MercadoPagoConfig } from "mercadopago";


/* GET home page. */
export default function setReferences(client) {
  references.post('/', async (req, res, next) => {
    let peticion = req.body;
    console.log('Request references', peticion);


    try {
      const preference = await new Preference(client).create({ body: peticion });
      console.log('preference', preference);
      if (preference.id) {
        res.status(200).json(preference);
      } else {
        res.status(500).json(preference);
      }
    } catch (error) {
      console.error('error', error);
      res.status(500).json(error);
    }
  });

  return references;
}

//module.exports = references;


