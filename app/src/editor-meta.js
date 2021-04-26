module.exports = class EditorMeta {
    constructor(virtualDom) {

        this.title = virtualDom.head.querySelector('title') || virtualDom.head.appendChild(virtualDom.createElement("title"));


        this.keyword = virtualDom.head.querySelector(`meta[name="keywords"]`);

        if(!this.keyword) {

            this.keyword = virtualDom.head.appendChild(virtualDom.createElement("meta"));

            this.keyword.setAttribute("name", "keywords");
        }


        this.description = virtualDom.head.querySelector(`meta[name="description"]`);

        if(!this.description) {

            this.description = virtualDom.head.appendChild(virtualDom.createElement("meta"));

            this.description.setAttribute("name", "description");
        }

    }

    getMeta () {
        return {

            title : this.title.innerHTML,

            keyword: this.keyword.getAttribute("content"),

            description: this.description.getAttribute("content"),

        }
    }

    setMeta (title, keywords, description ) {

            this.title.innerHTML = title;

            this.keyword.setAttribute("content", keywords);

            this.description.setAttribute("content", description);

    }
}