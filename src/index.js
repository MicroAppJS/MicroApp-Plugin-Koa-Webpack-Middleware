'use strict';

module.exports = function KoaWebpackMiddleware(api, opts = {}) {

    api.assertVersion('>=0.1.5');

    // commands
    require('./commands/version')(api);

    api.onDevServerMiddleware(({ app, config, args, compiler, devOptions = {} }) => {
        if (compiler) {
            const koaWebpackMiddleware = require('./koa-webpack-middleware');
            app.use(koaWebpackMiddleware.devMiddleware(compiler, devOptions));
            app.use(koaWebpackMiddleware.hotMiddleware(compiler, devOptions));
        }
    });
};

module.exports.configuration = {
    mode: 'development',
    description: '针对 Koa 服务的 webpack 开发模式中间件.',
};
