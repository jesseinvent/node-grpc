# Nodejs gRPC demo

Basic demo of the gRPC client - server communication modes in Nodejs.
## Pros of gRPC:
- Uses HTTP2 & Protocol buffers
- Fast & compact because data are sent in protocol buffers (binary format)
- One Client Library per langauge
- Progress Feedback (upload)
- Cancel Request (H2)

## Cons of gRPC:
- Schema retrictions
- Thick Client
- Low support
- Poor error handling
- No native browser support
- No timeouts (pub/sub)

Clone repo:
```
$ git clone https://github.com/jesseinvent/node-grpc
```

Install packages:
```
$ npm install
```

Install Proto compiler:

[Click to learn how to install](https://grpc.io/docs/protoc-installation/)

Run server:
```
$ npm run start
```

Run Client:
```
$ npm run client
```