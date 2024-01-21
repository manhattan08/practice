const bcrypt  = require('bcrypt');
const {User} = require('../models/user.model')
const jwt = require('jsonwebtoken')
const {Role} = require("../models/role.model");
const {sendError} = require("../helper/error.handler")

const generateJwt = (id,username,roleId) => {
    return jwt.sign(
        {id,username,roleId},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class AuthController {
    async registration(req,res){
         try{
             const {username,password,role} = req.body;

             if(!username || !password){
                 return sendError(res,"Incorrect username or password!")
             }

             if(await User.findOne({where:{username}})){
                 return sendError(res,"This username was taken!")
             }

             const hashPassword = bcrypt.hashSync(password,10);

             let newRole
             switch (role){
                 case "admin":{
                     newRole = await Role.findOne({where:{name:"admin"}})
                 }
                 default:{
                     newRole = await Role.findOne({where:{name:"user"}})
                 }
             }

             const user = await User.create({username,roleId:newRole.id,password:hashPassword})

             const token = generateJwt(user.id,user.username,user.roleId)

             return res.status(200).json({token})
         } catch (e) {
             return sendError(res,"Something gone wrong",500)
         }
    }
    async login(req,res){
        try{
            const {username,password} = req.body;

            const user = await User.findOne({where:{username}})

            if(!user)
                return sendError(res,"User not found!",404)

            let comparePassword = bcrypt.compareSync(password,user.password)

            if(!comparePassword) {
                sendError(res,"Incorrect password or username!")
            }

            const token = generateJwt(user.id,user.username,user.roleId);

            return res.json({token})
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }
}

module.exports = new AuthController();
