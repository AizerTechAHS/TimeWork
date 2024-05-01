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
