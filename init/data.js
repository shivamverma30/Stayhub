const sampleListings = [
  {
    title: "Sunset Shack by Calangute Beach",
    description:
      "A cozy beach stay in Goa with quick access to cafes, nightlife, and evening sunsets over the Arabian Sea.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2400,
    location: "Goa",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [74.124, 15.2993],
    },
  },
  {
    title: "Pineview Mountain Cabin",
    description:
      "Warm wooden interiors and valley views make this Manali cabin ideal for a peaceful mountain retreat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2100,
    location: "Manali",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2432],
    },
  },
  {
    title: "Pink City Heritage Haveli",
    description:
      "Traditional architecture with modern comfort in Jaipur, close to markets, forts, and local food streets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    },
    price: 1900,
    location: "Jaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124],
    },
  },
  {
    title: "Marine Drive Skyline Studio",
    description:
      "Stylish apartment in Mumbai with city skyline views and easy access to business hubs and coastal roads.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3200,
    location: "Mumbai",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.076],
    },
  },
  {
    title: "Rice Terrace Pool Villa",
    description:
      "Private pool villa in Bali surrounded by lush greenery, perfect for a serene tropical getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1200&q=80",
    },
    price: 4100,
    location: "Bali",
    country: "Indonesia",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095],
    },
  },
  {
    title: "Cliffside White Dome Stay",
    description:
      "Iconic Santorini stay with caldera views, blue-domed lanes, and unforgettable golden-hour scenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    },
    price: 4800,
    location: "Santorini",
    country: "Greece",
    geometry: {
      type: "Point",
      coordinates: [25.4615, 36.3932],
    },
  },
  {
    title: "Left Bank Boutique Loft",
    description:
      "Elegant Paris loft near cafes, galleries, and metro links, designed for long walks and city exploration.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    },
    price: 4300,
    location: "Paris",
    country: "France",
    geometry: {
      type: "Point",
      coordinates: [2.3522, 48.8566],
    },
  },
  {
    title: "Palm Jumeirah Luxury Retreat",
    description:
      "Modern high-rise stay in Dubai with premium amenities, shopping access, and dramatic skyline evenings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048],
    },
  },
  {
    title: "SoHo Brick Loft Apartment",
    description:
      "Classic New York loft with open-plan interiors, easy subway access, and a vibrant neighborhood vibe.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    },
    price: 4600,
    location: "New York",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-74.006, 40.7128],
    },
  },
  {
    title: "Shibuya Neon View Residence",
    description:
      "Compact and smart Tokyo residence near shopping and transit, blending comfort with city energy.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3700,
    location: "Tokyo",
    country: "Japan",
    geometry: {
      type: "Point",
      coordinates: [139.6917, 35.6895],
    },
  },
  {
    title: "Table Mountain Ocean Escape",
    description:
      "Bright Cape Town stay with ocean breeze, mountain backdrops, and easy access to coastal drives.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2600,
    location: "Cape Town",
    country: "South Africa",
    geometry: {
      type: "Point",
      coordinates: [18.4241, -33.9249],
    },
  },
  {
    title: "Backwater Serenity Houseboat",
    description:
      "A calm and scenic stay in Alleppey with traditional charm, lake views, and peaceful sunrise mornings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2300,
    location: "Alleppey",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981],
    },
  },
  {
    title: "Lakeside Heritage Palace Stay",
    description:
      "Experience Udaipur in a refined palace-style property overlooking serene waters and old-city architecture.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3400,
    location: "Udaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.7125, 24.5854],
    },
  },
  {
    title: "Bosphorus View Designer Flat",
    description:
      "A stylish Istanbul apartment blending historic surroundings with modern comfort near major landmarks.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2900,
    location: "Istanbul",
    country: "Turkey",
    geometry: {
      type: "Point",
      coordinates: [28.9784, 41.0082],
    },
  },
  {
    title: "Alfama Rooftop River Apartment",
    description:
      "Charming Lisbon stay with tiled interiors, rooftop seating, and easy access to tram routes and viewpoints.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3100,
    location: "Lisbon",
    country: "Portugal",
    geometry: {
      type: "Point",
      coordinates: [-9.1393, 38.7223],
    },
  },
  {
    title: "Canal District Boutique Suite",
    description:
      "Elegant Amsterdam suite near canals and museums, ideal for a comfortable and walkable city stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3900,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: {
      type: "Point",
      coordinates: [4.9041, 52.3676],
    },
  },
  {
    title: "Opera District Classic Residence",
    description:
      "A polished Vienna apartment close to music halls, cafes, and grand boulevards in the historic center.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2800,
    location: "Vienna",
    country: "Austria",
    geometry: {
      type: "Point",
      coordinates: [16.3738, 48.2082],
    },
  },
  {
    title: "Andes Skyline Urban Loft",
    description:
      "Modern loft in Santiago featuring city-and-mountain views, cowork-friendly setup, and premium amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2600,
    location: "Santiago",
    country: "Chile",
    geometry: {
      type: "Point",
      coordinates: [-70.6693, -33.4489],
    },
  },
];

module.exports = { data: sampleListings };