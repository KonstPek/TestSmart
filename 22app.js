const mysql = require('mysql');
const https = require('follow-redirects').https;
const request = require('request');

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

let dataIns = {
   idObj: '65250b6460ae92155f13c237',
   nameObj: 'Wemos в кладовке',
   nameParam: 'tempOUT',
   value: '-1.37'
}
/*
sqlConnection.query('CREATE TABLE IoTValues (idObj varchar(255), nameObj varchar(255), nameParam varchar(255), value float(20))', (error) =>{
   if (error) {
      console.log('Error to create table');
      throw error
   }
});

sqlConnection.query('INSERT INTO IoTValues SET ?', dataIns, (error, results, fields) => {
   if (error) {
      console.log('Error to insert');
      throw error
   }else{
      console.log(results);
   }
});


sqlConnection.query('ALTER TABLE IoTValues ADD UNIQUE INDEX unique_index (idObj, nameParam);',(error, results, fields) => {
   if (error) {
      console.log('Error to ALTER');
      throw error
   }else{
      console.log(results);
   }
});
*/

sqlConnection.query(`INSERT INTO IoTValues (idObj, nameObj, nameParam, value) VALUES ("65250b6460ae92155f13c237","Wemos в кладовке", "tempIN", "24.2") ON DUPLICATE KEY UPDATE value = "24.2";`,(error, results, fields) => {
   if (error) {
      console.log('Error to ALTER');
      throw error
   }else{
      console.log(results);
   }
});

let objId = '65250b6460ae92155f13c237';
let newVal = -4.65;
/*
sqlConnection.query('UPDATE IoTValues SET value = "'+newVal+'" WHERE idObj = "'+objId+'"',(error, results, fields) => {
   if (error) {
      console.log('Error to insert');
      throw error
   }else{
      console.log(results);
   }
});
*/
/*sqlConnection.query('ALTER TABLE IoTValues ADD id INT AUTO_INCREMENT PRIMARY KEY',(error, results, fields) => {
   if (error) {
      console.log('Error to DEL');
      throw error
   }else{
      console.log(results);
   }
});
*/

sqlConnection.end();