const https = require('follow-redirects').https;
const request = require('request');
const awaitRequest = require('async-request');
const mqtt = require('mqtt');
const Paho = require('paho-mqtt');
const mysql = require('mysql');



/*
const host = 'dev.rightech.io'
const port = '1883'
const clientId = `mySkill`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
   clientId,
   clean: true,
   connectTimeout: 4000,
   username: '1',
   password: '1',
   reconnectPeriod: 1000,
 });
 const topic = 'data/tempIN'
 const topic2 = 'controls/json'
 let mes;

 async function top2() {
 client.on('connect', () => {
   console.log('Connected')
 
   client.subscribe([topic2], () => {
     console.log(`Subscribe to topic '${topic2}'`)
     /*client.publish(topic2, '49,5', { qos: 0, retain: false }, (error) => {
       if (error) {
         console.error(error);
       }
     });
   });
 });
 
 client.on('message', (topic2, payload) => {
   console.log('Received Message:', topic2, payload.toString());
   mes = payload.toString();
   return mes;
   //client.end();
 });
 
 }
/*
top2().then(function(value){
   console.log('Вывели из функции: ', mes);
});



var Client;

var connectOptions = {
  timeout: 30,
  reconnect: true,
  cleanSession: false,
  mqttVersion: 4,
  keepAliveInterval: 10,
  onSuccess: onConnect,
  onFailure: onFailure
}

function send() {
   var message = new Paho.Message('499');
   message.destinationName = topic2;
   message.qos = 2;
   Client.send(message);
}

async function connect() {
  try {
    Client = new Paho.Client(host, 1883,"", clientId);
    connectOptions.userName = '1';
    connectOptions.password = '1';
    Client.connect(connectOptions);
    console.log('connection');
  } catch (ex) {
    console.log(ex);
  }
}

function onConnect() {
  console.log('on connect');
  //Client.onMessageArrived = function(message) {
  //  console.log("onMessageArrived: " + message.payloadString);
 // }
  Client.subscribe("topic2", { qos: 2 });
}

function onFailure(err) {
  console.log('on failure', JSON.stringify(err));
}


/*
connect().then(function(){
 onConnect();
});
*/

let myJSON;
async function ex_01 () {
   const options = {
      'metod' : 'GET',
      'hostname' : 'dev.rightech.io',
      'path' : '/api/v1/objects/65250b6460ae92155f13c237',
      'headers' : {
         'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NTUzNDUyMWY1ZjU4Yjc0ZTViOTc5MWEiLCJzdWIiOiI2MjE1YTcyOGFhN2U1YjAwMTAzOTkzN2YiLCJncnAiOiI2MjE1YTcyOGFhN2U1YjAwMTAzOTkzN2UiLCJvcmciOiI2MjE1YTcyOGFhN2U1YjAwMTAzOTkzN2UiLCJsaWMiOiI1ZDNiNWZmMDBhMGE3ZjMwYjY5NWFmZTMiLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY5OTk1NjAwMSwiZXhwIjoyMDQ5NjQ5MjAwfQ.Mm-gnqymIC2mDeirvJtl50_r7U1fuTTpUS_iWKe9KVE'
      },
      'maxRedirects' : 20 
   }
   const req = https.request(options, function (res){
     let chunks = [];
     res.on('data', function (chunk){
      chunks.push(chunk);
     });
     res.on('error', function(error){
      console.log(error);
     });
     res.on('end', function(){
      let body = Buffer.concat(chunks);
      //console.log(body);
      myJSON = JSON.parse(body.toString());
      console.log(myJSON);
      console.log(myJSON.processedState.tempOUT);
      /*function processNested(myJSON) {
         for (let key in myJSON) {
           if (typeof myJSON[key] === 'object' && myJSON[key] !== null) {
             processNested(myJSON[key]);  // Заглядываем глубже в структуру
           } else {
              // Дошли до значения
           }
         }
       }*/
     });

     
   });
   req.end(); 
   //console.log(myJSON.processedState.tempOUT);
}
//ex_01();
//let MyJson;
async function ex_02 () {
   
   let data = await awaitRequest('HTTPS://dev.rightech.io/api/v1/objects/65250b6460ae92155f13c237?only=processedState.payload', {
      'method' : 'GET',
      'headers' : {
         'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NTUzNDUyMWY1ZjU4Yjc0ZTViOTc5MWEiLCJzdWIiOiI2MjE1YTcyOGFhN2U1YjAwMTAzOTkzN2YiLCJncnAiOiI2MjE1YTcyOGFhN2U1YjAwMTAzOTkzN2UiLCJvcmciOiI2MjE1YTcyOGFhN2U1YjAwMTAzOTkzN2UiLCJsaWMiOiI1ZDNiNWZmMDBhMGE3ZjMwYjY5NWFmZTMiLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY5OTk1NjAwMSwiZXhwIjoyMDQ5NjQ5MjAwfQ.Mm-gnqymIC2mDeirvJtl50_r7U1fuTTpUS_iWKe9KVE'
      }
   });
   
      data = JSON.parse(data.body);
     
   //console.log(data);
   return data;
}

