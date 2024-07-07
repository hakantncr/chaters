const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');

// Login with google
router.get('/google', passportGoogle.authenticate(
    'google',
    {
        scope: ['profile']
    }
));
// login failure
router.get('/google/callback', passportGoogle.authenticate(
   'google',
    {
        failureRedirect: '/'
    }),
    // Login successful
    (req, res) => {
    res.redirect('/chat');
});

module.exports = router;