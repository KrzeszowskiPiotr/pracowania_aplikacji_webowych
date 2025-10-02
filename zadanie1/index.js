const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/get_params' && req.method === 'GET') {
        const queryParams = parsedUrl.query;


        console.log('Odebrane parametry GET:', queryParams);


        const paramsArray = Object.entries(queryParams).map(([key, value]) => ({
            key,
            value
        }));


        const timestamp = Date.now();
        const filename = `params_${timestamp}.json`;
        const filepath = path.join(__dirname, filename);


        fs.writeFile(filepath, JSON.stringify(paramsArray, null, 2), (err) => {
            if (err) {
                console.error('Błąd zapisu do pliku:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Błąd serwera przy zapisie pliku' }));
                return;
            }

            console.log(`Zapisano plik: ${filename}`);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: 'ok' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Nie znaleziono ścieżki' }));
    }
});

const PORT = 8001;
server.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
