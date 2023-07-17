/*  
    DEVICE CONFIGURATION FILE

    This file contains the variables that are neeeded for the device to work correctly.
    It is necessary to configure the different configurations:

    1. Wifi settings   -> The microcontroller connects to the server using an internet connection.
    2. LEDs' colors    -> These are the colors shown in the device to represent the state the device is in.
    3. Server Settings -> Server information to be able to correclty send messages to server.
    4. Device Settings -> Settings regarding how to device operates.
    5. Sensors Pins    -> Defines the pin on the microcontroller the sensors will use.
*/

// 1. Wifi Settings
#define WIFI_ID "SADAS-DEI" //             -> Name of the wifi connection
#define WIFI_PASSWORD "sadas51dei@feup" // -> Password

// 2. LEDs' Colors

/*
    The colors represents the different states the microcontroller can be in. Their meaning and default
    values are as follows:
        WHITE_COLOR -> It is the default color (device starts with this color)          | Default value: 0xFFFFFF (white)
        AWAY_COLOR -> It is the color when no secretary is at the table                 | Default value: 0xFFFF00 (yellow)
        FREE_COLOR -> It is the color when the secreatary is available                  | Default value: 0x00FF00 (green)
        OCCUPIRD_COLOR -> It is the color when secretary is currently attending someone | Default value: 0xFF0000 (red)
*/
#define WHITE_COLOR 0xFFFFFF //      White color
#define AWAY_COLOR 0xFFFF00 //       Yellow light
#define FREE_COLOR 0x00FF00 //       Green light
#define OCCUPIED_COLOR 0xFF0000 //   Red light

// 3, Server Settings

/*
    The microcrontoller needs to send 2 different types of information to the broker (which will foward the message to server and database).
    Also to support different devices a Publisher and subscriber model is used, therefore a topic is needed for the device.
    The basic topic is used in the whole system and the whole topic is aumotamically generated using the information of the device.

    The infomaation it sends are:
        1 - State of the device after it changes
        2 - Distances of the sensors every TELEMETRY_INTERVAL

    The information is send using a TCP request:
        - IP and port for the connection with the broker
        - Topic to be processed by the broker

*/

#define BROKER "192.168.0.101" // -> IP of the broker (where the microcontroller will send information)
#define PORT 1883 //              -> Define the port used for the messasge to the controller
#define BASE_TOPIC "sadasdei" //  -> Basic topic (or identifier). THIS NEEDS TO BE THE SAME IN ALL DEVICES USED (CHANGE WITH CAUTION)!!!
#define TELEMETRY_INTERVAL 5 //   -> Interval in seconds to send the distance read by the device

// 4. Device Settings
#define POLLING_INTERVAL 1000 //     -> Interval in milliseconds in which the device will read new distances from the sensors
#define LED_INDEX 0 //               -> Ask jpd to explain  !!!!!!
#define DISTANCE_MAX_LIMIT 66 //     -> Max distance the device can interpret as occupied
#define DISTANCE_MIN_LIMIT 5 //      -> Min distance the device can interpret as occupied (This is because the sensor is unrealiable in low distances, also unlikely to happen)
#define MIN_CONSECUTIVE_ATTEMPS 5 // -> Number of readings to take in account when evaluating a new state for the device

// 5. Sensor Pins

/*
    The ultrasonic sensors are connected to the microcontroller using the pin available in the device itself.
    Each sensor needs two pins for it to work, the pins for each sensor can be defined bellow.
*/

// Sensor 1
#define TRIGGER_PIN_1 22
#define ECHO_PIN_1 19

// Sensor 2
#define TRIGGER_PIN_2 23
#define ECHO_PIN_2 33

// Sensor 3
#define TRIGGER_PIN_3 21
#define ECHO_PIN_3 25
