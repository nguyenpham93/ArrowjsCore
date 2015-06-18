"use strict";

module.exports = function (env) {
    env.addFilter('active_page', function (value, string_to_compare, cls) {
        let arr = value.split('/');
        let st = "active";
        if (cls) {
            st = cls;
        }
        return arr[1] == string_to_compare ? st : "";
    });
};
