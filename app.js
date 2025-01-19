const express = require("express");
const app = express();
require("dotenv/config")
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");
const dbconnect = require("./config/mongoose-connection");
require("dotenv").config();
const flash = require("connect-flash");
const expressSession = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
        cookie: {
          maxAge: 3600000, // 1 hour in milliseconds
          httpOnly: true,  // Ensures the cookie is accessible only by the web server
          secure: false,   // Set to true if using HTTPS
        },
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
// apan ithe requests padhavtoy bhaii bc

dbconnect(process.env.MONGODB_URL);

//app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/user", userRouter);
app.use("/products", productsRouter);

app.get("/users", (req, res) => {
    res.send("bhokkkat ajjjjaa bc ");
});

 
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
