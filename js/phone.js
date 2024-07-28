let loadPhone = async (searchText='13', isShowAll) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    let data = await res.json();
    let phones = data.data;
    // console.log(data.data);
    displayPhones(phones, isShowAll);
}

let displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    let phoneContainer = document.getElementById('phone-container');
    // clear phone container card before add new card
    phoneContainer.textContent = '';

    // active show all button condition
    let showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // items display limit
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        let phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `<figure>
                      <img
                        src="${phone.image}"
                        alt="" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}

// show details
let handleShowDetail = async (id) =>{
    // console.log('show details',id);
    // load data in show details
    let res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    let data = await res.json();
    let phone = data.data;

    showPhoneDetails(phone);
}

let showPhoneDetails = (phone) =>{
    console.log(phone);
    let phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText= phone.name;


    let showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML= `
        <img src="${phone.image}" alt="">
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
        <p><span>Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
        <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
        <p><span>Slug:</span>${phone?.slug}</p>
        <p><span>Release Date:</span>${phone?.releaseDate}</p>
        <p><span>Brand:</span>${phone?.brand}</p>
        <p><span>Gps:</span>${phone?.others?.GPS}</p>
    `

    // show the modal
    show_details_modal.showModal();
}
// handle search button
let handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// let handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//     let searchField = document.getElementById('search-field2');
//     let searchText = searchField.value;
//     loadPhone(searchText);
// }

let toggleLoadingSpinner = (isLoading) => {
    let loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all 
let handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();