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
### synchronous loading:
```javascript
<script src="https://docs.opencv.org/3.4/opencv.js" type="text/javascript"></script>
```
### asynchronous loading:
```javascript
<script async src="https://docs.opencv.org/3.4/opencv.js" onload="onOpenCvReady();" type="text/javascript"></script>
```

## Use OpenCV.js
Once `opencv.js` is ready, you can access OpenCV objects and functions through `cv` object.

For example, you can create a **[cv.Mat](https://docs.opencv.org/3.4/d3/d63/classcv_1_1Mat.html)** from an image by **[cv.imread](https://docs.opencv.org/3.4/d4/da8/group__imgcodecs.html#ga288b8b3da0892bd651fce07b3bbd3a56)**.

**Note** Because image loading is asynchronous, you need to put **[cv.Mat](https://docs.opencv.org/3.4/d3/d63/classcv_1_1Mat.html)** creation inside the `onload` callback.
```javascript
imgElement.onload = function() {
let mat = cv.imread(imgElement);
}
```

## Images
OpenCV.js saves images as cv.Mat type. We use HTML canvas element to transfer cv.Mat to the web or in reverse

### Read an image

First, create an ImageData obj from canvas:

```jsx
let canvas = document.getElementById(canvasInputId);
let ctx = canvas.getContext('2d');
let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
```

canvas는 html5에서 동적으로 그림을 그리는 요소로 context객체를 받아거기에다 그려줌

Then, use cv.matFromImageData to construct a **[cv.Mat](https://docs.opencv.org/3.4/d3/d63/classcv_1_1Mat.html)**:

```jsx
let src = cv.matFromImageData(imgData);
```

**Note**

Because canvas only support 8-bit RGBA image with continuous storage, the **[cv.Mat](https://docs.opencv.org/3.4/d3/d63/classcv_1_1Mat.html)** type is cv.CV_8UC4. It is different from native OpenCV because images returned and shown by the native **imread** and **imshow** have the channels stored in BGR ord


# References
https://docs.opencv.org
