import logger from './logger.js';

function health() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
}

app.use('/', (req, res) => {
  const healthCheck = health();
  res.status(200).json(healthCheck);
  logger.info('Health check successful');
});

export default health;