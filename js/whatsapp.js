/**
 * Utility function to generate a pre-filled WhatsApp link for Makaveli Ink House.
 * @param {string} serviceName - The name of the selected tattoo/piercing service.
 * @param {string} servicePrice - The baseline price of the service.
 * @param {string} preferredDay - The user's selected day.
 * @param {string} preferredTime - The user's selected time block.
 */
function generateWhatsAppLink(serviceName, servicePrice, preferredDay, preferredTime) {
    // Internationalized number based on the provided menu: 0743970892
    const phoneNumber = "254743970892"; 
    
    const message = `Hello 👋, I would like to book a studio session.\n\nService: ${serviceName} (${servicePrice})\nPreferred Day: ${preferredDay}\nPreferred Time: ${preferredTime}\n\nDo you have a slot open?`;
    
    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
