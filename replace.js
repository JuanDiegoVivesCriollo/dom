const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.astro') || file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Convert 'Transport ' or 'transport ' selectively, preserving URLs
    content = content.replace(/DOM Transport/g, 'DOM Transsport')
                     .replace(/DOM transport/g, 'DOM transsport')
                     .replace(/>([^<]*)Transport([^<]*)</g, (m) => m.replace(/Transport/g, 'Transsport').replace(/transport/g, 'transsport'))
                     .replace(/'Transport/g, "'Transsport")
                     .replace(/"Transport/g, '"Transsport')
                     .replace(/ Transport /g, ' Transsport ')
                     .replace(/ transport /g, ' transsport ')
                     .replace(/professional transport/g, 'professional transsport')
                     .replace(/Transport,/g, 'Transsport,')
                     .replace(/transport,/g, 'transsport,')
                     .replace(/Transport\./g, 'Transsport.')
                     .replace(/transport\./g, 'transsport.')
                     .replace(/transport\b/gi, (match) => {
                        // Skip if it is part of URL or variable like transportJsonLd
                        if (match.toLowerCase() === 'transport') {
                            return match === 'Transport' ? 'Transsport' : 'transsport';
                        }
                        return match;
                     });

    // Fixes for things we should NOT replace (HTML attributes, IDs, URLs)
    content = content.replace(/transsport-services/g, 'transport-services'); // Revert url
    content = content.replace(/id="transsport"/g, 'id="transport"');
    content = content.replace(/href="\/services#transsport"/g, 'href="/services#transport"');
    content = content.replace(/href='\/services#transsport'/g, "href='/services#transport'");
    content = content.replace(/href="\/transport-services#transsport"/g, 'href="/transport-services#transport"');
    content = content.replace(/href='\/transport-services#transsport'/g, "href='/transport-services#transport'");
    content = content.replace(/transsportJson/g, 'transportJson'); // Revert js variable

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated:', file);
        changedFiles++;
    }
});
console.log('Total files updated:', changedFiles);
