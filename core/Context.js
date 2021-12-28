const Express = require('express');
const createNamespace = require('cls-hooked').createNamespace;
const uuid = require('uuid');

/**
| -------------------------------------------
|	IoC Container
| -------------------------------------------
| - Managing components in application as a "Service", responsible for creating, resolving specific
| component has already binded.
| - 3 types of injecting: Binding, Scope(per request), Singleton.
| 
| - Reference ideas from: ServiceContainer(Laravel).  
|
| - Principles used for this container are outline in this Medium article:
| https://medium.com/@ismayilkhayredinov/building-a-scoped-ioc-container-for-node-express-8bf082d9887
**/
class Context {
    constructor(namespace) {
        this.$services = new Map();
        this.$singletons = new Map();
        this.$ns = namespace;

        return new Proxy(this, Context.proxy);
    }

    bind(name, definition, dependencies, options) {
        options = Object.assign({
            singleton: true,
            scoped: false,
        }, options);

        this.$services.set(name, {
            definition,
            dependencies,
            ...options,
        });
    }

    singleton(name, definition, dependencies) {
        this.$services.set(name, {
            definition,
            dependencies,
            ...{singleton: true},
        });
    }

    scope(name, definition, dependencies) {
        this.$services.set(name, {
            definition,
            dependencies,
            ...{singleton: true, scope: true},
        });
    }

    make(name) {
        const service = this.$services.get(name);

        if (!service) {
            throw new Error(`Service ${name} has not been registered`);
        }

        if (typeof service.definition === 'function') {
            if (service.singleton) {
                let instance;

                if (service.scoped && this.$ns.active) {
                    instance = this.$ns.get(name);

                    if (!instance) {
                        instance = this.factory(service);
                        this.$ns.set(name, instance);
                    }
                } else {
                    instance = this.$singletons.get(name);

                    if (!instance) {
                        instance = this.factory(service);
                        this.$singletons.set(name, instance);
                    }
                }

                return instance;
            }

            return this.factory(service);
        }

        return service.definition;
    }

    factory(service) {
        const Constructor = service.definition;

        if (typeof Constructor.prototype !== 'undefined' && Constructor.prototype.constructor) {
            return new Constructor(...this.resolve(service));
        }

        return Constructor(...this.resolve(service));
    }

    resolve(service) {
        let deps = [];

        if (service.dependencies) {
            deps = service.dependencies.map((dep) => {
                return this.make(dep);
            });
        }

        return deps;
    }

    static get proxy() {
        return {
            get(instance, property) {
                if (instance.$services.has(property)) {
                    return instance.get(property);
                }

                return instance[property];
            },
        };
    }

    static configure(providers = [], namespace) {
        namespace = namespace || createNamespace(uuid.v4());

        const container = new Context(namespace);
        const express = new Express();

        express.set('context', container);

        express.use((req, res, next) => {
            namespace.bindEmitter(req);
            namespace.bindEmitter(res);

            namespace.run(() => {
                next();
            });
        });

        providers.forEach((service) => {
            const {
                name,
                factory,
                dependencies,
                options,
            } = service;

            container.bind(name, factory, dependencies, options);
        });

        container.bind('express', () => express);

        return container;
    }
}

module.exports = Context;