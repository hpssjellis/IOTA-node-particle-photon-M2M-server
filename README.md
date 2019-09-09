# IOTA-node-particle-photon-M2M
Hackster competition for which I will make a template for machine 2 machine automated interaction with a Particle.io Photon microprocessor



Started September 9th, 2019

2 Github sites one the main server machine at

https://github.com/hpssjellis/IOTA-node-particle-photon-M2M-server


and the other the client machine at 

https://github.com/hpssjellis/IOTA-node-particle-photon-M2M-client



------------------------------------- 

old Github site at 

https://github.com/hpssjellis/Particle.io-Photon-Pay-IOTA-to-Read-Sensors


Most people with IOTA know how to use the Trinity wallet

Setup yout IOTA Trinity wallet as normal https://trinity.iota.org/


To run this site online using https://Gitpod.io

Load as a Gitpod.io site (needs Github authentication)  (Takes a few minutes to make the Docker image)

https://gitpod.io/#github.com/hpssjellis/Particle.io-Photon-Pay-IOTA-to-Read-Sensors


Or just do your normal way of loading a Github Nodejs site (Be aware that a few security issues for your IOTA exist using cloud Node sites). 



##3 variables at the top of the code must be adjusted for your data

mySeed

myParticleID

myParticleAccessToken





-----------------------------------------------------------------

Then run

```npm install```

```npm start```

1. Wait on the node console until you get confirmation of past addresses

1. Open in Browser  (If it does not pop up try the Ports terminal )


1. You should see a new receive address

1. Using your Trinity Wallet send IOTA to that receive address but in the message place your own receive address

1. On confirmation of IOTA being sent using your Trinity Wallet, click the Submit button on the web browser

1. The new webpage should show the new information from your Photon. If not try to reload the page

1. Your Trinity Wallet should receive a Zero value message either about the D7 LED being switched on or off or the photoresistor actual value. (Zero value messages are removed on the next IOTA SNAPSHOT)

-------------------------------------------------------

##For Developers wanting to try this you need a Particle Photon and a secure Nodejs website

Set up your photon as normal https://www.particle.io/

In the code you will need to change 
(As these are important to you you should only use a private Github or Private Nodejs server.)

```

const mySeed = 'DONOTSTOREYOURSEEDONAPUBLICGITHUBSITEASANYONECANSTEALALLYOUR9IOTATOKENSKEEPITSAFE'   //Your secret seed. All your tokens
          //   'ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9' // SEED MUST BE THIS LENGTH

const myParticleId = '888888888888888888888888'    // specific to your Particle.io Photon

const myParticleAccessToken = 'abc88d8888888ef8888ghi8888j88k88l888mnop'  // specific to your Particle.io login and can be changed

```


-------------------------------------------------------------------------------------------------------------------

This site was made in August 2019 You might want to check each of these in the package.json file for upgrades on npm 

    "express": "^4.17.1",
    "@iota/core" : "^1.0.0-beta.21",
    "@iota/mam": "^0.7.3",
    "@iota/transaction-converter": "^1.0.0-beta.21",
    "@iota/converter": "^1.0.0-beta.21",
    "request": "^2.88.0",
    "zeromq": "^5.1.0"
    
    

check npm search iota/core to get to 

https://www.npmjs.com/package/express    then click on "version"

https://www.npmjs.com/package/@iota/core    then click on "version"

https://www.npmjs.com/package/@iota/converter    then click on "version"

https://www.npmjs.com/package/request   then click on "version"


I don't actually yet use the other npms yet

https://www.npmjs.com/package/@iota/mam    then click on "version"

https://www.npmjs.com/package/@iota/transaction-converter    then click on "version"

https://www.npmjs.com/package/@iota/zeromq    then click on "version"


---------------------------------------------------------------------------------------------

By Jeremy Ellis
Twitter @rocksetta
Use at your Own Risk!

Do not use your main IOTA seed but setup a temporary seed for any projects.

