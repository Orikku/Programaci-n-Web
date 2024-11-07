function convertJSToTXT() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecciona un archivo JS.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const jsContent = event.target.result;

        // Crear un archivo TXT y ofrecer la descarga
        const blob = new Blob([jsContent], { type: 'text/plain' });
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = file.name.replace('.js', '.txt');
        downloadLink.style.display = 'block';
        downloadLink.textContent = 'Descargar archivo TXT';
    };

    reader.readAsText(file);
}

function showHiddenSection() {
    document.getElementById('mainSection').style.display = 'none'; // Oculta la sección principal
    document.getElementById('goToNewViewButton').style.display = 'none'; // Oculta el botón "Ir a la Otra Vista"
    document.getElementById('hiddenSection').style.display = 'block'; // Muestra la nueva sección
}

function showMainSection() {
    document.getElementById('hiddenSection').style.display = 'none'; // Oculta la nueva sección
    document.getElementById('mainSection').style.display = 'block'; // Muestra la sección principal
    document.getElementById('goToNewViewButton').style.display = 'block'; // Muestra el botón "Ir a la Otra Vista"
}