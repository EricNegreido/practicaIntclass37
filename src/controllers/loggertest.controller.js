const loggerTest = async (req,res, ) => {

    console.log("TEST")
    try {
        req.logger.fatal('prueba fatal');
        req.logger.error('prueba error');
        req.logger.warning('prueba warning');
        req.logger.info('prueba info');
        req.logger.http('prueba http');
        req.logger.debug('prueba debug');

        req.logger.info("Logging test completed")
        res.send('Logging test completed');
    } catch (error) {
        req.logger.error("error completing test")
        res.status(500).send({status: 'error', error: error.message})

    }
}

export default loggerTest;