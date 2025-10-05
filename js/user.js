window.onclick = function (e) {
    if (e.target == document.querySelector("#createUserModal")) {
        toggleDisplays("#userModalContent", "#createUserModal");
    }
}

// Clear all Create New Users' fields
function clearFormFields() {
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
    userRole.value = "";
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
                <td style="display: flex;">
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
    toggleDisplays('#createUserModal', '#userModalContent');

    // Reset title and button
    document.querySelector("#createUserTitle").innerHTML = `
        <span class="icon">person_add</span>Add New User
    `
    const addBtn = document.querySelector("#addBtn");
    addBtn.innerHTML = `
        <span class="icon">person_add</span>
        Add`;
    addBtn.onclick = createNewUser;

    // Clean the form fields
    clearFormFields();
}

async function createNewUser() {
    const userName = document.querySelector("#userName");
    const userEmail = document.querySelector("#userEmail");
    const userPassword = document.querySelector("#userPassword");
    const userRole = document.querySelector("#userRole");

    // Local validation: no empty fields on user form
    if ( userName.value.trim() == "" || 
         userEmail.value.trim() == "" || 
         userPassword.value.trim() == "" || 
         userRole.value.trim() == "" ) {

        toggleDisplays("#userErrorModal", "#createUserModal");
        const userErrorMsg = document.querySelector("#userErrorMsg");
        userErrorMsg.innerHTML = `Please fill in all the fields!`;
        document.querySelector("#okErrorBtn").onclick = () => {
            toggleDisplays('#createUserModal', '#userErrorModal');
        }     
    } else {
        // Keep on creating a new user
        const user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
            role: userRole.value
        };

        const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/users";
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        clearFormFields();
        toggleDisplays("#userModalContent", "#createUserModal");
        loadUsers(); // load Users after creation
    }
}


async function removeUser(id) {
    const url = `https://68d4a5c4214be68f8c69e247.mockapi.io/users/${id}`;
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
        loadUsers(); // load Users after exclusion
    } else {
        toggleDisplays("#userErrorModal", "#userModalContent");
        const userErrorMsg = document.querySelector("#userErrorMsg");
        userErrorMsg.innerHTML = `An error occurred while removing the user. (${response.status} ${response.statusText})`;
        document.querySelector("#okErrorBtn").onclick = () => {
            toggleDisplays('#userModalContent', '#userErrorModal');
        }            
    }
}


async function updateUserModal(id) {
    toggleDisplays('#createUserModal', '#userModalContent');

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

    // Filling in all the fields with user data
    const userName = document.querySelector("#userName");
    const userEmail = document.querySelector("#userEmail");
    const userRole = document.querySelector("#userRole");
    
    const url = `https://68d4a5c4214be68f8c69e247.mockapi.io/users/${id}`;
    const response = await fetch(url);
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

    // Local validation: no empty fields on user form
    if ( userName.value.trim() == "" || 
         userEmail.value.trim() == "" ||
         userRole.value.trim() == "" ) {

        toggleDisplays("#userErrorModal", "#createUserModal");
        const userErrorMsg = document.querySelector("#userErrorMsg");
        userErrorMsg.innerHTML = `Please fill in all the fields!`;
        document.querySelector("#okErrorBtn").onclick = () => {
            toggleDisplays('#createUserModal', '#userErrorModal');
        }     
    } else {
        const user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
            role: userRole.value
        };

        const url = `https://68d4a5c4214be68f8c69e247.mockapi.io/users/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        clearFormFields();
        toggleDisplays("#userModalContent", "#createUserModal");
        loadUsers(); // load Users after creation
    }
}