/*
  This is a controller which contains function which creates a directory tree of a folder in the expected JSON format.

  */

fs = require('fs')
path = require('path')

// define a recursive function which returns an array containing file or folder objects.
const recurDir = (root_dir, current_dir = "") => {
    const dir_to_check = path.join(root_dir, current_dir)
    const objs = []
    const children = fs.readdirSync(dir_to_check)

    for(const child of children) {
	let tmp_obj = {}
	const name = path.join(dir_to_check, child)
	const stat_obj = fs.statSync(name)

	tmp_obj.name = name
	
	if(!stat_obj.isDirectory()){
	    // the current file is a file
	    tmp_obj.type = "file"
	    tmp_obj.path = name
	}
	else {
	    // the current file is a folder
	    tmp_obj.type = "folder"
	    tmp_obj.vidArr = recurDir(name)
	}

	// append objects to array
	objs.push(tmp_obj)
    }

    return objs
}

module.exports = (req, res) => {
    // Hard coding the directory to serve since I don't know any other way to fetch environment variables

    root_dir = "./videos"

    // the readdir function uses process.cwd() as the start point whereas require uses __dirname

    const configJSON = recurDir(root_dir)
    // write to ./data/video.json

    fs.writeFileSync('./data/video.json', JSON.stringify(configJSON))
    res.json(configJSON)

    // write the config file to data/videos.json

    
}

