const {Role} = require("../models/role.model");
const {Op} = require("sequelize");

async function getRoleOrUser(roleId){
   return (await Role.findOne({
       where: {
           [Op.or]: [
               { id: roleId || null },
               { name: 'user' },
           ],
       }
    })).id
}

module.exports = {
    getRoleOrUser
}