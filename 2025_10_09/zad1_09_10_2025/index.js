const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); // <- dodane

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // Obsługa ścieżki GET /get_params
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
        // Ścieżki niezdefiniowane wcześniej – szukamy pliku w /assets
        const assetPath = path.join(__dirname, 'assets', pathname);

        // Zapobiega wyjściu poza katalog (np. przez ../)
        if (!assetPath.startsWith(path.join(__dirname, 'assets'))) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Nieautoryzowany dostęp' }));
            return;
        }

        fs.access(assetPath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Plik nie istnieje' }));
                return;
            }

            const mimeType = mime.lookup(assetPath) || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': mimeType });
            const readStream = fs.createReadStream(assetPath);
            readStream.pipe(res);
        });
    }
});

const PORT = 8001;
server.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
