const imageContainer= document.getElementById('image-container');
const loader= document.getElementById('loader');

let photosArray= [];

// Unsplash API
const count= 10;
const apiKey ='i3fQdOboRWO6AxKTZpQZd8l7rwayZ0DNycswq2kwYbo';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper Function to set attributes on DOM Elements
function setAttribute(Element, attributes) {
    for(const key in attributes){
        Element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links photos and add to DOM
function displayPhotos() {
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
    if(window.innerHeight+ window.scrollY >= document.body.offsetHeight -1000)
    {
        getPhotos();
        console.log('load more');
    }
});

getPhotos();