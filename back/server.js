const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const cors = require('cors');
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const uploadRoute = require("./routes/upload")
const settingRoute = require("./routes/setting")
const PORT = 8000


require("dotenv").config()


app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/setting", settingRoute)


//connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connection is Successful");
}).catch((error)=>{
    console.log(error)
});


app.listen(PORT, () => {console.log("Server is running");});