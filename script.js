const imageContainer= document.getElementById('image-container');
const loader= document.getElementById('loader');

let ready = false;
let imagesLoaded=0;
let totalImages=0;
let photosArray= [];

// Unsplash API
const count= 30;
const apiKey ='NmC7_IJRyZq-wWiO8afyqM8gvZp7d0GT25637XPInmQ';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were looaded

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Helper Function to set attributes on DOM Elements
function setAttribute(Element, attributes) {
    for(const key in attributes){
        Element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links photos and add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) =>{
        //create <a> to link to unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttribute(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
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

// schecking if scrolli ng enables
window.addEventListener('scroll', ()=> {
    if(window.innerHeight+ window.scrollY >= document.body.offsetHeight -1000 && ready)
    {
        ready= false;
        getPhotos();
    }
});

getPhotos();