import express, { Express, Router } from 'express'
import { Routes } from '../src/'

// Import route definitions (registers routes)
import './routes/register'

const PORT = 3000
const app: Express = express()
const router: Router = express.Router()

// Apply all registered routes to the router
Routes.apply(router)

// Use the router in the Express app
app.use(router)

// Start the Express server
app.listen(PORT, () => {
    console.log(`Application already running : http://localhost:${PORT}`)
})
