#!/usr/bin/env node
(function () {
    'use strict';
    const utils = require('./utils');
    var fs = require('fs');
    var legendei =require('./legendei').create();
    var q = require('q');
    var directory;
    var config;
    if (fs.existsSync('./config.js')) {
        config = require('./config');
        if(config.seriesPath) directory = config.seriesPath;
    }


    if(process.argv[2]) directory = process.argv[2];
   if(!directory) {
       console.log("missing directory");
       console.log("call node index.js directory")
       process.exit(4);
   }
    var path = directory;
    require('colors');


    utils.fileList(path)
        .then(function (response) {
            var subjectList = response.subjectList;
            var originalFiles = response.originalFiles;
            var len = subjectList.length;

            if (!len) {
                console.log('Nenhum episodio sem legenda. \n\n'.green);
                return false;
            }

            console.log('%d episodio%s sem legenda. '.yellow, len, len > 1 ? 's' : '');
            var queue = [];

            subjectList.forEach(function (subject) {
                queue.push(function () {
                    return utils.fetchSubtitle(legendei, path, subject, subjectList, originalFiles);
                });
            });
            var func = queue.pop();
            queue.reduce(q.when, func());
        });
})();
