module.exports = class editorText {
    constructor(element, virtualElement) {
        this.element = element;
        this.virtualElement = virtualElement;

        this.element.addEventListener('click',() => this.onClick());

        if(this.element.parentNode.nodeName === 'A' || this.element.parentNode.tagName === 'BUTTON' ){
            this.element.addEventListener('contextmenu',(e) => this.onContextMenu(e));
        }

        this.element.addEventListener('blur',() => this.onBlur());
        this.element.addEventListener('keypress', (e) => this.onKeyPress(e));
        this.element.addEventListener('input', (e) => this.onTextEdit());
    }

    onClick () {
        this.element.contentEditable = "true";
        this.element.focus();
    }

    onBlur () {
        this.element.removeAttribute('contenteditable')
    }

    onKeyPress (event) {
       if(event.keyCode === 13){
           this.element.blur();
       }
    }

    onTextEdit () {

       this.virtualElement.innerHTML = this.element.innerHTML;

    }

    onContextMenu (e) {
        console.log(1)
        e.preventDefault();
        this.onClick();
    }
}