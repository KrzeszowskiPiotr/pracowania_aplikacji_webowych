
let http = require('http');
let fs = require('fs');
let path = require('path');

http.createServer(function (req, res) {
    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Strona glowna');
            break;
        case '/JSONdoc':
            res.writeHead(200, {'Content-Type': 'application/json'});
            const jsonText = "dzejson text";
            res.end(JSON.stringify(jsonText));
            break;
        case '/HTML':
            const html = `
                <!DOCTYPE html>
                <html>
                <head><title>HTML z Node.js</title></head>
                <body><h1>To jest HTML wygenerowany w Node.js</h1></body>
                </html>
            `;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
            break;
        case '/plik':
            const filePath = path.join(__dirname, 'static.html');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Błąd serwera');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Nie znaleziono strony');
            break;
    }
}).listen(8081);
