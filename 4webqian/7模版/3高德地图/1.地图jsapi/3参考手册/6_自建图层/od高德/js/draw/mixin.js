function mixin(ori, dest) {
        var dest = dest || {};
        var r = {};
        for (var i in dest) {
            r[i] = dest[i];
        }
        for (var i in ori) {
            if (ori.hasOwnProperty(i)) {
                if (r[i]) {
                    continue;
                }
                r[i] = ori[i];
            }
        }
        return r;
    }