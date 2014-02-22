var graph = {

    _ctor: function graph() {},

    create: function(data, options) {
        this.data = data;
        this.options = options || {};

        this.prerender();
        this._data1 = this.data();
        this._data2 = this.data();
        this.render();
        setInterval(function() {
            this._data1.shift();
            this._data1.push(this.data()[0]);
            this._data2.shift();
            this._data2.push(this.data()[0]);
            this.render();
        }.bind(this), 1000);

        return this;
    },

    data: function() {},

    getLine: function() {
        ;
    },

    prerender: function() {
        var that = this;
        this.x = d3.scale.linear().domain([0, 200]).range([-10, 200]);
        this.y = d3.scale.linear().domain([0, 200]).range([0, 200]);

        this.line = d3.svg.line()
            .x(function(a, i) { return that.x(i*10); })
            .y(function(a, i) { return that.y(a); })
            .interpolate('basis')
        ;

        this.path1 = d3.select('svg').append('path')
            .attr('stroke', '#2980b9')
            .attr('stroke-width', 1.2)
            .attr('fill', 'none')
        ;

        this.path2 = d3.select('svg').append('path')
            .attr('stroke', '#e67e22')
            .attr('stroke-width', 1.2)
            .attr('fill', 'none')
        ;
    },

    render: function() {
        console.time('render');

        this.path1
            .attr('transform', 'translate(0)')
            .attr('d', this.line(this._data1))
            .interrupt()
            .transition()
            .ease('linear')
            .duration(1000)
            .attr('transform', 'translate(-10)')
        ;

        this.path2
            .attr('transform', 'translate(0)')
            .attr('d', this.line(this._data2))
            .interrupt()
            .transition()
            .ease('linear')
            .duration(1000)
            .attr('transform', 'translate(-10)')
        ;

        console.timeEnd('render');
    }
};

graph.create(function() { return getData(100, 10, 160); })


function getData(n, l, h) {
    var res = [];
    while (n--) { res.push( rand(l, h) ); }
    return res;
}

function rand(l, h) {
    return Math.floor(Math.random()*(h-l+1)) + l;
}
