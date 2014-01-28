# Cleverstack Digital Fingerprint Security Module
The back-end digital fingerprint security module provides high grade security for your web app.

## Dependencies
This module requires the [cleverstack frontend digital fingerprint security module](https://github.com/CleverStack/clever-digital-fingerprint-security-frontend) to be installed.

## Setup
1. Add `cs_digitalfingerprint` to the bundledDependencies array of your app's package.json.

## Config
1. You can change the security settings in the modules config `modules/cs_digitalfingerprint/config/default.json`.

```
{
  "digitalFingerprint" : {

      "enabled": true,   ←- Turn on or off Digital Fingerprinting

      "prints": {

            "ip" : true      ←- Adds client ip to fingerprint

      },

      "grade" : "low",   ←- Security grade “low”, “low-med”, “med”, “med-high”, “high”

      "salt" : "put_super_secure_salt_token_here"    ←-  Application unique salt token

  }
}
```

## Security Settings

**low**

Provides basic security using a SHA2 32 bit encrypted 128 char hash token generated from the fingerprint and verifies the token only so prints only have to run once making it fastest method. The token key is 128 char randomly generated with 1,000 iterations.

**low-med**

Same as “low” but uses SHA2 64 bit encrypted 256 char hash token.

**med**

Default security setting providing AES 128 cipher encryption (AES The Advanced Encryption Standard (AES) is a U.S. Federal Information Processing Standard (FIPS)). The token key is 256 char randomly generated with 1,000 iterations.

**med-high**

AES 256 cipher encryption. The token key is 256 char randomly generated with 10,000 iterations. The digital fingerprint is required in addition to the token for every request.

**high**

Same as “med-high” but the token key is 512 char randomly generated with 100,000 iterations. A further timestamp can be added to the fingerprint in order to verify it is a fresh print.


## Diagram
![Digital Fingerprint Security](/assets/digital-fingerprint-diagram.jpg "Digital Fingerprint Security")
