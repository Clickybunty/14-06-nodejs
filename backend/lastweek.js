import http from "http";

const server = http.createServer((req, res) => {
  console.log("request was made: " + req.url);
  console.log(req.url);
  console.log(req.method);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
