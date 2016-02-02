var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var dir = "";
var port = process.env.PORT || 2000;

//TODO Once its extremely large, decouple the server from routing / requests

var server = {
	startServer: function () {
		var _this = this;
		http.createServer(function (req, res) {
			var extname = path.extname(url.parse(req.url).pathname);
			var file = (url.parse(req.url).pathname).slice(1, this.length);
			switch(extname) {
				case ".js": contentType = "text/javascript";
					file = dir+file;
				break;
				case ".ico": contentType = "image/x-icon";
				break;
				default: contentType = "text/html";
					file = dir+"index.html";
			}
			//If the url doesnt contain ajax (me editing the blog/posts)
			//Then serve the correct pages
			if(req.url.indexOf("ajax") === -1 ) {
				res.writeHead(200, {"Content-Type": contentType});
				res.end(fs.readFileSync(file));
			}
		}).listen(port, console.log("Server running on port 2000"));
	}

}


module.exports = server;
