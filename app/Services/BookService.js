'use strict';

const BookRepository = use('App/Repositories/BookRepository');

class BookService {

    constructor() {
        this.repository = new BookRepository;
    }

    async all() {
        return await this.repository.all();
    }
    
    async paginated(params) {
        return await this.repository.paginated(params);
    }

    async findOrFail(id) {
        return await this.repository.findOrFail(id);
    }

    async create(data) {
        return await this.repository.create(data);
    }

    async update(id, data) {
        return await this.repository.update(id, data);
    }

    async delete(id) {
        return await this.repository.delete(id);
    }
}

module.exports = BookService;