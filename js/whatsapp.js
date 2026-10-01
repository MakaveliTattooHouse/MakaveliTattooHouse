/**
 * Utility function to generate a pre-filled WhatsApp link.
 * @param {string} serviceName - The name of the selected service.
 * @param {string} servicePrice - The price of the selected service.
 * @param {string} preferredDay - The user's selected day.
 * @param {string} preferredTime - The user's selected time block.
 */
function generateWhatsAppLink(serviceName, servicePrice, preferredDay, preferredTime) {
    // Updated to the new Eleazar Barbershop number
    // Converted local 0716426596 to international 254716426596
    const phoneNumber = "254716426596"; 
    
    const message = `Hello 👋, I would like to book an appointment.\n\nService: ${serviceName} (${servicePrice})\nPreferred Day: ${preferredDay}\nPreferred Time: ${preferredTime}\n\nDo you have a slot open?`;
    
    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
