let allCars = []
fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Cars`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        allCars = data
        renderData(allCars)
    })

const renderData = (allCars) => {
    const cards = document.querySelector('#cards')
    console.log("Cars", allCars)

    let html = ""

    allCars.forEach((car) => {
        html += `
        <div class="card">
            <div class="card-image-container">
                <a href="/cars-forms.html?id=${car.id}">
                    <img class="card-img-top" src="${car.imageUrl}" alt="Card image cap">
                </a>
            </div>
            <div class="card-body">
                <h5 class="card-title">${car.manufacturer} - ${car.name} (${car.year})</h5>
                <p class="card-text">${car.price.toLocaleString("en-US")} BAM</p>
            </div>
        </div>
        `
    });

    cards.innerHTML = html
}