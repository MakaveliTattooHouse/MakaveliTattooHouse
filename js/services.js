// 1. Data Payload for Makaveli Tattoo House
const serviceCatalog = {
    tattoos: {
        categoryTitle: "Tattoo Sessions",
        items: [
            { name: "Minimalist / Linework (Small)", price: "KSh 1,500+" },
            { name: "Custom Piece (Medium)", price: "KSh 4,000+" },
            { name: "Full Sleeve Session", price: "KSh 15,000 (Depends)" },
            { name: "Cover-Up / Rework", price: "KSh 5,000 (Start)" },
            { name: "Color Realism", price: "KSh 8,000+" }
        ]
    },
    piercings: {
        categoryTitle: "Body Piercings",
        items: [
            { name: "Ear Lobe (Both)", price: "KSh 1,000" },
            { name: "Cartilage / Helix", price: "KSh 1,500" },
            { name: "Nose / Septum", price: "KSh 1,500" },
            { name: "Belly Button", price: "KSh 2,500" },
            { name: "Industrial", price: "KSh 3,000" }
        ]
    },
    aftercare: {
        categoryTitle: "Aftercare & Extras",
        items: [
            { name: "Tattoo Healing Balm", price: "KSh 800" },
            { name: "Saline Piercing Spray", price: "KSh 600" },
            { name: "Laser Tattoo Removal (Session)", price: "KSh 5,000" },
            { name: "House Call Fee", price: "KSh 1,500+" }
        ]
    }
};

// 2. Core App Logic & Modal Handling
document.addEventListener('DOMContentLoaded', () => {
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
        if(catalogContainer) catalogContainer.appendChild(section);
    }

    // B. Attach Modal Open Listeners
    const buttons = document.querySelectorAll('.book-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            activeService = e.target.getAttribute('data-service');
            activePrice = e.target.getAttribute('data-price');
            if(serviceTitle) serviceTitle.innerText = `Book: ${activeService}`;
            if(modal) modal.hidden = false;
        });
    });

    // C. Handle Modal Cancellation
    if(cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if(modal) modal.hidden = true;
            activeService = ''; 
            activePrice = '';
        });
    }

    // D. Handle Modal Confirmation & Routing
    if(confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const selectedDay = daySelect ? daySelect.value : 'Any day';
            const selectedTime = timeSelect ? timeSelect.value : 'Any time';
            
            const url = generateWhatsAppLink(activeService, activePrice, selectedDay, selectedTime);
            
            if(modal) modal.hidden = true;
            window.open(url, '_blank');
        });
    }
});
