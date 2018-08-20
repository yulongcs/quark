const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const message = fs.readFileSync(path.join(__dirname, '../commit.md'), 'utf8');

childProcess.exec('git add --all');
childProcess.exec(`git commit -m '${message}'`);
childProcess.exec('git pull');
childProcess.exec('git push');
