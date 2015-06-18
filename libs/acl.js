'use strict';

/**
 * Check permission of users.
 * @param {string} route - Route which user access.
 * @param {string} action - Action which user access.
 * @param {string} orAction - Alternative action to check.
 * @param {boolean} hasAuthorize - Authorize of user.
 * @return  Redirect to error page with flash message.
 */
exports.isAllow = function (route, action, orAction, hasAuthorize) {
    return function (req, res, next) {
        // Check module active
        if (__modules[route] != undefined && (__modules[route].system || __modules[route].active)) {
            // Check acl
            if (req.user != undefined && req.user.acl[route] != undefined) {
                let rules = req.user.acl[route].split(':');
                for (let i in rules) {
                    if (rules.hasOwnProperty(i)) {
                        if (action == rules[i]) {
                            next();
                            return;
                        }

                        if (orAction != null && orAction == rules[i]) {
                            if (hasAuthorize(req, res, next)) {
                                next();
                                return;
                            }
                        }
                    }
                }
                req.flash.error("You do not have permission to access");
                res.redirect('/admin/err/404');
            } else {
                req.flash.error("You do not have permission to access");
                res.redirect('/admin/err/404');
            }
        } else {
            req.flash.error('Module ' + route + ' is not active');
            res.redirect('/admin/err/500');
        }
    }
};

/**
 * Add a button.
 * @param  {object} req - Request of users.
 * @param  {string} route - Route which user access.
 * @param  {string} action - Action which user access.
 * @param  {string} url - URL which button will be linked to.
 * @return {string}
 */
exports.addButton = function (req, route, action, url) {
    if (req.user != undefined && req.user.acl[route] != undefined) {
        let rules = req.user.acl[route].split(':');

        for (let i in rules) {
            if (rules.hasOwnProperty(i)) {
                if (action == rules[i]) {
                    if (url === undefined) {
                        return route.replace('_', '-');
                    } else {
                        return url.replace('_', '-');
                    }
                }
            }
        }
    }
    return '';
};

/**
 * Add custom button.
 * @param   {string} url - URL which button will be linked to.
 * @returns {string}
 */
exports.customButton = function (url) {
    return url;
};

/**
 * Check module active.
 * @param   {object} req - Request of users.
 * @param   {string} route - Route which user access.
 * @param   {string} action - Action which user access.
 * @returns {boolean}
 */
//todo: rename function
exports.allow = function (req, route, action) {
    if (__modules[route] != undefined && (__modules[route].system || __modules[route].active)) {
        if (req.user != undefined && req.user.acl[route] != undefined) {
            let rules = req.user.acl[route].split(':');

            for (let i in rules) {
                if (rules.hasOwnProperty(i)) {
                    if (action == rules[i]) {
                        return true;
                    }
                }
            }
            return false;
        } else {
            return false;
        }
    } else {
        return false;
    }
};