const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes")
const app = express();
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

//set up view engine
app.set("view engine", "ejs");

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//conntect to mongodo
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("connected to mongoDB")
});

//set up /auth/* routes
app.use("/auth", authRoutes);

app.use("/profile", profileRoutes);

//home route
app.get("/", (req, res) => {
    res.render("home");
});

const port = 3030;

app.listen(port, () => {
    console.log(`App now listening to request on port ${port}`)
});