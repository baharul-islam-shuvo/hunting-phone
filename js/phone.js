let loadPhone = async (searchText, isShowAll) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    let data = await res.json();
    let phones = data.data;
    // console.log(data.data);
    displayPhones(phones, isShowAll);
}

let displayPhones = (phones, isShowAll) => {
    console.log(phones);

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
        console.log(phone);
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
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>`
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
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