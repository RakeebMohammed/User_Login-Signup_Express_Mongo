var express = require("express");
var router = express.Router();
var session = require("express-session");
var cookieParser = require("cookie-parser");
// username and password
var username = "rakku";
var password = "rakku123";
router.use(cookieParser());
//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// Get login page
router.get("/", function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  if (username == req.cookies.username && password == req.cookies.password) {
    res.redirect("/home");
  } else res.render("login");
});
//render home page after login
router.get("/home", function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.render("home", { cookie: "Rakeeb Mohammed" });
});
// data coming from login page
router.post("/login", function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  if (req.body.name == username && req.body.password == password) {
    var s = req.session;
    res.cookie(`username`, `rakku`);
    res.cookie(`password`, `rakku123`);
    console.log(s);
    res.redirect("/home");
  } else if (req.body.name == username && req.body.password != password)
    res.render("login", { message: "Password is incorrect" });
  else if (req.body.name != username && req.body.password == password)
    res.render("login", { msg: "Username is incorrect" });
  else if (req.body.name != username && req.body.password != password)
    res.render("login", { m: "Enter valid credintials" });
  else res.redirect("/");
});
//onclicking the logout button
router.post("/logout", function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  console.log(req.cookies);
  res.clearCookie("username");
  res.clearCookie("password");
  console.log(req.session);
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
