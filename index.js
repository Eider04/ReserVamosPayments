import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig } from "mercadopago";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import setReferences from "./routes/references.js";
import { setPayment, getPayment } from "./routes/payment.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

app.use('/create_preference', setReferences(client));
app.use('/create_payment', setPayment(client));
app.use('/get_payment', getPayment(client));


app.get("/", async (req, res) => {
    res.status(401);
});
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto:", port);
});
