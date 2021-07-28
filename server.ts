import * as express from 'express'
import * as cors from 'cors'
import * as helmet from 'helmet'

const app: express.Express = express()

app.use(
    express.Router(),
    cors({
        credentials: true,
        origin: '*',
        methods: 'GET'
    }),
    helmet({
        contentSecurityPolicy: false
    }),
    function (req: express.Request, res: express.Response, next) {
        req['request_time'] = new Date().valueOf()
        next()
    }
)

app.get('/', (req, res) => {
    res.status(200).send('Node Event Loop')
})

// pi 
import * as eventLoop from './src/event_loop'

// blocked
app.get('/blocked', (req, res) => {
    res.status(200).send(eventLoop.blocked())
})

// event loop blocked
app.get('/partition', (req, res) => {
    eventLoop.byPartition((result) => {
        res.status(200).send(result)
    })    
})

// worker
app.get('/worker', (req, res) => {
    eventLoop.byWorker((error, result) => {
        error ? res.status(500).send(null) : res.status(200).send(result)
    })
})

const port = 999
let server = app.listen(port, '0.0.0.0', () => {
    console.log('Listening on port ' + port)
})

server.setTimeout(3600000)

// respond
// export function respond(req: express.Request, res: express.Response, err: Object, data: any, status_code?: number) {
//     try {
//         if (!_.isEmpty(err)) {

//         } else if (status_code == null) {
//             status_code = 200
//         }
//         let result = {
//             meta: {
//                 elapsed_time: (new Date().valueOf() - req['request_time']) + ' ms'
//             },
//             error: err,
//             data: data,
//         }
//         if (req.query['callback']) {
//             res.status(status_code).jsonp(result)
//         } else {
//             res.status(status_code).json(result)
//         }
//     } catch (err) {
//         res.status(500).json(null)
//     }
// }

