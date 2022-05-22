const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);

const paramId = urlParams.get("id")


const form = document.querySelector("#car-form")
let manufacturer = form.querySelector("#manufacturer")
let carName = form.querySelector("#name")
let image = form.querySelector("#image")
let price = form.querySelector("#price")
let year = form.querySelector("#year")


if(paramId) {

    let cars = []
    fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Cars`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        cars = data
        writeValues(cars)
    })
}

const writeValues = (cars) => {
    
    cars.forEach(car => {
        if(car.id == paramId) {
            manufacturer.value = car.manufacturer
            carName.value = car.name
            image.value = car.iamge
            price.value = car.price
            year.value = car.year
        }
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(!paramId) {
        if(
            manufacturer.value &&
            carName.value &&
            image.value &&
            price.value &&
            year.value
        ) {
            fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Cars`, {
            method: "POST",
            headers: new Headers({
                "Content-Type" : "application/json"
            }),
            body: JSON.stringify(
                {
                    id: Number(Math.floor(Math.random() * (9999 - 100 + 1) ) + 100),
                    name: String(carName.value),
                    manufacturer: String(manufacturer.value),
                    imageUrl: String(image.value),
                    price: Number(price.value),
                    year: Number(year.value)
                }
            )
            }).then((res) => {
                alert(`[CREATE] Status: ${res.statusText} (${res.status})`)
            })
        }
        else {
            alert("Fill all fields")
        }
    }
    else {
        if(
            manufacturer.value &&
            carName.value &&
            image.value &&
            price.value &&
            year.value
        ) {
            fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Cars`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type" : "application/json"
            }),
            body: JSON.stringify(
                {
                    id: Number(paramId),
                    name: String(carName.value),
                    manufacturer: String(manufacturer.value),
                    imageUrl: String(image.value),
                    price: Number(price.value),
                    year: Number(year.value)
                }
            )
            }).then((res) => {
                console.log("Res", res)
                alert(`[UPDATE] Status: ${res.statusText} (${res.status})`)
            })
        }
        else {
            alert("Fill all fields")
        }
    }
})

let delBtn = document.querySelector("#delete-button")
if(!paramId) {
    delBtn.style.display = "none"
}

delBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Cars/${paramId}`, {
    method: "DELETE",
    }).then((res) => {
        alert(`[DELETE] Status: ${res.statusText} (${res.status})`)
        console.log("Res", res)
    });
})