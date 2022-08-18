import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0_FEED_MODELS} from './controllers/v0/model.index';


(async () => {
  await sequelize.addModels(V0_FEED_MODELS);

  console.debug("Initialize database connection...");
  console.debug("POSTGRES_HOST", config.host);
  console.debug("POSTGRES_USERNAME", config.username);
  console.debug("POSTGRES_PASSWORD", config.password);
  console.debug("POSTGRES_DATABASE", config.database);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:50164");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    next();
  })

  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v0/' );
  } );


  // Start the Server
  app.listen( port, () => {
    console.log( `server running ${config.url}` );
    console.log( `server running on PORT: ${config.port}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
