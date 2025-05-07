document.addEventListener("DOMContentLoaded", () => {
    // Get all tab buttons and tab panes
    const tabButtons = document.querySelectorAll(".tab-button")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    // Set the first tab as active by default
    if (tabButtons.length > 0 && tabPanes.length > 0) {
      tabButtons[0].classList.add("active")
      tabPanes[0].classList.add("active")
    }
  
    // Add click event listeners to tab buttons
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons and panes
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabPanes.forEach((pane) => pane.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Get the tab ID from data attribute
        const tabId = this.getAttribute("data-tab")
  
        // Add active class to corresponding tab pane
        document.getElementById(tabId).classList.add("active")
      })
    })
  })
  