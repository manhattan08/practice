const jwt = require("jsonwebtoken");
const {User} = require("../models/user.model");
const {sendError} = require("../helper/error.handler");
const {Role} = require("../models/role.model");

const isAuth = async (req, res, next) => {
    try{
        const token = req.headers?.authorization;

        if(!token)
            return sendError(res,"Unauthorized",401);

        const jwtToken = token.split("Bearer ")[1];

        if (!jwtToken) return sendError(res,"Invalid token!",401);

        const decode = jwt.verify(jwtToken, process.env.SECRET_KEY);

        if(!decode) return sendError(res,"Invalid token!",401);

        const { id } = decode;

        const user = await User.findOne({where:{id}})

        if (!user) return sendError(res,"Unauthorized",401);

        req.user = user;

        next();
    } catch (e) {
        next(sendError(res,"Invalid token!",401))
    }
};

const isAdmin = async (req, res, next) => {
    const { user } = req

    if (user.roleId !== (await Role.findOne({where:{name:"admin"}})).id)
        return sendError(res,"Forbidden!",403);

    next();
};

module.exports = {
    isAdmin,isAuth
}
