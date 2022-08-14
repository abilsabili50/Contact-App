const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contacts");

const app = express();
const port = 3000;

// Menginisialisasi express agar menggunakan ejs
app.set("view engine", "ejs");
// third-party middleware
app.use(expressLayouts);
// built-in middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
	// res.sendFile("./index.html", { root: __dirname });
	const mahasiswa = [
		{
			nama: "Abil",
			email: "abilsabili50@gmail.com",
		},
		{
			nama: "Fahrul",
			email: "fahrul@gmail.com",
		},
		{
			nama: "Syaugi",
			email: "syaugiss@gmail.com",
		},
	];
	res.render("index", {
		nama: "Abil Sabili",
		title: "Halaman Home",
		mahasiswa,
		layout: "layouts/main-layout",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "Halaman About",
		layout: "layouts/main-layout",
	});
});

app.get("/contact", (req, res) => {
	const contacts = loadContact();

	res.render("contact", {
		title: "Halaman Contact",
		layout: "layouts/main-layout",
		contacts,
	});
});

app.get("/contact/:nama", (req, res) => {
	const contact = findContact(req.params.nama);

	res.render("detail", {
		title: "Halaman Detail Contact",
		layout: "layouts/main-layout",
		contact,
	});
});

app.use("/", (req, res) => {
	res.status(404);
	res.send("<h1>404</h1>");
});

app.listen(port, () => {
	console.log("Example app listening at http://localhost:" + port);
});
