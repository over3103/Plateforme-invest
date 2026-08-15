* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

body {
    background: #f5f7fa;
    color: #222;
}

.header {
    background: #071b2c;
    color: white;
    padding: 18px 6%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.logo {
    font-size: 22px;
    font-weight: bold;
}

.logo span {
    color: #20c997;
}

nav {
    display: flex;
    align-items: center;
    gap: 15px;
}

nav a {
    color: white;
    text-decoration: none;
}

.btn {
    display: inline-block;
    background: #20c997;
    color: white;
    padding: 12px 20px;
    border-radius: 7px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
}

.btn:hover {
    opacity: 0.9;
}

.secondary {
    background: #071b2c;
    border: 1px solid white;
}

.hero {
    min-height: 500px;
    display: flex;
    align-items: center;
    padding: 60px 8%;
    background:
        linear-gradient(rgba(0,20,40,.72), rgba(0,20,40,.72)),
        url("https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1600&q=80")
        center/cover;
    color: white;
}

.hero-content {
    max-width: 700px;
}

.hero h1 {
    font-size: 48px;
    margin-bottom: 20px;
}

.hero p {
    font-size: 19px;
    line-height: 1.7;
    margin-bottom: 30px;
}

.hero-buttons {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.features {
    padding: 60px 7%;
    text-align: center;
}

.features h2 {
    margin-bottom: 35px;
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 3px 15px rgba(0,0,0,.08);
}

.card h3 {
    margin-bottom: 15px;
}

.card p {
    line-height: 1.6;
}

footer {
    background: #071b2c;
    color: white;
    text-align: center;
    padding: 25px;
    margin-top: 30px;
}

.container {
    width: 92%;
    max-width: 1100px;
    margin: 30px auto;
}

.page-title {
    margin-bottom: 25px;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin-bottom: 30px;
}

.stat {
    background: white;
    padding: 22px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,.07);
}

.stat h3 {
    font-size: 14px;
    color: #777;
    margin-bottom: 10px;
}

.stat strong {
    font-size: 24px;
}

.menu {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
}

.menu a {
    background: white;
    padding: 25px;
    border-radius: 10px;
    text-decoration: none;
    color: #222;
    box-shadow: 0 2px 10px rgba(0,0,0,.07);
}

.menu a:hover {
    transform: translateY(-2px);
}

.form-box {
    background: white;
    max-width: 500px;
    margin: 40px auto;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 3px 15px rgba(0,0,0,.08);
}

.form-box h2 {
    margin-bottom: 20px;
}

.form-box input,
.form-box select {
    width: 100%;
    padding: 13px;
    margin: 8px 0 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
}

.form-box button {
    width: 100%;
}

.table-box {
    background: white;
    padding: 20px;
    border-radius: 10px;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 13px;
    border-bottom: 1px solid #eee;
    text-align: left;
}

th {
    background: #071b2c;
    color: white;
}

.success {
    color: #198754;
    font-weight: bold;
}

.pending {
    color: #d39e00;
    font-weight: bold;
}

.danger {
    color: #dc3545;
    font-weight: bold;
}

.admin-header {
    background: #101820;
}

@media (max-width: 800px) {
    .hero h1 {
        font-size: 34px;
    }

    .cards,
    .dashboard-grid,
    .menu {
        grid-template-columns: 1fr;
    }

    nav {
        margin-top: 15px;
    }
}
