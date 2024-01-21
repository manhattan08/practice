const {Role} = require("../models/role.model");

async function rolePreloader(){
    try{
        await Role.findOrCreate({where:{name:"admin"}})
        await Role.findOrCreate({where:{name:"user"}})
    } catch (e) {
        console.log(`${rolePreloader.name}: `+e)
    }
}

module.exports = {
    rolePreloader
}