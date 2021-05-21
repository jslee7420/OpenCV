let imgElement = document.querySelector("#imageSrc");
let inputElement = document.querySelector("#fileInput");

inputElement.addEventListener("change", (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

imgElement.onload = function () {
    //read image from img element
    let mat = cv.imread(imgElement);
    //draw image on canvas element
    cv.imshow('canvasOutput', mat);
    //memeory disallocation
    mat.delete();
}

//This has to be called after OpenCV loading, checks if opencv has initialized
cv['onRuntimeInitialized'] = () => {
    console.log('hi');
    document.querySelector('#status').innerHTML = 'OpenCV.js is ready.';
}