const apiStats = {
    totalHits: 0,
    perRoute: {},
    perIP: {}
  };
  
  function logger(req, res, next) {
    apiStats.totalHits++;
  
    const route = req.path;
    apiStats.perRoute[route] = (apiStats.perRoute[route] || 0) + 1;
  
    const ip = req.ip;
    apiStats.perIP[ip] = (apiStats.perIP[ip] || 0) + 1;
  
    console.log(`[HIT] ${ip} -> ${req.method} ${route}`);
    next();
  }
  
  function getStats() {
    return apiStats;
  }
  
  module.exports = { logger, getStats };
  