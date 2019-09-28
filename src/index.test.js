'use strict';

/* global expect */

const path = require('path');

describe('Plugin KoaWebpackMiddleware', () => {

    it('KoaWebpackMiddleware', () => {
        process.env.NODE_ENV = 'development';

        const { service } = require('@micro-app/cli/bin/base');
        service.registerPlugin({
            id: 'test:KoaWebpackMiddleware',
            link: path.join(__dirname, './index.js'),
        });

        service.run('help', { _: [] });

        // expect(api.chainWebpack).not.toBeUndefined();
        // expect(api.chainWebpack).not.toBeNull();

        // expect(api.configureWebpack).not.toBeUndefined();
        // expect(api.configureWebpack).not.toBeNull();

        // expect(api.configureDevServer).not.toBeUndefined();
        // expect(api.configureDevServer).not.toBeNull();
    });

});
