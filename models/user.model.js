const { DataTypes } = require('sequelize')
const db = require('../db.js')
const {Role} = require("./role.model");

const User = db.define('user',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId:{
        type: DataTypes.INTEGER,
        references:{
            model:Role,
            key:"id"
        }
    }
})


module.exports = {
    User
}