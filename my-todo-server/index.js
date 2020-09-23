const express = require("express");
const bodyParser = require("body-parser");
const httpServer = express();
var fs = require("fs");
httpServer.use(bodyParser.json());
httpServer.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
httpServer.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

httpServer.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

httpServer.get("/listTodos", (req, res) => {
  fs.readFile(__dirname + "/" + "todo.json", "utf8", (err, todoItemList) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(todoItemList);
  });
});

httpServer.post("/addTodo", (req, res) => {
  fs.readFile(__dirname + "/" + "todo.json", "utf8", (err, todoItemList) => {
    todoItemList = JSON.parse(todoItemList);
    const todo = req.body;
    const searchItem = todoItemList.find((ele) => todo.index === ele.index);

    if (searchItem === undefined) {
      todoItemList.push(req.body);
      res.writeHead(200, { "Content-Type": "application/json" });
      const result = JSON.stringify(todoItemList);
      res.end(result);

      fs.writeFile(__dirname + "/" + "todo.json", result, "utf8", (err) => {
        if (err) throw err;
      });
    } else {
      const error = { error: `Index ${searchItem.index} already present` };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(error));
    }
  });
});

httpServer.post("/updateTodo", (req, res) => {
  fs.readFile(__dirname + "/" + "todo.json", "utf8", (err, todoItemList) => {
    todoItemList = JSON.parse(todoItemList);
    const todo = req.body;
    let itemFound = false;
    todoItemList.forEach((element, index) => {
      if (element.index === todo.index) {
        todoItemList[index] = todo;
        itemFound = true;
      }
    });
    if (!itemFound) {
      todoItemList.push(todo);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    const result = JSON.stringify(todoItemList);
    res.end(result);

    fs.writeFile(__dirname + "/" + "todo.json", result, "utf8", (err) => {
      if (err) throw err;
    });
  });
});

httpServer.delete("/deleteTodo/:index", (req, res) => {
  fs.readFile(__dirname + "/" + "todo.json", "utf8", (err, todoItemList) => {
    todoItemList = JSON.parse(todoItemList);
    const deleteIndex = req.param("index");

    todoItemList.forEach((element, index) => {
      if (element.index == deleteIndex) {
        todoItemList.splice(index, 1);
      }
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    const result = JSON.stringify(todoItemList);
    res.end(result);

    fs.writeFile(__dirname + "/" + "todo.json", result, "utf8", (err) => {
      if (err) throw err;
    });
  });
});
