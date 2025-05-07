document.addEventListener("DOMContentLoaded", () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll(".tab-button")
    const tabPanels = document.querySelectorAll(".tab-panel")

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Deactivate all tabs
            tabButtons.forEach((btn) => {
                btn.classList.remove("active")
                btn.setAttribute("aria-selected", "false")
            })

            tabPanels.forEach((panel) => {
                panel.classList.remove("active")
            })

            // Activate the clicked tab
            button.classList.add("active")
            button.setAttribute("aria-selected", "true")

            const tabId = button.getAttribute("data-tab")
            const targetPanel = document.getElementById(`panel-${tabId}`)
            targetPanel.classList.add("active")
        })
    })

    // Handle keyboard navigation for tabs
    const handleTabKeydown = (e) => {
        const tabs = Array.from(tabButtons)
        const index = tabs.indexOf(document.activeElement)

        // Left/Right arrow keys
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault()

            const direction = e.key === "ArrowLeft" ? -1 : 1
            let newIndex = index + direction

            // Loop around if we go past the ends
            if (newIndex < 0) newIndex = tabs.length - 1
            if (newIndex >= tabs.length) newIndex = 0

            tabs[newIndex].focus()
            tabs[newIndex].click()
        }

        // Home/End keys
        if (e.key === "Home" || e.key === "End") {
            e.preventDefault()

            const newIndex = e.key === "Home" ? 0 : tabs.length - 1
            tabs[newIndex].focus()
            tabs[newIndex].click()
        }
    }

    tabButtons.forEach((tab) => {
        tab.addEventListener("keydown", handleTabKeydown)
    })
})
