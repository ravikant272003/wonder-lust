module.exports=(fn) => {
  return function (req, res, next) {//return middleware func 
    fn(req, res, next).catch(next);
  };
}
