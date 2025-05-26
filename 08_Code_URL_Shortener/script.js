const shortBtn = document.getElementById('short-btn');
const reloadBtn = document.getElementById('reload-btn');

shortBtn.addEventListener('click', shortenUrl); // Fixed function name

function shortenUrl(){
    var originalUrl = document.getElementById("originalUrl").value;
    var apiUrl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(originalUrl);
    
    const shortenedUrlTextarea = document.getElementById('shortenedUrl'); // Declared with const

    fetch(apiUrl)
    .then(response => response.text())
    .then(data => {
        shortenedUrlTextarea.value = data;
    })
    .catch(error => {
        shortenedUrlTextarea.value = "Error: Unable to shorten URL!";
    });
}

reloadBtn.addEventListener('click', () => {
    location.reload();
});