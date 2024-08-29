const expreess = require("express");
const userRouter = expreess.Router();
const {usersGet,usersPost,getUserByID}=require("../controller/userController")
userRouter.post("/users", usersPost);
userRouter.get("/users", usersGet);
userRouter.get("/users/:id", getUserByID);

module.exports=userRouter;