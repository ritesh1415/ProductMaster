import express from 'express';
import mysql2 from 'mysql2';
import bodyParser from 'body-parser';
import ProductRoutes from './Routes/Productroutes.js';
import cors from 'cors';

const app = express();
const PORT =  8080;
app.use(cors()); 

app.use(bodyParser.json());
app.use(ProductRoutes);

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ritesh@123',
  database: 'ritesh'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default connection;
