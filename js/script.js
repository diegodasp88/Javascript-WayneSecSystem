function toggleDisplays(idOpen, idClose){
    document.querySelector(idOpen).style.display = "flex";
    document.querySelector(idClose).style.display = "none";
}

window.onclick = function (e) {
    if (e.target == document.querySelector("#modalLogin")) {
        toggleDisplays("#containerLogin", "#modalLogin");
    }
}


async function systemLogin() {
    const emailLogin = document.querySelector("#emailLogin");
    const passLogin = document.querySelector("#passLogin");

    // Local validation: no empty fields on login form
    const modalErrorLogin = document.querySelector("#modalErrorLogin");
    if (emailLogin.value == "") {
        toggleDisplays("#modalErrorLogin", "#modalLogin");
        modalErrorLogin.innerHTML = `
            <span id="iconAttention">error_outline</span>
            <p style="margin-bottom: 20px; color: #bc8926;">Please insert an e-mail!</p>
            <button 
                type="button" 
                class="tech-btn" 
                onclick="toggleDisplays('#modalLogin', '#modalErrorLogin')">
                    OK
            </button>
        `;
    } else if (passLogin.value == "") {
        toggleDisplays("#modalErrorLogin", "#modalLogin");
        modalErrorLogin.innerHTML = `
            <span id="iconAttention">error_outline</span>
            <p style="margin-bottom: 20px; color: #bc8926;">Please insert your password!</p>
            <button 
                type="button" 
                class="tech-btn" 
                onclick="toggleDisplays('#modalLogin', '#modalErrorLogin')">
                    OK
            </button>
        `;
    } else {
        // Authentication
        const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/users";
        const response = await fetch(url);
        const usersData = await response.json();

        const email = emailLogin.value;
        const password = passLogin.value;

        const user = usersData.find((e) => {return e.email === email && e.password === password});
    
        if (user) {
            switch (user.role) {
                case "admin":
                    toggleDisplays("#containerLogin", "#modalLogin");
                    toggleDisplays("#home", "#container");
                    break;
                case "manager":
                    toggleDisplays("#containerLogin", "#modalLogin");
                    toggleDisplays("#home", "#container");
                    break;
                case "user":
                    toggleDisplays("#containerLogin", "#modalLogin");
                    toggleDisplays("#home", "#container");
                    break;
            }
        } else {
            toggleDisplays("#modalErrorLogin", "#modalLogin");
            modalErrorLogin.innerHTML = `
                <span id="iconAttention">error_outline</span>
                <p style="margin-bottom: 20px; color: #bc8926;">User not found or password invalid.</p> 
                <button 
                type="button" 
                class="tech-btn" 
                onclick="toggleDisplays('#modalLogin', '#modalErrorLogin')">
                    OK
            </button>
            `
        };
        // Cleaning login form fields
        emailLogin.value = "";
        passLogin.value = "";

        // Showing user name and role on Home
        document.querySelector("#homeTitle").textContent = user.role.toUpperCase();
        document.querySelector("#username").textContent = user.name;
    }

}

// Open Modals
function openModal(modalId, modalClass) {
    // get all modals with the class "mainModal"
    const modals = document.querySelectorAll(modalClass);

    // close all modals
    modals.forEach( (modal) => { return modal.style.display = "none" });

    // open only the one desired
    const openModal = document.querySelector(modalId);
    if (modalId) { openModal.style.display = "flex"; }
}
