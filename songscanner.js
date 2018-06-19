const fs = require('fs');
const path = require('path');
const id3 = require('id3-parser');
var crypto = require('crypto');

var songs = [];

function checksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'sha1')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}

function walkSync(dir, filelist) {

    var files = fs.readdirSync(dir);

    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            handleSong(path.join(dir, file));
        }
    });
    return filelist;
};

function handleSong(path) {

    var fileBuffer = fs.readFileSync(path);
    var tags = id3.parse(fileBuffer);
    //console.log(tags);

    var hash = checksum(fileBuffer);

    songs.push({
        hash: hash,
        path: path,
        title: tags["title"],
        album: tags["album"],
        track: tags["track"].split('/')[0],
        artist: tags["band"] || tags["artist"]
    });

}

exports.getLibrary = function () {
    var test = walkSync("D:\\Music", []);
    console.log(songs);

    return songs;

}

exports.getLibrary();