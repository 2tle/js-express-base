import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import timeout from 'express-timeout-handler';
import bodyParser from 'body-parser';

export default async(app) => {
    app.set('service_port', process.env.PORT || 3000);
    if (process.env.NODE_ENV == 'production') {
        app.use(helmet());
    }
    const opt = {
        timeout: 10000,
        onTimeout:(req, res) => {
            const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress
            console.log(req.method,ip ,req.originalUrl,'[TimeOut]')
            return res.status(503).json({error: 'Timeout'})
      },
      onDelayedResponse: (req, method, args, requestTime) => {
        console.log(`Attempted to call ${method} after timeout`)
      },
      disable: ['write', 'setHeaders', 'send', 'json', 'end']
    }
    app.use(timeout.handler(opt))
    app.use(compression())
    app.set('jwt-secret', process.env.JWT_SECRET);
    app.use(morgan(process.env.NODE_ENV == 'production' ? 'combined' : 'dev' ));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
        res.header('Access-Control-Allow-Headers', 'content-type, x-access-token')
        next()
    })
    app.use(
        express.json({
            extended: false,
        })
    );
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ limit : "50mb",extended: true }))
    app.get('/', (req, res) => {
        res.status(200).json('Hello world!');
    });
};