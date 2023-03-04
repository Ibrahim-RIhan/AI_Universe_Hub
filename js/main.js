// Load Data From API Function 
const loadData = async () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayCard(data.data.tools.slice(0, 6));
    DisplayDates((data.data.tools.map(tool => tool.published_in)));

}




// Spinner Element
const loadingSpinner = document.getElementById('loadingSpinner');


document.getElementById('btn-sort').addEventListener( 'click', function DisplayDates(dates){
    function sortDates(dates) {
        // Parse dates to date objects
        const dateObjects = dates.map(date => new Date(Date.parse(date)));
        // Sort date objects
        dateObjects.sort((a, b) => a - b);
        // Convert date objects back to strings
        const sortedDates = dateObjects.map(date => date.toISOString().slice(0, 10));
        // Return sorted dates as array of strings
        console.log(sortedDates);
    }
})
  




// Display Card Function 

const displayCard = (cards, sortedDates) => {
    const cardContainer = document.getElementById('cards-container')
    loadingSpinner.classList.remove('d-none');
    cards.forEach(card => {
        const cardFeatures = card.features
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
    <div class="card h-100">
      <img src="${card.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="fw-semibold card-title">Features</h5>
        <ol class="list-decimal px-3">
          <li>${card.features[0] ? card.features[0] : card.features[1]}</li>
          <li>${card.features[1] ? card.features[1] : card.features[2]}</li>
          <li>${card.features[2] ? card.features[2] : style = "display:none;"}</li>
          </ol>
          <hr>
        <div class="my-1 d-flex justify-content-between align-items-center">
            <div>
                 <h5 class="fw-semibold ">${card.name ? card.name : "Anonymous AI"}</h5>
                <div class="d-flex gap-1 align-items-center">
                     <img src="./images/Frame.png" alt="">
                     <p class=" mt-3 text-secondary">${card.published_in ? card.published_in : "No Published Date Found"}</p>
                </div> 
            </div>

               <button onclick="loadIDDetails('${card.id}')" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
               <img class="w-7" src="./images/vector.png" alt="" >
             </button>
               </div>
      </div>
    </div>  `
        cardContainer.appendChild(cardDiv);
        loadingSpinner.classList.add('d-none');

    });

}
// Load Modal  Details 

const loadIDDetails = async (id) => {
    loadingSpinner.classList.remove('d-none');
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalDetails(data.data);


}
//  Display Modal Details 

const displayModalDetails = (card) => {
    loadingSpinner.classList.remove('d-none');
    console.log(card);
    const AiDescription = document.getElementById('AiDescription');
    AiDescription.innerText = card.description ? card.description : "No Description Found";
    const features1 = document.getElementById('features1')
    features1.innerText = card.features["1"].feature_name ? card.features["1"].feature_name : "No Data Found";
    const features2 = document.getElementById('features2')
    features2.innerText = card.features["2"].feature_name ? card.features["2"].feature_name : "No Data Found";
    const features3 = document.getElementById('features3')
    features3.innerText = card.features["3"].feature_name ? card.features["3"].feature_name : "No Data Found";
    const integration1 = document.getElementById('integration1')
    integration1.innerText = card.integrations && card.integrations[0] ? card.integrations[0] : "No Data Found";
    const integration2 = document.getElementById('integration2')
    integration2.innerText = card.integrations && card.integrations[1] ? card.integrations[1] : "No Data Found";
    const integration3 = document.getElementById('integration3')
    integration3.innerText = card.integrations && card.integrations[2] ? card.integrations[2] : "No Data Found";
    const AiImage = document.getElementById('AiImage');
    AiImage.src = card.image_link[0];
    const accuracy = document.getElementById('accuracy');
    const accuracyButton = document.getElementById('accuracyButton');
    accuracy.innerText = card.accuracy.score === null ? accuracyButton.style.display = 'none' : card.accuracy.score * 100;
    document.getElementById('AiExampleInput').innerText = card.input_output_examples === null ? "Can You Give Any Example ?" : card.input_output_examples[0].input;
    document.getElementById('AiExampleOutput').innerText = card.input_output_examples === null ? "No! Not Yet! Take a break!!!" : card.input_output_examples[0].output;
    // Pricing 
    document.getElementById('BasicPlan').innerText = card.pricing === null ? "Free OF Cost" : card.pricing[0].plan;
    document.getElementById('BasicPrice').innerText = card.pricing === null ? "Basic" : card.pricing[0].price;
    document.getElementById('ProPlan').innerText = card.pricing === null ? "Free OF Cost" : card.pricing[1].plan;
    document.getElementById('ProPrice').innerText = card.pricing === null ? "Pro" : card.pricing[1].price;
    document.getElementById('EnterprisePlan').innerText = card.pricing === null ? "Free OF Cost" : card.pricing[2].plan;
    document.getElementById('EnterprisePrice').innerText = card.pricing === null ? "Enterprise" : card.pricing[2].price;
    loadingSpinner.classList.add('d-none');
};

// Show More Button

const loadMoreBtn = document.getElementById('moreButton').addEventListener('click', function loadMoreBtn() {
    loadingSpinner.classList.remove('d-none');
    let start = 6
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => {
            const nextCards = data.data.tools.slice(start, start + 6)
            displayCard(nextCards)
            start += 6
        })

    const ShowMoreBtn = document.getElementById('moreButton');
    ShowMoreBtn.classList.add('d-none');
    loadingSpinner.classList.add('d-none');

})

loadData();






