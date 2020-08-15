var http = require("http");
var fs = require('fs');

function getType(_url) {
  var types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml; charset=utf-8"
  }
  for (var key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}

var server = http.createServer(function (req, res) {
    if (req.url == "/.env") return;
    if (req.url == "//") return;
  var url = "views" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, {"Content-Type": getType(url)});
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Web is ready.");
});