import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import compression from "compression"

import App from "../shared/App"

const app = express()

app.use(compression())
app.use(cors())
app.use(express.static('public'))

app.get('*', (req, res, next) => {
    const markup = renderToString(
        <App />
    )
res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>SSR App</title>
            <script src="/bundle.js" defer></script>
        </head>
        <body>
            <div id="app">${markup}</div>
            <script defer>
                if('serviceWorker' in navigator){
                    try { 
                        navigator.serviceWorker.register('sws.js')
                    } catch (error){
                        console.log(error)
                    }
                }
            </script>
        </body>
    </html>
`)
})

const PORT = process.env.PORT || 3000
app.listen( PORT, () => {
    console.log("Server is listening on port ::" +PORT);
  });
