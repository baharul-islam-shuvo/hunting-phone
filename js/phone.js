let loadPhone = async (searchText) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    let data = await res.json();
    let phones = data.data;
    // console.log(data.data);
    displayPhones(phones);
}

let displayPhones = phones => {
    // console.log(phones);

    let phoneContainer = document.getElementById('phone-container');
    // clear phone container card before add new card
    phoneContainer.textContent = '';

    // active show all button condition
    let showAllContainer = document.getElementById('show-all-container');
    if(phones.length>12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // items display limit
    phones = phones.slice(0,12);

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
}

// handle search button
let handleSearch = () => {
    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

let handleSearch2 = () => {
    let searchField = document.getElementById('search-field2');
    let searchText = searchField.value;
    loadPhone(searchText);
}