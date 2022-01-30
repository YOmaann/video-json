const fs = require('fs');
const path = require('path');

const readF = function (pth_p = 'C:\\Users\\LUCKY\\Documents\\c programs') {
  //const vids = fs.readFileSync(file_p);
  //const viDArr = JSON.parse(vids);
  // const blacklist = ['$', 'found'];
  const pth = pth_p;
  const i = fs.readdirSync(`${pth}`);
  let viDArr = [];
  i.forEach((element) => {
    //if (!blacklist.find((ele) => element.startsWith(ele))) return;
    const currN = `${pth}\\${element}`;
    let el = [];
    // console.log(currN);
    let fileInfo;
    try {
      fileInfo = fs.statSync(currN);
    } catch (err) {
      return;
    }
    if (fileInfo.isDirectory() == true) {
      //console.log('if');
      el = {
        type: 'dir',
        name: currN,
        vidArr: readF(currN),
      };
    } else {
      //console.log('else');
      el = {
        type: 'file',
        path: currN,
      };
      //console.log(el);
    }
    //console.log(el);
    viDArr.push(el);
    // console.log(viDArr);
  });

  return viDArr;
};

// console.log(typeof JSON.stringify(readF()));
const str = JSON.stringify(readF('E:'));
fs.writeFileSync(
  'C:\\Users\\LUCKY\\Documents\\video-json\\data\\videos.json',
  str
);
