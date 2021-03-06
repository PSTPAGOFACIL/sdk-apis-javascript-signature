<p align="center">
  <a href="" rel="noopener">
 <img height=200px src="assets/images/1-Logo_cuadrado.png" alt="Pago Fácil SpA Examples"></a>
</p>

<h3 align="center"><a href="https://github.com/PSTPAGOFACIL/sdk-apis-javascript-signature" target = "_blank">@pagofacil/sdk-apis-javascript-signature</a></h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/PSTPAGOFACIL/sdk-apis-javascript-signature/)
[![GitHub Issues](https://img.shields.io/github/issues/PSTPAGOFACIL/sdk-apis-javascript-signature/.svg)](https://github.com/PSTPAGOFACIL/sdk-apis-javascript-signature//issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/PSTPAGOFACIL/sdk-apis-javascript-signature.svg)](https://github.com/PSTPAGOFACIL/sdk-apis-javascript-signature/pulls)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
</div>

---

# @pagofacil/sdk-apis-javascript-signature

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Installing NPM](#installing_npm)
- [Using the library](#usage)

## About <a name = "about"></a>

This library will help you to sign the message that you send to Pago Fácil API Server

## Getting Started <a name = "getting_started"></a>


### Installing the NPM Library <a name = "installing_npm"></a>
```
npm i --save @pagofacil/sdk-apis-javascript-signature
```

### Installing the Library from GITHUB <a name = "installing_github"></a>
```
npm i --save PSTPAGOFACIL/sdk-apis-javascript-signature
```

## Usage <a name = "usage"></a>

Example creating a transaction in Pago Fácil using the SDK

```
const ApiPagoFacil = require('@pagofacil/api_pago_facil');
const Signature = require('@pagofacil/sdk-apis-javascript-signature');

const tokenService = process.env.TOKEN_SERVICE;
const tokenSecret = process.env.TOKEN_SECRET;

const uuid = require("uuid/v4");
var trx = new ApiPagoFacil.TrxsApi();


let postBodyTrx = {
  x_account_id: tokenService,
  x_amount: 1000,
  x_currency: "CLP",
  x_reference: uuid(),
  x_customer_email: "emaildelcliente@pagofacil.cl",
  x_url_complete: "https://postman-echo.com/post",
  x_url_cancel: "https://postman-echo.com/post",
  x_url_callback: "https://postman-echo.com/post",
  x_shop_country: "CL",
  x_session_id: uuid(),
}

const x_signature = Signature.signPayload(postBodyTrx, tokenSecret);//Generamos la firma del payload del mensaje
postBodyTrx.x_signature = x_signature; //Asociamos la firma al payload que enviaremos

//Le damos el contenido del body al SDK
const optsTrx = {
  'postBody' : postBodyTrx
}

var callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ', response.body.data);
  }
};

trx.trxsPost(optsTrx,callback);
```