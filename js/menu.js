'use strict'
const remote = require('remote')
const shell = require('shell')
const path = require('path')
const Rsync = require('rsync')

var pathToSrc, pathToDest, body='';

function getFolderSelection() {
  var dialog = remote.dialog
  var selection = dialog.showOpenDialog({ properties: ['openDirectory']})

  if (selection && selection[0]) {
    console.log('got Selection');
  }

  console.log(selection);

  return selection[0];  
}

function openSrcFolder() {
  pathToSrc = getFolderSelection();
}

function openDestFolder() {
  pathToDest = getFolderSelection();
}

function startSync() {
  console.log(pathToSrc);
  console.log(pathToDest);

  var rsync = new Rsync()
    .shell('ssh')
    .flags('av')
    .source(pathToSrc)
    .destination(pathToDest);


  rsync.execute(function(error, code, cmd) {
      // we're done 
      console.log(error, code, cmd);
      console.log(body);
  }, function(stdOutChunk){
    body += stdOutChunk;
    console.log(stdOutChunk.toString());
  });  
}
