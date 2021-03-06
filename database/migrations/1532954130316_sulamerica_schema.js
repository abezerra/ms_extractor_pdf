'use strict'

const Schema = use('Schema')

class SulamericaSchema extends Schema {
  up () {
    this.create('sulamericas', (table) => {
      table.increments()
      table.string('cpf')
      table.string('insurer')
      table.string('apoliceNumber')
      table.string('validity')
      table.string('classification')
      table.string('input')
      table.string('value')
      table.string('totalOfPortions')
      table.string('paymentForm')
      table.string('portion')
      table.string('date')
      table.string('portionValue')
      table.string('veichle')
      table.string('board')
      table.string('yearOfManufacture')
      table.string('yearOfModel')
      table.timestamps()
    })
  }

  down () {
    this.drop('sulamericas')
  }
}

module.exports = SulamericaSchema
