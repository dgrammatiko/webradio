// This data should be gathered from static JSON files...
module.exports = {
  // Countries
  countries: [
    {code: '', name: 'Select a country'},
    {code: 'GB', name: 'United Kingdom'},
    {code: 'GR', name: 'Greece'},
  ],
  // Stations
  stations: {
    GB: [
      {
        code: 'BBC6',
        name: "BBC 6",
        stream: "http://stream.live.vc.bbcmedia.co.uk/bbc_6music",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        code: 'BBC2',
        name: "BBC Radio 2",
        stream: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_two",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        code: 'RAC105',
        name: "RAC 105",
        stream: "http://streaming.rac105.cat",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        code: 'RAC1',
        name: "RAC1",
        stream: "http://streaming.rac1.cat",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        code: 'THEBEATLONDON',
        name: "The Beat London",
        stream: "https://stream-26.zeno.fm/eeatkqnpb2zuv?zs=eQaqsKS_Txej1J8AtbPpLA",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        code: 'CUNIT',
        name: "Radio Cunit",
        stream: "https://streaming.enacast.com/radiocunitHD.mp3",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        code: 'ROCK',
        name: "Rock FM",
        stream: "http://rockfm.cope.stream.flumotion.com/cope/rockfm/playlist.m3u8",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        code: 'HEART',
        name: "Heart London",
        stream: "http://media-ice.musicradio.com/HeartLondonMP3.m3u",
        imageUrl: "/assets/images/speaker.svg"
      },
    ],
    GR: [
      {
        name: "ERA 1",
        code: "ERA1",
        stream: "http://radiostreaming.ert.gr/ert-proto",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        name: "ERA 2",
        code: "ERA2",
        stream: "http://radiostreaming.ert.gr/ert-deftero",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        name: "ERA 3",
        code: "ERA3",
        stream: "http://radiostreaming.ert.gr/ert-trito",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        name: "ERA 4",
        code: "ERA4",
        stream: "http://radiostreaming.ert.gr/ert-erasport",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        name: "ERA 5",
        code: "ERA5",
        stream: "http://radiostreaming.ert.gr/ert-voiceofgreece",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        name: "ERA KOSMOS",
        code: "ERA6",
        stream: "http://radiostreaming.ert.gr/ert-kosmos",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        name: "En Lefko",
        code: "ENLEFKO",
        stream: "http://stream.radiojar.com:80/enlefko877",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        name: "Best FM",
        code: "BEST",
        stream: "http://best.live24.gr/best1222",
        imageUrl: "/assets/images/speaker.svg"
      },
      {
        name: "Kiss FM",
        code: "KISS",
        stream: "http://kissfm.live24.gr/kiss2111",
        imageUrl: "/assets/images/speaker.svg"
      },
    ],
  },
};
