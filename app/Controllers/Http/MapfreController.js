'use strict'
console.log('Begning data extraction ----->');

const curl = require('curl');
const jsdom = require("jsdom");


/**
 * Resourceful controller for interacting with mapfres
 */
class MapfreController {
  /**
   * Show a list of all mapfres.
   * GET mapfres
   */
  async index({
    request,
    response,
    view
  }) {}

  /**
   * Render a form to be used for creating a new mapfre.
   * GET mapfres/create
   */
  async create({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new mapfre.
   * POST mapfres
   */
  async store({
    request,
    response
  }) {
    const {
      url
    } = request.all();

    await curl.get(url, null, (err, resp, body) => {
      if (resp.statusCode == 200) {
        const {
          JSDOM
        } = jsdom;
        const dom = new JSDOM(body);
        const $ = (require('jquery'))(dom.window);

        //pagina 1
        //pagina 1
        let numero_apolice = $("#pf1 div:contains(' Nº Apólice: '):gt(0)").index();
        let vigencia = $("#pf1 div:contains('Vigência início'):gt(0)").index();
        let seguradora = $("#pf1 div:contains('Nome:'):gt(0)").index();


        //pagina 2
        let segurado = $("#pf2 div:contains('Nome:'):gt(0)").index();
        let cpf = $("#pf2 div:contains('CPF:'):gt(0)").index();

        //pagina 3
        let marca_modelo = $("#pf3 div:contains('Marca/Modelo:'):gt(0)").index();
        let ano_fabricacao = $("#pf3 div:contains('Ano de fabricação/Ano do modelo:'):gt(0)").index();

        //pagina 6
        let forma_pagamento = $("#pf6 div:contains('Forma:'):gt(0)").index();
        let valor_parcela = $("#pf6 div:contains('Valor da 1ª parcela:'):gt(0)").index();

        //PF1
        let __numero_apolice = $("#pf1 div:eq(" + (numero_apolice) + ")").text();
        let __vigencia = $("#pf1 div:eq(" + (vigencia) + ")").text();
        let __seguradora = $("#pf1 div:eq(" + (seguradora) + ")").text();

        //PF2
        let __segurado = $("#pf2 div:eq(" + (segurado) + ")").text();
        let __cpf = $("#pf2 div:eq(" + (cpf) + ")").text();

        //PF3
        let __marca_modelo = $("#pf3 div:eq(" + (marca_modelo) + ")").text();
        let __ano_fabricacao = $("#pf3 div:eq(" + (ano_fabricacao) + ")").text();

        //PF6
        let __forma_pagamento = $("#pf6 div:eq(" + (forma_pagamento) + ")").text();
        let __valor_parcela = $("#pf6 div:eq(" + (valor_parcela) + ")").text();
        let ano_base = __ano_fabricacao.substr(33, 37);
        var primeira_parcel_str = __valor_parcela.substr(25, 35)

        let xpto = {
          'cpf': __cpf.substr(28),
          'name': __segurado.substr(5),
          'insurer': __seguradora.substr(5),
          'apoliceNumber': __numero_apolice.substr(25),
          'validity': __vigencia.substr(8),
          'classification': 1,
          'input': __valor_parcela.substr(56),
          'value': __valor_parcela.substr(56),
          'totalOfPortions': __forma_pagamento.substr(42),
          'paymentForm': __forma_pagamento.substr(6, 22),
          'portion': __forma_pagamento.substr(42),
          'date': primeira_parcel_str.substr(0, 11),
          'portionValue': __valor_parcela.substr(56),
          'veichle': __marca_modelo.substr(13),
          'board': 'Não Consta',
          'yearOfManufacture': ano_base.substr(0, 4),
          'yearOfModel': ano_base.substr(5)
        }
        const mp = use('App/Models/Mapfre');

        var created =  mp.create(xpto);
        console.log(created)
        return created
      } else {
        console.log('Error to fectch URL data');
      }
    })
  }


  /**
   * Display a single mapfre.
   * GET mapfres/:id
   */
  async show({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Render a form to update an existing mapfre.
   * GET mapfres/:id/edit
   */
  async edit({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Update mapfre details.
   * PUT or PATCH mapfres/:id
   */
  async update({
    params,
    request,
    response
  }) {}

  /**
   * Delete a mapfre with id.
   * DELETE mapfres/:id
   */
  async destroy({
    params,
    request,
    response
  }) {}
}

module.exports = MapfreController
