function loadNewContent(page) {
    // URL from which to fetch new content
    const url = page;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('There was a problem with fetching the new content:', error);
        });
}

function downloadAsZip() {
    var zip = new JSZip();
    const files = [
        { url: "https://f70fc4d7-9498-4069-a990-597d5249c30e-00-1a1gamytbovqb.riker.replit.dev/index.html", path: "index.html" },
        { url: "https://f70fc4d7-9498-4069-a990-597d5249c30e-00-1a1gamytbovqb.riker.replit.dev/style.css", path: "style.css" },
        { url: "https://f70fc4d7-9498-4069-a990-597d5249c30e-00-1a1gamytbovqb.riker.replit.dev/app.js", path: "app.js" }
    ];

    Promise.all(files.map(file => 
        fetch(file.url).then(response => {
            if (!response.ok) throw new Error(`Failed to load ${file.url}`);
            return response.blob().then(blob => ({blob: blob, file: file}));
        })
    )).then(results => {
        results.forEach(result => {
            zip.file(result.file.path, result.blob);
        });
        return zip.generateAsync({type: "blob"});
    }).then(content => {
        saveAs(content, "website.zip");
    }).catch(error => {
        console.error("Error downloading files:", error);
    });
}
