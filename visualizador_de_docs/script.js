
// Prube con este link que no bloquea el frame :) : https://pdftron.s3.amazonaws.com/downloads/pdfref.pdf*/

document.addEventListener('DOMContentLoaded', () => {
    const fileUrlInput = document.getElementById('fileUrl');
    const viewButton = document.getElementById('viewButton');
    const viewerIframe = document.getElementById('viewer');

    viewButton.addEventListener('click', visualizeFile);
    
    fileUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            visualizeFile();
        }
    });

 
    function visualizeFile() {
        const url = fileUrlInput.value.trim();
        if (!url) {
            alert('Por favor, introduce una URL válida.');
            return;
        }


        const extensionMatch = url.match(/\.([0-9a-z]+)(?=[?#]|$)/i);
        const extension = extensionMatch ? extensionMatch[1].toLowerCase() : '';
        
        let sourceUrl = '';

        if (extension === 'pdf') {
            sourceUrl = url;
        } else if (['doc', 'docx', 'xls', 'xlsx'].includes(extension)) {
            sourceUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
        } else {
            alert('Tipo de archivo no compatible o URL inválida. Intenta con PDF, DOCX o XLSX.');
            viewerIframe.src = ''; 
            return;
        }
        
        viewerIframe.src = sourceUrl;
    }
});