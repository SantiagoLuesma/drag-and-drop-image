// Variables
const dropArea = document.querySelector('.drag'),
    dragText = document.querySelector('#dragTitle'),
    button = document.querySelector('button'),
    input = document.querySelector('input');
let file; // This is a global variable and we'll use it inside multiple functions

button.onclick = () =>{
    input.click();
}

input.addEventListener('change', function () {
    // Getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    showFile();
});

// If user Drag a File Over DropArea
dropArea.addEventListener('dragover', (event)=>{
    event.preventDefault(); // Preventing from default behaviour
    dropArea.classList.add('active');
    dragText.textContent = "Release to Upload File";
});

// If user leave dragged file from DropArea
dropArea.addEventListener('dragleave', ()=>{
    dropArea.classList.remove('active');
    dragText.textContent = "Drag & Drop to Upload File";
});

// If user drop file on DropArea
dropArea.addEventListener('drop', (event)=>{
    event.preventDefault(); // Preventing from default behaviour
    // Getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile();
})

function showFile() {
    let fileType = file.type;
    
    
    // Adding some valid image extensions in array
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if(validExtensions.includes(fileType)){
        let fileReader = new FileReader(); // Creating new FileReader object
        fileReader.onload = ()=>{
            let fileURL = fileReader.result; // Passing user file source in fileURL variable

            // Creating an img tag and passing user selected file source inside src attribute
            let imgTag = `<img src="${fileURL}" alt="">`;
            dropArea.innerHTML = imgTag; // Adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file);
    }else{
        dropArea.classList.remove('active');
        alert('¡This is not an image file!');
    }
}