const loadPhone = async(searchText='13',isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones)
    displayPhones(phones,isShowAll)
}


const displayPhones = (phones,isShowAll) =>{
    // console.log(phones)

    const phoneContainer = document.getElementById('phone-Container')
    // clear phone container cards before adding new cards
    phoneContainer.textContent = ''

    // display show all button if there are more then 12 phones 
     const button = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll ){
        button.classList.remove('hidden')
    }else{
        button.classList.add('hidden')
    }

    // console.log('is show all',isShowAll)

    // display only first 12 phones if not show all

   if(!isShowAll){
    phones = phones.slice(0,12)
   }
   

    phones.forEach(phone =>{
        // console.log(phone)
        // 2 create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card p-4  bg-gray-100 shadow-xl`
        // 3 set innerHtml 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show details</button>
          </div>
        </div>
        `
        // 4 append child
        phoneContainer.appendChild(phoneCard)

    })
    // hide loading spinner
    toggleLoadingSpinner(false)
}

// 
const handleShowDetail =  async(id) =>{
    // console.log('click',id)
    // load single phone data
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
   const data = await res.json()
   const phone = data.data
   showPhoneDetails(phone)


}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name

    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS:</span>${phone?.others?.GPS || 'No GPS Available'}</p>
    `
    // show the modal 
   show_details_modal.showModal()

}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
   const searchField = document.getElementById('search-field')
   const searchText = searchField.value
//    console.log(searchText)
   loadPhone(searchText,isShowAll)
} 

// handle search  button 2
// const searchHandle = () =>{
//     toggleLoadingSpinner(true)
//    const inputField = document.getElementById('search-field2')
//    const inputText = inputField.value
// //    console.log(inputText)
//    loadPhone(inputText)
// }

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
   if(isLoading){
    loadingSpinner.classList.remove('hidden')
   }else{
    loadingSpinner.classList.add('hidden')
   }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true)
}

loadPhone()