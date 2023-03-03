// Load Data Function 
const loadData = async () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.tools);
    displayCard(data.data.tools);
}

// Spinner Function 
const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// Display Card Function 
const displayCard = (cards) => {
    const cardContainer = document.getElementById('cards-container')
    cards.forEach(card => {
        const cardFeatures = card.features
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-full', 'card-normal', 'bg-base-100', 'shadow-xl');
        cardDiv.innerHTML = `
        <figure><img class="w-full" src="${card.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title text-3xl font-semibold">Features</h2>
          <ol class="list-decimal text-lg text-stone-600 px-5">
          <li>${card.features[0]}</li>
          <li>${card.features[1]}</li>
          <li>${card.features[2]}</li>
          </ol>
          <hr>
             <div class="flex justify-between my-3">
                <div>
                 <h2 class="font-semibold text-xl">${card.name}</h2>
                 <div class="flex gap-1 mt-3">
                 <img src="./images/Frame.png" alt="">
                 <p class="mt-1 text-stone-600">${card.published_in}</p>
                 </div>
                 
                 </div>

                     <label onclick="loadDetails('${card.id}')" id="triggerModal" for="my-modal-3" class="btn hover:bg-white bg-white border-0"><img class="w-7" src="./images/vector.png" alt="" ></label>
            </div>
        </div>
        `
        // modalDisplay(card);
        cardContainer.appendChild(cardDiv);
    });

}
// Load Details 
const loadDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
   
    
}
//  Display Details 
const displayDetails = (card) => {
    console.log(card);
    const detailsImage = document.getElementById('detailsImage');
    detailsImage.innerHTML = `<img src="${card.logo}" alt="" />`

    const detailsTitle = document.getElementById('detailsTitle');
    detailsTitle.innerText = card.description;



};


// Show More Button
document.getElementById('moreButton').addEventListener('click', function showMoreButtonClicked() {
    loadData();

});

loadData();
// document.getElementById('triggerModal').addEventListener('click', function modalDisplay(card) {
//     const modalContainer = document.getElementById('modalContainer')
//     const modalDiv1 = document.createElement('div');
//     modalDiv1.classList.add('card', 'w-full', 'bg-base-100', 'shadow-xl')
//     const modalDiv2 = document.createElement('div');
//     modalDiv2.classList.add('card', 'w-full', 'bg-base-100', 'shadow-xl')
//     modalDiv1.innerHTML = `
// <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
// <div class="card-body">
// <h2 class="card-title">
// ${card.name}

// <div class="badge badge-secondary">NEW</div>
// </h2>
// <p>If a dog chews shoes whose shoes does he choose?</p>
// <div class="card-actions justify-end">
// <div class="badge badge-outline">Fashion</div> 
// <div class="badge badge-outline">Products</div>
// </div>
// </div>
// `
//     modalDiv2.innerHTML = `
// <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
// <div class="card-body">
// <h2 class="card-title">
// Shoes!
// <div class="badge badge-secondary">NEW</div>
// </h2>
// <p>If a dog chews shoes whose shoes does he choose?</p>
// <div class="card-actions justify-end">
// <div class="badge badge-outline">Fashion</div> 
// <div class="badge badge-outline">Products</div>
// </div>
// </div>
// `
//     modalContainer.appendChild(modalDiv1)
//     modalContainer.appendChild(modalDiv2)


// })




