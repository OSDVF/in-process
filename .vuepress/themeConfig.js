module.exports = {
  sidebar: 'auto',
  nextLinks: true,
  prevLinks: true,
  //Nastavení pro editační odkazy
  docsRepo: 'OSDVF/in-process',
  editLinks: false,
  nav: [
    {
      "text": "✒️ Písničky",
      "link": "/docs/",
    },
    {
      "text": "🎤 Koncerty",
      "link": "/timeline/"
    },
    {
      "text": "🔌 Kontakt",
      "link": "/docs/contact"
    }
  ],
  type: "ProcessHome",
  noFoundPageByTencent: false,
  friendLink: [
    {
      "title": "Poetické jelito",
      "desc": "Kreativní výbuchy 😋",
      "link": "https://poeticke-jelito.webnode.cz/"
    },
    {
      "title": "Příliš mnoho smajlíků",
      "desc": "Polička s věcmi, které mě, nebo někoho jiného jednou napadly, nebo je zažil... A řekl si, že se na té poličce budou dobře vyjímat 😁",
      "link": "http://prilismnohosmajliku.wz.cz/",
      "logo": "http://prilismnohosmajliku.wz.cz/ikony/favicon-32x32.png"
    },
  ],
  
  search: true,
  searchMaxSuggestions: 10,
  lastUpdated: "Naposledy aktualizováno",
  startYear: "2021",

  blogConfig :{
    socialLinks: [     // Information bar displays social information
      { icon: 'fab fa-youtube', link: 'https://www.youtube.com/channel/UC1P4UzQVhkA6EbqoTP7ZKYA', color: 'red' },
      { icon: 'fab fa-facebook', link: 'https://fb.me/vprocesu', color: '#3498db' }
    ]
  }
}
