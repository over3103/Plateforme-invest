// ============================================================
// HOUSING INVESTMENT
// SCRIPT PRINCIPAL
// ============================================================


// ============================================================
// CONFIGURATION DES PACKS
// ============================================================

const PACKS = [

    {
        id: 1,
        amount: 3000,
        name: "Maison économique",
        dailyGain: 800,
        duration: 180
    },

    {
        id: 2,
        amount: 10000,
        name: "Petite maison moderne",
        dailyGain: 3000,
        duration: 180
    },

    {
        id: 3,
        amount: 20000,
        name: "Maison familiale",
        dailyGain: 6000,
        duration: 180
    },

    {
        id: 4,
        amount: 45000,
        name: "Maison moderne",
        dailyGain: 14000,
        duration: 180
    },

    {
        id: 5,
        amount: 100000,
        name: "Villa confortable",
        dailyGain: 30000,
        duration: 180
    },

    {
        id: 6,
        amount: 200000,
        name: "Villa moderne",
        dailyGain: 65000,
        duration: 180
    },

    {
        id: 7,
        amount: 400000,
        name: "Grande villa",
        dailyGain: 140000,
        duration: 180
    },

    {
        id: 8,
        amount: 800000,
        name: "Villa haut standing",
        dailyGain: 290000,
        duration: 180
    }

];



// ============================================================
// UTILITAIRES
// ============================================================


