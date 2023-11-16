const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const videoRouter = require('./routes/videoRouter.js');
const authRouter = require('./routes/authRouter.js')

const app = express();
app.use(express.json());
app.use(cors());

// mongoose implementation

// const DBURL = "mongodb://0.0.0.0:27017/youtubeclone"
const DBURL = "mongodb+srv://youtubeclone:1234@cluster0.5ofd4si.mongodb.net/youtubeclone_103"

mongoose.connect(DBURL)
.then(() => {console.log("Database connected", DBURL)})
.catch((error) => {console.log("Cannot connect DB ", error)})


// .then(()=>{
//     console.log("Database connected",DBURL);
// })

// .catch((err)=>{
//     console.log("Database not connected",err);
// })

app.get('/', (req,res)=>{
    return res.send("Namaste Express World !")
});

// additional routers
app.use(videoRouter)
app.use(authRouter)

// Start the server and listen on a specific port
const port = 2000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

