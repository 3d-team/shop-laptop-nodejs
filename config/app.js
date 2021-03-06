const Loader = require("./../core/Loader");
const NodeCache = require("node-cache");

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
        name: 'cache',
        factory: () => {
            return new NodeCache({ stdTTL: 15 });
        },
        dependencies: [],
        options: {
            singleton: true
        }
    },
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
    },
    {
        name: 'productRepository',
        factory: Loader.repository('product')
    },
    {
        name: 'cartService',
        factory: Loader.service('cart')
    },
    {
        name: 'productService',
        factory: Loader.service('product')
    },
    {
        name: 'userService',
        factory: Loader.service('user')
    }
];

module.exports = providers;