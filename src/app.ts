import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import treeRoutes from './routes/tree.routes';
import databaseRoutes from './routes/database.routes';
// import usersRoutes from './routes/user.routes';

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(require("helmet")());
  app.use(require("compression")());
} else {
  app.use(require("cors")());
}

// var corsOptions = {
//     origin: "http://localhost:8080"
// };

// app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES
app.use("/tree", treeRoutes);
app.use("/exportDatabase", databaseRoutes);

// ERRORS
interface ResponseError extends Error {
  status?: number;
}

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(JSON.stringify(req.headers))
  const error = new Error('Not found') as ResponseError;
  error.status = 404;
  next(error);
})

app.use((error: ResponseError, req: express.Request, res: any, next: express.NextFunction) => {  // other errors
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

export = app;