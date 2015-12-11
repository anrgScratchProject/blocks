/*********************************************************************************************
 *
 *                                     * * * Scratch-Pi2Go Lite Client * * *
 *
 *********************************************************************************************
 * Created by Joshua Akrofi on 10/12/14.
 *
 * This is the Xi Client for Scratch
 *
 * It follows the Scratch JavaScript Extension Spec
 *
 * http://llk.github.io/scratch-extension-docs/
 *
 * Version v.002
 * Nov 7, 2014
 *
 *
 Copyright (c) 2015 Joshua Akrofi All right reserved.
 
 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public
 License as published by the Free Software Foundation; either
 version 3.0 of the License, or (at your option) any later version.
 
 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.
 
 You should have received a copy of the GNU General Public
 License along with this library; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 */


(function(ext) {
 
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    //client object
    var Socket;
 
 
    // Containter for values that are received from the sensors on board the Pi2Go-Lite
    var distance;
    var irLeft;
    var irRight;
    var irLeftLine;
    var irRightLine;
 
   //This block used to establish link with server on Pi2GO robot
    ext.set_Server = function(ipAddress, port, callback) {
        var timeoutID;
 
        Socket = new WebSocket('ws://' + ipAddress + ':' + port+ '/');
        timeoutID = window.setTimeout(noServerAlert, 2000);
 
        Socket.onopen = function (event) {
            window.clearTimeout(timeoutID);
            Socket.send('Xi4sOnline');
            callback();
        };
 
       Socket.onmessage= function (message){
        };
 
 
    };
 
//***********************************************************************************
//                                 MOTOR FUNCTIONS
//***********************************************************************************

 
    //Stop function
    ext.stop = function (){
        var msg= 'stop/';
        sendCommand(msg);
    }
 
    //Forward function
    ext.forward= function (speed){
        var msg= 'forward/' + speed;
        sendCommand(msg);
 
    };
 
    //Reverse function
    ext.reverse= function (speed){
        var msg= 'reverse/' + speed;
        sendCommand(msg);
 
    };
 
    //spinLeft function
    ext.spinLeft= function (speed){
        var msg= 'spinLeft/' + speed;
        sendCommand(msg);
    };
 
    //spinRight function
    ext.spinRight= function (speed){
        var msg= 'spinRight/' + speed;
        sendCommand(msg);
    };
 
    //turnForward function
    ext.turnForward= function (leftSpeed, rightSpeed){
        var msg= 'turnForward/' + leftSpeed + '/' + rightSpeed;
        sendCommand(msg);
    };

    //turnReverse function
    ext.turnReverse= function (leftSpeed, rightSpeed){
        var msg= 'turnReverse/' + leftSpeed + '/' + rightSpeed;
        sendCommand(msg);
    };
 
    //go function
    ext.go= function (leftSpeed, rightSpeed){
        var msg= 'go/' + leftSpeed + '/' + rightSpeed;
        sendCommand(msg);
    };

    //go function
    ext.goBoth= function (speed){
        var msg= 'goBoth/' + speed;
        sendCommand(msg);
    };
 
 
 //***********************************************************************************
 //                                 SERVO FUNCTIONS
 //***********************************************************************************
    /*ext.startServos= function(){
        var msg= 'startServos/';
        sendCommand(msg);
    };
 
    ext.stopServos= function(){
        var msg= 'stopServos/';
        sendCommand(msg);
    };

    ext.setServo= function(Servo, Degrees){
        var msg= 'setServos/'+ Servo + '/' + Degrees;
        sendCommand(msg);
    };*/
 
 
 //***********************************************************************************
 //                                 WHITE LED Functions
 //***********************************************************************************
 
 
    ext.LsetLED= function (LED, value){
        var msg= 'LsetLED/' + LED + '/' + value;
        sendCommand(msg);
    };
 
 
 
 //***********************************************************************************
 //                                 IR Sensor Functions
 //***********************************************************************************
    ext.irLeft= function(){
        var msg= 'irLeft/';
        sendCommand(msg);
 
        Socket.onmessage= function (message){
            var msg= message.data;
            alert("State of irLeft= " + msg);
            irLeft = msg === "False";
 
        };

    };

    ext.irRight= function(){
        var msg= 'irRight/';
        sendCommand(msg);
 
        Socket.onmessage= function (message){
            var msg= message.data;
            alert("State of irRight= " + msg);
            irRight = msg === "False";
 
 
        };

    };
 
    ext.irLeftLine= function(){
        var msg= 'irLeftLine/';
        sendCommand(msg);
 
        Socket.onmessage= function (message){
            var msg= message.data;
            alert("State of irLeftLine= " + msg);
            irLeftLine = msg === "False";
 
        };

    };
 
    ext.irRightLine= function(){
        var msg= 'irRightLine/';
        sendCommand(msg);
 
        Socket.onmessage= function (message){
            var msg= message.data;
            alert("State of irRightLine = " + msg);
            irRightLine = msg === "False";
 
        };

    };
 //***********************************************************************************
 //                                 UltraSonic Functions
 //***********************************************************************************
    ext.ultraSonic= function(){
        var msg= 'ultraSonic/';
        sendCommand(msg);
 
        Socket.onmessage= function (message){
            var msg= message.data;
            alert("Distance= " + msg);
            distance = parseFloat(msg);
 
 
        };
    };
 
 
 //***********************************************************************************
 //                                 SEND COMMAND FUNCTION
 //***********************************************************************************
    function sendCommand(msg)
    {
 
        Socket.send(msg);
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            //Motor Blocks
            ['w', 'Set Server- IPAddress/Port: %s : %s', 'set_Server', 'localhost', '1234'],
            //[' ', 'MOTOR BLOCK INSTRUCTIONS.', 'motorInstructions'],
            [' ', 'Stop', 'stop'],
            [' ', 'Forward- Set Speed= %n', 'forward', '30'],
            [' ', 'Reverse- Set Speed= %n', 'reverse', '30'],
            [' ', 'Spin Right- Set Speed= %n', 'spinRight', '30'],
            [' ', 'Spin Left- Set Speed= %n', 'spinLeft', '30'],
            [' ', 'Turn Forward- Set Right speed= %n : Set Left speed= %n', 'turnForward', '30', '30'],
            [' ', 'Turn Reverse- Set Right speed= %n : Set Left speed= %n', 'turnReverse', '30', '30'],
            [' ', 'Go- Set Right speed= %n : Set Left speed= %n', 'go', '30', '30'],
            [' ', 'GoBoth- Set Speed= %n', 'goBoth', '30'],
            // Servo Blocks
            /*[' ', 'Start Servos', 'startServos'],
            [' ', 'Stop Servos', 'stopServos'],
            [' ', 'Set Servos- Servo:%m.servoNum  Degrees= %n', 'setServo', '1', '30'],
            // LED Blocks
            [' ', 'Set LED:%m.LEDNum Red:%n, Green:%n, Blue:%n', 'setLED', '1', '1000', '1000', '1000'],
            [' ', 'Set All LEDs- Red:%n, Green:%n, Blue:%n', 'setAllLEDs', '1000', '1000', '1000'],*/
            [' ', 'Set White LED:%m.onOff Value:%m.onOff', 'LsetLED','1', '1'],
            //[' ', 'Set All White LEDs- Value:%n', 'LsetAllLEDs','1000'],
            // IR Sensor Blocks
            [' ', 'Left IR Obstacle sensor', 'irLeft'],
            [' ', 'Right IR Obstacle sensor', 'irRight'],
            [' ', 'Left IR Line sensor', 'irLeftLine'],
            [' ', 'Right IR Line sensor', 'irRightLine'],
            // UltraSonic Blocks
            [' ', 'Get Sonar Distance', 'ultraSonic'],
        ],
 
    menus: {
        //LEDNum: ['1', '2'], '3', '4'],
        servoNum: ['1', '2'],
        onOff: ['0', '1'],
 
        },
 
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});


