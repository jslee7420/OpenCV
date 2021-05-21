# OpenCV

study &amp; practice purposes

# What is opencv?

OpenCV is an open-source library that includes several hundreds of **computer vision algorithms**. OpenCV has a modular structure, which means that the package includes several shared or static libraries. The following modules are available:

- Core functionality (core) - a compact module defining basic data structures, including the dense multi-dimensional array Mat and basic functions used by all other modules.
- Image Processing (imgproc) - an image processing module that includes linear and non-linear image filtering, geometrical image transformations (resize, affine and perspective warping, generic table-based remapping), color space conversion, histograms, and so on.
- Video Analysis (video) - a video analysis module that includes motion estimation, background subtraction, and object tracking algorithms.
- Camera Calibration and 3D Reconstruction (calib3d) - basic multiple-view geometry algorithms, single and stereo camera calibration, object pose estimation, stereo correspondence algorithms, and elements of 3D reconstruction.
- 2D Features Framework (features2d) - salient feature detectors, descriptors, and descriptor matchers.
- Object Detection (objdetect) - detection of objects and instances of the predefined classes (for example, faces, eyes, mugs, people, cars, and so on).
- High-level GUI (highgui) - an easy-to-use interface to simple UI capabilities.
- Video I/O (videoio) - an easy-to-use interface to video capturing and video codecs.
  ...some other helper modules, such as FLANN and Google test wrappers, Python bindings, and others.

# API Concepts

## cv Namespace

All the OpenCV classes and functions are placed into the cv namespace. Therefore, to access this functionality from your code, use the cv:: specifier or using namespace cv; directive:

# OpenCV.js

OpenCV.js brings OpenCV to the open web platform and makes it available to the JavaScript programmer. OpenCV.js is a JavaScript binding for selected subset of OpenCV functions for the web platform. It allows emerging web applications with multimedia processing to benefit from the wide variety of vision functions available in OpenCV. OpenCV.js leverages Emscripten to compile OpenCV functions into asm.js or WebAssembly targets, and provides a JavaScript APIs for web application to access them.

## Include OpenCV.js

Set the URL of `opencv.js` to `src` attribute of `<script>` tag.
**Note** If you have to use cv in javascript file, make sure to use synchronous loading. opencv has to be loaded before you load javascript file with cv in it!

### synchronous loading:

```javascript
<script
  src="https://docs.opencv.org/3.4/opencv.js"
  type="text/javascript"
></script>
```

### asynchronous loading:

```javascript
<script
  async
  src="https://docs.opencv.org/3.4/opencv.js"
  onload="onOpenCvReady();"
  type="text/javascript"
></script>
```

## Using OpenCV.js

Once `opencv.js` is ready, you can access OpenCV objects and functions through `cv` object.

For example, you can create a **[cv.Mat](https://docs.opencv.org/3.4/d3/d63/classcv_1_1Mat.html)** from an image by **[cv.imread](https://docs.opencv.org/3.4/d4/da8/group__imgcodecs.html#ga288b8b3da0892bd651fce07b3bbd3a56)**.

**Note** Because image loading is asynchronous, you need to put **[cv.Mat](https://docs.opencv.org/3.4/d3/d63/classcv_1_1Mat.html)** creation inside the `onload` callback.

```javascript
imgElement.onload = function () {
  let mat = cv.imread(imgElement);
};
```

**Note**You have to call delete method of cv.Mat to free memory allocated in Emscripten's heap.

## Images

OpenCV.js saves images as cv.Mat type. We use HTML canvas element to transfer cv.Mat to the web or in reverse

### Read an image

**Note:** Because canvas only support 8-bit RGBA image with continuous storage, the **[cv.Mat](https://docs.opencv.org/3.4/d3/d63/classcv_1_1Mat.html)** type is cv.CV_8UC4. It is different from native OpenCV because images returned and shown by the native **imread** and **imshow** have the channels stored in BGR order.

We use **cv.imread (imageSource)** to read an image from html canvas or img element.

**Parameters**
**imageSource** canvas element or id, or img element or id.

**Returns**
mat with channels stored in RGBA order.

We use **cv.imshow (canvasSource, mat)** to display it. The function may scale the mat, depending on its depth:

- If the mat is 8-bit unsigned, it is displayed as is.
- If the mat is 16-bit unsigned or 32-bit integer, the pixels are divided by 256. That is, the value range [0,255*256] is mapped to [0,255].
- If the mat is 32-bit floating-point, the pixel values are multiplied by 255. That is, the value range [0,1] is mapped to [0,255].

**Parameters**
**canvasSource** canvas element or id.
**mat** mat to be shown.
The above code of image reading and showing could be simplified as below.

```javascript
let img = cv.imread(imageSource);
cv.imshow(canvasOutput, img);
img.delete();
```

## Videos

### Capture video from camera

In OpenCV.js, we use WebRTC and HTML canvas element to capture live stream with a camera.
To capture a video, you need to add some HTML elements to the web page:

- `<video>` to display video from camera directly
- `<canvas>` to transfer video to canvas ImageData frame-by-frame
- another `<canvas>` to display the video OpenCV.js gets

```javascript
let video = document.getElementById("videoInput"); // video is the id of video tag
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(function (stream) {
    video.srcObject = stream;
    video.play();
  })
  .catch(function (err) {
    console.log("An error occurred! " + err);
  });
```

### Playing video

we use CanvasRenderingContext2D.drawImage() method of the Canvas 2D API to draw video onto the canvas. Finally, we can use the method in Getting Started with Images to read and display image in canvas. For playing video, cv.imshow() should be executed every delay milliseconds. We recommend setTimeout() method. And if the video is 30fps, the delay milliseconds should be (1000/30 - processing_time).

OpenCV.js implements cv.VideoCapture (videoSource) using the above method. You need not to add the hidden canvas element manually.

**Parameters**
**videoSource** the video id or element.
**Returns**
**cv.VideoCapture** instance

We use **read (image)** to get one frame of the video. For performance reasons, the image should be constructed with cv.CV_8UC4 type and same size as the video.

**Parameters**
**image** image with cv.CV_8UC4 type and same size as the video.

```javascript
let src = new cv.Mat(height, width, cv.CV_8UC4);
let dst = new cv.Mat(height, width, cv.CV_8UC1);
let cap = new cv.VideoCapture(videoSource);

const FPS = 30;
function processVideo() {
    if (!streaming) {
            // clean and stop.
            src.delete();
            dst.delete();
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
        console.log(err)
    }
}
// schedule first one.
setTimeout(processVideo, 0);
```

**Note:** Remember to delete src and dst after when stop.

# References

https://docs.opencv.org/3.4/index.html
