document.addEventListener("DOMContentLoaded", () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll(".tab-button")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update button states
        tabButtons.forEach((btn) => btn.setAttribute("aria-selected", "false"))
        button.setAttribute("aria-selected", "true")
  
        // Show the selected tab content, hide others
        const tabId = button.getAttribute("data-tab")
        tabContents.forEach((content) => {
          if (content.id === tabId) {
            content.style.display = "block"
          } else {
            content.style.display = "none"
          }
        })
      })
    })
  })
  