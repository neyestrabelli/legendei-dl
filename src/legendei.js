var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var download = require('download-file');
var utils = require('./utils');
var q = require('q');
var path = require('path');


function legendeiDL() {
}

legendeiDL.prototype.search  = function (parameters) {
   var file = parameters.originalFiles[parameters.subjectList.indexOf(parameters.subject)];
   file = path.basename(file);
   file = file.replace(/\.[^/.]+$/, "");
   var def = q.defer();
   console.log('Buscando legenda para '+file.green);
   var urlSearch = 'https://legendei.com/?s='+file;
   var seasonEp = /S\d\dE\d\d/i;
   var m = urlSearch.match(seasonEp);
   if(!m) {
       console.log("Não identifiquei o episodio, vou tentar como filme".red);
       parameters.isMovie = true;

   } else {
       var myEP  = m[0];
       myEP = myEP.toLowerCase();
   }
   var urlSerie;
   request(urlSearch, function(error, response, html){
           if(!error){
               var $ = cheerio.load(html);
               $('.legendeitm-grid-post-title a').filter(function(){
                   var data = $(this);
                   urlSerie = data.attr('href');
                   if(!parameters.isMovie){
                       var match = urlSerie.match(seasonEp);
                       var matchEP = match[0];
                       matchEP = matchEP.toLowerCase();
                       if(myEP == matchEP){
                               console.log("Encontrado:"+file.green);
                               parameters.url = urlSerie;
                       } else {
                           console.log("Legenda nao disponivel".red);
                           return;
                       }
                   } else {
                       console.log("Baixando primeiro encontrado: %s".green, data.text());
                       parameters.url = urlSerie;
                   }

               });
               if(!parameters.url){
                   console.log("Legenda nao disponivel".red);
                    return def.resolve(false);
               }
               return def.resolve(parameters);

           } else {
               console.log("Legenda nao disponivel".red);
               return def.resolve(false);
           }
   });
   return def.promise;
};




legendeiDL.prototype.openURL = function(parameters){
    var def = q.defer();
    if(!parameters) {
        return def.resolve(false);
    }
    var url = parameters.url;
    if(!url) return def.resolve(false);
    request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var downloadLink;
                $('.buttondown').filter(function(){
                    var data = $(this);
                    downloadLink = data.attr('href');
                    parameters.urlDownload = downloadLink;
                });
                return def.resolve(parameters);

            }

    });
    return def.promise;

}


legendeiDL.prototype.saveFile  = function(parameters){
    var def = q.defer();
    if(!parameters) {
        return def.resolve(false);
    }
    var file = parameters.file;
    var url = parameters.urlDownload;
    if(!url) {
        console.log("Legenda ainda nao disponivel".red);
        return def.resolve(false);
    }
	// RegExp to extract the filename from Content-Disposition
    var regexp = /filename=\"(.*)\"/gi;

// initiate the download
var req = request.get( url )
                 .on( 'response', function( res ){

                    // extract filename
                    var filename = regexp.exec( res.headers['content-disposition'] )[1];
                    // create file write stream
                    var pathFile = file+filename;
                    parameters.file = pathFile;
                    req.pipe(fs.createWriteStream(pathFile).on('finish', function () {
                        return def.resolve(parameters);
                    }));
                 });

 return def.promise;
}
exports.create = function () {
    return new legendeiDL();
};
