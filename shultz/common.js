var sh = {
    init: function() {
        var that = this;
        this.root = document.createElement('div');
        this.root.className = 'shultz';
        document.body.appendChild(this.root);

        document.body.onkeypress = function(e) {
            var wh = e.which;
            switch (e.which) {
                case 49:
                    that.generate(3);
                break;
                case 50:
                    that.generate(5);
                break;
                case 51:
                    that.generate(7);
                break;
                case 52:
                    that.generate(9);
                break;

                case 32:
                    that.generate();
                break;
            }
        };

        return this;
    },
    generate: function(num) {
        num = this.num = num || this.num || 5;

        var items = [];
        for (var i = 0; i < num * num; i++) {
            items.push(i+1);
        }

        items.sort(function() {return Math.random() - 0.5;});

        var html = ['<table>'];

        for (var i = 0; i < num; i++) {
            html.push('<tr>');
            for (var j = 0; j < num; j++) {
                var index = i * num + j;
                html.push('<td' + ((items.length - 1) / 2 == index ? ' class="center"' : '')  + '>' + items[index] + '</td>');
            }
            html.push('</tr>');
        }

        html.push('</table>');

        this.root.innerHTML = html.join('');
    }
};

sh.init().generate();
