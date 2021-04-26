require('./iframe-load');
const axios = require('axios');
const DOMHelper = require('./dom-helper');
const editorText = require('./editor-text');
const EditorMeta = require('./editor-meta');

module.exports = class Editor {
    constructor() {
        this.iframe = document.querySelector('iframe');
    }
    open (page, callback) {

        this.currentPage = page;

        axios
            .get("../" + page + "?rnd" + Math.random())
            .then((response) => DOMHelper.parseStringToDom(response.data))
            .then(DOMHelper.wrapTextNodes)
            .then((dom) => {
                this.virtualDom = dom;
                return dom;
            })
            .then(DOMHelper.serializeDomToString)
            .then((html) => axios.post('./api/SaveTempPage.php', { html }))
            .then(() => this.iframe.load('../kdjsiofs82ehq8s7d77.html'))
            .then(() => axios.post('./api/deleteTempPage.php'))
            .then(() => this.enableEditing())
            .then(() => this.injectCSS())
            .then(callback)
    }

    enableEditing () {

        const iframe = this.iframe.contentDocument.body.querySelectorAll('text-editor');

        iframe.forEach((element) => {

            const id = element.getAttribute('nodeid');

            const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${id}"]`);

            new editorText(element, virtualElement)
        })

        this.metaEditor = new EditorMeta (this.virtualDom);

    }

    injectCSS () {
        const style = this.iframe.contentDocument.createElement("style");

            style.innerHTML = `
                text-editor:hover {
                    outline: 3px solid orange;
                    outline-offset: 8px;
                }
                 text-editor:focus {
                    outline: 3px solid red;
                    outline-offset: 8px;
                }
            `;

        this.iframe.contentDocument.head.appendChild(style);
    }

    save (onSuccess, onError) {
        const newDom = this.virtualDom.cloneNode(this.virtualDom);

        DOMHelper.unwrapTextNodes(newDom);

        const html = DOMHelper.serializeDomToString(newDom)

        axios
            .post('./api/SavePage.php', { pageName: this.currentPage, html })
            .then(onSuccess)
            .catch(onError)
    }

}