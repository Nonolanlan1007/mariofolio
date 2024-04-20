import express from 'express';
import {SMTPClient} from "smtp-client";
import "dotenv/config"
import {extname} from "path"
import url from "node:url";
import { readFileSync } from "fs"
import cors from "cors"

const app = express()
app.use(express.json());
app.use(cors())

app.post('/send-mail', async (req, res) => {
    const { email } = req.body

    if (!email) return res.status(400).send("Bad Request")

    const content = readFileSync("./email-template.html", { encoding: "utf-8" }).replace("{{apiUrl}}", process.env.API_URL)

    const emailLines = [
        `From: Mario <${process.env.GMAIL_EMAIL}>`,
        `To: ${email}`,
        'Subject: Demande de prise de contact',
        'Content-Type: text/html; charset=UTF-8',
        "",
        ...content.split("\n")
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

// Héberger les ressources externes nécessaires pour l'email
const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

app.get("/public/:file", (req, res) => {
    let parsedUrl = url.parse(req.url, true)
    parsedUrl.pathArray = parsedUrl.pathname.split('/')
    parsedUrl.pathArray.shift()

    res.writeHead(200, { 'Content-Type': contentTypes[extname(parsedUrl.path).toString().toLowerCase()] || 'application/octet-stream' });
    if (parsedUrl.path.endsWith('/')) parsedUrl.pathname = parsedUrl.pathname.substring(0, parsedUrl.pathname.length -1)
    res.end(readFileSync(`.${parsedUrl.pathname}`), 'utf-8');
})

app.listen({
    port: 3000,
    host: "0.0.0.0"
}, () => console.log(`Express server is listening on port ${process.env.PORT}`));

module.exports = app