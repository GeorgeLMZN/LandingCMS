module.exports = class DOMHelper {

    static parseStringToDom (str) {
        const parser = new DOMParser();

        return parser.parseFromString(str, "text/html");
    }

    static serializeDomToString (dom) {

        const serializer = new XMLSerializer();

        return serializer.serializeToString(dom);

    }

    static unwrapTextNodes (dom) {

        dom.body.querySelectorAll('text-editor').forEach((e) => {
            e.parentNode.replaceChild(e.firstChild, e)
        });

    }

    static wrapTextNodes (dom) {

        const body = dom.body;

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

        textNodes.forEach((node, i) => {

            const wrapper = dom.createElement('text-editor');

            node.parentNode.replaceChild(wrapper, node);

            wrapper.appendChild(node);

            wrapper.contentEditable = "true";

            wrapper.setAttribute('nodeid', i)
        })

        return dom;
    }
}