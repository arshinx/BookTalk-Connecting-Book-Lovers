// Custom Middleware

// Prevent Logged Out Users from Accessing a Route
function loggedOut(req, res, next) {

  // User logged in?
  if (req.session && req.session.userId) {
    // Send to Profile Page
    return res.redirect('/profile');
  }

  // User not logged in - no action
  return next();
}

// Determine if user is logged in
function requiresLogin(req, res, next) {

  // User logged in?
  if (req.session && req.session.userId) {
    // continue to next piece of middleware
    return next();
  }

  // User not logged in - Display Error
  var err = new Error('User must be logged in to view this page.');
  err.status = 401;
  // Return to error handling middleware
  return next(err);

}

// Export Function(s) to use as middleware
module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
