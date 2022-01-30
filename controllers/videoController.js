const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime-types');

const types = require('../modules/type');
//const readable = fs.createReadStream(/controllers/video.js);
//const videos = fs.readFileSync(`${__dirname}/../data/videos.json`, 'utf-8');
//const videosObj = JSON.parse(videos);
//const videosKeys = Object.keys(videosObj);

exports.checkUrl = (req, res, next) => {
  const U = url.parse(req.url).pathname;
  const [firstL, ...rest] = U.split('/');
  req.requestedVid = decodeURIComponent(rest.join('\\\\'));
  // console.log(req.requestedVid);
  // console.log(rest);
  next();
};
exports.checkFile = (req, res, next) => {
  //console.log(videosKeys);
  const videoStat = fs.existsSync(req.requestedVid);
  // console.log("hello")
  // const matchedObj = videosObj[videosKeys.find((x) => videosObj[x].id === val)];
  if (!videoStat)
    return res.status(404).json({
      status: 'fail',
      message: 'file not found !',
    });
  //console.log(matchedObj)
  next();
};
exports.checkRange = (req, res, next) => {
  //console.log(req.headers)
  let range = req.headers['content-range'] || req.headers.range;
  //console.log(req.headers);
  // if (!range) {
  //   return res.status(400).json({
  //     status: 'fail',
  //     message: 'range not specified!',
  //   });
  // }
  if (!range) {
    range = 'bytes 0-2000';
  }
  req.headers.range = range;
  next();
};
exports.sendFile = (req, res) => {
  // bytes=1234-
  const filename = req.requestedVid;
  //console.log(req.video_obj);

  const stats = fs.statSync(filename);
  const file_size = stats.size;
  // const file_ext = path.extname(filename);
  const range = req.headers.range;
  // const rangeL = range.split('-');
  // console.log(rangeL);
  const chunk_s = 5 * 10 ** 6;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + chunk_s, file_size - 1);

  //const splitDot = filename.split('.');
  const mimeType = mime.contentType(filename);
  console.log(`filename=test.${mime.extension(mimeType)}`);

  const contentLength = end - start + 1;

  /* const headers = {
        "Content-Range" : `bytes ${start}-${$end}/${file_size}`,
        "Accept-Ranges" : "bytes",
        "Content-Length" : contentLength,
        "Content-Type" : "video/mp4" 
    } */
  res.status(206);
  res.set('Content-Type', mimeType);
  res.set('Content-Range', `bytes ${start}-${end}/${file_size}`);
  res.set('Accept-Ranges', 'bytes');
  res.set('Content-Length', contentLength);
  res.set('Content-Disposition', `filename=test.${mime.extension(mimeType)}`);
  const readable = fs.createReadStream(filename, { start, end });
  readable.pipe(res);
};
