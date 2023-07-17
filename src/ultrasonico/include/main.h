/* \mainpage SADAS-DEI :  Automatic availability system for DEI @ FEUP
*
* This project is a simple and intuitive way of checking the availability of FEUP Departament of Informatics Engineering Secretary help
*
* This project was made by:
* @author Andre Correira da Costa
* @author Fabio Sa
* @author Lourenco Goncalves
* @author Marcos Ferreira
*
* @date 03/05/2023
*/

#include <Arduino.h>
#include <HCSR04.h>
#include <M5Atom.h>
#include <FastLED.h>
#include <stack>
#include <math.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "constants.h"

//available states for the device
typedef enum {
    FREE, // available -> green light
    OCCUPIED, // occupied -> red light
    AWAY // unavailable -> yellow light
} SystemState;

/*
* Function responsible for the activies of the microcontroller and sensor.
* It garantuess the connection with the clients still exists, measures the distance
* from the sensor and avaliates the new state it should be
*/
void loop();

/*
* Updates the state of the device.
* It updates the LED color and sends the new state to the client and data base
*/
void updateExternState();

/*
* Function to send information to broker to check if connection is still working
*/
void sendTelemetry();

void sendToBroker();

/*
* Responsible to configure the microcontroller when it starts running
*/
void setup();

/*
* Function responsible for the connection with the broker.
* It stays in a loop until a connection can be stabilished
*/
void connectToBroker();

int min_num(int num1, int num2);

/*
* Function to setup the microcontroller's wifi.
* It stays in a loop until a wifi connnection can be stabilished
*/
void setupWifi();
