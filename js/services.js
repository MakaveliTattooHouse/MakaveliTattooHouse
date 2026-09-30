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

document.addEventListener("DOMContentLoaded", () => {
  // Target the container in your HTML
  const container = document.getElementById("services-container");
  
  if (!container) {
    console.error("Error: Could not find the <div id='services-container'> in services.html");
    return;
  }

  let htmlContent = "";

  // Loop through each category
  servicesData.forEach(section => {
    htmlContent += `
      <div class="service-category" style="margin-bottom: 30px;">
        <h2 style="color: #cda85d; border-bottom: 1px solid #333; padding-bottom: 10px;">${section.category}</h2>
        <ul style="list-style: none; padding: 0;">
    `;

    // Loop through the services within the category
    section.services.forEach(item => {
      htmlContent += `
        <li style="margin-bottom: 15px; padding: 10px; background: #1a1a1a; border-radius: 5px;">
          <div style="display: flex; justify-content: space-between; font-weight: bold; color: #fff;">
            <span>${item.name}</span>
            <span style="color: #cda85d;">${item.price}</span>
          </div>
          ${item.details ? `<div style="font-size: 0.9em; color: #aaa; margin-top: 5px;">${item.details}</div>` : ""}
        </li>
      `;
    });

    htmlContent += `</ul></div>`;
  });

  // Inject the generated HTML into the page
  container.innerHTML = htmlContent;
});
