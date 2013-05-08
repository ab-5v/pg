if (!Array.prototype.indexOf) {
Array.prototype.indexOf = function(val) {
    for (var i = this.length; i--;) {
        if (this[i] === val) {
            return i;
        }
    }

    return -1;
};
}
;(function(d) {
    var input = d.getElementsByTagName('input')[0];
    var events = ['keydown', 'keypress', 'keyup'];
    var props = ['which', 'charCode', 'keyCode', 'keyIdentifier', 'keyLocation', 'ctrlKey', 'altKey', 'metaKey'];

    var init = function() {
        var table = ['<table>'];
        for (var i = -1; i < props.length; i++) {
            table.push('<tr' + (props[i] ? ' id="' + props[i] + '"' : '') + '>');

            for (var j = -1; j < events.length; j++) {
                if (!props[i]) {
                    table.push('<th>' + (events[j] || '') + '</th>');
                } else {
                    table.push('<td>' + (events[j] ? '' : props[i]) + '</td>');
                }
            }

            table.push('</tr>');
        }
        table.push('<tr><td colspan="' + events.length + '"></td></tr></table>');

        d.getElementById('log').innerHTML = table.join('');
    }

    init();

    var print = function(e) {
        var tds = d.getElementsByTagName('td');
        for (var i = 0; i < props.length; i++) {
            var row = d.getElementById(props[i]);
            row.getElementsByTagName('td')[events.indexOf(e.type) + 1].innerHTML = e[props[i]];
        }
        tds[tds.length-1].innerHTML = e.type + ' ' + Math.random();
    };

    var preventers = {};
    d.getElementsByTagName('table')[0].onclick = function(e) {
        var target = e && e.target || window.event && window.event.srcElement;
        if (target.nodeName.toLowerCase() === 'th') {
            var preventer = target.innerHTML;
            preventers[preventer] = !preventers[preventer];
            target.style.textDecoration = preventers[preventer] ? 'line-through' : 'none';
        }
    }


    var prevent = function(e) {
        return !preventers[e.type];
    }

    for (var i = events.length; i--;) {
        input['on' + events[i]] = function(e) {
            e = e || window.event;
            print(e);
            return prevent(e);
        }
    }
})(document)
