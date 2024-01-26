let getData = document.querySelector('.get-data')
let sortUsername = document.querySelector('.sort-user')
let sortID = document.querySelector('.sort-id')
let clearTable = document.querySelector('.clear-table')
let spinnerWrapper = document.querySelector('.spinner-wrapper')
let tBody = document.querySelector('tbody')

let API_URL = 'https://jsonplaceholder.typicode.com/users'


//get data
getData.addEventListener('click', async () => {
    showSpinner()
    tBody.innerHTML = ''
    let response = await fetch(API_URL)
    let data = await response.json()
    data.forEach(item => {
        tBody.innerHTML += `
    <tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.username}</td>
    <td>${item.email}</td>
    <td>${item.address.city}</td>
    <td><a href=${item.website}>${item.website}</a></td>
    <td><button id=${item.id} class="learn-more btn btn-outline-success">Learn More</button></td>
  </tr>
    `
    });


    let learnMore = document.querySelectorAll('.learn-more')
    learnMore.forEach((item) => {
        item.addEventListener("click", function () {
            fetch(`${API_URL}/${this.id}`)
                .then((res) => res.json())
                .then((item) => {
                    Swal.fire({
                        title: `Name: ${item.name}`,
                        text: `Addres: ${item.address.street},${item.address.suite},${item.address.city}`,
                        footer: `Phone: ${item.phone}`
                    })
                })
        })
    })


    hideSpinner()
})

//sort by username
sortUsername.addEventListener('click', async () => {
    showSpinner()
    tBody.innerHTML = ''
    let response = await fetch(API_URL)
    let data = await response.json()
    let sortedItems = data.sort((a, b) => {
        return a.name.localeCompare(b.name)
    })
    sortedItems.forEach(item => {
        tBody.innerHTML += `
        <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.username}</td>
        <td>${item.email}</td>
        <td>${item.address.city}</td>
        <td><a href=${item.website}>${item.website}</a></td>
        <td><button id=${item.id} class="learn-more btn btn-outline-success">Learn More</button></td>
      </tr>
        `
    });


    let learnMore = document.querySelectorAll('.learn-more')
    learnMore.forEach((item) => {
        item.addEventListener("click", function () {
            fetch(`${API_URL}/${this.id}`)
                .then((res) => res.json())
                .then((item) => {
                    Swal.fire({
                        title: `Name: ${item.name}`,
                        text: `Addres: ${item.address.street},${item.address.suite},${item.address.city}`,
                        footer: `Phone: ${item.phone}`
                    })
                })
        })
    })


    hideSpinner()
})

// sort by ID

sortID.addEventListener('click', async () => {
    showSpinner()
    tBody.innerHTML = ''
    let response = await fetch(API_URL)
    let data = await response.json()
    let sortedID = data.sort((a, b) => {
        return (b.id - a.id)
    })
    sortedID.forEach(item => {
        tBody.innerHTML += `
        <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.username}</td>
        <td>${item.email}</td>
        <td>${item.address.city}</td>
        <td><a href=${item.website}>${item.website}</a></td>
        <td><button id=${item.id} class="learn-more btn btn-outline-success">Learn More</button></td>
      </tr>
        `
    });


    let learnMore = document.querySelectorAll('.learn-more')
    learnMore.forEach((item) => {
        item.addEventListener("click", function () {
            fetch(`${API_URL}/${this.id}`)
                .then((res) => res.json())
                .then((item) => {
                    Swal.fire({
                        title: `Name: ${item.name}`,
                        text: `Addres: ${item.address.street},${item.address.suite},${item.address.city}`,
                        footer: `Phone: ${item.phone}`
                    })
                })
        })
    })


    hideSpinner()
})



//clear table 
clearTable.addEventListener('click', () => {

    Swal.fire({
        title: 'Are you sure to clear the table',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            tBody.innerHTML = ''
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })



})

function showSpinner() {
    spinnerWrapper.classList.replace('d-none', 'd-flex')
}
function hideSpinner() {
    spinnerWrapper.classList.replace('d-flex', 'd-none')
}