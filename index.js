const bodyParser = require("body-parser");
const express = require("express");
const cron = require('node-cron');
var path = require('path');
const fs = require('fs');
const app = express();

let count = 1;
const pathLogs = '/logs';
fs.mkdirSync(process.cwd() + pathLogs, { recursive: true }, (error) => {
  if (error) {
    console.log(error);
  } else console.log(`Dir created at ${new Date().toISOString()}`);
});

const jsonLog = {
  logTime: new Date().toISOString(),
  message: "This is a demo message",
  logInfo: true,
  serverName: "Test",
}

cron.schedule('*/1 * * * *', () => {
  console.log('Running a task every minute');
  fs.appendFile(`${process.cwd()}/${pathLogs}/newFile_${new Date().toISOString().slice(0, 10)}_${count++}.txt`, writeFile(), (error) => {
    if (error) {
      console.log(error);
    } else console.log(`File created at ${new Date().toISOString()}`);
  });
});

const writeFile = () => {
  return JSON.stringify(jsonLog) + '\n' + JSON.stringify(jsonLog) + '\n' + JSON.stringify(jsonLog) + '\n' + JSON.stringify(jsonLog);
}

app.listen(3000, function () {
  console.log("Server started on port 3000");
});