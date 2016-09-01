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
  if (req.session.userId) {

  }
}

// Export Function to use as middleware
module.exports.loggedOut = loggedOut;
