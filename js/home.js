function openModal(modalId) {
    // get all modals with the class "mainModal"
    const modals = document.querySelectorAll(".mainModal");

    // close all modals
    modals.forEach( (modal) => { return modal.style.display = "none" });

    // open only the one desired
    const openModal = document.querySelector(modalId);
    if (modalId) { openModal.style.display = "flex"; }

    if (modalId === "#modalUser") {
        loadUsers();
    }
}

