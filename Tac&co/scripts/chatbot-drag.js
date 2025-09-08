// Make chatbot draggable
document.addEventListener('DOMContentLoaded', () => {
    const chatbotContainer = document.querySelector('.chatbot-container');
    if (!chatbotContainer) return;

    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const dragStart = (e) => {
        const chatbotButton = chatbotContainer.querySelector('.chatbot-button');
        const targetEl = e.target;

        // Only allow dragging by the button
        if (targetEl !== chatbotButton && !chatbotButton.contains(targetEl)) {
            return;
        }

        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        isDragging = true;
        chatbotContainer.style.transition = 'none';
    }

    const dragEnd = () => {
        isDragging = false;
        chatbotContainer.style.transition = 'transform 0.3s ease';
    }

    const drag = (e) => {
        if (!isDragging) return;

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        // Get viewport dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const containerRect = chatbotContainer.getBoundingClientRect();

        // Keep chatbot within viewport bounds
        if (currentX < 0) currentX = 0;
        if (currentY < 0) currentY = 0;
        if (currentX > windowWidth - containerRect.width) {
            currentX = windowWidth - containerRect.width;
        }
        if (currentY > windowHeight - containerRect.height) {
            currentY = windowHeight - containerRect.height;
        }

        chatbotContainer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }

    // Touch events
    chatbotContainer.addEventListener('touchstart', dragStart, { passive: false });
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('touchmove', drag, { passive: false });

    // Mouse events
    chatbotContainer.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);
});
