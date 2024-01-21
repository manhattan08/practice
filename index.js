require('dotenv').config();
const  express = require("express");
const  sequelize = require("./db");
const cors = require("cors")
const {rolePreloader} = require("./services/role-preloader");
const PORT = process.env.PORT || 5000;
const router = require('./routes/main.route');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/',router);

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT,()=>{
            console.log(`server starting on ${PORT}`)
        })

        await rolePreloader()
    } catch (e) {
        console.log(`${start.name}: `+e);
    }
}
start();