'use strict';

module.exports = function (modules) {
    modules.roles = {
        title: 'Roles',
        author: 'Nguyen Van Thanh',
        version: '0.1.0',
        description: 'Roles management of website',
        rules: [
            {
                name: 'index',
                title: 'All Roles'
            },
            {
                name: 'create',
                title: 'Add New'
            },
            {
                name: 'update',
                title: 'Update'
            },
            {
                name: 'delete',
                title: 'Delete'
            }
        ],
        backend_menu: {
            title: 'Roles',
            icon: "fa fa-group",
            menus: [
                {
                    rule: 'index',
                    title: 'All roles',
                    link: '/'
                },
                {
                    rule: 'create',
                    title: 'Create new role',
                    link: '/create'
                }
            ]
        }
    };

    return modules;
};
