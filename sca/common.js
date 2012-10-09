(function() {
    var lib = {
        word: function(mask, dict) {
            var n = Number(mask);

            if (n) {
                mask = Array(n + 1).join('x');
            } else {
                mask = mask || 'xxxxxxxx';
            }

            dict = dict || 'qwertyuiopasdfghjklzxcvbnm';

            dict = dict.split('');
            var letter = function() {
                return dict[Math.round(Math.random()*(dict.length-1))];
            }

            return mask.replace(/x/g, letter);
        },
        _id: 0,
        id: function() {
            return this._id++;
        }
    };

    var pattern = document.getElementById('pattern');
    var result = document.getElementById('result');
    var count = document.getElementById('count');

    var gen = function() {
        return pattern.value.replace(/\{([^}]+)\}/g, function(self, expr) {
            var expr = expr.split(/\s*,\s*/);
            var name = expr.shift();

            var libItem = lib[name];
            if (libItem) {
                if (typeof libItem === 'function') {
                    return lib[name].apply(lib, expr);
                } else {
                    return lib[name];
                }
            } else {
                return self;
            }
        });
    };

    pattern.onkeydown = function(e) {
        if (e.which === 9) {
            e.preventDefault();
            pattern.value = pattern.value + '    ';
        }
    };

    pattern.onkeyup = function() {

        var res = [];
        for (var n = Number(count.value); n--;) {
            res.push(gen());
        }

        result.value = res.join('\n');
    };

})()
