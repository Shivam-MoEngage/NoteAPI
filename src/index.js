const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const noteRouter = require("./routes/notesRoutes");
const userRouter = require("./routes/userRoutes");
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/note", noteRouter);

const PORT = process.env.PORT || 2500

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server Started on port no - " + PORT);
    })
}).catch(console.error());


