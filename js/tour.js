document.addEventListener('DOMContentLoaded', () => {
    // 1. Safely query all elements
    const fab = document.getElementById('msaidizi-fab');
    const fabTooltip = document.getElementById('msaidizi-tooltip');
    const overlay = document.getElementById('tour-overlay');
    const dialog = document.getElementById('tour-dialog');
    const textNode = document.getElementById('tour-text');
    const stepCounter = document.getElementById('tour-step-counter');
    const nextBtn = document.getElementById('tour-next');
    const prevBtn = document.getElementById('tour-prev');
    const closeBtn = document.getElementById('tour-close');

    // 2. Early Return: If the core tour HTML isn't on this page, stop running the script gracefully.
    if (!fab || !overlay || !dialog) return;

    const steps = [
        {
            targetSelector: '#install-btn', 
            text: "Welcome to Makaveli Ink House! First, tap here to install our app directly to your home screen for instant, offline access to our studio.",
            position: 'top' 
        },
        {
            targetSelector: '.service-card', 
            text: "Browse our custom tattoos, body piercings, and tooth gem services. You'll see the starting prices listed right here on the card.",
            position: 'bottom'
        },
        {
            targetSelector: '.book-btn', 
            text: "Ready to get inked? Tap 'Book Now' to pick your day and time. Your request will be sent directly to Makaveli's phone number (0743970892) via WhatsApp to secure your slot!",
            position: 'top'
        }
    ];

    let currentStep = 0;
    let activeElement = null;

    function startTour() {
        if (fabTooltip) fabTooltip.style.display = 'none'; 
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
        currentStep = 0; 
    }

    function renderStep(index) {
        if (activeElement) {
            activeElement.classList.remove('tour-highlight');
        }

        const step = steps[index];
        activeElement = document.querySelector(step.targetSelector);
        
        if (stepCounter) stepCounter.innerText = `Step ${index + 1}/${steps.length}`;
        if (textNode) textNode.innerText = step.text;

        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.innerText = index === steps.length - 1 ? "Finish" : "Next";

        if (activeElement) {
            activeElement.classList.add('tour-highlight');
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                const rect = activeElement.getBoundingClientRect();
                
                if (step.position === 'bottom') {
                    dialog.style.top = `${rect.bottom + window.scrollY + 15}px`;
                } else { 
                    dialog.style.top = `${rect.top + window.scrollY - dialog.offsetHeight - 15}px`;
                }
                
                let calculatedLeft = rect.left + (rect.width / 2) - (dialog.offsetWidth / 2);
                
                if (calculatedLeft < 10) calculatedLeft = 10;
                
                const maxRight = window.innerWidth - dialog.offsetWidth - 10;
                if (calculatedLeft > maxRight) calculatedLeft = maxRight;

                dialog.style.left = `${calculatedLeft}px`;
                dialog.style.transform = 'none'; // Clear center transform if present
                
            }, 300);
        } else {
            // Safe fallback: If the target (e.g., #install-btn) isn't on this page, center the dialog.
            dialog.style.top = '50%';
            dialog.style.left = '50%';
            dialog.style.transform = 'translate(-50%, -50%)';
        }
    }

    // 3. Safely attach event listeners only if the buttons exist
    fab.addEventListener('click', startTour);
    overlay.addEventListener('click', endTour);
    
    if (closeBtn) closeBtn.addEventListener('click', endTour);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                renderStep(currentStep);
            } else {
                endTour();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                renderStep(currentStep);
            }
        });
    }
});
