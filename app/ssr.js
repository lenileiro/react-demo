import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../src/App'
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
            <script defer>
                if('serviceWorker' in navigator){
                    try { 
                        navigator.serviceWorker.register('sw.js')
                    } catch (error){
                        console.log(error)
                    }
                }
            </script>
        </body>
    </html>
`)
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is listening on port 3001");
  });