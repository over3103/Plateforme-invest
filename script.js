/* =====================================================
   VOTRE PLATEFORME
   SCRIPT PRINCIPAL
   ===================================================== */


/* =====================================================
   STOCKAGE
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


/* =====================================================
   NUMERO DE TELEPHONE
   Toujours enregistré sous +225XXXXXXXXXX
   ===================================================== */

function normalizePhone(phone) {

    let value = String(phone || "")
        .trim()
        .replace(/\s+/g, "");

    /* enlever le +225 s'il existe */

    if (value.startsWith("+225")) {

        value = value.substring(4);

    }

    /* enlever 225 s'il a été écrit sans + */

    if (
        value.startsWith("225") &&
        value.length === 13
    ) {

        value = value.substring(3);

    }

    /* conserver uniquement les chiffres */

    value = value.replace(/\D/g, "");

    /* garder les 10 chiffres ivoiriens */

    if (value.length > 10) {

        value = value.substring(
            value.length - 10
        );

    }

    return "+225" + value;

}


/* =====================================================
   DECONNEXION
   ===================================================== */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "login.html";

}


/* =====================================================
   INSCRIPTION
   ===================================================== */

function registerUser(event) {

    if (event) {

        event.preventDefault();

    }


    const nameElement =
        document.getElementById(
            "registerName"
        );

    const phoneElement =
        document.getElementById(
            "registerPhone"
        );

    const passwordElement =
        document.getElementById(
            "registerPassword"
        );

    const confirmElement =
        document.getElementById(
            "confirmPassword"
        );

    const invitationElement =
        document.getElementById(
            "invitationCode"
        );


    const name =
        nameElement
            ? nameElement.value.trim()
            : "";


    const rawPhone =
        phoneElement
            ? phoneElement.value.trim()
            : "";


    const password =
        passwordElement
            ? passwordElement.value
            : "";


    const confirmPassword =
        confirmElement
            ? confirmElement.value
            : "";


    const invitationCode =
        invitationElement
            ? invitationElement.value.trim()
            : "";


    /* =========================
       VERIFICATIONS
       ========================= */

    if (!name) {

        alert(
            "Veuillez entrer votre nom complet."
        );

        return false;

    }


    const phone =
        normalizePhone(rawPhone);


    /* Vérification du numéro ivoirien */

    if (
        !/^\+225\d{10}$/.test(phone)
    ) {

        alert(
            "Veuillez entrer un numéro ivoirien valide de 10 chiffres."
        );

        return false;

    }


    if (password.length < 6) {

        alert(
            "Le mot de passe doit contenir au moins 6 caractères."
        );

        return false;

    }


    if (
        password !== confirmPassword
    ) {

        alert(
            "Les deux mots de passe ne correspondent pas."
        );

        return false;

    }


    const users =
        getUsers();


    /* =========================
       UTILISATEUR EXISTANT
       ========================= */

    const existingUser =
        users.find(
            user =>
                normalizePhone(user.phone) ===
                phone
        );


    if (existingUser) {

        alert(
            "Ce numéro possède déjà un compte."
        );

        return false;

    }


    /* =========================
       CREATION
       ========================= */

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

        invitationCode:
            invitationCode,

        balance:
            0,

        invested:
            0,

        earnings:
            0,

        createdAt:
            new Date().toISOString()

    };


    users.push(
        newUser
    );


    saveUsers(
        users
    );


    saveCurrentUser(
        newUser
    );


    /* =========================
       CONFIRMATION
       ========================= */

    alert(
        "Compte créé avec succès !"
    );


    /* =========================
       REDIRECTION
       ========================= */

    window.location.replace(
        "dashboard.html"
    );


    return false;

}


/* =====================================================
   CONNEXION
   ===================================================== */

