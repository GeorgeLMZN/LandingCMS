require('./iframe-load');
const axios = require('axios');

module.exports = class Editor {
    constructor() {
        this.iframe = document.querySelector('iframe');
    }
    open (page) {
        axios
            .get("../" + page)
            .then((response) => this.parseStringToDom(response.data))
            .then(this.wrapTextNodes);
     /*   this.iframe.load('../' + page, () => {

            const body = this.iframe.contentDocument.body;

            let textNodes = [];

            function recursionSearch (element) {
                element.childNodes.forEach((node) => {
                    if(node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {
                        textNodes.push(node)
                    }else {
                        recursionSearch(node);
                    }
                })
            }
            recursionSearch(body);

            textNodes.forEach((node) => {

                const wrapper = this.iframe.contentDocument.createElement('text-editor');

                node.parentNode.replaceChild(wrapper, node);

                wrapper.appendChild(node);

                wrapper.contentEditable = "true";
            })

        });*/
    }

    parseStringToDom (str) {
        const parser = new DOMParser();

        return parser.parseFromString(str, "application/xml");
    }

    wrapTextNodes (dom) {

            const body = dom.body;

            console.log(body)

            let textNodes = [];

            function recursionSearch (element) {
                element.childNodes.forEach((node) => {
                    if(node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {

                        textNodes.push(node)

                    }else {

                        recursionSearch(node);

                    }
                })
            }
            recursionSearch(body);

            textNodes.forEach((node) => {

                const wrapper = dom.createElement('text-editor');

                node.parentNode.replaceChild(wrapper, node);

                wrapper.appendChild(node);

                wrapper.contentEditable = "true";
            })

        return dom;
    }
}