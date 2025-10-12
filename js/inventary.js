function clearItemsFormFields() {
    itemName.value = "";
    itemCat.value = "";
    itemDesc.value = "";
    itemSecLvl.value = "";
    itemStatus.value = "";
}

// Show error messages
function inventaryErrorMessage (msg) {
    openModal("#inventaryMsgModal", ".inventaryModal");
    document.querySelector(".iconAttention").textContent = "error_outline";
    document.querySelector("#inventaryMsg").textContent = msg;
}

// Show success messages
function inventarySuccessMessage (msg) {
    openModal("#inventaryMsgModal", ".inventaryModal");
    document.querySelector(".iconAttention").textContent = "check";
    document.querySelector("#inventaryMsg").textContent = msg;
    document.querySelector("#okItemBtn").onclick = () => {openModal('#inventaryModalContent', '.inventaryModal');};
}

async function loadInventary() {
    const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/inventary";
    const response = await fetch(url);
    const inventaryData = await response.json();

    const itemCardsContainer = document.querySelector("#itemCardsContainer");
    itemCardsContainer.innerHTML = "";

    inventaryData.forEach(item => {
        const cardStructure = `
            <div class="itemCards">
                <div class="cardContainer1">
                    <img src="${item.img}" alt="item">
                    <div class="cardContainer2">
                        <div class="titleCard">${item.name}</div>
                        <label for="catCard">Catergory</label>
                        <div class="catCard textCard">${item.category}</div>
                        <label for="secLvlCard">Security Level</label>
                        <div class="secLvlCard textCard">${item.sec_level}</div>
                    </div>
                </div>                                        
                <div class="descCard">${item.description}</div>
                <div class="cardContainer3">
                    <label>Status</label>
                    <div class="statusCard textCard">${item.status}</div>
                </div>
                <div class="btnCard">
                    <button 
                        class="tech-btn"
                        style="padding: 1px 10px; font-size: 10px;"
                        onclick="updateItemModal(${item.id})">
                        <span class="icon" style="font-size: 12px;">update</span>
                        Update
                    </button>
                    <button 
                        class="tech-btn"
                        style="padding: 1px 10px; font-size: 10px;"
                        onclick="removeItem(${item.id})">
                        <span class="icon" style="font-size: 12px;">remove</span>
                        Remove
                    </button>
                </div>
            </div>
        `
        itemCardsContainer.innerHTML += cardStructure;
    });
}
loadInventary();



function createItemModal() {
    openModal('#createItemModal', '.inventaryModal');

    document.querySelector("#createItemTitle").innerHTML = `
        <span class="icon">add_box</span>Add New Item
    `
    const addItemBtn = document.querySelector("#addItemBtn");
    addItemBtn.innerHTML = `
        <span class="icon">add_circle</span>
        Create`;
    addItemBtn.onclick = createNewItem;
    clearItemsFormFields();
}



async function createNewItem() {
    const itemName = document.querySelector("#itemName");
    const itemCat = document.querySelector("#itemCat");
    const itemDesc = document.querySelector("#itemDesc");
    const itemSecLvl = document.querySelector("#itemSecLvl");
    const itemStatus = document.querySelector("#itemStatus");

    // No empty fields validation
    if ( itemName.value.trim() == "" || 
         itemCat.value.trim() == "" || 
         itemDesc.value.trim() == "" || 
         itemSecLvl.value.trim() == "" ||
         itemStatus.value.trim() == ""
        ) {
        inventaryErrorMessage("Please fill in all the fields!")
        document.querySelector("#okItemBtn").onclick = () => {openModal('#createItemModal', '.inventaryModal');};
        return; // stop
    } 

    const item = {
        name: itemName.value,
        category: itemCat.value,
        description: itemDesc.value,
        sec_level: itemSecLvl.value,
        status: itemStatus.value,
        img: "./assets/img/newitem.PNG"
    };

    const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/inventary";
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

    // Fetch validation
    if (response.ok) {
        inventarySuccessMessage("Item successfully created!")
        clearItemsFormFields();
        loadInventary();
    } else {
        inventaryErrorMessage(`Error while creating new user: ${response.status}`)
        document.querySelector("#okItemBtn").onclick = () => {openModal('#inventaryModalContent', '.inventaryModal');};
    }
}



async function removeItem(id) {
    const url = `https://68d4a5c4214be68f8c69e247.mockapi.io/inventary/${id}`;
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
        inventarySuccessMessage("Item successfully removed!")
        loadInventary();
    } else {
        inventaryErrorMessage(`Error while removing item. (${response.status})`)
        document.querySelector("#okItemBtn").onclick = () => {openModal('#inventaryModalContent', '.inventaryModal');};          
    }
}


// Function to open Update Item Modal and fill all the fields with its data
async function updateItemModal(id) {
    openModal('#createItemModal', '.inventaryModal');

    // Switching the modal title to Update Item
    document.querySelector("#createItemTitle").innerHTML = `
        <span class="icon">update</span>Update Item
    `
    // Switching button to Update and its onclick function
    const addItemBtn = document.querySelector("#addItemBtn")
    addItemBtn.innerHTML = `
        <span class="icon">update</span>
        Update`;
    addItemBtn.onclick = () => { updateItem(id) }

    // Filling in all the fields with selected item data
    const itemName = document.querySelector("#itemName");
    const itemCat = document.querySelector("#itemCat");
    const itemDesc = document.querySelector("#itemDesc");
    const itemSecLvl = document.querySelector("#itemSecLvl");
    const itemStatus = document.querySelector("#itemStatus");
    
    const url = `https://68d4a5c4214be68f8c69e247.mockapi.io/inventary/${id}`;
    const response = await fetch(url);

    // Fetch from API validation
    if(!response.ok) {
        inventaryErrorMessage(`Failed to fetch items from API: ${response.status}`)
        document.querySelector("#okItemBtn").onclick = () => {openModal('#inventaryModalContent', '.inventaryModal');};
        return; // stop
    }

    const item = await response.json();

    itemName.value = item.name;
    itemCat.value = item.category;
    itemDesc.value = item.description;
    itemSecLvl.value = item.sec_level;
    itemStatus.value = item.status;
}



async function updateItem(id) {
    const itemName = document.querySelector("#itemName");
    const itemCat = document.querySelector("#itemCat");
    const itemDesc = document.querySelector("#itemDesc");
    const itemSecLvl = document.querySelector("#itemSecLvl");
    const itemStatus = document.querySelector("#itemStatus");

    // No empty fields validation
    if ( itemName.value.trim() == "" || 
         itemCat.value.trim() == "" || 
         itemDesc.value.trim() == "" || 
         itemSecLvl.value.trim() == "" ||
         itemStatus.value.trim() == ""
        ) {
        inventaryErrorMessage("Please fill in all the fields!")
        document.querySelector("#okItemBtn").onclick = () => {openModal('#createItemModal', '.inventaryModal');};
        return; // stop
    } 

    const item = {
        name: itemName.value,
        category: itemCat.value,
        description: itemDesc.value,
        sec_level: itemSecLvl.value,
        status: itemStatus.value,
        img: "./assets/img/newitem.PNG"
    };

    const url = `https://68d4a5c4214be68f8c69e247.mockapi.io/inventary/${id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

    // Fetch validation
    if (response.ok) {
        inventarySuccessMessage("Item successfully updated!")
        clearItemsFormFields();
        loadInventary();
    } else {
        inventaryErrorMessage(`Error while updating item: ${response.status}`)
        document.querySelector("#okItemBtn").onclick = () => {openModal('#inventaryModalContent', '.inventaryModal');};
    }
}