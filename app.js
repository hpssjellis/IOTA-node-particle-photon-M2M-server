var express = require('express');
var app = express();
var request = require('request');

const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')


const mySeed = 'DONOTSTOREYOURSEEDONAPUBLICGITHUBSITEASANYONECANSTEALALLYOUR9IOTATOKENSKEEPITSAFE'   //Your secret seed. All your tokens
          //   'ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9' // SEED MUST BE THIS LENGTH

const myParticleId = '888888888888888888888888'
const myParticleAccessToken = 'abc88d8888888ef8888ghi8888j88k88l888mnop'




global.myRecieveIndex = 0    // defines when to start showing the replies! Careful will not show results if above latest recive address



global.myReceiveAddress = '' // This will be auto generated

global.myArrayOfAddresses = new Array()

global.myResponse0 = ''
global.myResponse1 = ''
global.myResponse2 = ''

global.myPendingAddress = ' '

global.myLatestAddress = ''

global.myNotStartup = false

//global.myRepeatRun = false



const iota = iotaLibrary.composeAPI({
    provider: 'https://nodes.iota.cafe:443'   // This is the main net not development
})   //  provider: 'https://nodes.devnet.thetangle.org:443'  // dev net

// find other nodes at https://nodes.iota.works/

// https://nodes.iota.cafe:443
// https://www.iotaqubic.us:443
// https://ultranode.iotatoken.nl:443
// https://perma.iota.partners:443

// https://iotanode.us:443  // may have over used this







async function myLoadAddressesFromSeed(myPassedSeed){

	var options = {
        index : global.myRecieveIndex,
        checksum: true,
		security: 2,
        returnAll: true

	}


iota
  .getNewAddress(myPassedSeed, options)
  .then(myGenAddress => {
     console.log('Your set of address are (unused is last): ' + JSON.stringify(myGenAddress, null, 3) )
  //   global.myResponse0 = '<h2>My Next '+myMaxArray+' Addresses: </h2>' + '<pre id="myPre01">'+JSON.stringify(myGenAddress, null, 3)+'</pre>' + '<hr>';  // hopefully this is global

     global.myArrayOfAddresses = myGenAddress

     global.myPendingAddress = global.myArrayOfAddresses[global.myArrayOfAddresses.length-1]
     global.myReceiveAddress = global.myPendingAddress
    // console.log('global.myPendingAddress')
   //  console.log(global.myPendingAddress)

     // now show all previous confirmed messages
     for (myLoop=global.myRecieveIndex; myLoop < global.myArrayOfAddresses.length; myLoop++){   // loop from old address index to index before unused address
         mySendConfirmed(global.myArrayOfAddresses[myLoop])
     }

  })
  .catch(err => {
    console.log(err)
  })


}






function myGenNewAddressOnly(myPassedSeed){

	var options = {
        checksum: true,
		security: 2
	}

iota
  .getNewAddress(myPassedSeed, options)
  .then(myGenAddress => {
      global.myReceiveAddress = myGenAddress   // need a refresh from browser side to see this?
      console.log('Generating new receive address')
      console.log('global.myReceiveAddress')
      console.log(global.myReceiveAddress)
  })
  .catch(err => {
    console.log(err)
  })


}







function myX(myRAddress){   // To see what is happening when you send an address

  iota.findTransactionObjects({ addresses: [myRAddress] })
  .then(response => {
      iota.getLatestInclusion(response.map(tx => tx.hash))
        .then(states => {
            console.log('states.length')
            console.log(states.length)
            for (let myStateLoop = 0; myStateLoop < states.length; myStateLoop++ ){
               console.log('states['+myStateLoop+']')
               console.log(states[myStateLoop])
               console.log('response['+myStateLoop+']')
               console.log(response[myStateLoop])
           }
       })
  })
}



