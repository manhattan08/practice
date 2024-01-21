const {sendError} = require("../helper/error.handler")
const {User} = require("../models/user.model");
const bcrypt = require("bcrypt");
const {Role} = require("../models/role.model");
const {Op} = require("sequelize");
const {getRoleOrUser} = require("../services/roles.serives");

class UserController {
    async create(req,res){
        try{
            const {username,password,roleId} = req.body;

            if(!username || !password)
                return sendError(res,"Incorrect body for create user!")

            if(await User.findOne({where:{username}})){
                return sendError(res,"This username was taken!")
            }

            const findRole = await getRoleOrUser(roleId)

            const hashPassword = bcrypt.hashSync(password,10);

            const user = await User.create({username,password:hashPassword,roleId:findRole})

            return res.status(200).json({data:{username:user.username,id:user.id,roleId:user.roleId,createdAt:user.createdAt}});
        } catch (e){
            console.log(e)
            return sendError(res,"Something gone wrong",500)
        }
    }

    async update(req,res){
        try{
            const {username,password,roleId} = req.body;
            const {id} = req.params;

            const findUser = await User.findOne({where:{id}})

            if(!findUser)
                return sendError(res,"User not found!",404)

            if(!!username && await User.findOne({where:{username}})){
                return sendError(res,"This username was taken!")
            }

            if(!!password){
                let comparePassword = bcrypt.compareSync(password,findUser.password)

                if(comparePassword)
                    findUser.password = password ?  bcrypt.hashSync(password,10) : findUser.year
            }

            if(!!roleId){
                findUser.roleId = await getRoleOrUser(roleId)
            }

            findUser.username = username ?? findUser.username

            await findUser.save()

            return res.status(200).json({data:{username:findUser.username,id:findUser.id,roleId:findUser.roleId,createdAt:findUser.createdAt}})
        } catch (e) {
            console.log(e)
            return sendError(res,"Something gone wrong",500)
        }
    }

    async delete(req,res){
        try{
            const {id} = req.params;

            const findUser = await User.findOne({where:{id}})

            if(!findUser)
                return sendError(res,"User not found!",404)

            await User.destroy({ where: { id } });

            return res.status(200).json({data:"User successfully deleted!"})
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }

    async getAll(req,res){
        try{
            let {limit = 10,page = 1} = req.query;
            let skip = page * limit - limit;

            const users = await User.findAll({
                limit: parseInt(limit),
                offset: skip,
                attributes: { exclude: ['password'] }
            });

            return res.status(200).json({ data: users || [] });
        } catch (e) {
            console.log(e)
            return sendError(res,"Something gone wrong",500)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params;

            const user = await User.findOne({
                where:{id},
                attributes: { exclude: ['password'] }
            })

            if(!user)
                return sendError(res,"User not found!",404)

            return res.json({data:user})
        } catch (e) {
            console.log(e)
            return sendError(res,"Something gone wrong",500)
        }
    }

}

module.exports = new UserController();
