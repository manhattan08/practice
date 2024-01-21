const { DataTypes } = require('sequelize')
const db = require('../db.js')

const Role = db.define('role',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


module.exports = {
    Role
}