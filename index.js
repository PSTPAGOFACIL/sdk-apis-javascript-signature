/**
 * Clase que se encarga de tener los requerimientos para firmar el mensaje
 */
const crypto = require('crypto');

class Signature {
    constructor() {

    }

    static signPayload(payload, secret, prefix = "x_", signature = "signature") {
        //El arreglo SIEMPRE debe de estar ordenado antes de firmar.
        let sortedArray = Object.entries(payload).sort();
        console.log("ARREGLO: ", payload);
        let payloadFirmado = "";
        let firma = prefix + signature;
        let mensaje = "";
        for (let index = 0; index < sortedArray.length; index++) {
            console.log(sortedArray[index]);
            if (sortedArray[index][0] != firma && typeof sortedArray[index][1] !== 'object') {
                mensaje += sortedArray[index][0] + sortedArray[index][1];
            }
        }
        let hmac = crypto.createHmac('sha256', secret);
        hmac.setEncoding('hex');
        hmac.write(mensaje);
        hmac.end();
        payloadFirmado = hmac.read();
        return payloadFirmado;
    }


};

module.exports = Signature;