function loginUser(event) {

    if (event) {

        event.preventDefault();

    }


    const phoneElement =
        document.getElementById(
            "loginPhone"
        );

    const passwordElement =
        document.getElementById(
            "loginPassword"
        );


    const rawPhone =
        phoneElement
            ? phoneElement.value.trim()
            : "";


    const password =
        passwordElement
            ? passwordElement.value
            : "";


    if (!rawPhone || !password) {

        alert(
            "Veuillez remplir tous les champs."
        );

        return false;

    }


    const phone =
        normalizePhone(rawPhone);


    /* =========================
       ADMINISTRATION
       ========================= */

    if (
        rawPhone === "admin" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "adminLogged",
            "true"
        );

        window.location.replace(
            "admin.html"
        );

        return false;

    }


    /* =========================
       RECHERCHE UTILISATEUR
       ========================= */

    const users =
        getUsers();


    const user =
        users.find(
            item =>
                normalizePhone(item.phone) ===
                phone &&
                item.password ===
                password
        );


    if (!user) {

        alert(
            "Numéro de téléphone ou mot de passe incorrect."
        );

        return false;

    }


    /* =========================
       CONNEXION REUSSIE
       ========================= */

    saveCurrentUser(
        user
    );


    window.location.replace(
        "dashboard.html"
    );


    return false;

}


/* =====================================================
   PROTECTION DASHBOARD
   ===================================================== */

function protectDashboard() {

    const page =
        window.location.pathname;


    if (
        page.includes(
            "dashboard.html"
        )
    ) {

        const user =
            getCurrentUser();


        if (!user) {

            window.location.replace(
                "login.html"
            );

            return false;

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
        page.includes(
            "admin.html"
        )
    ) {

        const adminLogged =
            localStorage.getItem(
                "adminLogged"
            );


        if (
            adminLogged !== "true"
        ) {

            window.location.replace(
                "login.html"
            );

            return false;

        }

    }

}


/* =====================================================
   INFORMATIONS UTILISATEUR
   ===================================================== */

function displayUserInformation() {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    document
        .querySelectorAll(
            "[data-user-name]"
        )
        .forEach(
            element => {

                element.textContent =
                    user.name;

            }
        );


    document
        .querySelectorAll(
            "[data-user-phone]"
        )
        .forEach(
            element => {

                element.textContent =
                    user.phone;

            }
        );

}


/* =====================================================
   SOLDE
   ===================================================== */

function displayBalance() {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    document
        .querySelectorAll(
            "[data-balance]"
        )
        .forEach(
            element => {

                element.textContent =
                    formatMoney(
                        user.balance
                    );

            }
        );


    document
        .querySelectorAll(
            "[data-invested]"
        )
        .forEach(
            element => {

                element.textContent =
                    formatMoney(
                        user.invested
                    );

            }
        );


    document
        .querySelectorAll(
            "[data-earnings]"
        )
        .forEach(
            element => {

                element.textContent =
                    formatMoney(
                        user.earnings
                    );

            }
        );

}


/* =====================================================
   FORMAT FCFA
   ===================================================== */

function formatMoney(amount) {

    return (
        Number(amount || 0)
            .toLocaleString("fr-FR")
        + " FCFA"
    );

}


/* =====================================================
   DEPOT — PROTOTYPE
   ===================================================== */

function makeDeposit(amount) {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.replace(
            "login.html"
        );

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


    alert(
        "Demande de dépôt préparée pour " +
        formatMoney(amount) +
        "."
    );

}


/* =====================================================
   RETRAIT — PROTOTYPE
   ===================================================== */

function makeWithdrawal(amount) {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.replace(
            "login.html"
        );

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
        amount >
        Number(user.balance || 0)
    ) {

        alert(
            "Solde insuffisant."
        );

        return;

    }


    alert(
        "Votre demande de retrait est prête."
    );

}


/* =====================================================
   INVESTISSEMENT — PROTOTYPE
   ===================================================== */

function selectPack(amount) {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.replace(
            "login.html"
        );

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
        amount >
        Number(user.balance || 0)
    ) {

        alert(
            "Solde disponible insuffisant."
        );

        return;

    }


    alert(
        "Pack sélectionné : " +
        formatMoney(amount)
    );

}


/* =====================================================
   ADMIN
   ===================================================== */

function logoutAdmin() {

    localStorage.removeItem(
        "adminLogged"
    );

    window.location.replace(
        "login.html"
    );

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
