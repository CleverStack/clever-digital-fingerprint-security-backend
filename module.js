var ModuleClass = require( 'classes' ).ModuleClass
  , digitalFingerprint = require( 'classes' ).DigitalFingerprint
  , Module;

Module = ModuleClass.extend({

  configureApp: function( app ) {

    // security check digital fingerprint matches on every non-static request
    if (this.config.security.digitalFingerprint.enabled) {
        app.use( function( req, res, next ) {
            //add users ip address to fingerprint
            var ip = (this.config.security.digitalFingerprint.prints.ip) ? (req.headers['x-forwarded-for'] || req.connection.remoteAddress) : "";
            if (digitalFingerprint.token && req.body.token) {
                if (!digitalFingerprint.check( req.body.token, req.body.fingerprint+ip )) {
                    res.send(403, "Your security fingerprint check failed.");
                }
                else {
                    console.log('Your security fingerprint check passed.');
                    next();
                }
            } else if(req.body && req.body.fingerprint) {
                //new fingerprint stored in token
                console.log('Your client ip is: '+ip);
                res.token = digitalFingerprint.new( req.body.fingerprint+ip, this.config.security.digitalFingerprint.salt, this.config.security.digitalFingerprint.grade );
                console.log('Digital fingerprint token encrypted for client: '+res.token);
                next();
            } else {
                res.send(403, "Your security fingerprint was missing from the request.");
            }
        });
    }

  }

});

module.exports = new Module( 'digitialfingerprint-module', injector );
