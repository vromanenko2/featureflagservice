import * as express from "express";

let router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ index: 'index'});
});

export { router };
