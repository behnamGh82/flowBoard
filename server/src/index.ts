import http from 'http'
import fs from 'fs'
import app from './app'
import { connectDatabase } from './config/database'
import { env } from './config/env'
import { initSocket } from './socket'

const start = async () => {
  if (!fs.existsSync(env.uploadDir)) {
    fs.mkdirSync(env.uploadDir, { recursive: true })
  }

  await connectDatabase()

  const httpServer = http.createServer(app)
  initSocket(httpServer)

  httpServer.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`)
    console.log(`Environment: ${env.nodeEnv}`)
  })
}

start()
