import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path'
import hbs from 'express-handlebars';

const app = express();

// set handlebars and default paths
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: `${__dirname}/views/layouts/`}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// routes
import index from './routes/index';
import download from './routes/download';
app.use('/', index);
app.use('/download', download);

// server
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
