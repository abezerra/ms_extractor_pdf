'use strict'

const Schema = use('Schema')

class ClientesSchema extends Schema {
  up() {
    this.create('clientes', (table) => {
      table.increments()
        table.string('name').nullable(),
        table.string('cpf').nullable(),
        table.string('rg').nullable(),
        table.string('ddd_phone').nullable(),
        table.string('telefone').nullable(),
        table.string('ddd_cellphone').nullable(),
        table.string('cellphone').nullable(),
        table.string('email').nullable(),
        table.string('whatsapp').nullable(),
        table.string('address').nullable(),
        table.string('street').nullable(),
        table.string('neighbhrood').nullable(),
        table.string('city').nullable(),
        table.string('uf').nullable(),
        table.string('birth').nullable(),
        table.string('from').nullable(),
        table.string('type').nullable(),
        table.string('user_id').nullable(),
      table.timestamps()
    })
  }

  down() {
    this.drop('clientes')
  }
}

module.exports = ClientesSchema
