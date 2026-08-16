/* =====================================================
   HOUSING INVESTMENT
   SCRIPT PRINCIPAL
===================================================== */

const USERS_KEY = "housing_investment_users";
const SESSION_KEY = "housing_investment_session";


/* =====================================================
   PACKS
===================================================== */

const PACKS = [
    {
        level: 1,
        amount: 3000,
        house: "Maison économique"
    },
    {
        level: 2,
        amount: 10000,
        house: "Petite maison moderne"
    },
    {
        level: 3,
        amount: 20000,
        house: "Maison familiale"
    },
    {
        level: 4,
        amount: 45000,
        house: "Maison moderne"
    },
    {
        level: 5,
        amount: 100000,
        house: "Villa confortable"
    },
    {
        level: 6,
        amount: 200000,
        house: "Villa moderne"
    },
    {
        level: 7,
        amount: 400000,
        house: "Grande villa"
    },
    {
        level: 8,
        amount: 800000,
        house: "Villa haut standing"
    }
];


/* =====================================================
   UTILISATEURS
===================================================== */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(USERS_KEY) || "[]"
        );

    } catch (error) {

        return [];

    }

}


function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


/* =====================================================
   SESSION
===================================================== */

function getSession() {

    try {

        return JSON.parse(
            localStorage.getItem(SESSION_KEY) || "null"
        );

    } catch (error) {

        return null;

    }

}


function saveSession(session) {

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
    );

}


function clearSession() {

    localStorage.removeItem(SESSION_KEY);

}


/* =====================================================
   MESSAGES
===================================================== */

function showMessage(message, type = "error") {

    const box =
        document.getElementById("message");

    if (!box) return;

    box.textContent = message;

    box.className =
        "message " + type;

}


/* =====================================================
   INSCRIPTION
===================================================== */

function registerUser(event) {

    event.preventDefault();

    const nameElement =
        document.getElementById("name");

    const phoneElement =
        document.getElementById("phone");

    const passwordElement =
        document.getElementById("password");

    const confirmElement =
        document.getElementById("confirmPassword");


    if (
        !nameElement ||
        !phoneElement ||
        !passwordElement ||
        !confirmElement
    ) {

        showMessage(
            "Erreur : formulaire incomplet."
        );

        return;

    }


    const name =
        nameElement.value.trim();

    const phone =
        phoneElement.value.trim();

    const password =
        passwordElement.value;

    const confirmPassword =
        confirmElement.value;


    if (
        !name ||
        !phone ||
        !password ||
        !confirmPassword
    ) {

        showMessage(
            "Veuillez remplir tous les champs."
        );

        return;

    }


    if (password.length < 6) {

        showMessage(
            "Le mot de passe doit contenir au moins 6 caractères."
        );

        return;

    }


    if (password !== confirmPassword) {

        showMessage(
            "Les deux mots de passe ne correspondent pas."
        );

        return;

    }


    const users = getUsers();


    const existingUser =
        users.find(
            user =>
                String(user.phone).toLowerCase() ===
                phone.toLowerCase()
        );


    if (existingUser) {

        showMessage(
            "Cet identifiant existe déjà. Connectez-vous."
        );

        return;

    }


    const user = {

        id:
            Date.now().toString() +
            Math.random()
                .toString(36)
                .substring(2),

        name: name,

        phone: phone,

        password: password,

        createdAt:
            new Date().toLocaleString("fr-FR"),

        balance: 0,

        invested: 0,

        earnings: 0,

        selectedPack: null,

        history: []

    };


    users.push(user);

    saveUsers(users);


    saveSession({

        type: "user",

        userId: user.id

    });


    showMessage(
        "Inscription réussie. Ouverture de votre espace...",
        "success"
    );


    setTimeout(function () {

        window.location.href =
            "dashboard.html";

    }, 700);

}


/* =====================================================
   CONNEXION
===================================================== */

function loginUser(event) {

    event.preventDefault();


    const phoneElement =
        document.getElementById("phone");

    const passwordElement =
        document.getElementById("password");


    if (
        !phoneElement ||
        !passwordElement
    ) {

        showMessage(
            "Erreur : formulaire incomplet."
        );

        return;

    }


    const phone =
        phoneElement.value.trim();

    const password =
        passwordElement.value;


    if (!phone || !password) {

        showMessage(
            "Veuillez remplir tous les champs."
        );

        return;

    }


    /* ADMIN */

    if (
        phone === "admin" &&
        password === "admin123"
    ) {

        saveSession({
            type: "admin"
        });

        window.location.href =
            "admin.html";

        return;

    }


    /* UTILISATEUR */

    const users = getUsers();


    const user =
        users.find(
            item =>
                String(item.phone).toLowerCase() ===
                phone.toLowerCase()
        );


    if (!user) {

        showMessage(
            "Aucun compte ne correspond à cet identifiant."
        );

        return;

    }


    if (user.password !== password) {

        showMessage(
            "Mot de passe incorrect."
        );

        return;

    }


    saveSession({

        type: "user",

        userId: user.id

    });


    window.location.href =
        "dashboard.html";

}


/* =====================================================
   UTILISATEUR CONNECTÉ
===================================================== */

function getCurrentUser() {

    const session =
        getSession();


    if (
        !session ||
        session.type !== "user"
    ) {

        return null;

    }


    const users =
        getUsers();


    return (
        users.find(
            user =>
                user.id === session.userId
        ) || null
    );

}


