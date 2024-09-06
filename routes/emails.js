import express from "express";


import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport (
    { service : "Gmail" , 
        host : "smtp.gmail.com" , 
        port : 465 , 
        secure : true , 
        auth : { user : "softgood01@gmail.com" , pass: "jmun ehzm zkrq kgme" ,   }, 
});



export const sendEmails = () => {
    var payment = express.Router();

    const plantilla =  `  
    <!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body stye="background-color: #924bb300;">
    
    <div id='printOn'  class='bodyTicket2'  style=' display: flex; align-items: center; justify-content: center; flex-direction: column; color: hsl(200, 10%, 30%);' *ngIf='datosreserva' >
            <article class='ticket2' style='display: grid;  margin-top: 10px; grid-template-rows: auto 1fr auto; width: 400px;'>
                <header class='ticket__wrapper2' style=' box-shadow: 0 2px 4px rgba(41, 54, 61, 0.25); border-radius: 0.375em 0.375em 0 0; overflow: hidden;'>
                    <div class='ticket__header2' style='    padding: 1.25rem;  background-color: #fff;  border: 1px solid #abb5ba; box-shadow: 0 2px 4px rgba(41, 54, 61, 0.25);'>
                        Estado: Aprobada ✔🎟
                    </div>
                </header>
                <div class='ticket__divider2' style='    position: relative; height: 1rem;  background-color: #fff;  margin-left: 0.5rem;  margin-right: 0.5rem;'>
                    <div class='ticket__notch2' style='position: absolute;  left: -0.5rem;   width: 1rem; height: 1rem;  overflow: hidden;'></div>
                    <div class='ticket__notch2 ticket__notch--right2'
                    style='position: absolute;  left: -0.5rem;   width: 1rem; height: 1rem;  overflow: hidden;   left: auto;
    right: -0.5rem;'></div>
                </div>
                <div class='ticket__body2' style='    border-bottom: none;
    border-top: none;  padding: 1.25rem;
    background-color: #fff;
    border: 1px solid #abb5ba;
    box-shadow: 0 2px 4px rgba(41, 54, 61, 0.25);'>
                    <section class='ticket__section2'>
                        <h3 style='    font-size: 1.125rem; margin-bottom: 0rem;'>Información Reserva</h3>
                        <p style='    margin-bottom: 0px;   font-weight: bold;' class='nameresumen'>Comercio: <span class='valorresumen'>{{datosreserva.comercio}}</span></p>
                        <p style='    margin-bottom: 0px;   font-weight: bold;' class='nameresumen'>Fecha de Reserva:  <span class='valorresumen'>{{datosreserva.fechaReserva | date:'mediumDate' }}</span></p>
                        <p style='    margin-bottom: 0px;   font-weight: bold;' class='nameresumen'>Hora reserva: <span class='valorresumen'>{{datosreserva.horaIngreso}}</span></p>
                         <p style='    margin-bottom: 0px;   font-weight: bold;' class='nameresumen'>Cantidad de personas:
                            <span class='valorresumen'>{{datosreserva.cantidadpersonas}}</span>   </p>
                        <p style='    margin-bottom: 0px;   font-weight: bold;' class='nameresumen' *ngIf='datosreserva.informacionReserva == 'Si'' class='nameresumen'>Decoracion para:
                            <span class='valorresumen'>{{datosreserva.tipoEvento}}</span>  </p>
                    </section>
                    <section class='ticket__section2'>
                        <h3 style='    font-size: 1.125rem; margin-bottom: 0rem;'>Datos de la Persona</h3>
                        <p style='    margin-bottom: 0px;   font-weight: bold;' class='nameresumen'>Reserva a nombre de: <span class='valorresumen'>{{datosreserva.nombrepersona}}</span></p>

                    </section>
                    <section class='ticket__section2'>
                        <h3 style='    font-size: 1.125rem; margin-bottom: 0rem;'>Forma de Pago</h3>
                        <p  style='    margin-bottom: 0px;   font-weight: bold;' class='nameresumen'>Medio: <span class='valorresumen'>{{payments ? payments.payment_method_id: 'Efectivo'}}</span></p>
                        <p  style='    margin-bottom: 0px;   font-weight: bold;' class='nameresumen'>Codigo de Reserva: <span class='valorresumen'>{{datosreserva.idReservaFactura}}</span>  </p>
                        <p   style='    margin-bottom: 0px;   font-weight: bold;' class='nameresumen'>Fecha de Transacción: <span class='valorresumen'>{{ (payments ? payments.date_approved: hoy) | date:'medium' }}</span>  </p>
                    </section>
                </div>
                <footer class='ticket__footer2' style='    border-top: 2px dashed #e9ebed;  border-radius: 0 0 0.325rem 0.325rem;  padding: 1.25rem;
    background-color: #fff;
    border: 1px solid #abb5ba;
    box-shadow: 0 2px 4px rgba(41, 54, 61, 0.25);'>
                    <span>Total Pagado</span>
                    <span>{{(payments ? payments.transaction_amount || '0': '0') | currency:'COP':'':'0.0-0'}}</span>
                </footer>
            </article>
        </div>
               </body>
    </html>
 `;
    payment.post('/', (req, res, next) => {
        try {
            let peticion = req.body;
            console.log("peticion => ", peticion);

                const mailOptions = {
                    from: '"Notifiaciones Reservamos" <softgood01@gmail.com>', // sender address
                    to: peticion.correo, // list of receivers
                    subject: peticion.asunto, // Subject line
                    text: peticion.texto, //text body
                    html: html, // html body
                  }

              transporter.sendMail (mailOptions, ( error , info ) => { 
                if (error) { 
                  console.error ( "Error al enviar el correo electrónico: " , error);  
                  res.status(500).json(error); 
                } else { 
                    console.log ( "Correo electrónico enviado: " , info.response ) ; 
                    console.log("Message sent: %s", info.messageId);
                    res.status(200).json('Email enviado..');
                }   
              } );
         

        } catch (error) {
            res.status(500).json(error);
        }
    });

    return payment;
}