/* =====================================================
   VOTRE PLATEFORME
   SCRIPT PRINCIPAL
   ===================================================== */


/* =====================================================
   OUTILS
   ===================================================== */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem("users")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}


function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem("currentUser")
        );

    } catch (error) {

        return null;

    }

}


function saveCurrentUser(user) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

}


function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}


/* =====================================================
   INSCRIPTION
   ===================================================== */

function registerUser(event) {

    if (event) {
        event.preventDefault();
    }

    const name =
        document.getElementById("registerName")?.value.trim();

    const phone =
        document.getElementById("registerPhone")?.value.trim();

    const password =
        document.getElementById("registerPassword")?.value;

    const confirmPassword =
        document.getElementById("confirmPassword")?.value;


    if (!name || !phone || !password) {

        alert(
            "Veuillez remplir tous les champs."
        );

        return false;

    }


    if (password.length < 6) {

        alert(
            "Le mot de passe doit contenir au moins 6 caractères."
        );

        return false;

    }


    if (password !== confirmPassword) {

        alert(
            "Les deux mots de passe ne correspondent pas."
        );

        return false;

    }


    const users = getUsers();


    const existingUser =
        users.find(
            user => user.phone === phone
        );


    if (existingUser) {

        alert(
            "Ce numéro est déjà utilisé."
        );

        return false;

    }


    const newUser = {

        id:
            "USER-" +
            Date.now(),

        name:
            name,

        phone:
            phone,

        password:
            password,

        balance:
            0,

        invested:
            0,

        earnings:
            0,

        createdAt:
            new Date().toLocaleString("fr-FR")

    };


    users.push(newUser);

    saveUsers(users);

    saveCurrentUser(newUser);


    alert(
        "Compte créé avec succès."
    );


    window.location.href =
        "dashboard.html";


    return false;

}


/* =====================================================
   CONNEXION
   ===================================================== */

function loginUser(event) {

    if (event) {
        event.preventDefault();
    }


    const phone =
        document.getElementById("loginPhone")?.value.trim();

    const password =
        document.getElementById("loginPassword")?.value;


    if (!phone || !password) {

        alert(
            "Veuillez entrer votre numéro et votre mot de passe."
        );

        return false;

    }


    /* ADMIN */

    if (
        phone === "admin" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "adminLogged",
            "true"
        );

        window.location.href =
            "admin.html";

        return false;

    }


    /* UTILISATEUR */

    const users = getUsers();


    const user =
        users.find(
            item =>
                item.phone === phone &&
                item.password === password
        );


    if (!user) {

        alert(
            "Numéro ou mot de passe incorrect."
        );

        return false;

    }


    saveCurrentUser(user);


    window.location.href =
        "dashboard.html";


    return false;

}


/* =====================================================
   PROTECTION DU DASHBOARD
   ===================================================== */

function protectDashboard() {

    const page =
        window.location.pathname;


    if (
        page.includes("dashboard.html")
    ) {

        const user =
            getCurrentUser();


        if (!user) {

            window.location.href =
                "login.html";

            return;

        }

    }

}


/* =====================================================
   PROTECTION ADMIN
   ===================================================== */

function protectAdmin() {

    const page =
        window.location.pathname;


    if (
        page.includes("admin.html")
    ) {

        const adminLogged =
            localStorage.getItem(
                "adminLogged"
            );


        if (adminLogged !== "true") {

            window.location.href =
                "login.html";

        }

    }

}


/* =====================================================
   AFFICHAGE DU NOM UTILISATEUR
   ===================================================== */

function displayUserInformation() {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const nameElements =
        document.querySelectorAll(
            "[data-user-name]"
        );


    nameElements.forEach(
        element => {

            element.textContent =
                user.name;

        }
    );


    const phoneElements =
        document.querySelectorAll(
            "[data-user-phone]"
        );


    phoneElements.forEach(
        element => {

            element.textContent =
                user.phone;

        }
    );

}


/* =====================================================
   AFFICHAGE DU SOLDE
   ===================================================== */

function displayBalance() {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const balanceElements =
        document.querySelectorAll(
            "[data-balance]"
        );


    balanceElements.forEach(
        element => {

            element.textContent =
                formatMoney(
                    user.balance
                );

        }
    );


    const investedElements =
        document.querySelectorAll(
            "[data-invested]"
        );


    investedElements.forEach(
        element => {

            element.textContent =
                formatMoney(
                    user.invested
                );

        }
    );


    const earningElements =
        document.querySelectorAll(
            "[data-earnings]"
        );


    earningElements.forEach(
        element => {

            element.textContent =
                formatMoney(
                    user.earnings
                );

        }
    );

}


/* =====================================================
   FORMAT MONÉTAIRE
   ===================================================== */

function formatMoney(amount) {

    const number =
        Number(amount) || 0;


    return number.toLocaleString(
        "fr-FR"
    ) + " FCFA";

}


/* =====================================================
   DÉPÔT TEMPORAIRE
   ===================================================== */

function makeDeposit(amount) {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    amount =
        Number(amount);


    if (
        !amount ||
        amount <= 0
    ) {

        alert(
            "Montant invalide."
        );

        return;

    }


    /*
       IMPORTANT :

       Cette fonction est uniquement
       une préparation locale.

       Elle ne confirme pas un paiement
       réel et ne crédite pas réellement
       de l'argent.
    */


    alert(
        "Demande de dépôt de " +
        formatMoney(amount) +
        " enregistrée pour traitement."
    );

}


/* =====================================================
   RETRAIT TEMPORAIRE
   ===================================================== */

function makeWithdrawal(amount) {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    amount =
        Number(amount);


    if (
        !amount ||
        amount <= 0
    ) {

        alert(
            "Montant invalide."
        );

        return;

    }


    if (
        amount > Number(user.balance)
    ) {

        alert(
            "Solde insuffisant."
        );

        return;

    }


    alert(
        "Votre demande de retrait a été préparée."
    );

}


/* =====================================================
   INVESTISSEMENT
   ===================================================== */

function selectPack(amount) {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    amount =
        Number(amount);


    if (
        !amount ||
        amount <= 0
    ) {

        alert(
            "Montant incorrect."
        );

        return;

    }


    if (
        amount > Number(user.balance)
    ) {

        alert(
            "Votre solde disponible est insuffisant."
        );

        return;

    }


    alert(
        "Vous avez sélectionné le pack de " +
        formatMoney(amount) +
        "."
    );

}


/* =====================================================
   DÉCONNEXION ADMIN
   ===================================================== */

function logoutAdmin() {

    localStorage.removeItem(
        "adminLogged"
    );

    window.location.href =
        "login.html";

}


/* =====================================================
   INITIALISATION
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        protectDashboard();

        protectAdmin();

        displayUserInformation();

        displayBalance();

    }
);
