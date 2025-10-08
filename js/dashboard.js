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
dashLoadUsers();


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
        // 🔁 Atualiza o gráfico existente
        userChart.data.labels = labels;
        userChart.data.datasets[0].data = data;
        userChart.update();
    } else {
        // 🆕 Cria o gráfico se ainda não existir
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
                responsive: true,
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
generateRoleChart();


async function totalUsers() {
    const users = await dashLoadUsers();
    document.querySelector("#totalUsers").textContent = users.length;
}
totalUsers();