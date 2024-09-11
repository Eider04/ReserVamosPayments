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

    let plantilla =  `  
 <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Reserva - ReserVamos</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #8A00FF;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .header img {
           max-height: 110px;
            max-width: 110px;
            margin-bottom: 10px;
        }

        .header p {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
        }

        .content {
            padding: 20px;
            text-align: left;
            color: #333;
        }

        .content h1 {
            font-size: 18px;
            margin-top: 0;
        }

        .content p {
            font-size: 14px;
            line-height: 1.5;
        }
        
        .content span {
            font-size: 14px;
            line-height: 1.5;
        }

        .details-table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        .details-table td {
            padding: 10px;
            border-bottom: 1px solid #dddddd;
            font-size: 14px;
        }

        .details-table td.label {
            font-weight: bold;
            font-size: 14px;
            color: #8A00FF;
        }

        .cta-button {
            display: block;
            width: 100%;
            max-width: 200px;
            margin: 30px auto;
            padding: 15px;
            background-color: #8A00FF;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 16px;
        }

        .cta-button:hover {
            background-color: #006494;
        }

        .footer {
            padding: 20px;
            text-align: center;
            color: #999;
            font-size: 14px;
        }

        .ii a[href] {
            color: white !important;
        }   
    </style>
</head>
<body>

<div class="container">
    <div class="header">
     
       <img  alt="ReserVamos Logo" src="https://firebasestorage.googleapis.com/v0/b/reservamos-b1fec.appspot.com/o/recursosapp%2Flogos%2Flogo.png?alt=media&token=f8007ad4-dc29-4947-b15f-0410cb7bd7aa">

        <p>¡Tu reserva está confirmada!</p>
    </div>
    <div class="content">
        <h1>Hola, [Nombre&Cliente]</h1>
        <p>¡Gracias por reservar con ReserVamos! A continuación, te proporcionamos los detalles de tu reserva:</p>

        <table class="details-table">
            <tr>
                <td class="label">Fecha y Hora:</td>
                <td>[Fecha&Hora]</td>
            </tr>
            <tr>
                <td class="label">Lugar de Reserva:</td>
                <td>[Lugar&Reserva]</td>
            </tr>
            <tr>
                <td class="label">Cantidad de Personas:</td>
                <td>[Cantidad&Personas]</td>
            </tr>
            <tr>
                <td class="label">Ocasión de Celebración:</td>
                <td>[Ocasión&Celebración]</td>
            </tr>
            <tr>
                <td class="label">Valor de la Reserva:</td>
                <td>[Valor&Reserva]</td>
            </tr>
        </table>

        <a href="https://reservamos-b1fec.web.app/" class="cta-button">Ver mi Reserva</a>

        <p>Si tienes alguna pregunta o necesitas hacer cambios en tu reserva, no dudes en contactarnos.</p>
        
         <span>Adjunto a este correo podrás encontrar tu comprobante de la reserva</span>
    </div>
    <div class="footer">
        <p>© [ano] ReserVamos. Todos los derechos reservados.</p>
    </div>
</div>

</body>
</html>

 `;
    payment.post('/', (req, res, next) => {
        try {
            let peticion = req.body;
            console.log("peticion => ", peticion);

               if(peticion.reserva){
                plantilla = plantilla.replace('[Nombre&Cliente]', peticion.reserva.informacionReserva.nombre);
                plantilla = plantilla.replace('[Fecha&Hora]', peticion.reserva.fechaReserva + '' + peticion.reserva.horaIngreso);
                plantilla = plantilla.replace('[Lugar&Reserva]', peticion.reserva.comercio);
                plantilla = plantilla.replace('[Valor&Reserva]', peticion.reserva.valor);
                plantilla = plantilla.replace('[Cantidad&Personas]', peticion.reserva.informacionReserva.cantidadpersonas);
                plantilla = plantilla.replace('[Ocasión&Celebración]', peticion.reserva.informacionReserva.tipoEvento || 'Ninguno');
               }

               plantilla = plantilla.replace('[ano]', new Date().getFullYear());
                const mailOptions = {
                    from: '"Notifiaciones Reservamos" <softgood01@gmail.com>', // sender address
                    to: peticion.correo, // list of receivers
                    subject: peticion.asunto, // Subject line
                    text: peticion.texto, //text body
                    html: plantilla, // html body
                    attachments: [
                        {   // encoded string as an attachment
                            filename: 'ComprobanteReserva.pdf',
                            content: peticion.pdf,
                            encoding: 'base64'
                        }
                    ]
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