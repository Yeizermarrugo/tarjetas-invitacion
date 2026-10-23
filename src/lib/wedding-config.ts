export const weddingConfig = {
  couple: {
    partner1: "Yeizer",
    partner2: "Diana",
  },
  date: "2026-12-10",
  displayDate: "10 de diciembre de 2026",
  story: "Elegimos caminar juntos y queremos celebrar el comienzo de este nuevo capítulo rodeados de las personas que hacen nuestra historia más bonita.",
  arrivalTime: "15:30",
  ceremony: {
    time: "16:30",
    endTime: "18:00",
    venue: "Finca Villa Fe",
    address: "Arjona, Bolívar",
    mapsUrl: "https://maps.app.goo.gl/3xKuPZE5XE68pcoYA",
  },
  reception: {
    time: "17:00",
    endTime: "23:30",
    venue: "Finca Villa Fe",
    address: "Arjona, Bolívar",
    mapsUrl: "https://maps.app.goo.gl/3xKuPZE5XE68pcoYA",
  },
  rsvpDeadline: "2026-11-05",
  van: {
    // Valores por defecto si la invitación no tiene punto/hora propios (se editan en /admin).
    meetingPoint: "Por confirmar",
    departureTime: "Por confirmar",
    returnTime: "23:30",
  },
  dressCode: {
    style: "Formal · Elegante",
    women: "Vestido midi o largo en tonos pastel. Sin lentejuelas ni brillos intensos.",
    men: "Vestimenta formal en tonos sobrios o pastel.",
    reserved: "Blanco, marfil, crema y beige reservados para los novios.",
  },
  quote: "", // frase o versículo opcional para destacar, ej: '"El amor es paciente, es bondadoso..." — 1 Corintios 13:4'
  gift: {
    method: "Bre-B",
    key: "300 238 5126",
    holder: "Yeizer Marrugo",
    qrImage: "/images/breb-qr.jpg",
    note: "Tu presencia es nuestro mejor regalo. Si además deseas tener un detalle con nosotros, puedes hacerlo de la forma que te resulte más cómoda.",
    envelopeRain: "El día de la boda tendremos un rincón especial para la lluvia de sobres, donde podrás dejar tus buenos deseos, unas palabras para nosotros o un detalle. Cada sobre será un recuerdo de este día.",
    digitalNote: "Si lo prefieres, también puedes hacerlo de forma digital:",
  },
  tracks: [
    { url: "/audio/romantic-piano.mp3", title: "Canción veneciana · Felix Mendelssohn" },
  ] as { url: string; title: string }[],
  // Sin playlistId: el reproductor arma la lista con los youtubeId de abajo, en este orden.
  youtubePlaylistId: "",
  youtubePlaylist: [
    {
      youtubeId: "LakJahiBl2Y",
      title: "Mi bendición",
      artist: "Juan Luis Guerra",
      duration: "3:13",
    },
    {
      youtubeId: "XjEz9NMyWks",
      title: "Con Cristo vivo mejor",
      artist: "Ismael Miranda",
      duration: "4:38",
    },
    {
      youtubeId: "Kh42aLy-3yg",
      title: "El que te llama",
      artist: "Víctor Manuelle",
      duration: "6:03",
    },
    {
      youtubeId: "ejhJF__T9Bo",
      title: "Las avispas",
      artist: "Juan Luis Guerra",
      duration: "3:17",
    },
    {
      youtubeId: "CZ0lMjPJNhs",
      title: "Tan invitao'",
      artist: "Daddy Yankee",
      duration: "3:17",
    },
    {
      youtubeId: "bMnOX2cjBlU",
      title: "Qué chido",
      artist: "Madiel Lara",
      duration: "2:46",
    },
    {
      youtubeId: "mpvbbgZ8Us8",
      title: "Por eso estoy aquí",
      artist: "Héctor Zuleta",
      duration: "5:26",
    },
    {
      youtubeId: "8xcR-tk2AW0",
      title: "Sobre la roca",
      artist: "Nacho, Jay Kalyl & Funky",
      duration: "3:38",
    },
    {
      youtubeId: "gHNzEF1NRyU",
      title: "Soy salvo",
      artist: "Kafu Banton",
      duration: "3:07",
    },
  ] as { youtubeId: string; title: string; artist: string; duration: string }[],
  gallery: [
    { src: "/images/gallery-ceremony.jpg", alt: "Detalle floral de una ceremonia" },
    { src: "/images/gallery-hands.jpg", alt: "Manos de una pareja" },
    { src: "/images/gallery-shoes.jpg", alt: "Detalles de boda preparados para la celebración" },
  ],
};