/* =====================================================
   PROTECTION UTILISATEUR
===================================================== */

function requireUser() {

    const session =
        getSession();


    if (
        !session ||
        session.type !== "user"
    ) {

        window.location.href =
            "login.html";

        return false;

    }


    if (!getCurrentUser()) {

        clearSession();

        window.location.href =
            "login.html";

        return false;

    }


    return true;

}


/* =====================================================
   PROTECTION ADMIN
===================================================== */

function requireAdmin() {

    const session =
        getSession();


    if (
        !session ||
        session.type !== "admin"
    ) {

        window.location.href =
            "login.html";

        return false;

    }


    return true;

}


/* =====================================================
   DÉCONNEXION
===================================================== */

function logout() {

    clearSession();

    window.location.href =
        "index.html";

}


/* =====================================================
   TABLEAU DE BORD UTILISATEUR
===================================================== */

function loadDashboard() {

    const user =
        getCurrentUser();


    if (!user) {

        logout();

        return;

    }


    const name =
        document.getElementById("userName");

    const phone =
        document.getElementById("userPhone");

    const createdAt =
        document.getElementById("createdAt");

    const balance =
        document.getElementById("balance");

    const invested =
        document.getElementById("invested");

    const earnings =
        document.getElementById("earnings");


    if (name)
        name.textContent = user.name;


    if (phone)
        phone.textContent = user.phone;


    if (createdAt)
        createdAt.textContent = user.createdAt;


    if (balance)
        balance.textContent =
            formatMoney(user.balance);


    if (invested)
        invested.textContent =
            formatMoney(user.invested);


    if (earnings)
        earnings.textContent =
            formatMoney(user.earnings);


    loadHistory(user);

}


/* =====================================================
   SÉLECTION D'UN PACK
===================================================== */

function selectPack(amount) {

    const pack =
        PACKS.find(
            item =>
                item.amount === Number(amount)
        );


    if (!pack) {

        alert(
            "Ce pack n'existe pas."
        );

        return;

    }


    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    /*
       Pour le moment, la sélection
       n'effectue aucun paiement réel.
    */

    user.selectedPack = {

        level: pack.level,

        amount: pack.amount,

        house: pack.house

    };


    const users =
        getUsers();


    const index =
        users.findIndex(
            item =>
                item.id === user.id
        );


    if (index !== -1) {

        users[index] = user;

        saveUsers(users);

    }


    alert(
        "Pack sélectionné : " +
        formatMoney(pack.amount) +
        " — " +
        pack.house
    );


    loadDashboard();

}


/* =====================================================
   HISTORIQUE
===================================================== */

function loadHistory(user) {

    const historyElement =
        document.getElementById("history");


    if (!historyElement) return;


    const history =
        user.history || [];


    if (history.length === 0) {

        historyElement.innerHTML =
            '<p class="muted">Aucune opération enregistrée.</p>';

        return;

    }


    historyElement.innerHTML =
        history
            .slice()
            .reverse()
            .map(
                item => `
                    <div class="history-item">

                        <strong>
                            ${escapeHtml(item.type)}
                        </strong>

                        <span>
                            ${formatMoney(item.amount)}
                        </span>

                        <small>
                            ${escapeHtml(item.date)}
                        </small>

                    </div>
                `
            )
            .join("");

}


/* =====================================================
   ADMINISTRATION
===================================================== */

function loadAdminDashboard() {

    const users =
        getUsers();


    const totalUsers =
        document.getElementById("totalUsers");

    const totalInvested =
        document.getElementById("totalInvested");

    const totalBalance =
        document.getElementById("totalBalance");


    let investedTotal = 0;

    let balanceTotal = 0;


    users.forEach(user => {

        investedTotal +=
            Number(user.invested || 0);

        balanceTotal +=
            Number(user.balance || 0);

    });


    if (totalUsers) {

        totalUsers.textContent =
            users.length;

    }


    if (totalInvested) {

        totalInvested.textContent =
            formatMoney(investedTotal);

    }


    if (totalBalance) {

        totalBalance.textContent =
            formatMoney(balanceTotal);

    }


    const table =
        document.getElementById("usersTable");


    if (!table) return;


    if (users.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    Aucun utilisateur inscrit.
                </td>
            </tr>
        `;

        return;

    }


    table.innerHTML =
        users
            .map(
                user => `
                    <tr>

                        <td>
                            ${escapeHtml(user.name)}
                        </td>

                        <td>
                            ${escapeHtml(user.phone)}
                        </td>

                        <td>
                            ${escapeHtml(user.createdAt)}
                        </td>

                        <td>
                            ${formatMoney(user.balance)}
                        </td>

                        <td>
                            ${formatMoney(user.invested)}
                        </td>

                    </tr>
                `
            )
            .join("");

}


/* =====================================================
   FORMATAGE FCFA
===================================================== */

function formatMoney(amount) {

    return (
        Number(amount || 0)
            .toLocaleString("fr-FR")
        + " FCFA"
    );

}


/* =====================================================
   PROTECTION HTML
===================================================== */

function escapeHtml(value) {

    return String(value)
        .replace(
            /[&<>"']/g,
            function(character) {

                const entities = {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"

                };

                return entities[character];

            }
        );

}
