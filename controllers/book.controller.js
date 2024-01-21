const {Book} = require("../models/book.model");
const {sendError} = require("../helper/error.handler")

class BookController {
    async create(req,res){
        try{
            const {title,year,genre,author} = req.body;

            if(!title || !year || !genre || !author)
                return sendError(res,"Incorrect body for create book!")

            const book = await Book.create({title,year,genre,author})

            return res.status(200).json({data:book});
        } catch (e){
            return sendError(res,"Something gone wrong",500)
        }
    }

    async update(req,res){
        try{
            const {title,year,genre,author} = req.body;
            const {id} = req.params;

            const findBook = await Book.findOne({where:{id}})

            if(!findBook)
                return sendError(res,"Book not found!",404)

            findBook.title = title ?? findBook.title
            findBook.year = year ?? findBook.year
            findBook.genre = genre ?? findBook.genre
            findBook.author = author ?? findBook.author

            await findBook.save()

            return res.status(200).json({data:findBook})
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }

    async delete(req,res){
        try{
            const {id} = req.params;

            const findBook = await Book.findOne({where:{id}})

            if(!findBook)
                return sendError(res,"Book not found!",404)

            await Book.destroy({ where: { id } });

            return res.status(200).json({data:"Book successfully deleted!"})
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }

    async getAll(req,res){
        try{
            let {limit = 10,page = 1} = req.query;
            let skip = page * limit - limit;

            const books = await Book.findAll({
                limit: parseInt(limit),
                offset: skip
            });

            return res.status(200).json({ data: books || [] });
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params;

            const book = await Book.findOne({where:{id}})

            if(!book)
                return sendError(res,"Book not found!",404)

            return res.json({data:book})
        } catch (e) {
            return sendError(res,"Something gone wrong",500)
        }
    }

}

module.exports = new BookController();
