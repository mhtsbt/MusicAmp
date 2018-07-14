fs = require('fs');

var songs = [];

var player = document.getElementById('player');

var currentPlayingSong;

var songlist = new Vue({
    el: '#songlist',
    data: {
        songs: []
    },
    methods: {

    }
});

var bus = new Vue();

Vue.component('song-row', {
    props: ['song'],
    template: '<div style="padding:10px;" v-on:click="playSong" v-bind:class="{\'playing\':song.playing}">{{song.track}} {{song.title}} {{song.playing}}</div>',
    // data: function () {
    //     return { playing: false };
    // },
    created: function () {
        console.log("hello!");

        //  bus.$on("changedSong", w => { this.playing = false; console.log("song changed", this); });

    },
    methods: {

        playSong: function () {

            var song = this.song;

            if (currentPlayingSong) {
                currentPlayingSong.playing = false;
            }

            bus.$emit('changedSong', {});

            song.playing = true;
            this.playing = true;

            currentPlayingSong = song;


            player.src = "http://localhost:9000/" + song.hash;
            player.play();



        }
    }
});

//const songscanner = require("./songscanner");

//var data = songscanner.getLibrary();

/*
for (var i = 0; i < data.length; i++) {
    songlist.songs.push(data[i]);
}*/

songlist.songs.push({ title: "test", playing: false });