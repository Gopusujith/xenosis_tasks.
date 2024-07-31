document.getElementById('load-images').addEventListener('click', fetchImages);

async function fetchImages() {
    const API_URL = 'https://api.unsplash.com/photos/random?count=10&client_id=sujith';
    const imageGrid = document.getElementById('image-grid');
    imageGrid.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        data.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description;
            imageGrid.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Initial load
fetchImages();
