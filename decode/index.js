;(function(d) {

var textarea = d.getElementsByTagName('textarea')[0];

textarea.oninput = function() {
    this.value = decodeURIComponent( this.value );
};

textarea.focus();

})(document)
