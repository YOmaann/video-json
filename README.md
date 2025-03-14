# video-json

A server which hosts video files in the local system in a web browser.

# Installation

To set up the server in your local machine, follow the instructions below:

1. Clone the repsitory in your local machine.

```
git clone https://github.com/YOmaann/video-json
cd video-json
``` 
2. Download pre-requisite modules.
```
npm install
```
3. Run the server using 
```
node server
```

# Configuration


The videos are stored in `video-json/videos` folder. Go to the web browser and type the url `localhost:5000/config`. This updates the `data/videos.json` file.
