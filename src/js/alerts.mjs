export default async function loadAlerts(containerElement) {
    const alertContainer = document.getElementById(containerElement);
  
    try {
      const response = await fetch("/json/alerts.json");
      if (response.ok) {
        const alerts = await response.json();
        alerts.forEach(alert => {
          const alertDiv = document.createElement("div");
          alertDiv.classList.add("alert");
          alertDiv.style.backgroundColor = alert.backgroundColor;
          alertDiv.textContent = alert.message;
          alertContainer.appendChild(alertDiv);
        });
      } else {
        console.error("Failed to load alerts");
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  }
