const servicesData = [
  {
    category: "Tattoos",
    services: [
      { name: "Tattoo", price: "Starts from 1,500", details: "Pricing depends on the size & design" }
    ]
  },
  {
    category: "Piercings",
    services: [
      { name: "Earlobe", price: "500 (gun) | 800 (needle) | Kids below 7yrs - 1,000" },
      { name: "Helix, Conch, Rook, Tragus, Nose, Smiley", price: "1,000" },
      { name: "Belly, Tongue, Septum, Industrial, Eyebrows, Lips", price: "1,500" },
      { name: "Surface Piercing", price: "2,500 (one piercing) | 3,500 (pair)" },
      { name: "Dermal", price: "3,500 (one dermal) | 5,000 (pair)" },
      { name: "Nipple", price: "2,000 (one) | 3,500 (pair)" }
    ]
  },
  {
    category: "Tooth Gems Installation",
    services: [
      { name: "Custom Gem Installation", price: "300 per tooth", details: "Safe adhesive, high-quality crystals. Clean, professional, long-lasting finish." }
    ]
  },
  {
    category: "Extra Activities",
    services: [
      { name: "Changing of all rings for safer wear", price: "Varies" },
      { name: "Sanitizing your rings for safer use", price: "Complimentary service" }
    ]
  }
];

// 2. Core App Logic
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("services-container");  
    const catalogContainer = document.getElementById('catalog-container');
    const modal = document.getElementById('booking-modal');
    const confirmBtn = document.getElementById('confirm-booking');
    const cancelBtn = document.getElementById('cancel-booking');
    const serviceTitle = document.getElementById('modal-service-title');
    const daySelect = document.getElementById('day-select');
    const timeSelect = document.getElementById('time-select');
    
    let activeService = '';
    let activePrice = '';

    // A. Render UI dynamically from the catalog
    for (const key in serviceCatalog) {
        const category = serviceCatalog[key];
        
        const section = document.createElement('section');
        section.classList.add('category-section');
        section.innerHTML = `<h2 class="category-title">${category.categoryTitle}</h2>`;
        
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-grid');

        category.items.forEach(service => {
            const card = document.createElement('div');
            card.classList.add('service-card');
            
            card.innerHTML = `
                <div class="card-content">
                    <h3>${service.name}</h3>
                    <p class="price-tag">🏷️ ${service.price}</p>
                </div>
                <button class="book-btn" data-service="${service.name}" data-price="${service.price}">Book Now</button>
            `;
            
            cardContainer.appendChild(card);
        });

        section.appendChild(cardContainer);
        catalogContainer.appendChild(section);
    }

    // B. Attach Modal Open Listeners
    const buttons = document.querySelectorAll('.book-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            activeService = e.target.getAttribute('data-service');
            activePrice = e.target.getAttribute('data-price');
            serviceTitle.innerText = `Book: ${activeService}`;
            modal.hidden = false;
        });
    });

    // C. Handle Modal Cancellation
    cancelBtn.addEventListener('click', () => {
        modal.hidden = true;
        activeService = ''; 
        activePrice = '';
    });

    // D. Handle Modal Confirmation & Routing
    confirmBtn.addEventListener('click', () => {
        const selectedDay = daySelect.value;
        const selectedTime = timeSelect.value;
        
        const url = generateWhatsAppLink(activeService, activePrice, selectedDay, selectedTime);
        
        modal.hidden = true;
        window.open(url, '_blank');
    });
});
