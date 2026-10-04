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

// --- Draggable FAB Logic ---
    let isDragging = false;
    let isMoved = false; // Distinguishes between a click and a drag
    let startX, startY, initialX, initialY;

    function onDragStart(e) {
        // Ignore right-clicks
        if (e.type === 'mousedown' && e.button !== 0) return;
        
        isDragging = true;
        isMoved = false; // Reset movement flag

        // Normalize touch and mouse coordinates
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        startX = clientX;
        startY = clientY;

        // Capture the element's current physical position
        const rect = fab.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;

        // Strip CSS constraints so left/top absolute positioning works
        fab.style.bottom = 'auto';
        fab.style.right = 'auto';
        fab.style.left = `${initialX}px`;
        fab.style.top = `${initialY}px`;
        fab.style.transition = 'none'; // Disable snapping transitions during drag

        // Bind global movement listeners
        document.addEventListener('mousemove', onDragMove, { passive: false });
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchmove', onDragMove, { passive: false });
        document.addEventListener('touchend', onDragEnd);
    }

    function onDragMove(e) {
        if (!isDragging) return;

        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        // If movement exceeds 5px, register it as a drag rather than a sloppy click
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            isMoved = true;
        }

        if (isMoved) {
            e.preventDefault(); // Stop mobile viewport scrolling

            let newX = initialX + deltaX;
            let newY = initialY + deltaY;

            // Viewport Boundary Constraints
            const maxX = window.innerWidth - fab.offsetWidth;
            const maxY = window.innerHeight - fab.offsetHeight;

            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX > maxX) newX = maxX;
            if (newY > maxY) newY = maxY;

            // Apply new coordinates
            fab.style.left = `${newX}px`;
            fab.style.top = `${newY}px`;
        }
    }

    function onDragEnd() {
        isDragging = false;
        
        // Remove global listeners to free up memory
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchmove', onDragMove);
        document.removeEventListener('touchend', onDragEnd);
    }

    // Attach initiation listeners
    fab.addEventListener('mousedown', onDragStart);
    fab.addEventListener('touchstart', onDragStart, { passive: false });

    // Modified click listener: Abort the tour start if the user dragged the widget
    fab.addEventListener('click', (e) => {
        if (isMoved) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        startTour();
    });

    // Existing modal listeners
    overlay.addEventListener('click', endTour);
    if (closeBtn) closeBtn.addEventListener('click', endTour);
    // ... keep your nextBtn and prevBtn event listeners below ...

    
});
