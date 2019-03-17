import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../shared/App'
const app = express()

app.use(cors())

app.use(express.static('public'))

app.get('*', (req, res, next) => {
    const markup = renderToString(
        <App />
    )
res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>SSR App</title>
            <script src="/bundle.js" defer></script>
        </head>
        <body>
            <div id="app">${markup}</div>
        </body>
    </html>
`)
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is listening");
  });