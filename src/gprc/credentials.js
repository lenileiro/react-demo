let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");
let fs = require('fs');
const PORT = 50052
//Load the protobuf
let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("proto/hello.proto", {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })
  );

const cacert = fs.readFileSync('keys/ca.crt');
const cert = fs.readFileSync('keys/client.crt');
const key = fs.readFileSync('keys/client.key');

let credentials = grpc.credentials.createSsl(cacert, key, cert);

let client = new proto.helloworld.Greeter(`localhost:${PORT}`, credentials);

// return proto Greeter service from proto with its methods
module.exports = client