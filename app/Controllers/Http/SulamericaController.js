'use strict'
console.log('Begning data extraction ----->');

const curl = require('curl');
const jsdom = require("jsdom");
/**
 * Resourceful controller for interacting with sulamericas
 */
class SulamericaController {
  /**
   * Show a list of all sulamericas.
   * GET sulamericas
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new sulamerica.
   * GET sulamericas/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new sulamerica.
   * POST sulamericas
   */
  async store ({ request, response }) {

    const { url } = request.all();

    curl.get(url, null, (err, resp, body) => {
      if(resp.statusCode == 200){
        parseData(body);
      } else {
        console.log('Error to fectch URL data');
      }
    })


    

  }

  async parseData(html) {
    const { JSDOM } = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);

    //pagina 1
    let proposta = $("#pf1 div:contains('Proposta nº:'):gt(0)").index();
    let apolice = $("#pf1 div:contains('Apólice nº'):gt(0)").index();    
    
    let emissao = $("#pf1 div:contains('Data de Emiss'):gt(0)").index()
    let viegencia = $("#pf1 div:contains('Vigência: '):gt(0)").index()
    let segurado = $("#pf1 div:contains('Segurado:'):gt(0)").index()
    let cpf = $("#pf1 div:contains('CPF: '):gt(0)").index()
    let endereco = $("#pf1 div:contains('End Segurado'):gt(0)").index()
    let uf_municipio = $("#pf1 div:contains('UF Município de Resid'):gt(0)").index()
    let cep = $("#pf1 div:contains('CEP:'):gt(0)").index()

    //Veiculo
    let veiculo = $("#pf1 div:contains('Veículo:'):gt(0)").index()
    let chassi = $("#pf1 div:contains('Chassi:'):gt(0)").index()
    let blindado = $("#pf1 div:contains('Veículo Blindado:'):gt(0)").index()
    let categoria = $("#pf1 div:contains('Categoria Tarifária'):gt(0)").index()
    let pernoite = $("#pf1 div:contains('UF Município de Pernoite'):gt(0)").index()
    let cep_pernoite = $("#pf1 div:contains('CEP: '):gt(1)").index()
    let combustivel = $("#pf1 div:contains('Tipo de Combustível: '):gt(0)").index()
    
    let garantias_grupo = $("#pf1 div:contains('GARANTIAS CONTRATADAS E PRÊMIOS'):gt(0)").index()
    

    //pagina 2
    let franquias_grupo = $("#pf2 div:contains('FRANQUIAS E DESCONTOS'):gt(0)").index()
    let forma_pagamento_premio_grande_grupo = $("#pf2 div:contains('FORMA DE PAGAMENTO DO PRÊMIO'):gt(0)").index()


    let __proposta = $("#pf1 div:eq(" + (proposta) + ")").text();    
    let __apolice = $("#pf1 div:eq(" + (apolice) + ")").text();    
    let __emissao = $("#pf1 div:eq(" + (emissao) + ")").text();
    let __viegencia = $("#pf1 div:eq(" + (viegencia) + ")").text();
    let __segurado = $("#pf1 div:eq(" + (segurado) + ")").text();
    let __cpf = $("#pf1 div:eq(" + (cpf) + ")").text();
    let __endereco = $("#pf1 div:eq(" + (endereco) + ")").text();
    let __cep = $("#pf1 div:eq(" + (cep) + ")").text();
    let __uf_municipio = $("#pf1 div:eq(" + (uf_municipio) + ")").text();
    let __veiculo = $("#pf1 div:eq(" + (veiculo) + ")").text();
    let __chassi = $("#pf1 div:eq(" + (chassi) + ")").text();
    let __blindado = $("#pf1 div:eq(" + (blindado) + ")").text();
    let __categoria = $("#pf1 div:eq(" + (categoria) + ")").text();
    let __pernoite = $("#pf1 div:eq(" + (pernoite) + ")").text();
    let __cep_pernoite = $("#pf1 div:eq(" + (cep_pernoite) + ")").text();
    let __combustivel = $("#pf1 div:eq(" + (combustivel) + ")").text();

    console.log(__proposta);
    console.log(__apolice);
    console.log(__emissao);
    console.log(__viegencia);
    console.log(__segurado);
    console.log(__cpf);
    console.log(__endereco);
    console.log(__uf_municipio);
    console.log(__cep);
    console.log(__veiculo);
    console.log(__chassi);
    console.log(__blindado);
    console.log(__categoria);
    console.log(__pernoite);
    console.log(__cep_pernoite);
    console.log(__combustivel);
    console.log("\n");
  }

  /**
   * Display a single sulamerica.
   * GET sulamericas/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing sulamerica.
   * GET sulamericas/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update sulamerica details.
   * PUT or PATCH sulamericas/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sulamerica with id.
   * DELETE sulamericas/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SulamericaController
