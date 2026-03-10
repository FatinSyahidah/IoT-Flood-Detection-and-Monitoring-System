#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <PubSubClient.h>
#include "DHT.h"

#define DHTPIN 5
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
float temp;
float hum;
unsigned long previousMillis = 0;   // Stores last time temperature was published
const long interval = 10000;  

#define SOUND_VELOCITY 0.034

const int trigPin = 22;
const int echoPin = 23;
const int buzzer = 18;

long duration;
float distanceCm;
float waterLevel = 0;


// WiFi
//const char *ssid = "abc"; // Enter your WiFi name
//const char *password = "abc";  // Enter WiFi password
const char *ssid = "abc"; // Enter your WiFi name
const char *password = "abc";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "192.168.188.105";
// MQTT Broker
//const char *mqtt_broker = "192.168.68.9";
const char *topic1 = "SgKuantan/Flood/Temperature";
const char *topic2 = "SgKuantan/Flood/Humidity";
const char *topic3 = "SgKuantan/Flood/WaterLevel";

const char *topic4 = "FK/Flood/Status";

const char *mqtt_username = "ali";
const char *mqtt_password = "abc123";
const int mqtt_port = 1883;

char pubData;
float data;
char msg_out[10];
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // Set software serial baud to 115200;
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output : ultra
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input : ultra
  pinMode(buzzer, OUTPUT);

  dht.begin();
  
  // connecting to a WiFi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  //connecting to a mqtt broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
      String client_id = "esp32-DV-01";
      client_id += String(WiFi.macAddress());
      Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
      if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
          Serial.println("Public emqx mqtt broker connected");
      } else {
          Serial.print("failed with state ");
          Serial.print(client.state());
          delay(2000);
      }
  }
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
      Serial.print((char) payload[i]);
  }
  Serial.println();
  Serial.println("-----------------------");
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    // Save the last time a new reading was published
    previousMillis = currentMillis;
    // New DHT sensor readings
    hum = dht.readHumidity();
    // Read temperature as Celsius (the default)
    temp = dht.readTemperature();

    if (isnan(temp) || isnan(hum)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }

     //ultrasonic
    // Clears the trigPin
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);

    // Sets the trigPin on HIGH state for 10 micro seconds
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    
    // Reads the echoPin, returns the sound wave travel time in microseconds
    duration = pulseIn(echoPin, HIGH);
    
    // Calculate the distance
    distanceCm = duration * SOUND_VELOCITY/2;
    float waterLevel = 15.00 - distanceCm;
  

  if (waterLevel >= 10.0){
    digitalWrite(buzzer, HIGH);
    delay(2000);
  }
  else{
    digitalWrite(buzzer, LOW);
    delay(2000);
  }
  
    // publish and subscribe
  client.publish(topic1, String(temp).c_str());
  client.publish(topic2, String(hum).c_str());
  client.publish(topic3, String(waterLevel).c_str());
  client.subscribe(topic1);
  client.subscribe(topic2);
  client.subscribe(topic3);
  
  delay(1000);
  client.loop();
}
}
