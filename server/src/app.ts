import express from 'express'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import planetsRouter from './routes/planets/planets.router.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// app.use(cors({
//   origin: 'http://localhost:5004'
// }))
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(planetsRouter)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

export default app
