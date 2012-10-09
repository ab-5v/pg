;(function(d){

window.onload = function() {
    var inputs = d.getElementsByTagName('input');
    var events = ['focus', 'focusin', 'focusout', 'mousedown', 'click', 'mouseup', 'keydown', 'keypress', 'keyup', 'dblclick'];

    var pre = d.getElementById('log');
    var last = 0;
    var log = function(m) {
        if (new Date() - last > 300) {
            var div = d.createElement('div');
            div.innerHTML = m;
            pre.insertBefore(div, pre.firstChild);
        } else {
            var div = pre.firstChild;
            div.innerHTML = div.innerHTML + ', ' + m;
        }
        last = new Date();
    };

    for (var i = inputs.length; i--;) {
        for (var e = events.length; e--;) {
            inputs[i]['on' + events[e]] = function(e) {
                log(this.name + ' ' + (e || window.event).type);
            }
        }
    }

    var reset = function() {
        for (var i = inputs.length; i--;) {
            inputs[i].removeAttribute('disabled');
        }
    };

    var ptests = {
        ptest_1: function() {
            inputs[0].click();
        },
        ptest_2: function() {
            inputs[0].focus();
        },
        ptest_3: function() {
            inputs[0].focus();
            setTimeout(function() {
                inputs[1].click();
            }, 500);
        },
        ptest_4: function() {
            inputs[0].focus();
            setTimeout(function() {
                inputs[1].focus();
            }, 500);
        },
        ptest_5: function() {
            inputs[0].focus();
            setTimeout(function() {
                inputs[0].setAttribute('disabled', 'disabled');
                log('disabled');
                setTimeout(function() {
                    inputs[1].focus();
                }, 500);
            }, 500);
        },
        ptest_6: function() {
            inputs[0].focus();
            inputs[0].setAttribute('disabled', 'disabled');
        },
        ptest_7: function() {
            inputs[0].focus();
            setTimeout(function(){
                log('disabled')
                inputs[0].setAttribute('disabled', 'disabled');

                setTimeout(function(){
                    log('enable');
                    inputs[0].removeAttribute('disabled');
                    setTimeout(function(){
                        inputs[0].focus();
                    }, 500);
                }, 500);
            }, 500);
        }
    };

    d.getElementById('test-controls').onclick = function(e) {
        var id  = (e && e.target || window.event.srcElement).id;
        if (id in ptests) {
            reset();
            ptests[id]();
        }
    }

};

})(document);
