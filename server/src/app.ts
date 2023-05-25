import express from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'

import { fileURLToPath } from 'url'
import planetsRouter from './routes/planets/planets.router.js'
import launchesRouter from './routes/launches/launches.router.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// app.use(cors({
//   origin: 'http://localhost:5004'
// }))
app.use(cors())
app.use(morgan('combined'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)

// `*` match every routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

export default app

// web browser <--- http ---> web application <--- http ---> node api <--- excel data <--- row data
