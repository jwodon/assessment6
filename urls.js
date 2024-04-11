const fs = require('fs');
const http = require('http');
const https = require('https');

const filename = process.argv[2];

function processURLs(err, data) {
    if (err) {
        console.error(`Failed to read the file: ${err.message}`);
        process.exit(1);
    }

    const urls = data.split('\n');

    urls.forEach((url) => {
        if (!url) return;

        const protocol = url.startsWith('https') ? https : http;
        const hostname = new URL(url).hostname;

        protocol
            .get(url, (response) => {
                let htmlContent = '';

                response.on('data', (chunk) => {
                    htmlContent += chunk;
                });

                response.on('end', () => {
                    fs.writeFile(hostname, htmlContent, (err) => {
                        if (err) {
                            console.error(`Failed to write to file for ${url}: ${err.message}`);
                        } else {
                            console.log(`Wrote to ${hostname}`);
                        }
                    });
                });
            })
            .on('error', (error) => {
                console.error(`Couldn't download ${url}: ${error.message}`);
            });
    });
}

if (!filename) {
    console.log('Usage: node urls.js FILENAME');
    process.exit(1);
}

fs.readFile(filename, 'utf8', processURLs);

console.log('Processing URLs...');
