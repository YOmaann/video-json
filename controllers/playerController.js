const url = require('url');
const fs = require('fs');
const template = require('../modules/template');

const playT = fs.readFileSync(`${__dirname}/../templates/playback.html`, {
  encoding: 'utf-8',
});
exports.checkUrl = (req, res, next) => {
  const U = decodeURIComponent(url.parse(req.url).pathname);
  const rest = U.split('/');
  rest.pop();

  // console.log(rest);
  // req.requestedVid = `${rest.join('/')}.${lastL}`;
  // console.log(req.requestedVid);
  // console.log(rest);
  req.link = rest.join('/');
  req.requestedVid = U;
  next();
};

exports.serve = (req, res) => {
  let plate;
  plate = template.replaceT(playT, '{%LINK%}', `/folder${req.link}`);
  plate = template.replaceT(
    plate,
    '{%FILENAME%}',
    `/video/${req.requestedVid}`
  );
  res.status(200).send(plate);
};
