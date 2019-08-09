/*============ app.js ============*/
//1.引入第三方模块(express mysql cors session)
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// const session = require("express-session");
//引入body-parser模块
const bodyParser = require('body-parser');
// const http = require('http');
const request = require('request');

//2.配置第三方模块
//2.1配置连接池
var pool = mysql.createPool({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "tri",
});
//创建服务器
var server = express(); //
//2.2跨域:
server.use(cors({
  // origin: ["http://localhost:8080","http://127.0.0.1:8080"], //
  origin: "*", //
  credentials: true //
}));

//托管静态资源托管到public
//使用中间件static
server.use(express.static('public'));
//启动服务器
server.listen(5050);
// server.listen(8080);

//使用中间件body-parse(在路由前面)
//将post请求的数据格式化为对象
server.use(bodyParser.urlencoded({
  extended: false
}));

//路由--

// 代理转发
//--电影
//10
server.get("/api/movies10", (req, res) => {
  var url = 'http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body); // 请求成功结果
      res.send(body);
    }
  });
});
//50
server.get("/api/movies50", (req, res) => {
  var url = 'http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=50';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body); // 请求成功结果
      res.send(body);
    }
  });
});
// 详情
server.get("/api/detail", (req, res) => {
  var mid=req.query.mid;
  var url = `http://api.douban.com/v2/movie/subject/${mid}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body); // 请求成功结果
      res.send(body);
    }
  });
});