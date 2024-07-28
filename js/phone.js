let loadPhone = async () => {
    let res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    let data = await res.json();
    let phones = data.data;
    // console.log(data.data);
    displayPhones(phones);
}

let displayPhones = phones => {
    // console.log(phones);

    let phoneContainer = document.getElementById('phone-container');

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

loadPhone();