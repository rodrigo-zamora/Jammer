const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../testData/testData.json');
const backupPath = path.join(__dirname, '../testData/testDataBackup.json');

function saveJSON(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data));
}

function getJSON() {
    return JSON.parse(fs.readFileSync(dataPath));
}

function restore() {
    fs.copyFileSync(backupPath, dataPath);
}

module.exports = {
    saveJSON,
    getJSON,
    restore
};