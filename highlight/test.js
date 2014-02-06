var expect = require('expect.js');
var highlight = require('./');

var mock = [
    {
        text: 'some panda string',
        pattern: 'panda',
        length: 4,
        result: '<i>pan</i>…'
    },
    {
        text: 'some panda string',
        pattern: 'panda',
        length: 10,
        result: '…e <i>panda</i> …'
    },
    {
        text: 'panda stri',
        pattern: 'panda',
        length: 10,
        result: '<i>panda</i> stri'
    },
    {
        text: 'panda string',
        pattern: 'panda',
        length: 10,
        result: '<i>panda</i> str…'
    },
    {
        text: 'some panda',
        pattern: 'panda',
        length: 10,
        result: 'some <i>panda</i>'
    },
    {
        text: 'some panda',
        pattern: 'panda',
        length: 10,
        result: 'some <i>panda</i>'
    }

];
describe('highlight', function() {

    mock.forEach(function(item, i) {
        it('should work for set ' + i, function() {
            expect( highlight(item.text, item.pattern, item.length) )
                .to.eql( item.result );
        });
    });
});

