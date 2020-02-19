'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const StatusCodes = use('App/Helpers/StatusCodes');
const BookService = use('App/Services/BookService');

/**
 * Resourceful controller for interacting with books
 */
class BookController {

  constructor() {
    this.bookService = new BookService();
  }

  /**
   * Show a list of all books.
   * GET books
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index ({ response }) {
    let books = await this.bookService.all();

    return response.success(books);
  }

  /**
   * Create/save a new book.
   * POST books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const book = await this.bookService.create(request.all());

    return response.success(book, 'Book created successfully', StatusCodes.HTTP_CREATED);
  }

  /**
   * Display a single book.
   * GET books/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const book = await this.bookService.findOrFail(params.id);

    console.log('books', {book});

    return response.success(book);
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    await this.bookService.update(params.id, request.all());

    return response.showMessage('Book updated successfully');
  }

  /**
   * Delete a book with id.
   * DELETE books/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    await this.bookService.delete(params.id);

    return response.showMessage('Book deleted successfully');
  }
}

module.exports = BookController;
