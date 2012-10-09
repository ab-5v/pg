var CTRL = false;

$(window).on('keyup keydown', function(e) {
    CTRL = e.type === 'keydown' && e.which == 91;
});

$('input').keydown(function(e) {
    if (CTRL && e.which == 67) {
        var orig = this.value;
        this.value = 'hacked';
        this.select();

        $(this).one('keyup', function() {
            this.value = orig;
        });
    }
});
