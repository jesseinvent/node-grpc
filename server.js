const grpc = require("grpc");

const protoLoader = require("@grpc/proto-loader");

// Compiles proto file
const packageDef = protoLoader.loadSync("todo.proto", {});

// Load package definition into a gRPC object
const grpcObject = grpc.loadPackageDefinition(packageDef);

// Get todo package
const todoPackage = grpcObject.todoPackage;

// Create gRPC server
const server = new grpc.Server();

server.bind("0.0.0.0:4000", grpc.ServerCredentials.createInsecure());

console.log("gRPC server running on localhost:4000");

// Add services to server
server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream: readTodosStream,
});

const todos = [];

function createTodo(call, callback) {
  const todoItem = {
    id: todos.length + 1,
    text: call.request.text,
  };
  todos.push(todoItem);

  callback(null, todoItem);
}

// Return todos array
function readTodos(call, callback) {
  callback(null, { items: todos });
}

// Stream todo to client
function readTodosStream(call, callback) {
  todos.forEach((todo) => call.write(todo));
  call.end();
}

// Start server
server.start();
