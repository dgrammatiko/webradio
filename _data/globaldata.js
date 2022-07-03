// This data should be gathered from static JSON files...
module.exports = {
  // Countries
  countries: [
    {code: 'GB', name: 'United Kingdom'},
    {code: 'GR', name: 'Greece'},
  ],
  // Stations
  stations: {
    GB: [
      {
        code: 'BBC6',
        name: "BBC 6 Music",
        stream: "http://stream.live.vc.bbcmedia.co.uk/bbc_6music"
      },
      {
        code: 'BBC2',
        name: "BBC Radio 2",
        stream: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_two"
      },
      {
        code: 'RAC105',
        name: "RAC 105",
        stream: "http://streaming.rac105.cat"
      },
      {
        code: 'RAC1',
        name: "RAC1",
        stream: "http://streaming.rac1.cat"
      },
      {
        code: 'CATAL',
        name: "Catalunya Ràdio",
        stream: "https://shoutcast.ccma.cat/ccma/catalunyaradioHD.mp3"
      },
      {
        code: 'CUNIT',
        name: "Radio Cunit",
        stream: "https://streaming.enacast.com/radiocunitHD.mp3"
      },
      {
        code: 'ROCK',
        name: "Rock FM (es)",
        stream: "http://rockfm.cope.stream.flumotion.com/cope/rockfm/playlist.m3u8"
      },
      {
        code: 'HEART',
        name: "Heart London",
        stream: "http://media-ice.musicradio.com/HeartLondonMP3.m3u"
      },
    ],
    GR: [
      {
        name: "ERA 1 (PROTO)",
        code: "ERA1",
        stream: "http://radiostreaming.ert.gr/ert-proto",
        imageUrl: ""
      },
      {
        name: "ERA 2 (DEFTERO)",
        code: "ERA2",
        stream: "http://radiostreaming.ert.gr/ert-deftero",
        imageUrl: ""
      },
      {
        name: "ERA 3 (TRITO)",
        code: "ERA3",
        stream: "http://radiostreaming.ert.gr/ert-trito",
        imageUrl: ""
      },
      {
        name: "ERA 4 (SPORT)",
        code: "ERA4",
        stream: "http://radiostreaming.ert.gr/ert-erasport",
        imageUrl: ""
      },
      {
        name: "ERA 5 (VOICE OF GREECE)",
        code: "ERA5",
        stream: "http://radiostreaming.ert.gr/ert-voiceofgreece",
        imageUrl: ""
      },
      {
        name: "ERA KOSMOS",
        code: "ERA6",
        stream: "http://radiostreaming.ert.gr/ert-kosmos",
        imageUrl: ""
      },
      {
        name: "En Lefko 877 radio",
        code: "ENLEFKO",
        stream: "http://stream.radiojar.com:80/enlefko877",
        imageUrl: ""
      },
      {
        name: "Best FM 92.6",
        code: "BEST",
        stream: "http://best.live24.gr/best1222",
        imageUrl: ""
      },
      {
        name: "Kiss FM 92.9",
        code: "KISS",
        stream: "http://kissfm.live24.gr/kiss2111",
        imageUrl: ""
      },
    ],
  },
};
