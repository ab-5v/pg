
function highlight(text, pattern, l) {
    var ph = '…', tl = text.length, pl = pattern.length;
    var el = l - pl, ebl = Math.ceil(el/2), eal = Math.floor(el/2);

    if (text.indexOf(pattern) < 0) {
        if (tl > l) { text = text.substring(0, l-1) + ph; }
        return result(text);
    }
    if (el < 0) { return result('', pattern.substring(0, l-1), ph); }

    var s = text.split(pattern);
    var b = s.shift();
    var a = s.join(pattern);

    if (tl <= l) { return result(b, pattern, a); }

    var bl = b.length, al = a.length;

    if (eal > al) { ebl += eal - al; eal = al; }
    if (ebl > bl) { eal += ebl - bl; ebl = bl; }

    b = b.substr(b.length - ebl);
    if (ebl < bl) { b = ph + b.substr(1); }

    a = a.substring(0, eal);
    if (eal < al) { a = a.substring(0, eal-1) + ph; }

    return result(b, pattern, a);

    function result (b, p, a) {
        return p ? b + '<i>' + p + '</i>' + a : b;
    }
}


if (typeof module === 'object') { module.exports = highlight; }
