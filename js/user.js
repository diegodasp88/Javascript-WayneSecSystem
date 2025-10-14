// Clear all Create New Users' fields
function clearFormFields() {
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
    userRole.value = "";
}

// Show error messages
function UserErrorMessage (msg) {
    openModal("#userMsgModal", ".userModal");
    document.querySelector(".iconAttention").textContent = "error_outline";
    document.querySelector("#userMsg").textContent = msg;
}

// Show success messages
function UserSuccessMessage (msg) {
    openModal("#userMsgModal", ".userModal");
    document.querySelector(".iconAttention").textContent = "check";
    document.querySelector("#userMsg").textContent = msg;
    document.querySelector("#okBtn").onclick = () => {openModal('#userModalContent', '.userModal');};
}


async function loadUsers() {
    const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/users";
    const response = await fetch(url);
    const userData = await response.json();

    const userTableContent = document.querySelector("#userTableContent");
    userTableContent.innerHTML = "";

    userData.forEach(user => {
        const tableStructure = `
            <tr>
                <td style="text-align: center">${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td style="text-align: center">${user.role}</td>
                <td style="display: flex;" id="btnUser">
                    <button 
                        class="tech-btn" 
                        style="margin-right: 10px; font-size: 12px; padding: 5px 10px"
                        onclick="updateUserModal(${user.id})">
                            <span class="icon">update</span>
                            Update
                    </button>
                    <button 
                        class="tech-btn" 
                        style="margin-right: 10px; font-size: 12px; padding: 5px 10px"
                        onclick="removeUser(${user.id})">
                            <span class="icon">person_remove</span>
                            Remove
                    </button>
                </td>
            </tr>
        `
        userTableContent.innerHTML += tableStructure;
    });
}
loadUsers();


function createUserModal() {
    openModal('#createUserModal', '.userModal');

    // Switch title and button into CREATE
    document.querySelector("#createUserTitle").innerHTML = `
        <span class="icon">person_add</span>Add New User
    `
    const addBtn = document.querySelector("#addBtn");
    addBtn.innerHTML = `
        <span class="icon">person_add</span>
        Add`;
    addBtn.onclick = createNewUser;
    clearFormFields();
}


async function createNewUser() {
    const userName = document.querySelector("#userName");
    const userEmail = document.querySelector("#userEmail");
    const userPassword = document.querySelector("#userPassword");
    const userRole = document.querySelector("#userRole");

    // No empty fields validation
    if ( userName.value.trim() == "" || 
         userEmail.value.trim() == "" || 
         userPassword.value.trim() == "" || 
         userRole.value.trim() == "" 
        ) {
        UserErrorMessage("Please fill in all the fields!")
        document.querySelector("#okBtn").onclick = () => {openModal('#createUserModal', '.userModal');};
        return; // stop
    } 

    // Duplicate emails validation
    const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/users";
    const response = await fetch(url);

    // Fetch from API validation
    if(!response.ok) {
        UserErrorMessage(`Failed to fetch users from API: ${response.status} ${response.statusText}`)
        document.querySelector("#okBtn").onclick = () => {openModal('#userModalContent', '.userModal');};
        return; // stop
    }

    // Continue duplicate e-mails validation
    const checkingUsers = await response.json();
    const checkingEmails = checkingUsers.some(
        (user) => { return user.email.toLowerCase() === userEmail.value.toLowerCase()}
    )
    if (checkingEmails) {
        UserErrorMessage("This e-mail is already registered!")
        document.querySelector("#okBtn").onclick = () => {openModal('#createUserModal', '.userModal');};
        return; // stop
    }

    // Continue with user creation
    const user = {
        name: userName.value,
        email: userEmail.value.toLowerCase(),
        password: userPassword.value,
        role: userRole.value
    };

    const creationResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    // Fetch validation
    if (creationResponse.ok) {
        UserSuccessMessage("User successfully created!")
        clearFormFields();
        loadUsers();
    } else {
        UserErrorMessage(`Error while creating new user: ${creationResponse.status}`)
        document.querySelector("#okBtn").onclick = () => {openModal('#userModalContent', '.userModal');};
    }
}


async function removeUser(id) {
    const url = `https://68d4a5c4214be68f8c69e247.mockapi.io/users/${id}`;
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
        UserSuccessMessage("User successfully removed!");
        loadUsers(); // load Users after exclusion
    } else {
        UserErrorMessage(`Error while removing user: ${response.status}`);
        document.querySelector("#okBtn").onclick = () => {openModal('#userModalContent', '.userModal');};          
    }
}


async function updateUserModal(id) {
    openModal('#createUserModal', '.userModal');

    // Switching the modal title to Update User
    document.querySelector("#createUserTitle").innerHTML = `
        <span class="icon">update</span>Update User
    `
    // Switching button to Update and its onclick function
    const addBtn = document.querySelector("#addBtn")
    addBtn.innerHTML = `
        <span class="icon">update</span>
        Update`;
    addBtn.onclick = () => { updateUser(id) }

    // Filling in all the fields with selected user data
    const userName = document.querySelector("#userName");
    const userEmail = document.querySelector("#userEmail");
    const userRole = document.querySelector("#userRole");
    
    const url = `https://68d4a5c4214be68f8c69e247.mockapi.io/users/${id}`;
    const response = await fetch(url);

    // Fetch from API validation
    if(!response.ok) {
        UserErrorMessage(`Failed to fetch users from API: ${response.status}`)
        document.querySelector("#okBtn").onclick = () => {openModal('#userModalContent', '.userModal');};
        return; // stop
    }

    const user = await response.json();

    userName.value = user.name;
    userEmail.value = user.email;
    userRole.value = user.role;
}



async function updateUser(id) {
    const userName = document.querySelector("#userName");
    const userEmail = document.querySelector("#userEmail");
    const userPassword = document.querySelector("#userPassword");
    const userRole = document.querySelector("#userRole");

    // No empty fields validation
    if ( userName.value.trim() == "" || 
         userEmail.value.trim() == "" ||
         userRole.value.trim() == "" ) {
        UserErrorMessage("Please fill in all the fields!");
        document.querySelector("#okBtn").onclick = () => {openModal('#createUserModal', '.userModal');};
        return;
    }

    const user = {
        name: userName.value,
        email: userEmail.value.toLowerCase(),
        role: userRole.value
    };

     // Empty password field = old password
    if (userPassword.value.trim() !== "") {
        user.password = userPassword.value;
    };

    // Duplicate e-mails validation
    const checkurl = "https://68d4a5c4214be68f8c69e247.mockapi.io/users";
    const checkresponse = await fetch(checkurl);
    const checkingUsers = await checkresponse.json();
    const checkingEmails = checkingUsers.some(
        (user) => { return user.email.toLowerCase() === userEmail.value.toLowerCase()  && user.id != String(id)}
    )
    if (checkingEmails) {
        UserErrorMessage("This e-mail is already registered!")
        document.querySelector("#okBtn").onclick = () => {openModal('#createUserModal', '.userModal');};
        return; // stop
    }

    const url = `https://68d4a5c4214be68f8c69e247.mockapi.io/users/${id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        UserSuccessMessage("User successfully updated!")
        loadUsers(); // load Users
    } else {
        UserErrorMessage(`Error while updating user: ${response.status}`)
        document.querySelector("#okBtn").onclick = () => {openModal('#userModalContent', '.userModal');};         
    }

    clearFormFields();
    loadUsers(); // load Users after creation
}