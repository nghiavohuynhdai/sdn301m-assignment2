import express, { urlencoded } from 'express'
import { createServer } from 'http'
import cors from 'cors'
import morgan from 'morgan'
import '~/configuration/dotenv'
import path from 'path'
import mongoDbConnect from '~/data/connection'
import { engine } from 'express-handlebars'
import { categoryRouter } from '~/routers/categoryRouter'
import { globalExceptionHandlingMiddleware } from '~/middlewares/globalExceptionHandlingMiddleware'
import { orchidRouter } from '~/routers/orchidRouter'

const hostname = 'localhost'
const port = Number.parseInt(process.env.PORT || '3000')
const mongoDbUrl = process.env.MONGODB_URI || ''

mongoDbConnect(mongoDbUrl)

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, '../public')))
app.use(
  urlencoded({
    extended: true
  })
)
app.use(express.json())

app.use(morgan('dev'))

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use('/categories', categoryRouter)
app.use('/orchids', orchidRouter)

app.use(globalExceptionHandlingMiddleware)

const server = createServer(app)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
