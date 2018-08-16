'use strict'

console.log('Begning Bradesco data extraction ----->');

const curl = require('curl');
const jsdom = require("jsdom");

//const  connection  = require('../../../connection')
const mysql_env_vars = {
  host: "localhost",
  user: "root",
  password: "",
  database: "api"
}
var mysql = require('mysql');

const client = use('App/Models/Cliente');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api"
});


/**
 * Resourceful controller for interacting with bradescos
 */
class BradescoController {
  /**
   * Show a list of all bradescos.
   * GET bradescos
   */
  async index({
    request,
    response,
    view
  }) {}

  /**
   * Render a form to be used for creating a new bradesco.
   * GET bradescos/create
   */
  async create({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new bradesco.
   * POST bradescos
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

        //pagina 5
        let seguradora = $("#pf5 div:contains('Nome da Seguradora'):gt(0)").index();
        let numero_apolice = $("#pf5 div:contains('Apólice Nº'):gt(0)").index();
        let vigencia = $("#pf5 div:contains('das  24:00  horas  do  dia'):gt(0)").index();
        let nome = $("#pf5 div:contains('Nome'):gt(1)").index();
        let cpf = $("#pf5 div:contains('CPF/CNPJ'):gt(0)").index();

        //Pagina 6
        let nascimento = $("#pf6 div:contains('Data de Nascimento'):gt(0)").index();

        //Pagina 7
        let veiculo = $("#pf7 div:contains('Marca/Tipo Veículo'):gt(0)").index();
        let ano_fab_modelo = $("#pf7 div:contains('Ano Fab./Mod.'):gt(0)").index();
        let placa = $("#pf7 div:contains('Licença'):gt(0)").index();

        //Pagina 9
        let forma_pagamento = $("#pf9 div:contains('Tipo de Cobrança'):gt(0)").index();
        let numero_parcelas = $("#pf9 div:contains('Nº de Prestações'):gt(0)").index();
        let vencimento_parcelas = $("#pf9 div:contains('Datas de Vencimento das Presta'):gt(0)").index();
        let primeira_prestacao = $("#pf9 div:contains('1ª Presta'):gt(0)").index();

        //PF 5
        let __seguradora = $("#pf5 div:eq(" + (seguradora + 1) + ")").text();
        __seguradora = __seguradora.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        let __numero_apolice = $("#pf5 div:eq(" + (numero_apolice + 3) + ")").text();
        let __vigencia = $("#pf5 div:eq(" + (vigencia) + ")").text();
        let __vigencia_end = $("#pf5 div:eq(" + (vigencia + 1) + ")").text();

        let __nome = $("#pf5 div:eq(" + (nome + 1) + ")").text();
        __nome =
          __nome
        let __cpf = $("#pf5 div:eq(" + (cpf + 1) + ")").text();
        __cpf = __cpf.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        //PF 6
        let __nascimento = $("#pf6 div:eq(" + (nascimento + 1) + ")").text();

        //PF 7
        let __veiculo = $("#pf7 div:eq(" + (veiculo + 1) + ")").text();
        let __ano_fab_modelo = $("#pf7 div:eq(" + (ano_fab_modelo + 1) + ")").text();
        let __placa = $("#pf7 div:eq(" + (placa + 1) + ")").text();
        let boards = (__placa.substr(__placa.length - 7)).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        //PF 9
        let __forma_pagamento = $("#pf9 div:eq(" + (forma_pagamento + 1) + ")").text();
        __forma_pagamento = (__forma_pagamento.substr(0, 10)).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        let __numero_parcelas = $("#pf9 div:eq(" + (numero_parcelas + 2) + ")").text();
        let totalOfPortions = (__numero_parcelas.substr(0, 3)).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        let portions = (__numero_parcelas.substr(0, 3)).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        let portionValue = (__numero_parcelas.substr(__numero_parcelas.length - 8)).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');



        let value_of_portions = __numero_parcelas.substr(__numero_parcelas.length - 8)

        value_of_portions = value_of_portions.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        let __vencimento_parcelas = $("#pf9 div:eq(" + (vencimento_parcelas - 1) + ")").text();
        let __primeira_prestacao = $("#pf9 div:eq(" + (primeira_prestacao + 1) + ")").text();
        __primeira_prestacao = __primeira_prestacao.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        __numero_apolice = __numero_apolice.substr(0, 6)
        __numero_apolice = __numero_apolice.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        var xpto = {
          'cpf': __cpf,
          'name': __nome,
          'insurer': __seguradora,
          'apoliceNumber': __numero_apolice,
          'validity': __vigencia + ' ' + __vigencia_end,
          'classification': 1,
          'input': __primeira_prestacao,
          'value': value_of_portions,
          'totalOfPortions': totalOfPortions,
          'paymentForm': __forma_pagamento,
          'portion': portions,
          'date': __vencimento_parcelas,
          'portionValue': portionValue,
          'veichle': __veiculo,
          'board': boards,
          'yearOfManufacture': __ano_fab_modelo.substr(0, 4),
          'yearOfModel': __ano_fab_modelo.substr(5, 5),
        }
        const mp = use('App/Models/Bradesco');

        var created = mp.create(xpto);
        console.log(created)

        let addNewClient = `INSERT INTO clients (name, cpf, user_id) VALUES ("${xpto.name}", "${xpto.cpf}", 1)`

        connection.connect();

        var idDoClienteJaExistenteComOCPFInformado;
        connection.query(`select id from clients where cpf = "${xpto.cpf}" LIMIT 1`, function (error, results, fields) {
          idDoClienteJaExistenteComOCPFInformado = results;
        });

        var clientId;

        setTimeout(() => {
          idDoClienteJaExistenteComOCPFInformado != []   || idDoClienteJaExistenteComOCPFInformado != ''?

            console.log('tem o cliente', clientId = idDoClienteJaExistenteComOCPFInformado)

            :
            connection.query(addNewClient, (error, result) => {
              clientId = result.insertId;
            });
          let insertInsuranceAnd = `insert into auto_insurances
                      (
                        insurer,
                        apoliceNumber,
                        cpf,
                        validity,
                        classification,
                        input,
                        value,
                        totalOfPortions,
                        paymentForm,
                        portion,
                        date,
                        portionValue,
                        client_id,
                        veichle,
                        board,
                        yearOfManufacture,
                        yearOfModel
                      )
                      VALUES (
                        "${xpto.insurer}",
                        "${xpto.apoliceNumber}",
                        "${xpto.cpf}",
                        "${xpto.validity}",
                        "${xpto.classification}",
                        "${xpto.input}",
                        "${xpto.value}",
                        "${xpto.totalOfPortions}",
                        "${xpto.paymentForm}",
                        "${xpto.portion}",
                        "${xpto.date}",
                        "${xpto.portionValue}",
                        "1",
                        "${xpto.veichle}",
                        "${xpto.board}",
                        "${xpto.yearOfManufacture}",
                        "${xpto.yearOfModel}")`;
          connection.query(insertInsuranceAnd, (err, res) => {
            if (err) throw err;
            console.log(err)
            console.log(res)
          })

        }, 999)
        connection.end();

        response.send(created)
        //return created
      } else {
        console.log('Error to fectch URL data');
      }
    })

  }

  /**
   * Display a single bradesco.
   * GET bradescos/:id
   */
  async show({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Render a form to update an existing bradesco.
   * GET bradescos/:id/edit
   */
  async edit({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Update bradesco details.
   * PUT or PATCH bradescos/:id
   */
  async update({
    params,
    request,
    response
  }) {}

  /**
   * Delete a bradesco with id.
   * DELETE bradescos/:id
   */
  async destroy({
    params,
    request,
    response
  }) {}


  async xipola({
    request,
    response
  }) {
    const {
      cpf,
      name
    } = request.all();

    let data = {
      'cpf': cpf,
      'name': name
    }

    let lastCreated = client.create(data)
    return lastCreated;
  }
}

module.exports = BradescoController