const sqlOptions = {
   user: 'pekinkmail',
   password: 'A1JGHHGCgHKWELE&',
   database: 'pekinkmail',
   host: 'FVH1.spaceweb.ru',
   port: '3306'  
  
}
const sqlConnection = new mysql.createConnection(sqlOptions);  
sqlConnection.connect(err => {
   if(err) {console.error('Error to connect DB!');
   throw err}
   console.log('Connecting sucessful');
});

   ex_02().then(function(value) {
      //console.log(value);
      let dd = JSON.parse(value.processedState.payload);
      console.log(dd.tempOBR);

      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "TempIN", "`+dd.TempIN+`") ON DUPLICATE KEY UPDATE value = "`+dd.TempIN+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT TempIN');
            throw error
         }else{
            console.log('TempIN+');
         }
      });
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "TempOUT", "`+dd.TempOUT+`") ON DUPLICATE KEY UPDATE value = "`+dd.TempOUT+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT TempOUT');
            throw error
         }else{
            console.log('TempOUT+');
         }
      });
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "HumIN", "`+dd.HumIN+`") ON DUPLICATE KEY UPDATE value = "`+dd.HumIN+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT HumIN');
            throw error
         }else{
            console.log('HumIN+');
         }
      });
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "TempVKLADOVKE", "`+dd.TempVKLADOVKE+`") ON DUPLICATE KEY UPDATE value = "`+dd.TempVKLADOVKE+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT TempVKLADOVKE');
            throw error
         }else{
            console.log('TempVKLADOVKE+');
         }
      });
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "TempTEPL", "`+dd.TempTEPL+`") ON DUPLICATE KEY UPDATE value = "`+dd.TempTEPL+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT TempTEPL');
            throw error
         }else{
            console.log('TempTEPL+');
         }
      });
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "tempOBR", "`+dd.tempOBR+`") ON DUPLICATE KEY UPDATE value = "`+dd.tempOBR+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT tempOBR');
            throw error
         }else{
            console.log('tempOBR+');
         }
      });
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "Podsvet", "`+dd.Podsvet+`") ON DUPLICATE KEY UPDATE value = "`+dd.Podsvet+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT Podsvet');
            throw error
         }else{
            console.log('Podsvet+');
         }
      });
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "Light", "`+dd.Light+`") ON DUPLICATE KEY UPDATE value = "`+dd.Light+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT Light');
            throw error
         }else{
            console.log('Light+');
         }
      });
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "Cable", "`+dd.Cable+`") ON DUPLICATE KEY UPDATE value = "`+dd.Cable+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT Cable');
            throw error
         }else{
            console.log('Cable+');
         }
      });
      //console.log('tempIN=' + value.processedState.tempIN);

      sqlConnection.end();
   });
 

//console.log(MyJson);

//console.log(myJSON.length);

/*
GET /api/v1/objects HTTP/1.1
Host: dev.rightech.io
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NTUzNDUyMWY1ZjU4Yjc0ZTViOTc5MWEiLCJzdWIiOiI2MjE1YTcyOGFhN2U1YjAwMTAzOTkzN2YiLCJncnAiOiI2MjE1YTcyOGFhN2U1YjAwMTAzOTkzN2UiLCJvcmciOiI2MjE1YTcyOGFhN2U1YjAwMTAzOTkzN2UiLCJsaWMiOiI1ZDNiNWZmMDBhMGE3ZjMwYjY5NWFmZTMiLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY5OTk1NjAwMSwiZXhwIjoyMDQ5NjQ5MjAwfQ.Mm-gnqymIC2mDeirvJtl50_r7U1fuTTpUS_iWKe9KVE
*/