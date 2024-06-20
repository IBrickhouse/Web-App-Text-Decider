async function performOCR() {
    const imageInput = document.getElementById('imageInput');
    const resultElement = document.getElementById('result');

    if (imageInput.files.length === 0) {
        resultElement.textContent = 'Please select an image.';
        return;
    }

    const imageFile = imageInput.files[0];
    const { data: { text } } = await Tesseract.recognize(imageFile);
    // Remove non word elements
    var splitText = text.split(/\W+/);
    //var splitText = text;

    // Remove non english elements
    splitText.forEach((element, idx) => {
        //replace non letters
        //splitText[idx] = element.replace(/[0-9]/g, '')

        //Remove non english
        //splitText[idx] = element.replace(/[^a-zA-Z]/g, '');

        //replace all elements that dont begin with capitalized letters
        splitText[idx] = element.replace(/\b[a-z0-9][a-zA-Z0-9]*\b/, '');
       });
    // Filter out empty elements
    splitText = splitText.filter(Boolean)


    // Generate a ramdom number beteen 0 and the length of the list of elements
    var randomNumber = Math.floor(Math.random() * splitText.length);
    var randomChoice = splitText[randomNumber];
    
    resultElement.textContent = 'You should try the ' + randomChoice;

    console.log(randomChoice + ' was chosen at index ' + randomNumber)
    console.log(splitText);
}