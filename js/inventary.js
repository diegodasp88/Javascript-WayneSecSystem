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
    document.querySelector("#iconAttention").textContent = "error_outline";
    document.querySelector("#inventaryMsg").textContent = msg;
}

// Show success messages
function inventarySuccessMessage (msg) {
    openModal("#inventaryMsgModal", ".inventaryModal");
    document.querySelector("#iconAttention").textContent = "check";
    document.querySelector("#inventaryMsg").textContent = msg;
    document.querySelector("#okBtn").onclick = () => {openModal('#inventaryModalContent', '.inventaryModal');};
}

async function loadInventary() {
    const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/inventary";
    const response = await fetch(url);
    const inventaryData = await response.json();

    const inventaryTable = document.querySelector("#inventaryTable");
    inventaryTable.innerHTML = "";

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
                <div class="btnCard">
                    <button 
                        class="tech-btn"
                        style="padding: 1px 10px; font-size: 10px;"
                        onclick="//">
                        <span class="icon" style="font-size: 12px;">update</span>
                        Update
                    </button>
                    <button 
                        class="tech-btn"
                        style="padding: 1px 10px; font-size: 10px;"
                        onclick="//">
                        <span class="icon" style="font-size: 12px;">remove</span>
                        Remove
                    </button>
                </div>
            </div>
        `
        inventaryTable.innerHTML += cardStructure;
    });
}
loadInventary();

fetch("https://68d4a5c4214be68f8c69e247.mockapi.io/inventary")
  .then(r => r.json())
  .then(console.log)