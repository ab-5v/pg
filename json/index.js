;(function(doc) {

var pre = doc.querySelector('.pre');
var textarea = doc.querySelector('.textarea');

textarea.oninput = function() {
    pre.innerHTML = print(JSON.parse( this.value ), [], '').join('');

};

function print (json, val, tab) {

    if (json instanceof Array) {
        val.push(d('['));
        json.forEach(function(item, i) {
            var itab = tab;
            if (i) { val.push(d(',')); }
            if (item && typeof item === 'object') {
                itab = '\t' + tab;
                val.push('\n' + itab);
            } else if (i) {
                val.push(' ');
            }
            print(item, val, itab);
        });
        if (json[json.length - 1] && typeof json[json.length - 1] === 'object') {
            val.push('\n' + tab);
        }
        val.push(d(']'))
    } else if (json && typeof json === 'object') {
        val.push(d('{') + '\n');
        Object.keys(json).forEach(function(key, i, arr) {
            if (i) { val.push(d(',') + '\n'); }
            val.push(tab + '\t', d('"'), s(key), d('"') + d(':') + ' ');
            print(json[key], val, tab + '\t');
        });
        val.push('\n' + tab + d('}'));

    } else if (typeof json === 'string') {
        val.push(d('"'), s(json), d('"'));
    } else {
        val.push(n(json));
    }

    return val;
}

function d(val) {
    return val;
    return '<span class="dummy">' + val + '</span>';
}
function s(val) {
    return '<span class="string">' + val + '</span>';
}
function n(val) {
    return '<span class="number">' + val + '</span>';
}

textarea.focus();

})(document)

