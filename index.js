const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 
const AnswerRouter = require ("./../ BAIGIAMASIS DABAR DAROMAS DARBAS 2025 BACKEND Node JS JavaScript/src/routes/answer.js");
const userRouter = require ("../ BAIGIAMASIS DABAR DAROMAS DARBAS 2025 BACKEND Node JS JavaScript/src/routes/user.js");"../ BAIGIAMASIS DABAR DAROMAS DARBAS 2025 BACKEND Node JS JavaScript/src/routes/user.js";


const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch(() => {
    console.log("bad connection");
  });


app.use((req, res) => {
  res.status(404).json({ response: "your endpoint does not exit" });
});

app.listen(process.env.PORT, () => {
  console.log(`App was started on port ${process.env.PORT}`);
});


app.use(userRouter);
app.use(AnswerRouter);