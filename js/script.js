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

async function systemLogin() {
    const emailLogin = document.querySelector("#emailLogin");
    const passLogin = document.querySelector("#passLogin");

    const modalErrorEmptyLogin = document.querySelector("#modalErrorEmptyLogin")
    if (emailLogin.value == ""){
        openModalErrorEmptyLogin();
        modalErrorEmptyLogin.innerHTML = `
            <span id="iconAttention">error_outline</span>
            <p>Please insert your e-mail</p>
            <button type="button" class="tech-btn" onclick="closeModalErrorEmptyLogin()">OK</button>
        `
    } else if (passLogin.value == "") {
        openModalErrorEmptyLogin();
        modalErrorEmptyLogin.innerHTML = `
            <span id="iconAttention">error_outline</span>
            <p>Please insert your password</p> 
            <button type="button" class="tech-btn" onclick="closeModalErrorEmptyLogin()">OK</button>
        `
    }

}