function mySendConfirmed(myRAddress){

  iota.findTransactionObjects({ addresses: [myRAddress] })
  .then(response => {

      iota.getLatestInclusion(response.map(tx => tx.hash))
        .then(states => {

            for (let myStateLoop = 0; myStateLoop < states.length; myStateLoop++ ){
              // console.log('states['+myStateLoop+']')
            //   console.log(states[myStateLoop])
              // console.log('response['+myStateLoop+']')
            //   console.log(response[myStateLoop])
             if (states[myStateLoop] == true){
                  // console.log('This is all we are interested in')
                  // console.log(response[myStateLoop])



///////////////////////////////////////     Do only after startup        ////////////////////////////////////////////////////////////////

            if (global.myNotStartup){
               global.myLatestAddress = response[myStateLoop].address
               //  console.log('global.myLatestAddress')
               //  console.log(global.myLatestAddress)

               myGenNewAddressOnly(mySeed)   // need to generate a new seed for the web page
            }

///////////////////////////////////////      end only after startup       ////////////////////////////////////////////////////////////////




   let myBig = response[myStateLoop].signatureMessageFragment

    if (myBig.length % 2 == 0){
        } else {
       myBigEven = myBig.substring(0, myBig.length - 1);
       myBig = myBigEven
    }

      // needs an even number input!
     myMessage = Converter.trytesToAscii(myBig)


     // Get rid of bad words
   //  myMessage = myMessage.replace(/Bad-Word/gi, '****');


      // myMessage =     myMessage.substring(0, 5) + '...'   // only show first 5 digits of message


       if (response[myStateLoop].value == 0){
           myMessage = ' '

           }
          if (response[myStateLoop].value >= 0){



      let myTempResponse = ''

     //  myTempResponse += '<tr><td>'+myMessage+'</td>'

    //  if (response[myStateLoop].value >= 55000000){   // donot show really big donations
    //    console.log(response)
    //    myTempResponse +=  '<td> Cool, as of August 2019 that is greater than $20. Thanks ' + myMessage+'</td>'
   //  } else {

        myTempResponse += '<td>'+response[myStateLoop].value+'</td>'
   //  }


       // console.log('myMessage')
       // console.log(myMessage)
                                                                                                                  // sensor response
       if (response[myStateLoop].value == 0  ){                          myTempResponse += '<td>You gotta pay to read a sensor!</td>'  }
       if (response[myStateLoop].value >= 1  && response[myStateLoop].value <= 10  ){          myParticleSend('doAll', 'toggleLED', myMessage);          myTempResponse += '<td>Toggles the D7 LED</td>'  }
         if (response[myStateLoop].value >  10 ){                                              myParticleSend('doAll', 'photoResistor', myMessage);      myTempResponse += '<td>photoresistor reading sent</td>'  }

//doAll
       myTempResponse += '<td>'+response[myStateLoop].address.substring(0, 5)+'...</td>'
       myTempResponse += '<td>'+myMessage.substring(0, 5)+'...</td>'
       myTempResponse += '</tr>'

       global.myResponse2 = myTempResponse + global.myResponse2   // to reverse the order in the table


     //  if (global.myRepeatRun == true) {
      //       res.send(global.myCombined);
     //  }

          }  // end bigger than 0 value


             }  // end big loop of confirmed responses!!!!



           }
       })
  })
}




function myParticleSend( myParticleFunction, myParticleArg, mySendToAddressMain ){   // has id and asses_token as global variables

var options = {
    url: 'https://api.particle.io/v1/devices/'+myParticleId+'/'+ myParticleFunction,
    method: 'POST',
    form: {
        access_token: myParticleAccessToken,
        arg: myParticleArg
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('body');
        console.log(body);

        const myAmount = JSON.parse(body).return_value
        console.log('myAmount');
        console.log(myAmount);


         let myMessageToSendMain = 'From Rocksetta: The Photoresistor reads: '+ myAmount

        if ( myParticleArg == 'toggleLED'){
            if (myAmount == 0){
                myMessageToSendMain = 'From Rocksetta: You toggled the D7 LED OFF '
            } else {
                myMessageToSendMain = 'From Rocksetta: You toggled the D7 LED ON '
            }
        }
           // console.log('myMessageToSendMain')
           // console.log(myMessageToSendMain)

          //const myDone = mySendMessage(mySendToAddressMain, myMessageToSendMain)
           mySendMessage(mySendToAddressMain, myMessageToSendMain)                          // send a 0 value message as a rely


    }
}

/////////////////// This is actually the main part of this function

    if (global.myNotStartup){
       request(options, callback);
    }

}






/////////////////////////////////////////////// send message  start //////////////////////////////////////////////////


