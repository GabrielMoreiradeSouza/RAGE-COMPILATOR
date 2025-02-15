function runCode() {
    const code = document.getElementById("code").value;
    fetch('/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("console").innerText = data.output;
    })
    .catch(error => {
        console.error("Erro ao processar:", error);
    });
}
