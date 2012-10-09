;(function(d){

var id = function(id){return d.getElementById(id)};

id('button').onclick = function() {
    var result = [];
    var foos = id('foos').value.split('\n');
    var bars = id('bars').value.split('\n');
    var min = foos.length < bars.length ? foos : bars;
    var template = id('template').value || '"{foo} <{bar}>",';
    var t = function(foo, bar){ return template.replace('{foo}', foo).replace('{bar}', bar); };

    for (var i = 0, l = min.length; i < l; i++) {
        result.push( t(foos[i], bars[i]) );
    }

    id('result').value = result.join('\n');
};

id('generate').onclick = function() {
    var foos = id('foos').value = generateNames(id('count').value || 10, id('mask').value).join('\n');
};

})(document);
