'use strict';

module.exports = function KoaWebpackMiddleware(api, opts = {}) {

    api.assertVersion('>=0.1.5');

    // commands
    require('./commands/version')(api);

    const logger = api.logger;
    const _id = api.id;

    api.onDevServerMiddleware(({ app, config, args, compiler, devOptions = {} }) => {
        if (app._name && /KOA2/ig.test(app._name)) {
            if (compiler) {
                const koaWebpackMiddleware = require('./koa-webpack-middleware');
                const options = Object.assign({}, devOptions, opts);
                app.use(koaWebpackMiddleware.devMiddleware(compiler, options));
                app.use(koaWebpackMiddleware.hotMiddleware(compiler, options));
            }
        } else {
            logger.warn(`当前服务不支持 “${_id}” 插件的 “api.onDevServerMiddleware()” 方法.`);
        }
    });
};

module.exports.configuration = {
    mode: 'development',
    description: '针对 Koa 服务的 webpack 开发模式中间件.',
};
