const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./db');
const PORT = process.env.PORT || 3000;
const app = express();
const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


app.get("/", async (req, res) => {

  res.send('Homepage APIs');

});

// Start the server
connectDB()
  .then(() => {


    app.all("/*", (req, res) => {
      res.send('Page Not Found')
    })

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err);
  });

