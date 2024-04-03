import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, nombre, token } = datos;
    const info = await transport.sendMail({
        from: "APV-Administrador de Pacientes de Veterinaria",
        to: email,
        subject: "Restablece tu contraseña",
        text: "Restablece tu constraseña",
        html: `
            <p>Hola: ${nombre}, Has solicitado reestablecer tu contraseña.</p>
            <p>Sigue el siguiente enlace para reestablecer tu constraseña: </p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> Reestablecer contraseña</a>
            <p> Si tu no creaste esta cuenta solo ignora el mensaje </p>

        `,
    });
    console.log("Mensaje enviado: %s", info.messageId);
}

export default emailOlvidePassword;