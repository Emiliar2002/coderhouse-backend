const socketio = (io) => {
    return (req, _res, next) => {
    req.io = io;
    next();
  }
}
module.exports = socketio