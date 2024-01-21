const {Role} = require("../models/role.model");
const {sendError} = require("../helper/error.handler")

class RoleController {
    async create(req,res){
        try{
            const {name} = req.body;

            if(!name)
                return sendError(res,"Incorrect body for create role!")

            if(await Role.findOne({where:{name}})){
                return sendError(res,"This name was taken!")
            }

            const role = await Role.create({name})

            return res.status(200).json({data:role});
        } catch (e){
            return sendError(res,"Something gone wrong",500)
        }
    }

    async update(req,res){
        try{
            const {name} = req.body;
            const {id} = req.params;

            const findRole = await Role.findOne({where:{id}})

            if(!findRole)
                return sendError(res,"Role not found!",404)

            if(await Role.findOne({where:{name}})) {
                return sendError(res, "This name was taken!")
            }

            findRole.name = name ?? findRole.title

            await findRole.save()

            return res.status(200).json({data:findRole})
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }

    async delete(req,res){
        try{
            const {id} = req.params;

            const findRole = await Role.findOne({where:{id}})

            if(!findRole)
                return sendError(res,"Role not found!",404)

            await Role.destroy({ where: { id } });

            return res.status(200).json({data:"Role successfully deleted!"})
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }

    async getAll(req,res){
        try{
            let {limit = 10,page = 1} = req.query;
            let skip = page * limit - limit;

            const roles = await Role.findAll({
                limit: parseInt(limit),
                offset: skip
            });

            return res.status(200).json({ data: roles || [] });
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params;

            const role = await Role.findOne({where:{id}})

            if(!role)
                return sendError(res,"Role not found!",404)

            return res.json({data:role})
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }

}

module.exports = new RoleController();
