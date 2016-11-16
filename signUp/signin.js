var http  = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var querystring = require("querystring");
var arr = []; // 存储用户的json对象

/*运行*/
start();

/*读取data.txt中的用户信息*/
function readData() {
	fs.readFile("data.txt", function(err, data) {
		if (err) {
			console.error(error);
		}
		data = data.toString();
		var info = data.split('\n');
		for (var i = 0; i < info.length; i++) {
			if (info[i] != "{}") {
				try {
					arr.push(JSON.parse(info[i]));
				} catch(e) {}
			}
		}
	});
}

/*动态生成HTML*/
function createDynamicHTML(response, username, studentid, phone, email) {
	response.writeHead(200, {'Content-Type':'text/html'});
	response.write("<!DOCTYPE \"html\">");
	response.write("<html>");
	response.write("<head>");
	response.write("<meta charset=\"UTF-8\">");
	response.write("<title>Hello World Page</title>");
	response.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"index.css\">");
	response.write("</head>");
	response.write("<body>");
	response.write("<h1>详情</h1>");
	response.write("<div>");
	response.write("<h2>用户详情</h2>");
	response.write("<p>用户名：");
	response.write(username);
	response.write("</p>");
	response.write("<p>学号：");
	response.write(studentid);
	response.write("</p>");
	response.write("<p>电话：");
	response.write(phone);
	response.write("</p>");
	response.write("<p>邮箱：");
	response.write(email);
	response.write("</p>");
	response.write("</div>");
	response.write("</body>");
	response.write("</html>");
	response.end();
}

/*处理注册请求*/
function handleResister(request, response, post, arr) {
	var _post = querystring.parse(post);
	var isFound = 0;
	var error_info = "";
	for (var i = 0; i < arr.length; i++) {
		if (_post.username == arr[i].username) {
			isFound = 1;
			error_info += "Username exist!";
			break;
		}
		if (_post.studentid == arr[i].studentid) {
			isFound = 1;
			error_info += "Studentid exist!";
			break;
		}
		if (_post.phone == arr[i].phone) {
			isFound = 1;
			error_info += "Phone exist!";
			break;
		}
		if (_post.email == arr[i].email) {
			isFound = 1;
			error_info += "Email exist!";
			break;
		}
	}
	if (isFound === 0) {
		arr.push(_post);
		console.log("_post:"+_post);
		var str = JSON.stringify(_post)+"\n";
		fs.appendFile('data.txt', str, 'utf8', function(err) {
			if (err) {
				console.error(err);
			}
		});
		createDynamicHTML(response, _post.username, _post.studentid, _post.phone, _post.email);
	} else {
		fs.readFile(__dirname+"/"+"index.html", function(err, data) {
			if (err) {
				console.error(err);
			}
			response.writeHead(200, {'Content-Type':'text/html'});
			response.write(error_info);
			response.end(data);
		});
		console.log(error_info);
	}
}

/*处理访问请求*/
function handleVisitor(request, response, arr) {
	var pathname = __dirname + url.parse(request.url).pathname;
	console.log("pathname:"+pathname);
	var _query = url.parse(request.url).query;
	var query = null;
	if (_query != null)
		query = _query.substr(_query.indexOf('=')+1);
	console.log("query:"+query);
	/*判断是否有查询对象*/
	if (query != null) {
		console.log("Begin query");
		var flag = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].username == query) {
				flag = 1;
				createDynamicHTML(response, arr[i].username, arr[i].studentid, arr[i].phone, arr[i].email);
				break;
			}
		}
		if (flag == 0) {
			fs.readFile(__dirname+"/"+"index.html", function(err, data) {
				if (err) {
					console.error(err);
				}
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end(data);
			});
		}
	/*没有查询对象则默认显示index.html*/
	} else {
		console.log("Begin index");
		if (path.extname(pathname) == "") {
			pathname += '/';
		}
		if (pathname.charAt(pathname.length-1) == '/') {
			pathname += "index.html";
		}
		fs.stat(pathname, function(error, stats) {
			if (error) {
				console.error(error);
			}
			if (stats) {
				switch(path.extname(pathname)) {
					case ".html":
						response.writeHead(200, {'Content-Type':'text/html'});
						break;
					case ".css":
						response.writeHead(200, {'Content-Type':'text/css'});
						break;
					case ".js":
						response.writeHead(200, {'Content-Type':'text/javascript'})
				}
			}
			fs.readFile(pathname, function(err, data) {
				if (err) {
					console.error(err);
				}
				response.end(data);
			});
		});
	}
}

/*服务器的接受函数*/
function onRequest(request, response) {
	var post = "";
	request.on('data', function(chunk) {
		post += chunk;
	});
	request.on('end', function() {
		if (post !== "") handleResister(request, response, post, arr);
		post = "";
	});
	handleVisitor(request, response, arr);
}

/*启动函数*/
function start() {
	readData();
	http.createServer(onRequest).listen(8000);
	console.log("Server running at http://127.0.0.1:8000/");
}