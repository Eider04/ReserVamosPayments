import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig } from "mercadopago";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import references from "./routes/references.js";
import payment from "./routes/payment.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev')); 
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' }  });

app.use('/create_preference', references(client));
app.use('/create_payment', payment);


app.get("/", async (req, res) => {
    res.status(401);
});
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto:", port);
});
