const https = require('follow-redirects').https;
const request = require('request');
const awaitRequest = require('async-request');
const mqtt = require('mqtt');
const Paho = require('paho-mqtt');
const mysql = require('mysql');

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

 const sqlOptions = {
   user: 'pekinkmail',
   password: 'A1JGHHGCgHKWELE&',
   database: 'pekinkmail',
   host: 'FVH1.spaceweb.ru',
   port: '3306'  
  
}

 function top2() {
   client.on('connect', () => {
     console.log('Connected')
   
     client.subscribe('#', () => {
       console.log(`Subscribe to topic #`)
       /*client.publish(topic2, '49,5', { qos: 0, retain: false }, (error) => {
         if (error) {
           console.error(error);
         }
       });*/
     });
   });

     
   
   
   client.on('message', (topic, payload) => {
     console.log('Received Message:', topic, payload.toString());
     //mes = payload.toString();
     //return mes;
     //console.log(mes);
     const sqlConnection = new mysql.createConnection(sqlOptions);
     sqlConnection.connect(err => {
      if(err) {console.error('Error to connect DB!');
      throw err;}else {
      console.log('Connecting sucessful');}
      });

     try {
      sqlConnection.connect(err => {
         if(err) {console.error('Error to connect DB!'+err);
         }else{
         console.log('Connecting sucessful');}
         });

   } catch(err){
      console.log('Ошибка блока try возможно подключение уже установлено. Err: '+err);

   }
    
     if (topic == "STM_Kitchen/json") {
      let mess = JSON.parse(payload);

      
      
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65bb66c3bc339ebd645cf599","ESP_STM_Kitchen", "LightKitchen", "`+mess.LightKitchen+`") ON DUPLICATE KEY UPDATE value = "`+mess.LightKitchen+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT LightKitchen');
            //throw error
         }else{
            console.log('LightKitchen+');
         }
      });
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65bb66c3bc339ebd645cf599","ESP_STM_Kitchen", "FlowerKitchen", "`+mess.FlowerKitchen+`") ON DUPLICATE KEY UPDATE value = "`+mess.FlowerKitchen+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT FlowerKitchen');
            //throw error
         }else{
            console.log('FlowerKitchen+');
         }
      });
      
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65bb66c3bc339ebd645cf599","ESP_STM_Kitchen", "LightBathroom", "`+mess.LightBathroom+`") ON DUPLICATE KEY UPDATE value = "`+mess.LightBathroom+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT LightBathroom');
            //throw error
         }else{
            console.log('LightBathroom+');
         }
      });
      
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65bb66c3bc339ebd645cf599","ESP_STM_Kitchen", "FlowerBathroom", "`+mess.FlowerBathroom+`") ON DUPLICATE KEY UPDATE value = "`+mess.FlowerBathroom+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT FlowerBathroom');
            //throw error
         }else{
            console.log('FlowerBathroom+');
         }
      });
      
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65bb66c3bc339ebd645cf599","ESP_STM_Kitchen", "LightBedroom1", "`+mess.LightBedroom1+`") ON DUPLICATE KEY UPDATE value = "`+mess.LightBedroom1+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT LightBedroom1');
            //throw error
         }else{
            console.log('LightBedroom1+');
         }
      });
      
      sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65bb66c3bc339ebd645cf599","ESP_STM_Kitchen", "LightBedroom2", "`+mess.LightBedroom2+`") ON DUPLICATE KEY UPDATE value = "`+mess.LightBedroom2+`";`,(error, results, fields) => {
         if (error) {
            console.log('Error to INSERT LightBedroom2');
            //throw error
         }else{
            console.log('LightBedroom2+');
         }
      });
      
      }else{
         if (topic == "controls/json") {
            let dd = JSON.parse(payload);
            sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "TempIN", "`+dd.TempIN+`") ON DUPLICATE KEY UPDATE value = "`+dd.TempIN+`";`,(error, results, fields) => {
               if (error) {
                  console.log('Error to INSERT TempIN');
                  //throw error
               }else{
                  console.log('TempIN+');
               }
            });
            sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "TempOUT", "`+dd.TempOUT+`") ON DUPLICATE KEY UPDATE value = "`+dd.TempOUT+`";`,(error, results, fields) => {
               if (error) {
                  console.log('Error to INSERT TempOUT');
                  //throw error
               }else{
                  console.log('TempOUT+');
               }
            });
            sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "HumIN", "`+dd.HumIN+`") ON DUPLICATE KEY UPDATE value = "`+dd.HumIN+`";`,(error, results, fields) => {
               if (error) {
                  console.log('Error to INSERT HumIN');
                  //throw error
               }else{
                  console.log('HumIN+');
               }
            });
            sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "TempVKLADOVKE", "`+dd.TempVKLADOVKE+`") ON DUPLICATE KEY UPDATE value = "`+dd.TempVKLADOVKE+`";`,(error, results, fields) => {
               if (error) {
                  console.log('Error to INSERT TempVKLADOVKE');
                  //throw error
               }else{
                  console.log('TempVKLADOVKE+');
               }
            });
            sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "TempTEPL", "`+dd.TempTEPL+`") ON DUPLICATE KEY UPDATE value = "`+dd.TempTEPL+`";`,(error, results, fields) => {
               if (error) {
                  console.log('Error to INSERT TempTEPL');
                  //throw error
               }else{
                  console.log('TempTEPL+');
               }
            });
            sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "tempOBR", "`+dd.tempOBR+`") ON DUPLICATE KEY UPDATE value = "`+dd.tempOBR+`";`,(error, results, fields) => {
               if (error) {
                  console.log('Error to INSERT tempOBR');
                  //throw error
               }else{
                  console.log('tempOBR+');
               }
            });
            sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "Podsvet", "`+dd.Podsvet+`") ON DUPLICATE KEY UPDATE value = "`+dd.Podsvet+`";`,(error, results, fields) => {
               if (error) {
                  console.log('Error to INSERT Podsvet');
                  //throw error
               }else{
                  console.log('Podsvet+');
               }
            });
            sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "Light", "`+dd.Light+`") ON DUPLICATE KEY UPDATE value = "`+dd.Light+`";`,(error, results, fields) => {
               if (error) {
                  console.log('Error to INSERT Light');
                 // throw error
               }else{
                  console.log('Light+');
               }
            });
            sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "Cable", "`+dd.Cable+`") ON DUPLICATE KEY UPDATE value = "`+dd.Cable+`";`,(error, results, fields) => {
               if (error) {
                  console.log('Error to INSERT Cable');
                 // throw error
               }else{
                  console.log('Cable+');
               }
            });
         }else{
            if (topic == "flowers/status") {
               
               sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("656a2c1f0108a62bb821236c","EspFlowers", "FlowersStatus", "`+payload+`") ON DUPLICATE KEY UPDATE value = "`+payload+`";`,(error, results, fields) => {
                  if (error) {
                     console.log('Error to INSERT FlowesrStatus');
                     //throw error
                  }else{
                     console.log('FlowersStatus+');
                  }
               });
            }
         }
      }

     //client.end();
     sqlConnection.end();
   });
   
   }
  
  top2();
  