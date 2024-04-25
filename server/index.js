const express = require("express");
const {SMTPClient} = require("smtp-client")
const {config} = require("dotenv")
const cors = require("cors")
const {rateLimit} = require("express-rate-limit")

config()
const app = express()
app.use(express.json());
app.use(cors())
app.use(rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 5,
    message: "You have exceeded the 5 requests in 15 minutes limit!",
    standardHeaders: true,
    statusCode: 429,
    legacyHeaders: false
}));

const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Mario</title>
    </head>
    <body style="background: #FFEEEE; width: 100%;">
        <header style="background: #ffb9b9; text-align: center;">
            <img src="https://play-lh.googleusercontent.com/7Z4x3nLGglKbIDMafIPmdFUB9zpwu-k3HHbIJ1DeWz-4HCp9IFfCzk5r1JsmyiT85y1v" alt="Mario" style="height: 7rem; border-radius: 100%">
        </header>
        <div style="padding: 1rem">
            <h1>Confirmation de la prise de contact</h1>
            <p>
                Salut !
                <br>
                C'est moi, Mario !
                <br>
                <br>
                Je viens de recevoir votre message et je suis super excité de pouvoir entrer en contact avec vous. Merci beaucoup de m'avoir contacté !
                <br>
                Je suis un peu pris en ce moment, à sauver la princesse Peach et à combattre Bowser, mais je vais prendre le temps de lire votre message dès que possible.
                <br>
                <br>
                S'il vous plaît, soyez patient avec moi. Je vous répondrai dès que je le pourrai.
                <br>
                En attendant, gardez un œil sur votre boîte mail. Vous ne savez jamais quand une réponse de Mario peut atterrir !
                <br>
                It's-a me, Mario!
            </p>
        </div>
        <footer style="margin-block: 2rem; flex-direction: column; text-align: center;">
            <p style="color: rgb(0,0,0,.35); font-weight: bold; font-size: .75rem;">Créé avec ❤️ en 2024</p>
            <a style="color: rgb(0,0,0,.45); font-weight: bold; text-decoration: none; font-size: .75rem;" href="https://creativecommons.org/licenses/by-nc-sa/4.0">Contenu régit sous licence Creative Commons BY-NC-SA 4.0</a>
            <p style="color: rgb(0,0,0,.35); font-weight: bold; font-size: .75rem;">Le contenu présenté sur cet email n’est pas affilié avec Nintendo.</p>
        </footer>
    </body>
    </html>
`

app.post('/send-mail', async (req, res) => {
    const { email } = req.body

    if (!email) return res.status(400).send("Bad Request")

    const emailLines = [
        `From: Mario <${process.env.GMAIL_EMAIL}>`,
        `To: ${email}`,
        'Subject: Demande de prise de contact',
        'Content-Type: text/html; charset=UTF-8',
        "",
        ...emailContent.split("\n")
    ]

    const client = new SMTPClient({
        host: process.env.SMTP,
        port: Number(process.env.SMTP_PORT),
        secure: true
    })

    await client.connect();
    await client.greet({hostname: 'smtp.gmail.com'});
    await client.authPlain({ username: process.env.GMAIL_EMAIL, password: process.env.GMAIL_APP_PASSWORD });
    await client.mail({from: process.env.GMAIL_EMAIL});
    await client.rcpt({to: email});
    await client.data(emailLines.join('\r\n'));
    await client.quit()

    console.log(`Email sent to ${email}`)

    return res.status(200).send("OK")
});

app.get("/", (req, res) => {
    return res.status(200).send("App is live!")
})

app.listen(process.env.PORT, () => console.log(`Express server is listening on port ${process.env.PORT}`));

module.exports = app