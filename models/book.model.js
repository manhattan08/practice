const { DataTypes } = require('sequelize')
const db = require('../db.js')
const {User} = require("./user.model");

const Book  = db.define('book',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


module.exports = {
    Book
}