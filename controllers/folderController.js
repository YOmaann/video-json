const fs = require('fs');
const url = require('url');
const mime = require('mime-types');
const { replaceT } = require('../modules/template');

// Adding try catch block around videoD
// setting videoD to global

let videoD = "[]"

try {
    videoD = fs.readFileSync(`${__dirname}/../data/videos.json`);
} catch(err) {
    videoD = "[]"
}

const fileObjs = JSON.parse(videoD); 

// load Templates
const indexT = fs.readFileSync(`${__dirname}/../templates/index.html`, {
  encoding: 'utf-8',
});
const contentT = fs.readFileSync(`${__dirname}/../templates/content.html`, {
  encoding: 'utf-8',
});

exports.checkDir = (req, res, next) => {
  const U = decodeURIComponent(url.parse(req.url).pathname);
  const [obsolete, ...rest] = U.split('/');
  const possExt = rest.slice(-1);
//   console.log(possExt);
  if (mime.types[possExt[0]]) {
    res.status(404).json({
      status: 'ERROR',
      message: 'Folder not found !',
    });
  }
  req.dirI = rest;
  req.fName = decodeURIComponent(rest.join('/'));  
  next();
};
exports.getDirInfo = (req, res, next) => {
  let tmp = req.dirI;
  tmp.shift();
  let currDir = fileObjs.map((x) => x);
  while (tmp.length) {
    // console.log(tmp);
    const curr = tmp.shift();
    // console.log(currDir);
    let newDir;

    if (curr === '') break;
    else {
      newDir = currDir.find((el) => {
        //   console.log(el);
        if (el.type !== 'dir') return false;
        const st = el.name.split('\\').pop();
        //   console.log(st, curr);
        if (st === curr) return true;
      });
    }
    // console.log(newDir);
    currDir = newDir.vidArr;
  }
  req.currDir = currDir;
  next();
  //   res.status(200).json(currDir);
};

exports.serve = (req, res) => {
  let index = indexT;
  let content = contentT;
  index = replaceT(index, '{%FOLDERNAME%}', req.fName);
  let body = '';

  req.currDir.forEach((element) => {
    let name, link, type, newC = "";

    if (element.type === 'dir') {
      type = 'folder';
      name = element.name;
      const validN = name.split('\\').join('/');
      link = `/folder/${validN}`;
    } else {
      type = 'file';
      name = element.path;
      const validN = name.split('\\').join('/');
      link = `/play/${validN.replace(/_([^_]*)$/, '/' + '$1')}`;
    }
    name = name.split('\\').slice(-1);
    newC = replaceT(content, '{%NAME%}', name);
    newC = replaceT(newC, '{%TYPE%}', type);
    newC = replaceT(newC, '{%LINK%}', link);
    body = body + newC;
  });

  index = replaceT(index, '{%CONTENT%}', body);
  res.status(200).send(index);
};
