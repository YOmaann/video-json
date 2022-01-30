module.exports = (file) => {
  if (file === '.mp4') return 'video/mp4';
  else if (file === '.mp3') return 'audio/mpeg';
};
