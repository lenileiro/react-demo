let grpc = require("grpc");
let grpc_promise = require('grpc-promise')
let client = require('../credentials')

async function hello(id, name, token) {
    const meta = new grpc.Metadata();
    meta.add(
        'token',
        token);

    grpc_promise.promisifyAll(client, {
        metadata: meta,
        timeout: 1000
         });
    
    let response = client.SayHello()
    .sendMessage({
        name: name,
        id: id
    })

    return response
}

module.exports = hello