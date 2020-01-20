import dotenv from "dotenv";
import express from "express";
import path from "path";
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
