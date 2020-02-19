'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Book = use('App/Models/Book');

class BookRepository {
    async all() {
        return await Book.all();
    }

    async paginated(params) {
        const { offset } = params;
        
        return await Book.query()
                .orderBy('id', 'desc')
                .paginate(offset, 2);
    }

    async findOrFail(id) {
        return await Book.findOrFail(id);
    }

    async create(data) {
        const { title, isbn, author } = data;

        return await Book.create({ title, isbn, author });
    }

    async update(id, data) {
        const { title, isbn, author } = data;
        const book = await this.findOrFail(id);

        book.save({ title, isbn, author });

        return book;
    }

    async delete(id) {
        const book = await this.findOrFail(id);

        await book.delete();
    }
}

module.exports = BookRepository;