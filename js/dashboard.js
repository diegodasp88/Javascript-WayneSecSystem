async function dashLoadUsers() {
    const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/users";
    const response = await fetch(url);
    const userData = await response.json();

    const dashboardCard = document.querySelector(".dashboardCard");
    dashboardCard.innerHTML = "";

    userData.forEach(user => {
        const cardStructure = `
            
        `
        dashboardCard.innerHTML += cardStructure;
    });
}
dashLoadUsers();