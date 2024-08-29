const expreess = require("express");
const authRouter = expreess.Router();
const {registerGet,loginGet,loginPost, logout}=require("../controller/authoController");

authRouter.get("/register", registerGet );
authRouter.get("/login", loginGet );
authRouter.post("/login", loginPost);
authRouter.get("/logout",logout);

module.exports=authRouter;