const logger = require('../common/logger.js');

exports.render = (req, res, next) => {
    res._render = res.render;
    res.render = (view, options, fn) => {
        var time = new Date();
        res._render(view, options, fn);

        var duration = (new Date() - time);
        logger.info('Render view', view, ('(' + duration + 'ms)').green);
    };
    next();
};