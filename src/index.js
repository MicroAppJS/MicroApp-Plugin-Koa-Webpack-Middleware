'use strict';

module.exports = function KoaWebpackMiddleware(api, opts = {}) {

    // commands
    require('./commands/version')(api);

    api.onDevServerMiddleware(({ app, config, options }) => {
        const onlyNode = options.onlyNode || false;
        const compiler = options.compiler || false;
        const devOptions = options.devOptions || {};
        if (!onlyNode && !!compiler) {
            const koaWebpackMiddleware = require('./koa-webpack-middleware');
            app.use(koaWebpackMiddleware.devMiddleware(compiler, devOptions));
            app.use(koaWebpackMiddleware.hotMiddleware(compiler, devOptions));
        }
    });
};
