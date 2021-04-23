const Editor = require('./editor');


window.editor = new Editor ();

window.onload = () => {
    window.editor.open("index.html")
}


