const output = document.getElementById('output');
const scanBtn = document.getElementById('scanBtn');
const imageBox = document.getElementById('imageBox');

let selectedImage;
let selectedLanguage = 'eng';

function selectLanguage() {
    const language = document.getElementById('language');
    selectedLanguage = language.value;
    console.log(selectedLanguage);
    console.log(typeof selectedLanguage);
}

function pickFile() {
    const selectedFile = document.getElementById('inputFile');

    if ('files' in selectedFile) {
        selectedImage = selectedFile.files[0];
        imageBox.src = window.URL.createObjectURL(selectedImage);
        // console.log(selectedImage);
    } else {
        console.log('Please select an image');
    }
}

function scanText() {
    if (selectedImage) {
        output.innerHTML = 'Processing...';
        Tesseract.recognize(
            selectedImage, 
            selectedLanguage,{
            workerPath: "js/worker.min.js",
            langPath: "langs-folder/",
            corePath: "js/tesseract-core.wasm.js",
        }).then(function(result){
            // console.log(result.data.text);
            output.innerHTML = result.data.text;
        }).finally(function(){
            console.log('Finally executed');
        });
    } else {
        output.innerHTML = 'Please select an image to scan';
    }
}