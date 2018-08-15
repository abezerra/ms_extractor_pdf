'use strict'
console.log('Begning LIBERTY extraction ----->');

const curl = require('curl');
const jsdom = require("jsdom");
/**
 * Resourceful controller for interacting with liberties
 */
class LibertyController {
  /**
   * Show a list of all liberties.
   * GET liberties
   */
  async index({
    request,
    response,
    view
  }) {}

  /**
   * Render a form to be used for creating a new liberty.
   * GET liberties/create
   */
  async create({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new liberty.
   * POST liberties
   */
  async store({
    request,
    response
  }) {
    const {
      url
    } = request.all();
    console.log('A URL que ta chegando aqui', url);


    await curl.get(url, null, (err, resp, body) => {
      if (resp.statusCode == 200) {
        const {
          JSDOM
        } = jsdom;
        const dom = new JSDOM(body);
        const $ = (require('jquery'))(dom.window);


        //pagina 1
        let nome_segurado = $("#pf1 div:contains('Nome do(a) Segurado(a)'):gt(0)").index();
        let numero_apolice = $("#pf1 div:contains('Apólice'):gt(0)").index();

        let email = $("#pf1 div:contains(' E-mai'):gt(0)").index();
        let vigencia = $("#pf1 div:contains('ncia do Seguro'):gt(0)").index();
        let tipo_cobranca = $("#pf1 div:contains('Tipo de Cobrança'):gt(0)").index();
        let numero_parcelas = $("#pf1 div:contains('Nº Parcelas'):gt(0)").index();
        let valor_parcela = $("#pf1 div:contains('Valor (R$)'):gt(0)").index();

        // DADOS DO VEICULO NA PRIMEIRA PAGINA
        let fipe_pf1 = $("#pf1 div:contains('ITEM 001 - DADOS'):gt(0)").index()
        let fipe_pf2 = $("#pf2 div:contains('ITEM 001 - DADOS'):gt(0)").index()

        //pagina 2
        let placa = $("#pf2 div:contains('Placa'):gt(0)").index();

        //pagina 3
        let cpf = $("#pf3 div:contains('CPF/CNPJ'):gt(0)").index();
        let nascimento = $("#pf3 div:contains('Data de Nascimento'):gt(0)").index();

        //PF1
        let __nome_segurado = $("#pf1 div:eq(" + (nome_segurado + 1) + ")").text();
        let __numero_apolice = $("#pf1 div:eq(" + (numero_apolice + 1) + ")").text();
        let __email = $("#pf1 div:eq(" + (email + 1) + ")").text();
        let __vigencia = $("#pf1 div:eq(" + (vigencia + 1) + ")").text();
        let __tipo_cobranca = $("#pf1 div:eq(" + (tipo_cobranca + 1) + ")").text();
        let __numero_parcelas = $("#pf1 div:eq(" + (numero_parcelas + 1) + ")").text();
        let __valor_parcela = $("#pf1 div:eq(" + (valor_parcela + 1) + ")").text();
        let __placa = $("#pf2 div:eq(" + (placa + 1) + ")").text();
        let melhora_placa = __placa.substr(17, 25);

        //PF 3
        let __cpf = $("#pf3 div:eq(" + (cpf + 1) + ")").text();
        let __nascimento = $("#pf3 div:eq(" + (nascimento + 1) + ")").text();

        // console.log('Nome: ',__nome_segurado);
        // console.log('Apolice: ',__numero_apolice.substr(0, 13));
        // console.log('CPF: ',__nome_segurado.substr(28));
        // console.log('Email: ',__email);
        // console.log('Vigencia: ',__vigencia.substr(0, 51));
        let desaoStart = __vigencia.substr(__vigencia.length - 16);

        // console.log('Adesão: ', desaoStart.substr(0, 10));
        // console.log('Tipo cobranca: ',__tipo_cobranca);
        // console.log('Numero de parcelas: ',__numero_parcelas);
        // console.log('Valor de parcelas: ',__valor_parcela.substr(34));
        // console.log('Placa: ',melhora_placa.substr(0, 7));
        // console.log('CPF: ', __cpf.substr(__cpf.length - 12));
        // console.log('Nascimento: ', __nascimento.substr(0, 10));
        var __marca_modelo;
        var __anofab_mod;
        if (fipe_pf1 != -1) {
          let marca_modelo = $("#pf1 div:contains('Marca/Tipo do Veículo'):gt(0)").index();
          let anofab_mod = $("#pf1 div:contains('Ano Fab/Mod'):gt(0)").index();

          __marca_modelo = $("#pf1 div:eq(" + (marca_modelo + 1) + ")").text();
          __anofab_mod = $("#pf1 div:eq(" + (anofab_mod + 1) + ")").text();

          // console.log('Marca modelo: ', __marca_modelo.substr(8, __marca_modelo.length - 23));
          // console.log('Ano Fab: ', __anofab_mod.substr((__anofab_mod.length - 15)));
        }

        if (fipe_pf2 != -1) {
          let marca_modelo = $("#pf2 div:contains('Marca/Tipo do Veículo'):gt(0)").index();
          let anofab_mod = $("#pf2 div:contains('Ano Fab/Mod'):gt(0)").index();

          __marca_modelo = $("#pf2 div:eq(" + (marca_modelo + 1) + ")").text();
          __anofab_mod = $("#pf2 div:eq(" + (anofab_mod + 1) + ")").text();

          // console.log('Marca modelo: ', __marca_modelo.substr(8, __marca_modelo.length - 23));
          // console.log('Ano Fab: ', __anofab_mod.substr((__anofab_mod.length - 15)));
        }


        let xpto = {
          'cpf': __cpf.substr(__cpf.length - 12),
          'name': __nome_segurado.substr(0, (__nome_segurado.length - 12)),
          'insurer': 'LIBERTY',
          'apoliceNumber': __numero_apolice.substr(0, 13),
          'validity': __vigencia.substr(0, 51),
          'classification': 1,
          'input': __valor_parcela.substr(34),
          'value': __valor_parcela.substr(34),
          'totalOfPortions': __numero_parcelas,
          'paymentForm': __tipo_cobranca,

          'portion': __valor_parcela.substr(34),
          'date': desaoStart.substr(0, 10),

          'portionValue': __valor_parcela.substr(34),
          'veichle': __marca_modelo.substr(8, __marca_modelo.length - 23),
          'board': melhora_placa.substr(0, 7),
          'yearOfManufacture': __anofab_mod.substr((__anofab_mod.length - 15)),
          'yearOfModel': __anofab_mod.substr((__anofab_mod.length - 15))
        }

        var model_de_criacao = use('App/Models/Liberty');

        var created =   model_de_criacao.create(xpto);
        return created
      } else {
        console.log('Error to fectch URL data');
      }
    })
  }

  /**
   * Display a single liberty.
   * GET liberties/:id
   */
  async show({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Render a form to update an existing liberty.
   * GET liberties/:id/edit
   */
  async edit({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Update liberty details.
   * PUT or PATCH liberties/:id
   */
  async update({
    params,
    request,
    response
  }) {}

  /**
   * Delete a liberty with id.
   * DELETE liberties/:id
   */
  async destroy({
    params,
    request,
    response
  }) {}
}

module.exports = LibertyController