function formatMoney(amount) {

    return Number(amount || 0)
        .toLocaleString("fr-FR")
        + " FCFA";

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



function getRegisteredUser() {

    try {

        return JSON.parse(
            localStorage.getItem("registeredUser")
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



function getNumber(key) {

    return Number(
        localStorage.getItem(key) || 0
    );

}



function setNumber(key, value) {

    localStorage.setItem(
        key,
        String(Number(value) || 0)
    );

}



// ============================================================
// INITIALISATION DU COMPTE
// ============================================================


function initializeAccount() {

    if (
        localStorage.getItem("userBalance")
        === null
    ) {

        setNumber(
            "userBalance",
            0
        );

    }


    if (
        localStorage.getItem("totalInvested")
        === null
    ) {

        setNumber(
            "totalInvested",
            0
        );

    }


    if (
        localStorage.getItem("totalGains")
        === null
    ) {

        setNumber(
            "totalGains",
            0
        );

    }


    if (
        localStorage.getItem("activeInvestments")
        === null
    ) {

        setNumber(
            "activeInvestments",
            0
        );

    }


    if (
        localStorage.getItem("investments")
        === null
    ) {

        localStorage.setItem(
            "investments",
            JSON.stringify([])
        );

    }


    if (
        localStorage.getItem("transactions")
        === null
    ) {

        localStorage.setItem(
            "transactions",
            JSON.stringify([])
        );

    }

}



// ============================================================
// INVESTISSEMENTS
// ============================================================


function getInvestments() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "investments"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}



function saveInvestments(investments) {

    localStorage.setItem(
        "investments",
        JSON.stringify(investments)
    );

}



function getTransactions() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "transactions"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}



function saveTransactions(transactions) {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}



// ============================================================
// AJOUTER UNE TRANSACTION
// ============================================================


function addTransaction(
    type,
    amount,
    status = "En attente"
) {

    const transactions =
        getTransactions();


    transactions.unshift({

        id:
            Date.now(),

        date:
            new Date().toLocaleString(
                "fr-FR"
            ),

        type:
            type,

        amount:
            Number(amount),

        status:
            status

    });


    saveTransactions(
        transactions
    );

}



// ============================================================
// SELECTION D'UN PACK
// ============================================================


function selectPack(amount) {

    const pack =
        PACKS.find(
            item =>
                item.amount === Number(amount)
        );


    if (!pack) {

        alert(
            "Pack introuvable."
        );

        return;

    }


    localStorage.setItem(
        "selectedPack",
        JSON.stringify(pack)
    );


    /*
     * Vérification de la connexion
     */

    const user =
        getCurrentUser();


    if (!user) {

        alert(
            "Veuillez vous connecter avant d'investir."
        );


        window.location.href =
            "login.html";


        return;

    }


    /*
     * Vérification du solde
     */

    const balance =
        getNumber("userBalance");


    if (balance < pack.amount) {

        alert(
            "Votre solde disponible est insuffisant pour ce niveau."
        );


        /*
         * On place l'utilisateur
         * sur la partie dépôt.
         */

        const depositSection =
            document.getElementById(
                "depot"
            );


        if (depositSection) {

            depositSection.scrollIntoView({
                behavior: "smooth"
            });

        }


        return;

    }


    /*
     * Confirmation
     */

    const confirmation =
        confirm(

            "Vous avez sélectionné : "
            +
            pack.name
            +
            "\n\nMontant : "
            +
            formatMoney(pack.amount)
            +
            "\nGain quotidien prévu : "
            +
            formatMoney(pack.dailyGain)
            +
            "\n\nConfirmez-vous cet investissement ?"

        );


    if (!confirmation) {

        return;

    }


    createInvestment(
        pack
    );

}



// ============================================================
// CREATION D'UN INVESTISSEMENT
// ============================================================


function createInvestment(pack) {

    const balance =
        getNumber("userBalance");


    if (balance < pack.amount) {

        alert(
            "Solde insuffisant."
        );

        return;

    }


    const investments =
        getInvestments();


    const investment = {

        id:
            Date.now(),

        packId:
            pack.id,

        packName:
            pack.name,

        amount:
            pack.amount,

        dailyGain:
            pack.dailyGain,

        duration:
            pack.duration,

        startDate:
            new Date().toISOString(),

        lastGainDate:
            null,

        earned:
            0,

        status:
            "Actif"

    };


    investments.push(
        investment
    );


    saveInvestments(
        investments
    );


    /*
     * Déduction du solde
     */

    setNumber(
        "userBalance",
        balance - pack.amount
    );


    /*
     * Mise à jour du total investi
     */

    setNumber(
        "totalInvested",
        getNumber("totalInvested")
        +
        pack.amount
    );


    /*
     * Nombre d'investissements actifs
     */

    setNumber(
        "activeInvestments",
        investments.filter(
            item =>
                item.status === "Actif"
        ).length
    );


    /*
     * Historique
     */

    addTransaction(
        "Investissement",
        pack.amount,
        "Actif"
    );


    alert(
        "Votre investissement de "
        +
        formatMoney(pack.amount)
        +
        " a été enregistré."
    );


    updateDashboard();


    renderInvestments();


    renderTransactions();

}



// ============================================================
// MISE A JOUR DU DASHBOARD
// ============================================================


function updateDashboard() {

    const balanceElement =
        document.getElementById(
            "userBalance"
        );


    const investedElement =
        document.getElementById(
            "totalInvested"
        );


    const gainsElement =
        document.getElementById(
            "totalGains"
        );


    const activeElement =
        document.getElementById(
            "activeInvestments"
        );


    if (balanceElement) {

        balanceElement.textContent =
            formatMoney(
                getNumber(
                    "userBalance"
                )
            );

    }


    if (investedElement) {

        investedElement.textContent =
            formatMoney(
                getNumber(
                    "totalInvested"
                )
            );

    }


    if (gainsElement) {

        gainsElement.textContent =
            formatMoney(
                getNumber(
                    "totalGains"
                )
            );

    }


    if (activeElement) {

        activeElement.textContent =
            getNumber(
                "activeInvestments"
            );

    }



    /*
     * Nom de l'utilisateur
     */

    const user =
        getCurrentUser();


    const nameElement =
        document.getElementById(
            "userName"
        );


    if (
        user &&
        nameElement
    ) {

        nameElement.textContent =
            user.name
            ||
            user.nom
            ||
            user.username
            ||
            "Utilisateur";

    }

}



// ============================================================
// AFFICHAGE DES INVESTISSEMENTS
// ============================================================


function renderInvestments() {

    const container =
        document.getElementById(
            "investmentList"
        );


    if (!container) {

        return;

    }


    const investments =
        getInvestments();


    if (
        investments.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <strong>
                    Aucun investissement actif
                </strong>

                <p>
                    Choisissez un niveau
                    pour commencer.
                </p>

            </div>

        `;


        return;

    }


    container.innerHTML =
        investments.map(
            investment => `

                <div class="investment-item">

                    <div>

                        <strong>
                            ${investment.packName}
                        </strong>

                        <p>
                            Montant :
                            ${formatMoney(investment.amount)}
                        </p>

                        <p>
                            Gain quotidien :
                            ${formatMoney(investment.dailyGain)}
                        </p>

                        <p>
                            Gains accumulés :
                            ${formatMoney(investment.earned)}
                        </p>

                    </div>


                    <div>

                        <span>
                            ${investment.status}
                        </span>

                    </div>

                </div>

            `
        )
        .join("");

}



// ============================================================
// AFFICHAGE DE L'HISTORIQUE
// ============================================================


function renderTransactions() {

    const body =
        document.getElementById(
            "historyBody"
        );


    if (!body) {

        return;

    }


    const transactions =
        getTransactions();


    if (
        transactions.length === 0
    ) {

        body.innerHTML = `

            <tr>

                <td colspan="4">
                    Aucune opération enregistrée.
                </td>

            </tr>

        `;


        return;

    }


    body.innerHTML =
        transactions.map(
            transaction => `

                <tr>

                    <td>
                        ${transaction.date}
                    </td>

                    <td>
                        ${transaction.type}
                    </td>

                    <td>
                        ${formatMoney(transaction.amount)}
                    </td>

                    <td>
                        ${transaction.status}
                    </td>

                </tr>

            `
        )
        .join("");

}



// ============================================================
// DEPOT
// ============================================================


function handleDeposit(event) {

    event.preventDefault();


    const input =
        document.getElementById(
            "depositAmount"
        );


    if (!input) {

        return;

    }


    const amount =
        Number(
            input.value
        );


    if (
        !amount ||
        amount < 1000
    ) {

        alert(
            "Veuillez entrer un montant valide."
        );

        return;

    }


    /*
     * IMPORTANT :
     * Le prototype n'ajoute pas automatiquement
     * l'argent au solde.
     *
     * Le dépôt doit être vérifié par
     * l'administration avant crédit.
     */


    addTransaction(
        "Demande de dépôt",
        amount,
        "En attente"
    );


    input.value = "";


    renderTransactions();


    alert(
        "Votre demande de dépôt de "
        +
        formatMoney(amount)
        +
        " a été enregistrée et est en attente de vérification."
    );

}



// ============================================================
// RETRAIT
// ============================================================


function handleWithdraw(event) {

    event.preventDefault();


    const input =
        document.getElementById(
            "withdrawAmount"
        );


    if (!input) {

        return;

    }


    const amount =
        Number(
            input.value
        );


    const balance =
        getNumber(
            "userBalance"
        );


    if (
        !amount ||
        amount < 1000
    ) {

        alert(
            "Veuillez entrer un montant valide."
        );

        return;

    }


    if (
        amount > balance
    ) {

        alert(
            "Votre solde disponible est insuffisant."
        );

        return;

    }


    /*
     * Le retrait est soumis à validation.
     */

    addTransaction(
        "Demande de retrait",
        amount,
        "En attente"
    );


    input.value = "";


    renderTransactions();


    alert(
        "Votre demande de retrait de "
        +
        formatMoney(amount)
        +
        " a été enregistrée et est en attente de vérification."
    );

}



// ============================================================
// DECONNEXION
// ============================================================


function logoutUser() {

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "login.html";

}



// ============================================================
// CALCUL DES GAINS
// ============================================================


function processDailyGains() {

    const investments =
        getInvestments();


    if (
        investments.length === 0
    ) {

        return;

    }


    let totalNewGains =
        0;


    const now =
        new Date();


    investments.forEach(
        investment => {

            if (
                investment.status
                !==
                "Actif"
            ) {

                return;

            }


            const start =
                new Date(
                    investment.startDate
                );


            const elapsed =
                now.getTime()
                -
                start.getTime();


            const elapsedDays =
                Math.floor(
                    elapsed
                    /
                    (
                        1000
                        *
                        60
                        *
                        60
                        *
                        24
                    )
                );


            const creditedDays =
                investment.lastGainDate
                    ?
                    Math.floor(
                        (
                            now.getTime()
                            -
                            new Date(
                                investment.lastGainDate
                            ).getTime()
                        )
                        /
                        (
                            1000
                            *
                            60
                            *
                            60
                            *
                            24
                        )
                    )
                    :
                    0;


            if (
                elapsedDays > 0
                &&
                creditedDays > 0
            ) {

                const daysToCredit =
                    Math.min(
                        creditedDays,
                        investment.duration
                    );


                const gain =
                    daysToCredit
                    *
                    investment.dailyGain;


                investment.earned +=
                    gain;


                totalNewGains +=
                    gain;


                investment.lastGainDate =
                    now.toISOString();

            }


            /*
             * Initialisation de la date
             * de calcul des gains.
             */

            if (
                !investment.lastGainDate
                &&
                elapsedDays >= 1
            ) {

                investment.lastGainDate =
                    now.toISOString();

            }

        }
    );


    if (
        totalNewGains > 0
    ) {

        setNumber(
            "userBalance",
            getNumber("userBalance")
            +
            totalNewGains
        );


        setNumber(
            "totalGains",
            getNumber("totalGains")
            +
            totalNewGains
        );


        addTransaction(
            "Gain",
            totalNewGains,
            "Crédité"
        );

    }


    saveInvestments(
        investments
    );


    updateDashboard();


    renderInvestments();


    renderTransactions();

}



// ============================================================
// INITIALISATION
// ============================================================


document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeAccount();

        updateDashboard();

        renderInvestments();

        renderTransactions();

        processDailyGains();

    }
);



// ============================================================
// FIN DU SCRIPT
// ============================================================
