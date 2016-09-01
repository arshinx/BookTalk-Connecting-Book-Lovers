// Prevent Logged Out Users from Accessing a Route

function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    
  }
}
