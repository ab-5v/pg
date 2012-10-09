$(function(){
    $('button').click(function(){
        var tests = $('textarea').val().split('\n');
        var match = $('input').val().match(/\/(.+)\/(\w*)/);
        var re = new RegExp(match[1], match[2]);
        var res = [];

        var d = new Date() - 0;
        for (var i = 0; i < tests.length; i++) {
            res.push([re.test(tests[i]) ? 'PASS' : 'FAIL', tests[i]]);
        }
        d = new Date() - d;

        $('#result').html(
            '<div>Time: ' + d + '</div>' +
            $.map(res, function(a){return '<div>' + a[0] + ' ' + a[1] + '</div>';}).join('')
        );
    });
});
