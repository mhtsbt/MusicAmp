fs = require('fs');

var songs = [];

var example1 = new Vue({
    el: '#example-1',
    data: {
        items: songs
    }
});


fs.readFile('songs.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);

    var data = JSON.parse(data);
    console.log(data);

    for (var i = 0; i < data.length; i++) {
        songs.push(data[i]);
    }
    //songs.push({ title: "test" });

});