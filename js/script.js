function openModalLogin() {
    document.querySelector("#modalLogin").style.display = "flex";
    document.querySelector("#containerLogin").style.display = "none";
}

function closeModalLogin() {
    document.querySelector("#modalLogin").style.display = "none";
    document.querySelector("#containerLogin").style.display = "flex";
}

window.onclick = function (e) {
    if (e.target == document.querySelector("#modalLogin")) {
        closeModalLogin();
    }
}

function openModalErrorEmptyLogin() {
    document.querySelector("#modalLogin").style.display = "none";
    document.querySelector("#modalErrorEmptyLogin").style.display = "flex";
}

function closeModalErrorEmptyLogin() {
    document.querySelector("#modalLogin").style.display = "flex";
    document.querySelector("#modalErrorEmptyLogin").style.display = "none";
}

function openModalErrorLogin() {
    document.querySelector("#modalLogin").style.display = "none";
    document.querySelector("#modalErrorLogin").style.display = "flex";
}

function closeModalErrorLogin() {
    document.querySelector("#modalLogin").style.display = "flex";
    document.querySelector("#modalErrorLogin").style.display = "none";
}

function loginAdminDashboard() {
    document.querySelector("#container").style.display = "none";
    document.querySelector("#adminDashboard").style.display = "flex";
}

function logoutAdminDashboard() {
    document.querySelector("#container").style.display = "flex";
    closeModalLogin();
    document.querySelector("#adminDashboard").style.display = "none";
}


async function systemLogin() {
    const emailLogin = document.querySelector("#emailLogin");
    const passLogin = document.querySelector("#passLogin");

    // Local validation: no empty fields on login form
    const modalErrorEmptyLogin = document.querySelector("#modalErrorEmptyLogin")

    if (emailLogin.value == ""){
        openModalErrorEmptyLogin();
        modalErrorEmptyLogin.innerHTML = `
            <span id="iconAttention">error_outline</span>
            <p style="margin-bottom: 20px">Please insert your e-mail</p>
            <button type="button" class="tech-btn" onclick="closeModalErrorEmptyLogin()">OK</button>
        `
    } else if (passLogin.value == "") {
        openModalErrorEmptyLogin();
        modalErrorEmptyLogin.innerHTML = `
            <span id="iconAttention">error_outline</span>
            <p style="margin-bottom: 20px">Please insert your password</p> 
            <button type="button" class="tech-btn" onclick="closeModalErrorEmptyLogin()">OK</button>
        `
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
                    loginAdminDashboard();
                    break;
                case "manager":
                    loginManagerDashboard();
                    break;
                case "user":
                    loginUserDashboard()
                    break;
            }
        } else {
            openModalErrorLogin();
            modalErrorLogin.innerHTML = `
                <span id="iconAttention">error_outline</span>
                <p style="margin-bottom: 20px">User not found or password invalid.</p> 
                <button type="button" class="tech-btn" onclick="closeModalErrorLogin()">OK</button>
            `
        }
    }

}