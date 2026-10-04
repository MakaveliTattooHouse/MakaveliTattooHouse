// 1. High-Fidelity Data Payload for Makaveli Ink House
const serviceCatalog = {
    tattoos: {
        categoryTitle: "1. TATTOOS",
        items: [
            { name: "Tattoo Session", price: "Starts from KSh 1,500" }
        ]
    },
    specialtyPiercings: {
        categoryTitle: "2. SPECIALTY PIERCINGS",
        items: [
            { name: "Snake Eyes", price: "KSh 2,000" },
            { name: "Frog Eyes", price: "KSh 2,000" }
        ]
    },
    intimatePiercings: {
        categoryTitle: "3. HOOD PIERCINGS",
        items: [
            { name: "VCH & HCH", price: "KSh 5,500" },
            { name: "Triangle", price: "KSh 5,500" },
            { name: "Christina", price: "KSh 5,500" }
        ]
    },
    piercings: {
        categoryTitle: "4. STANDARD PIERCINGS",
        items: [
            { name: "Earlobe (Gun)", price: "KSh 500" },
            { name: "Earlobe (Needle)", price: "KSh 800" },
            { name: "Earlobe (Kids below 7yrs)", price: "KSh 1,000" },
            { name: "Helix, Conch, Rook, Tragus", price: "KSh 1,000" },
            { name: "Nose, Smiley", price: "KSh 1,000" },
            { name: "Belly, Tongue, Septum", price: "KSh 1,500" },
            { name: "Industrial, Eyebrows, Lips", price: "KSh 1,500" },
            { name: "Surface Piercing (One)", price: "KSh 2,500" },
            { name: "Surface Piercing (Pair)", price: "KSh 3,500" },
            { name: "Dermal (One)", price: "KSh 3,500" },
            { name: "Dermal (Pair)", price: "KSh 5,000" },
            { name: "Nipple (One)", price: "KSh 2,000" },
            { name: "Nipple (Pair)", price: "KSh 3,500" }
        ]
    },
    toothGems: {
        categoryTitle: "5. TOOTH GEMS",
        items: [
            { name: "Custom Gem Installation", price: "KSh 300 (per tooth)" }
        ]
    },
    extras: {
        categoryTitle: "6. EXTRA ACTIVITIES",
        items: [
            { name: "Changing of all rings", price: "Consultation" },
            { name: "Sanitizing rings", price: "Complimentary" }
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
