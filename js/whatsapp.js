/**
 * Utility function to generate a pre-filled WhatsApp link for Makaveli Tattoo House.
 * @param {string} serviceName - The name of the selected tattoo/piercing service.
 * @param {string} servicePrice - The baseline price of the service.
 * @param {string} preferredDay - The user's selected day.
 * @param {string} preferredTime - The user's selected time block.
 */
function generateWhatsAppLink(serviceName, servicePrice, preferredDay, preferredTime) {
    // Replace with the actual Makaveli Tattoo House WhatsApp number using the 254 international format
    const phoneNumber = "254710247959"; 
    
    const message = `Hello 👋, I would like to book a tattoo session.\n\nService: ${serviceName} (${servicePrice})\nPreferred Day: ${preferredDay}\nPreferred Time: ${preferredTime}\n\nDo you have a slot open?`;
    
    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
