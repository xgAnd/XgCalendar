const commons = {
    getImg: function (name, path, format = 'png') {
        if(path) {
            return `${'127.0.0.1'}/static/images/${path}/${name}.${format}${(('?_t=' + Date.now()))}`;
        }
        return `${'127.0.0.1'}/static/images/${name}.${format}${(('?_t=' + Date.now()))}`;
    },

};
window.Commons = commons;
