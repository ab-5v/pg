;(function($){

var tests = {
    dupl: function(res, log) {
        for (var type in res) {
            var set = res[type];
            var l = set.length;

            for (var i = 0; i < l; i++) {
                for (var j = i+1; j < l; j++) {
                    if (set[i].val == set[j].val) {
                        log.push('duplicate in lines: ' + set[i].line + ' vs ' + set[j].line);
                    }
                }
            }
        }
    },
    partInFull: function(res, log) {
        var logins = res['login'];
        var domains = res['domain'];
        var fulls = res['full'];

        for (var f = 0; f < fulls.length; f++) {
            var sp = fulls[f].val.split('@');
            if (sp.length !== 2 ) {
                log.push('full error in line ' + fulls[f].line);
            } else {
                var login = sp[0];
                var domain = sp[1];

                for (var l = 0; l < logins.length; l++) {
                    if (logins[l].val == login) {
                        log.push('full contains banned login: ' + fulls[f].line + ' banned by ' + logins[l].line);
                    }
                }

                for (var l = 0; l < domains.length; l++) {
                    if (domains[l].val == domain) {
                        log.push('full contains banned domain: ' + fulls[f].line + ' banned by ' + domains[l].line);
                    }
                }
            }
        }
    },
    opt: function(res, log) {
        var count = {};
        res.full.forEach(function(a){
            var val = a.val.split('@')[0];

            if (!count[val]) {
                count[val] = [];
            }
            count[val].push(a.line);
        });

        for (var val in count) {
            if (count[val].length > 1) {
                log.push('opt: ' + val + ' in ' + count[val].join(', '));
            }
        }
    }
};


var check = function(data) {

    var res = {};
    var log = [];

    var lines = data.split('\n').forEach(function(a, i){
        var match = a.match(/\s*<email type="([^"]+)">([^<]+).*/);
        if (match) {
            type = match[1];
            pattern = match[2];
            line = i + 1;

            if (!res[type]) {
                res[type] = [];
            }

            res[type].push({val: pattern, line: line});
        }
    });

    for (var test in tests) {
        tests[test](res, log);
    }

    $('.result').html(log.map(function(a){return '<div>' + a + '</div>';}).join(''));
}

$(function(){
    $('button').click(function(){
        check($('textarea').val());
    });
});
})(jQuery);
