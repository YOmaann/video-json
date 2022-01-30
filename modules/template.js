const fs = require('fs');

exports.replaceT = (name, el, to) => {
  const temp = name;
  var re = new RegExp(el, 'g');
  const novelty = temp.replace(re, to);
  //   const novelty = temp.replace(re, to);
//   console.log(novelty);
  return novelty;
};
