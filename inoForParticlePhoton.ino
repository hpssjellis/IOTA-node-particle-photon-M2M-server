
// global variables

int myReturn = 0;
int myInt = 0; 
int myDescending = 0;

void setup() {
    pinMode(D7, OUTPUT);
    pinMode(A5, OUTPUT);   // PWM 0 to 255
    Particle.function("doAll", doAllFunction);   
}

void loop() {
    myDescending -= 1;
    
    if (myDescending < 0){
        myDescending = 0;
    }
    
    analogWrite(A5, myDescending); 
    delay(2000);
}


int doAllFunction(String myCommand) {
   
    myInt = myCommand.toInt();  
    
    if  (myCommand == "toggleLED"){
        digitalWrite(D7, !digitalRead(D7));
        Particle.publish("myCommand variable is: ", myCommand, 60, PRIVATE);  
        myReturn = digitalRead(D7);    // just so it is either 0 or 1


    } else if (myCommand == "photoResistor"){
        myReturn = analogRead(A0);   
        
        
    } else if (myInt > 0 ){  // myInt can be a number between 1 and 256
        myDescending = myInt-1;  // so 0 to 255
        myReturn = myDescending;   
        
        
    } else {
        myReturn = -1;   // showing an incorrect argument
    }
    return myReturn;                