async function mySendMessage(mySendToAddress, myMessageToSend){  // uses mySeed to generate a new send address

const myValue = 0

const mySendToAddress2 = mySendToAddress.replace(/[^A-Z9]/g, '');
//console.log('mySendToAddress2')
//console.log(mySendToAddress2)

const message = Converter.asciiToTrytes(myMessageToSend)

const transfers = [
  {
    value: myValue,                  // use a diffrent set of code to send value
    address: mySendToAddress2,       // Where the data is being sent
    message: message                 // The message converted into trytes
  }
]


console.log('Sending: ' + myValue +' tokens with the message '+ myMessageToSend+ ' to the address: '+  mySendToAddress2)

iota
  .prepareTransfers(mySeed, transfers)
  .then(trytes => iota.sendTrytes(trytes, 3, 14))    // 14 for main net 9 for devnet
  .then(bundle => {
    console.log('Sent!: ' + myValue +' tokens with the message '+ myMessageToSend+ ' to the address: '+  mySendToAddress2)

   // bundle.map(tx => console.log(tx))   // very useful for debugging
  })
  .catch(err => {
    console.log(err)
  })




}








/////////////////////////////////////////////// send message  end //////////////////////////////////////////////////




////////////////////////////// Main program starts here ///////////////////////////////

myLoadAddressesFromSeed(mySeed)


app.get('/', function(req, res) {


// use backtick to write web page
   global.myCombined = `

<h3 align=center>Particle Photon Automated IOTA Sensor Web App</h3>

<li> Refresh the page to check that the receive address is fresh

<li>Using your Trinity Wallet copy the below receive address and place that in your SEND ADDRESS area, record the first few characters

<li>Using your Trinity Wallet switch to recieve and copy your own receive address, then switch back to send and place your receive address in the SEND MESSAGE area, record the first few characters


<li> Send the appropriate number of IOTA, See list below

<li>On confirmation of IOTA being sent using your Trinity Wallet, click the Submit button below

<li> If the chart does not update, reclick the submit button or click the "reload" button until your IOTA is confirmed in the chart

<li> Check your Trinity wallet for an automated reply with your sensor reading or proof of toggling the D7 LED.

<li>May need to click the "reload" button again to get a new recieve address<br><br>



<form action="/" method="get">
    <input type="hidden" name="myDo" value="third">
    <input type=text name="myReceiveAddressToCheck" value="`+global.myReceiveAddress+`" size = "130" ><br>
    <input type="submit" value="Submit"><input type="reset" value="Reset">
</form>


       <br><br>


<input type=button value="Reload" onclick="{
   // alert('location.href: '+location.href)
   // alert('location.hostname: '+location.hostname)
    location.reload(true);
  // window.location.assign = location.hostname
}"><br><br>


<li> 0 up to 10 IOTA Toggles D7 LED

<li> Above 10 IOTA sendsPhotoresistor reading


<!--
<li>FOLLOWING NOT YET CONNECTED !!!!!!!!!!!!!!
<li> 11 up to 100 IOTA Temperature Reading
<li> 1001 up to 10,000 IOTA Rangefinder reading
<li> 10,001 up to 100,000 IOTA Accelerometer xyz reading
<li> 100,001 up to 1,000,000 IOTA GPS reading
<li> Greater than 1,000,000 IOTA all sensor readings
-->



       <div id="myDivCountdown01">...</div>

       `+global.myResponse0+`
       `+global.myResponse1+` <br>
       <table border=1>
       <tr><th>Tokens</th><th>Sensor</th><th>From</th><th>Return to</th></tr>
       `+global.myResponse2+`
     </table>

   `    // end long string


    res.send(global.myCombined);
  //  global.myRepeatRun = true    // so the above statement can be refreshed elsewehere

    console.log(req.query)


   if (req.query.myDo == 'third') {    //myReceiveAddressToCheck
       global.myNotStartup = true      // so some special things can happen, check this incoming and generate new seed
       let myIncoming = req.query.myReceiveAddressToCheck
       if (myIncoming.length == 90){
          // console.log(myIncoming)
           myIncoming = myIncoming.substring(0, 81)
          // console.log(myIncoming)
       }
       //.substring(0, myBig.length - 1);
       if (global.myLatestAddress != myIncoming){
        mySendConfirmed(myIncoming)
       } else {
        //  console.log('Already checked that confirmed address')
       }
     }



});   // end app.get



// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);
