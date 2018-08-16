'use strict'

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  /**
   * Show a list of all clientes.
   * GET clientes
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new cliente.
   * GET clientes/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new cliente.
   * POST clientes
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single cliente.
   * GET clientes/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing cliente.
   * GET clientes/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update cliente details.
   * PUT or PATCH clientes/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a cliente with id.
   * DELETE clientes/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ClienteController
