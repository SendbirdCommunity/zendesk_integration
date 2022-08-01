export function parseHTMLJSON(data) {

    let json = JSON.stringify(data, undefined, 1)
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

export const loading = (showLoading) => {

    if(showLoading){
        document.getElementById("wrapper").style.display = 'none'
        document.getElementById("loading").style.display = 'grid'
    } else {
        document.getElementById("wrapper").style.display = 'grid'
        document.getElementById("loading").style.display = 'none'
    }
}
