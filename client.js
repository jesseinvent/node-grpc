const grpc = require("grpc");

const protoLoader = require("@grpc/proto-loader");

// Compiles proto file
const packageDef = protoLoader.loadSync("todo.proto", {});

// Load package definition into a gRPC object
const grpcObject = grpc.loadPackageDefinition(packageDef);

// Get todo package
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];

const client = new todoPackage.Todo(
  "localhost:4000",
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: text,
  },
  (err, response) => {
    // console.log(`Received from server ${JSON.stringify(response)}`);
  }
);

// client.readTodos({}, (err, response) => {
//   console.log(`Read from server ${JSON.stringify(response)}`);

//   if (!response) return false;

//   response.items.forEach((item) => console.log(item.text));
// });

// Accept todo stream
const call = client.readTodosStream();

call.on("data", (item) => {
  console.log(`Received item from server ${JSON.stringify(item)}`);
});

call.on("end", (e) => console.log("Server done!"));
