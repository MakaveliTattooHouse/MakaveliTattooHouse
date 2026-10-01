document.addEventListener('DOMContentLoaded', () => {
    const fab = document.getElementById('msaidizi-fab');
    const fabTooltip = document.getElementById('msaidizi-tooltip');
    const overlay = document.getElementById('tour-overlay');
    const dialog = document.getElementById('tour-dialog');
    const textNode = document.getElementById('tour-text');
    const stepCounter = document.getElementById('tour-step-counter');
    const nextBtn = document.getElementById('tour-next');
    const prevBtn = document.getElementById('tour-prev');
    const closeBtn = document.getElementById('tour-close');

    // Define the sequence of the tour
    const steps = [
        {
            targetSelector: '#install-btn', // Assumes this ID is on your install button
            text: "Tap here to install the Makaveli Ink House app directly to your home screen for quick offline access.",
            position: 'top' // Places dialog above the button
        },
        {
            targetSelector: '.service-card', // Highlights the first service card it finds
            text: "Browse our studio services. Find the tattoo or piercing you want and check the baseline pricing.",
            position: 'bottom'
        },
        {
            targetSelector: '.book-btn', // Highlights the first book button
            text: "Click 'Book Now' to select your preferred day and time. We will finalize your slot via WhatsApp!",
            position: 'top'
        }
    ];

    let currentStep = 0;
    let activeElement = null;

    function startTour() {
        fabTooltip.style.display = 'none'; // Hide the "Click me" tooltip
        overlay.hidden = false;
        dialog.hidden = false;
        renderStep(currentStep);
    }

    function endTour() {
        overlay.hidden = true;
        dialog.hidden = true;
        if (activeElement) {
            activeElement.classList.remove('tour-highlight');
        }
        currentStep = 0; // Reset
    }

    function renderStep(index) {
        // Clean up previous highlight
        if (activeElement) {
            activeElement.classList.remove('tour-highlight');
        }

        const step = steps[index];
        activeElement = document.querySelector(step.targetSelector);
        
        stepCounter.innerText = `Step ${index + 1}/${steps.length}`;
        textNode.innerText = step.text;

        // Button states
        prevBtn.disabled = index === 0;
        nextBtn.innerText = index === steps.length - 1 ? "Finish" : "Next";

        // If the element exists on this page, highlight it and position the dialog
        if (activeElement) {
            activeElement.classList.add('tour-highlight');
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Calculate positioning after scrolling
            setTimeout(() => {
                const rect = activeElement.getBoundingClientRect();
                
                // Basic positioning logic
                if (step.position === 'bottom') {
                    dialog.style.top = `${rect.bottom + window.scrollY + 15}px`;
                } else { // top
                    dialog.style.top = `${rect.top + window.scrollY - dialog.offsetHeight - 15}px`;
                }
                
                // Center horizontally
                dialog.style.left = `${Math.max(10, rect.left + (rect.width / 2) - (dialog.offsetWidth / 2))}px`;
            }, 300);
        } else {
            // Fallback center positioning if element is missing on current page
            dialog.style.top = '50%';
            dialog.style.left = '50%';
            dialog.style.transform = 'translate(-50%, -50%)';
        }
    }

    // Event Listeners
    fab.addEventListener('click', startTour);
    closeBtn.addEventListener('click', endTour);
    overlay.addEventListener('click', endTour);

    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep(currentStep);
        } else {
            endTour();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            renderStep(currentStep);
        }
    });
});
