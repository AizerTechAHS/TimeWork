function downloadAsZip() {
    var zip = new JSZip();
    const files = [
        { url: "/index.html", path: "index.html" },
        { url: "/assets/styles/style.css", path: "assets/styles/style.css" },
        { url: "/assets/scripts/app.js", path: "assets/scripts/app.js" },
        { url: "/assets/scripts/centralize.js", path: "assets/scripts/centralize.js" }
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
