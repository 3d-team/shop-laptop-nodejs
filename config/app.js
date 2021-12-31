const Loader = require("./../core/Loader");

/**
|--------------------------------------------------------------------------
|   Autoloaded service providers.
|--------------------------------------------------------------------------
|
| The service providers listed here will be automatically loaded on the
| request to your application. Free to add new services to
| this array to grant expanded functionality to your applications.
|
**/
const providers = [
    {
        name: 'mailService',
        factory: Loader.service('mail')
    },
    {
        name: 'authService',
        factory: Loader.service('auth'),
        dependencies: ['mailService']
    },
    {
        name: 'orderRepository',
        factory: Loader.repository('order')
    }
];

module.exports = providers;