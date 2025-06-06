const panoramaLocations = [
  {
    id: 'entrance',
    name: 'Main Entrance',
    image: 'https://via.placeholder.com/350x150',
    description: 'The grand entrance welcomes visitors with its stunning architecture and serene atmosphere. This is the starting point of your virtual tour.',
    features: ['Entrance', 'Reception', 'Welcome Area'],
    panoramaImage: 'https://pannellum.org/images/alma.jpg',
    initialViewParams: {
      yaw: 0,
      pitch: 0,
      hfov: 110
    },
    hotspots: [
      {
        id: 'to-lobby',
        type: 'custom',
        text: 'Go to Lobby',
        yaw: 10,
        pitch: 0,
        sceneId: 'lobby'
      },
      {
        id: 'entrance-info',
        type: 'info',
        text: 'Entrance Information',
        yaw: -30,
        pitch: 0
      }
    ]
  },
  {
    id: 'lobby',
    name: 'Main Lobby',
    image: 'https://via.placeholder.com/350x150',
    description: 'The luxurious lobby features elegant furnishings and panoramic views of the surrounding landscape. Relax in comfort as you take in the beauty of the space.',
    features: ['Seating Area', 'Reception Desk', 'Concierge'],
    panoramaImage: 'https://pannellum.org/images/cerro-toco-0.jpg',
    initialViewParams: {
      yaw: 180,
      pitch: 0,
      hfov: 110
    },
    hotspots: [
      {
        id: 'to-entrance',
        type: 'custom',
        text: 'Return to Entrance',
        yaw: 180,
        pitch: 0,
        sceneId: 'entrance'
      },
      {
        id: 'to-restaurant',
        type: 'custom',
        text: 'Go to Restaurant',
        yaw: 90,
        pitch: 0,
        sceneId: 'restaurant'
      },
      {
        id: 'lobby-info',
        type: 'info',
        text: 'Lobby Information',
        yaw: 0,
        pitch: 0
      }
    ]
  },
  {
    id: 'restaurant',
    name: 'Signature Restaurant',
    image: 'https://via.placeholder.com/350x150',
    description: 'Our signature restaurant offers a delightful culinary experience with a menu that combines local flavors with international cuisine. Enjoy your meal with stunning views of the surroundings.',
    features: ['Fine Dining', 'Outdoor Seating', 'Bar', 'Ocean View'],
    panoramaImage: 'https://pannellum.org/images/whipple-creek-regional-park-0.jpg',
    initialViewParams: {
      yaw: -90,
      pitch: 0,
      hfov: 110
    },
    hotspots: [
      {
        id: 'to-lobby',
        type: 'custom',
        text: 'Return to Lobby',
        yaw: -90,
        pitch: 0,
        sceneId: 'lobby'
      },
      {
        id: 'restaurant-info',
        type: 'info',
        text: 'Restaurant Information',
        yaw: 0,
        pitch: 0
      }
    ]
  }
];

export default panoramaLocations; 