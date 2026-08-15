// ===============================
// UTILISATEUR
// ===============================

let user = JSON.parse(localStorage.getItem("investUser"));

if (!user) {
    user = {
        name: "Utilisateur",
        phone: "",
        email: "",
        balance: 0,
        earnings: 0,
        investments: [],
        history: []
    };

    localStorage.setItem("investUser", JSON.stringify(user));
}


// ===============================
// INITIALISATION
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    loadUser();

    showSection("packs");

});


// ===============================
// CHARGER UTILISATEUR
// ===============================

function loadUser() {

    document.getElementById("userName").textContent =
        user.name || "Utilisateur";

    document.getElementById("balance").textContent =
        formatMoney(user.balance);

    document.getElementById("earnings").textContent =
        formatMoney(user.earnings);

    document.getElementById("investmentCount").textContent =
        user.investments.length;

    if (document.getElementById("profileName")) {
        document.getElementById("profileName").value =
            user.name || "";

        document.getElementById("profilePhone").value =
            user.phone || "";

        document.getElementById("profileEmail").value =
            user.email || "";
    }

    displayInvestments();
    displayHistory();
}


// ===============================
// FORMATAGE ARGENT
// ===============================

function formatMoney(amount) {

    return Number(amount).toLocaleString("fr-FR");

}


// ===============================
// AFFICHER UNE SECTION
// ===============================

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".dashboard-section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    const selected =
        document.getElementById(sectionId);

    if (selected) {
        selected.classList.remove("hidden");
    }

}


// ===============================
// INVESTISSEMENT
// ===============================

function invest(amount, dailyGain) {

    if (user.balance < amount) {

        alert(
            "Solde insuffisant.\n\n" +
            "Vous devez effectuer un dépôt de " +
            formatMoney(amount) +
            " FCFA avant d'investir."
        );

        showSection("deposit");

        return;
    }

    const confirmation = confirm(
        "Confirmer votre investissement de " +
        formatMoney(amount) +
        " FCFA ?"
    );

    if (!confirmation) {
        return;
    }

    user.balance -= amount;

    const investment = {

        id: Date.now(),

        amount: amount,

        dailyGain: dailyGain,

        date: new Date().toLocaleString("fr-FR"),

        status: "Actif"

    };

    user.investments.push(investment);

    user.history.push({

        type: "Investissement",

        amount: amount,

        date: new Date().toLocaleString("fr-FR")

    });

    saveUser();

    alert("Investissement enregistré avec succès.");

    loadUser();

    showSection("investments");

}


// ===============================
// DEPOT
// ===============================

function makeDeposit() {

    const input =
        document.getElementById("depositAmount");

    const amount = Number(input.value);

    if (!amount || amount <= 0) {

        alert("Veuillez entrer un montant valide.");

        return;
    }

    user.balance += amount;

    user.history.push({

        type: "Dépôt",

        amount: amount,

        date: new Date().toLocaleString("fr-FR")

    });

    saveUser();

    input.value = "";

    alert(
        "Dépôt simulé de " +
        formatMoney(amount) +
        " FCFA."
    );

    loadUser();

}


// ===============================
// RETRAIT
// ===============================

function makeWithdrawal() {

    const input =
        document.getElementById("withdrawAmount");

    const amount = Number(input.value);

    if (!amount || amount <= 0) {

        alert("Veuillez entrer un montant valide.");

        return;
    }

    if (amount > user.balance) {

        alert("Solde insuffisant.");

        return;
    }

    user.balance -= amount;

    user.history.push({

        type: "Retrait",

        amount: amount,

        date: new Date().toLocaleString("fr-FR")

    });

    saveUser();

    input.value = "";

    alert(
        "Demande de retrait simulée : " +
        formatMoney(amount) +
        " FCFA."
    );

    loadUser();

}


// ===============================
// AFFICHER INVESTISSEMENTS
// ===============================

function displayInvestments() {

    const container =
        document.getElementById("investmentList");

    if (!container) return;

    if (user.investments.length === 0) {

        container.innerHTML =
            "<p>Aucun investissement pour le moment.</p>";

        return;
    }

    container.innerHTML = "";

    user.investments.forEach(function(inv) {

        const card =
            document.createElement("div");

        card.className = "investment-card";

        card.innerHTML = `

            <h3>Investissement</h3>

            <p>
                Montant :
                <strong>
                    ${formatMoney(inv.amount)} FCFA
                </strong>
            </p>

            <p>
                Gain journalier :
                <strong>
                    ${formatMoney(inv.dailyGain)} FCFA
                </strong>
            </p>

            <p>Date : ${inv.date}</p>

            <p>
                Statut :
                <strong>${inv.status}</strong>
            </p>

        `;

        container.appendChild(card);

    });

}


// ===============================
// HISTORIQUE
// ===============================

function displayHistory() {

    const container =
        document.getElementById("historyList");

    if (!container) return;

    if (user.history.length === 0) {

        container.innerHTML =
            "<p>Aucune opération enregistrée.</p>";

        return;
    }

    container.innerHTML = "";

    [...user.history]
        .reverse()
        .forEach(function(item) {

            const row =
                document.createElement("div");

            row.className = "history-item";

            row.innerHTML = `

                <strong>${item.type}</strong>

                <span>
                    ${formatMoney(item.amount)}
                    FCFA
                </span>

                <small>${item.date}</small>

            `;

            container.appendChild(row);

        });

}


// ===============================
// PROFIL
// ===============================

function saveProfile() {

    user.name =
        document.getElementById("profileName").value.trim();

    user.phone =
        document.getElementById("profilePhone").value.trim();

    user.email =
        document.getElementById("profileEmail").value.trim();

    if (!user.name) {

        alert("Veuillez entrer votre nom.");

        return;
    }

    saveUser();

    document.getElementById("profileMessage").textContent =
        "Profil enregistré avec succès.";

    loadUser();

}


// ===============================
// SAUVEGARDE
// ===============================

function saveUser() {

    localStorage.setItem(
        "investUser",
        JSON.stringify(user)
    );

}


// ===============================
// DECONNEXION
// ===============================

function logout() {

    window.location.href = "login.html";

}
