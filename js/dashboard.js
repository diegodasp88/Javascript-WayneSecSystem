async function dashLoadUsers() {
    const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/users";
    const response = await fetch(url);
    const userData = await response.json();

    const userArray = userData.map(user => ({
        name: user.name,
        role: user.role
    }));

    return userArray; 
}


async function totalUsers() {
    const users = await dashLoadUsers();
    document.querySelector("#totalUsers").textContent = users.length;
}


// User Chart var
let userChart;

async function generateRoleChart() {
    const users = await dashLoadUsers();

    const roleCount = {};
    users.forEach(user => {
        roleCount[user.role] = (roleCount[user.role] || 0) + 1;
    });

    const labels = Object.keys(roleCount);
    const data = Object.values(roleCount);

    const ctx = document.getElementById('userChart').getContext('2d');

    if (userChart) {
        userChart.data.labels = labels;
        userChart.data.datasets[0].data = data;
        userChart.update();
    } else {
        userChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: ['#bc89268d', '#bc89265d', '#bc89262d'],
                    borderColor: '#bc89269d',
                    borderWidth: 1,
                    hoverOffset: 10
                }]
            },
            options: {
                plugins: {
                    legend: { 
                        position: 'bottom',
                        align: 'start',
                        labels: {
                            boxWidth: 80,
                            padding: 15,
                            color: '#bc8926',
                            font: {
                                size: 14,
                                family: "'Bruno Ace SC', sans-serif"
                            }
                        }
                    },
                    tooltip: { 
                        backgroundColor: '#bc89268d',
                        borderWidth: 1,
                        borderColor: '#bc8926',
                        titleColor: '#f1bf5c',
                        bodyColor: '#f1bf5c',
                        titleFont: {
                            family: "'Bruno Ace SC', sans-serif",
                            size: 16,
                            weight: 'bold'
                        },
                        bodyFont: {
                            family: "'Bruno Ace SC', sans-serif",
                            size: 14
                        }
                    }
                }
            }
        });
    }
}



// Inventary dashboard

async function dashLoadItems() {
    const url = "https://68d4a5c4214be68f8c69e247.mockapi.io/inventary";
    const response = await fetch(url);
    const itemData = await response.json();

    const itemsArray = itemData.map(item => ({
        name: item.name,
        category: item.category,
        sec_level: item.sec_level,
        description: item.description,
        status: item.status,
        img: item.img
    }));

    const itemCard = document.querySelector("#inventaryCards");
    itemCard.innerHTML = "";

    itemsArray.forEach(item => {
        const tinyCardStructure = `
            <div class="tinyCards">
                <img src="${item.img}" alt="">
                <p>${item.name}</p>
                <span>${item.status}</span>
            </div>
        `
        itemCard.innerHTML += tinyCardStructure;
    });

    return itemsArray; 
}


async function totalItems() {
    const items = await dashLoadItems();
    document.querySelector("#totalItems").textContent = items.length;
}
totalItems();


// Inventary Chart var
let inventaryChart;

async function generateCategChart() {
    const items = await dashLoadItems();

    const categoryCount = {};
    items.forEach(item => {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });

    const labels = Object.keys(categoryCount);
    const data = Object.values(categoryCount);

    const ctx = document.getElementById('inventaryChart').getContext('2d');

    if (inventaryChart) {
        inventaryChart.data.labels = labels;
        inventaryChart.data.datasets[0].data = data;
        inventaryChart.update();
    } else {
        inventaryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: ['#bc89268d', '#bc89265d', '#bc89262d'],
                    borderColor: '#bc89269d',
                    borderWidth: 1,
                    hoverOffset: 10
                }]
            },
            options: {
                plugins: {
                    legend: { 
                        position: 'bottom',
                        align: 'start',
                        labels: {
                            boxWidth: 10,
                            padding: 15,
                            color: '#bc8926',
                            font: {
                                size: 10,
                                family: "'Bruno Ace SC', sans-serif"
                            }
                        }
                    },
                    tooltip: { 
                        backgroundColor: '#bc89268d',
                        borderWidth: 1,
                        borderColor: '#bc8926',
                        titleColor: '#f1bf5c',
                        bodyColor: '#f1bf5c',
                        titleFont: {
                            family: "'Bruno Ace SC', sans-serif",
                            size: 16,
                            weight: 'bold'
                        },
                        bodyFont: {
                            family: "'Bruno Ace SC', sans-serif",
                            size: 14
                        }
                    }
                }
            }
        });
    }
}



function callAllDashFunctions() {
    dashLoadUsers();
    totalUsers();
    generateRoleChart();
    dashLoadItems();
    totalItems();
    generateCategChart();
}

callAllDashFunctions();