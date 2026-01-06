# ESP32 DHT22 Sensor with ASCON Encryption
By Abderrahman Loukil and Mohamed Abdelhak Ben Youssef

ESP32 reads temperature & humidity from a DHT22 sensor, encrypts it using **ASCON-128 AEAD**, and sends it via Wi-Fi to a Node.js server. The server decrypts and displays the readings, demonstrating lightweight end-to-end encryption for IoT sensor data.

## Features
- ESP32 reads DHT22 sensor data
- Encrypts data using ASCON-128 AEAD
- Sends encrypted data via Wi-Fi (HTTP POST)
- Node.js server decrypts and displays sensor readings

## Folder Structure
ESP32_ASCON_Project/
├── ESP32_Code/
│ └── DHT_ASCON.ino # ESP32 Arduino sketch
├── NodeServer/
│ ├── server.js # Node.js server for decryption
│ └── package.json
├── README.md


## How to Run

### 1. ESP32
1. Copy the code in `code_arduino_ide.txt` in Arduino IDE in a project file
2. Replace `YOUR_SSID` and `YOUR_PASSWORD` with your Wi-Fi credentials
3. Upload the sketch to your ESP32 board

### 2. Node.js Server
1. Open terminal in `NodeServer` folder
2. Install dependencies:
```bash
npm install express body-parser ascon-js
```

start the server with : node server.js

TEST : 

ESP32 will send encrypted temperature & humidity data every 5 seconds

The Node.js server console will display the decrypted readings, e.g., T=23.45,H=55.23
