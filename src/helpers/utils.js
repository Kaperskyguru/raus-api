module.exports = {
  unless(middleware) {
    return function (req, res, next) {
      if (
        req.baseUrl.includes("auth") ||
        req.baseUrl === "/" ||
        req.baseUrl.includes("oauth")
      ) {
        return next();
      } else {
        return middleware(req, res, next);
      }
    };
  },

  splitString(str) {
    const splitted = str.split("_");
    return {
      user: splitted[0],
      channel: splitted[1],
    };
  },
};
