
void setup() {
    pinMode(D7, OUTPUT);
    Particle.function("doAll", doAllFunction);   
}

void loop() {

}

int myReturn = 0;

int doAllFunction(String myCommand) {
    if  (myCommand == "toggleLED"){
        digitalWrite(D7, !digitalRead(D7));
        Particle.publish("myCommand variable is: ", myCommand, 60, PRIVATE);  
      myReturn = digitalRead(D7);    // just so it is either 0 or 1

    } else if (myCommand == "photoResistor"){
        
        myReturn = analogRead(A0);   
    } else {
        myReturn = -1;   // showing an incorrect argument
    }
    return myReturn;                                
}
