const expreess = require("express");
const dbHelper = require("./database/dbHelper");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {injectUser,authenticated} = require("./middleware/middleware");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { registerGet, loginGet,loginPost } = require("./controller/authoController");
const { productGet } = require("./controller/productController");
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const productRouter = require("./router/productRouter");
const app = expreess();
dotenv.config();
app.set("port", 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/static", expreess.static(`${__dirname}/public`));
app.set("view engine", "ejs");
app.use("*", injectUser);
app.get("/", (req, res) => {
    res.render('home', {
        welcomeString: "Hi nice to see you",
        page_title: "home"
    })

});

app.use("/",userRouter);
app.use("/",authRouter);
app.use("/",productRouter);
app.get("/set-cookie", (req, res) => {
    //res.setHeader("Set-Cookie", "test-cookie=test-data");
    res.cookie("test-cookie", "test cookie value", { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.cookie("test-cookie-https", "test cookie value", { maxAge: 1000 * 60 * 60 * 24, httpOnly: false });
    res.cookie("test-cookie-http", "test cookie value", { maxAge: 1000 * 60 * 60 * 24, httpOnly: false });
    res.send("You've got cookied!");
});
app.get("/get-cookie", (req, res) => {
    let cookies = req.cookies;
    //console.log(req.cookies);
    //res.send("ol");
    res.json({ cookies });

});

app.get("/get-token", (req, res) => {
    let payload = {
        id: 123
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    res.send({ token });
});
app.post("/test-token", (req, res) => {
    let test_token = req.body.token;
    jwt.verify(test_token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            res.send({
                message: "you sick"
            });
            return;
        }

        res.send({ payload });
    })

});

dbHelper().then(() => {
    app.listen(app.get("port"), () => {
        console.log(`Sever is up and running on port ${app.get("port")}`);
    });
}).catch((err) => {
    console.log("Cannot Connect to Database");
}); 
