const imageContainer= document.getElementById('image-container');
const loader= document.getElementById('loader');

let photosArray= [];

// Unsplash API
const count= 10;
const apiKey ='egiD9Poc5zK3VVMtbRzo723zkBny1vPF8t_bc3AWGpE';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper Function to set attributes on DOM Elements


// Create Elements for links photos and add to DOM
function displayPhotos() {
    photosArray.forEach((photo) =>{
        //create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        // Put <img> inside <a> then put both inside image container Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API

async function getPhotos(){
    try{
        const response =await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        // catch erroe here

    }
}
getPhotos();