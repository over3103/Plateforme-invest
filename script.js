// ================================
// INVEST AFRICA - SCRIPT PRINCIPAL
// ================================

let user = JSON.parse(localStorage.getItem("investAfricaUser"));

function saveUser() {
    localStorage.setItem("investAfricaUser", JSON.stringify(user));
}

function formatMoney(amount) {
    return Number(amount || 0).toLocaleString("fr-FR") + " FCFA";
}

function logout() {
    localStorage.removeItem("investAfricaLoggedIn");
    window.location.href = "login.html";
}

// Vérification de connexion pour les pages privées
function requireLogin() {
    if (localStorage.getItem("investAfricaLoggedIn") !== "true") {
        window.location.href = "login.html";
    }
}

// Dépôt
function makeDeposit() {
    const amount = Number(document.getElementById("depositAmount").value);
    const method = document.getElementById("depositMethod").value;

    if (!amount || amount <= 0) {
        alert("Veuillez entrer un montant valide.");
        return;
    }

    const transaction = {
        type: "Dépôt",
        amount: amount,
        method: method,
        date: new Date().toLocaleString("fr-FR"),
        status: "En attente"
    };

    let history = JSON.parse(localStorage.getItem("investAfricaHistory")) || [];
    history.push(transaction);
    localStorage.setItem("investAfricaHistory", JSON.stringify(history));

    alert("Votre demande de dépôt a été enregistrée.");
    window.location.href = "dashboard.html";
}

// Retrait
function makeWithdrawal() {
    const amount = Number(document.getElementById("withdrawAmount").value);
    const method = document.getElementById("withdrawMethod").value;

    if (!amount || amount <= 0) {
        alert("Veuillez entrer un montant valide.");
        return;
    }

    const transaction = {
        type: "Retrait",
        amount: amount,
        method: method,
        date: new Date().toLocaleString("fr-FR"),
        status: "En attente"
    };

    let history = JSON.parse(localStorage.getItem("investAfricaHistory")) || [];
    history.push(transaction);
    localStorage.setItem("investAfricaHistory", JSON.stringify(history));

    alert("Votre demande de retrait a été enregistrée.");
    window.location.href = "dashboard.html";
}

// Affichage du tableau de bord
function loadDashboard() {
    requireLogin();

    if (!user) {
        user = {
            name: "Utilisateur",
            phone: "",
            balance: 0,
            investment: 0,
            dailyGain: 0
        };
    }

    const name = document.getElementById("userName");
    const balance = document.getElementById("userBalance");
    const investment = document.getElementById("userInvestment");
    const dailyGain = document.getElementById("dailyGain");

    if (name) name.textContent = user.name;
    if (balance) balance.textContent = formatMoney(user.balance);
    if (investment) investment.textContent = formatMoney(user.investment);
    if (dailyGain) dailyGain.textContent = formatMoney(user.dailyGain);
}

// Historique utilisateur
function loadHistory() {
    requireLogin();

    const tbody = document.getElementById("historyBody");
    if (!tbody) return;

    const history =
        JSON.parse(localStorage.getItem("investAfricaHistory")) || [];

    tbody.innerHTML = "";

    if (history.length === 0) {
        tbody.innerHTML =
            '<tr><td colspan="5">Aucune opération pour le moment.</td></tr>';
        return;
    }

    history.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.type}</td>
                <td>${formatMoney(item.amount)}</td>
                <td>${item.method}</td>
                <td>${item.date}</td>
                <td class="pending">${item.status}</td>
            </tr>
        `;
    });
}

// Initialisation automatique
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("userBalance")) {
        loadDashboard();
    }

    if (document.getElementById("historyBody")) {
        loadHistory();
    }
});
