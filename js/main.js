const loadData = async () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.tools);
    displayCard(data.data.tools);
}
const displayCard = (cards) => {
    const cardContainer = document.getElementById('cards-container')
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-full' , 'card-compact', 'bg-base-100' , 'shadow-xl');
        cardDiv.innerHTML = `
        <figure><img src="${card.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">Features</h2>
          <ol class="list-decimal">
          <li>${card.features[0]}</li>
          <li>${card.features[1]}</li>
          <li>${card.features[2]}</li>
          </ol>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `
      cardContainer.appendChild(cardDiv);
        
    });

}

loadData();