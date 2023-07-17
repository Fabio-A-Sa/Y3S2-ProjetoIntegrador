#include "../include/main.h"

// System State
SystemState systemState = FREE; //remember the default is AWAY
//int telemetryCounter = 0;
int stateCounter = 0, distance = 0, distance1 = 0, distance2 = 0, distance3 = 0;

// Clients and Sensors
WiFiClient espClient;
PubSubClient client(BROKER, PORT, espClient);
UltraSonicDistanceSensor distanceSensor1(TRIGGER_PIN_1, ECHO_PIN_1), distanceSensor2(TRIGGER_PIN_2, ECHO_PIN_2), distanceSensor3(TRIGGER_PIN_3, ECHO_PIN_3);

String mac;

// Connection with WIFI
void setupWifi() { 

    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_ID, WIFI_PASSWORD);
    Serial.print("Connecting to WiFi ..");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print("error");
        delay(1000);
    }
    Serial.println(WiFi.localIP());
}

// Reconnection with broker
void connectToBroker() { 
    uint64_t chipid=ESP.getEfuseMac();
    Serial.printf("ESP32 Chip ID = %04X\n",(uint16_t)(chipid>>32)); //print High 2 bytes
    Serial.println((uint16_t)(chipid>>32),HEX);
    uint16_t chip = (uint16_t)(chipid>>32);
    Serial.println(chip);
    String up = (String)chip;
    Serial.println(up);

    client.setKeepAlive(120);

    while (!client.connected()) {
        Serial.print("\nConnecting to ");
        Serial.println(BROKER);

        if (client.connect(up.c_str())) {

            Serial.print("\nConnected to ");
            Serial.println(BROKER);

        } else {

            Serial.println("\nTrying to connect...");
            delay(5000);

        }
    }
}

void checkBrokerConnection(){
    if (!client.connected()) {
        connectToBroker();
    } client.loop();
}

// configures the microcontroller when it starts
void setup () {
  M5.begin(false, false, true);
  M5.dis.drawpix(0, WHITE_COLOR);
  Serial.begin(9600); 
  Serial1.begin(115200);
  setupWifi();
  client.setServer(BROKER, PORT);
  mac = WiFi.macAddress();
}



void sendToBroker(char measurement[], char payload[]){
    checkBrokerConnection();
    char topic[256];
    sprintf(topic, "%s/%s/%s", BASE_TOPIC, measurement, mac.c_str());
    Serial.printf("%s %s\n", topic, payload);
    client.publish(topic, payload);
}


void updateExternState() {
    switch (systemState) {
        case FREE:
            M5.dis.drawpix(LED_INDEX, FREE_COLOR);
            break;
        case OCCUPIED:
            M5.dis.drawpix(LED_INDEX, OCCUPIED_COLOR);
            break;
        case AWAY:
            M5.dis.drawpix(LED_INDEX, AWAY_COLOR);
            break;
    }
    
    char state[2];
    itoa(systemState, state, 10);
    sendToBroker("state", state);

}

int min_num(int num1, int num2){
    if(num1 == -1){
        return num2;
    }
    else if(num2 == -1){
        return num1;
    }
    return min(num1,num2);
}


void loop() {
    // Measusing the distance
    distance1 = distanceSensor1.measureDistanceCm();
    distance2 = distanceSensor2.measureDistanceCm();
    distance3 = distanceSensor3.measureDistanceCm();
    distance = min_num(distance1, min_num(distance2, distance3));

    char distStr1[4], distStr2[4], distStr3[4];
    itoa(distance1, distStr1, 10);
    sendToBroker("distance1", distStr1);
    itoa(distance2, distStr2, 10);
    sendToBroker("distance2", distStr2);
    itoa(distance3, distStr3, 10);
    sendToBroker("distance3", distStr3);
    Serial.printf("Distance: %3d | State: %d | Counter: %d\n", distance, (int) systemState, stateCounter);

    // Update the counter depending on the read distance and current state
    bool is_present = (distance >= DISTANCE_MIN_LIMIT && distance <= DISTANCE_MAX_LIMIT);
    if ( (is_present && systemState == FREE) || (!is_present && systemState == OCCUPIED)) {
        stateCounter++;
    } else {
        stateCounter = 0;
    }

    // State machine reponsible for changes in device's state
    SystemState oldState = systemState;
    switch (systemState) {
        case FREE:
            if (stateCounter >= MIN_CONSECUTIVE_ATTEMPS) {
                systemState = OCCUPIED; 
                stateCounter = 0;
            }
            if (M5.Btn.wasPressed()) systemState = AWAY;
            break;
        case OCCUPIED:
            if (stateCounter >= MIN_CONSECUTIVE_ATTEMPS) {
                systemState = FREE; 
                stateCounter = 0;}
                
            if (M5.Btn.wasPressed()) systemState = AWAY;
            break;
        case AWAY:
            if (M5.Btn.wasPressed()) systemState = OCCUPIED;
            break;
    }

    if(oldState != systemState){
        updateExternState();
    }


    // Update controller, controller's color and application frontend depending on the new state
    M5.update();
    delay(POLLING_INTERVAL);
}