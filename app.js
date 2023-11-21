import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './.env') })
import express from 'express';
import connectDB from './Database/connection.js';
import excelRouter from './src/excel/excel.router.js';

import { globalError } from './src/services/asyncHandler.js'


const app = express();




const port = process.env.PORT;

app.use(express.json());

app.use('/api/excel', excelRouter);

app.use('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method")
})


app.use(globalError)

connectDB()
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });