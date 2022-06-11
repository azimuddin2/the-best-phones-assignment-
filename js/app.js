const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear the input field data..!
    searchField.value = '';
    if(searchText == '') {
        alert('Please write something to display..!')
    }
    else {
        // load data..!
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displaySearchResult(data.data))
    }
}

// display search result output
const displaySearchResult = datas => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(datas.length == 0){
        alert('That information you are giving Show no result found..!')
    }
    else{
        datas.slice(0, 20).forEach(data =>{
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${data.image}" class="card-img-top w-50 mx-auto pt-5 pb-2" alt="...">
                <div class="card-body">
                    <h4 class="card-title">Name: ${data.phone_name}</h4>
                    <h5>Brand: ${data.brand}</h5>
                    <a onclick="loadPhoneDetails('${data.slug}')" href="#" class="btn btn-danger px-4">Details</a>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}

// load phone details
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhoneDetails(data))
}

// display phone details output
const displayPhoneDetails = phone => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
        <img src="${phone.data.image}" class="card-img-top w-25 mt-5 mx-auto" alt="...">
        <div class="card-body">
            <h3 class="card-title">Name: ${phone.data.name}</h3>
            <p>Release Date: ${phone.data.releaseDate ? phone.data.releaseDate:'Not Available'}</p>
            <h5>Brand: ${phone.data.brand}</h5>
            <p>Display Size: ${phone.data.mainFeatures.displaySize}</p>
            <p>Memory: ${phone.data.mainFeatures.memory}</p>
            <p>Storage: ${phone.data.mainFeatures.storage}</p>
            <p>Slug: ${phone.data.slug}</p>
            <h5>Sensors:</h5>
            <p>${phone.data.mainFeatures.sensors}</p>
            <h5>Others Information:</h5>
            <p>Bluetooth: ${phone.data.others ? phone.data.others.Bluetooth:'Not Available'}</p>
            <p>GPS: ${phone.data.others ? phone.data.others.GPS:'Not Available'}</p>
            <p>NFC: ${phone.data.others ? phone.data.others.NFC:'Not Available'}</p>
            <p>Radio: ${phone.data.others ? phone.data.others.Radio:'Not Available'}</p>
            <p>USB: ${phone.data.others ? phone.data.others.USB:'Not Available'}</p>
            <p>WLAN: ${phone.data.others ? phone.data.others.WLAN:'Not Available'}</p>
        </div>
    `;
    phoneDetails.appendChild(div);
}