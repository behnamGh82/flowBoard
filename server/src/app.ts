import express from 'express'
import cors from 'cors'
import path from 'path'
import routes from './routes'
import { errorHandler, notFound } from './middleware/error.middleware'
import { env } from './config/env'

const app = express()

app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(process.cwd(), env.uploadDir)))

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

export default app
