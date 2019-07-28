define(function() {
    return function(max, min, trend) {
        var color = '';
        var base = max - min;
        if ((max - trend) / base < 0.2) {
            color = 'rgb(255,0,0)';
        } else if ((max - trend) / base >= 0.2 && (max - trend) / base < 0.4) {
            color = 'rgb(255,179,0)';
        } else if ((max - trend) / base >= 0.4 && (max - trend) / base < 0.6) {
            color = 'rgb(213,255,0)';
        } else if ((max - trend) / base >= 0.6 && (max - trend) / base < 0.8) {
            color = 'rgb(48,255,0)';
        } else if ((max - trend) / base >= 0.8) {
            color = 'rgb(0,255,236)';
        }
        return color;
    };
});