async function performOCR() {
    const imageInput = document.getElementById('imageInput');
    const resultElement = document.getElementById('result');

    if (imageInput.files.length === 0) {
        resultElement.textContent = 'Please select an image.';
        return;
    }

    const imageFile = imageInput.files[0];
    const { data: { text } } = await Tesseract.recognize(imageFile);
    let splitText = text.split(/\W+/);
    
    //remove non english elements
    splitText.forEach((element, idx) => {
        splitText[idx] = element.replace(/[^a-zA-Z ]/g, '');
       });

    // Generate a ramdom number beteen 0 and the length of the list of elements
    var randomNumber = Math.floor(Math.random() * splitText.length);
    var randomChoice = splitText[randomNumber];
    
    resultElement.textContent = 'You should try the ' + randomChoice;

    console.log(randomChoice + ' was chosen at index ' + randomNumber)
    console.log(splitText);
}