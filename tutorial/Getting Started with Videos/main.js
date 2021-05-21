let video = document.querySelector("#videoInput");
let canvasOutput = document.querySelector("#canvasOutput");

//video stream using WebRTC API
navigator.mediaDevices.getUserMedia({video:true,}).then(function(stream){
    video.srcObject = stream;
})
.catch(function(err){
    console.log("local video streaming error!");
});


//This has to be called after OpenCV gets loaded, checks if opencv has initialized
cv['onRuntimeInitialized'] = () => {
    console.log("OpenCV loaded successfully!");
    document.querySelector('#status').innerHTML = 'OpenCV.js is ready.';

    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);
    let streaming = false;

    const FPS = 60;
    function processVideo(){
        try {
            if (!streaming) {
                // clean and stop.
                src.delete();
                dst.delete();
                cap.delete();
                return;
            }
            let begin = Date.now();
            // start processing.
            cap.read(src);
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            cv.imshow('canvasOutput', dst);
            // schedule the next one.
            let delay = 1000/FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        } catch (err) {
            console.log("process video error", err);
        }
    }
    
    //schedule first one.
    video.onplay = (event) => {
        console.log("video start");
        streaming= true;
        processVideo();
    };
}