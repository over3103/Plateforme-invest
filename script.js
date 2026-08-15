document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email === "" || password === "") {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            localStorage.setItem("userEmail", email);

            alert("Connexion réussie.");

            window.location.href = "dashboard.html";
        });
    }

    const userEmail = localStorage.getItem("userEmail");

    const emailDisplay = document.getElementById("userEmail");

    if (emailDisplay && userEmail) {
        emailDisplay.textContent = userEmail;
    }

});

function logout() {

    localStorage.removeItem("userEmail");

    window.location.href = "login.html";
}

function selectPack(packName, amount) {

    localStorage.setItem("selectedPack", packName);
    localStorage.setItem("selectedAmount", amount);

    alert(
        "Pack sélectionné : " +
        packName +
        "\nMontant : " +
        amount +
        " FCFA"
    );
}
