import { asArticleTile } from '@/graviton/lib/articles'
import { Article } from '@/graviton/types'

export const mockArticles: Article[] = [
  {
    id: 'hidden-tokyo',
    title: 'Exploring Hidden Tokyo',
    author: 'Jem Doe',
    text: 'Tokyo is a city of contradictions. In the bustling wards of Shinjuku and Shibuya, neon lights and cutting-edge fashion clash and coexist with shrines tucked into [alleyways](/). The real magic of [Tokyo often](http://google.com) lies in its quieter corners: the smoky izakayas of Nakameguro, the sleepy second-hand bookshops of Jinbocho, and the hidden gardens behind office towers. Wander beyond the tourist hubs to discover markets where local grandmothers haggle over fish prices and find neighborhood festivals where children in yukata dance around bonfires. Hidden Tokyo rewards patience and curiosity with genuine moments of wonder and surprise. Get ready to lace up your walking shoes and dive in.',
    portraitImage: '/tokyo_img_url',
    spotlight: true,
    feature: false,
    description: '',
    updatedAt: '2025-05-20',
    landscapeImage: null,
    locations: ['tokyo', 'berlin', 'lisbon'],
  },
  {
    id: 'berlin-spring',
    title: 'Berlin in Spring: A Local\'s Guide',
    author: 'John Doe',
    text: 'Berlin transforms the gritty urban landscape into a rainbow of cherry-blossom pinks once the cold lifts. Start your walk at [Mauerpark](https://www.berliner-stadtpark.de/mauerpark) for Sunday karaoke and flea-market snacks, then follow the Prenzlauer Berg cobbles south to the [Brandenburg Gate](/locations/berlin-brandenburg-gate) before sunset. Hungry? Pop into **Markthalle Neun** for a pastel-toned plate of käsespätzle or keep strolling to the canal for an ice-cold Club-Mate. Spring also means gallery openings. If you only have time for one, make it [Neue Nationalgalerie](https://www.smb.museum/en/museums-institutions/neue-nationalgalerie/home/)—its Mies van der Rohe lines are as sharp as ever after the renovation. For something quieter, duck into the micro-space [Soy Capitán](/galleries/soy-capitan) just off Moritzplatz. *Seasonal tip:* pack layers. Berlin evenings can still dip below 10 °C in April, and beer-garden benches get drafty.',
    portraitImage: '/berlin_img_url',
    spotlight: false,
    feature: true,
    description: '',
    updatedAt: '2025-05-19',
    landscapeImage: null,
    locations: ['berlin'],
  },
  {
    id: 'weekend-lisbon',
    title: 'Weekend in Lisbon',
    author: 'Jane Doe',
    text: 'Lisbon welcomes visitors with its tile-covered buildings, winding alleys, and the scent of grilled sardines wafting from tiny taverns. Spend your mornings wandering Alfama, riding Tram 28 past pastel-colored homes, and stopping for custard tarts at every bakery you see. Afternoon calls for a walk along the riverfront in Belém and a climb up to the viewpoints of Bairro Alto. As night falls, dive into the city\'s dynamic music scene where Fado songs tug at your heartstrings. Lisbon is best experienced slowly, with lots of breaks for wine and conversation. Two days won\'t be enough, but they\'ll stay with you forever.',
    portraitImage: '/lisbon_img_url',
    spotlight: false,
    feature: true,
    description: '',
    updatedAt: '2025-05-18',
    landscapeImage: null,
    locations: ['lisbon'],
  },
  {
    id: 'coffee-tokyo',
    title: 'Best Coffee Shops in Tokyo',
    author: 'Jem Doe',
    text: 'Forget the chains — Tokyo\'s independent coffee shops are where true artistry lives. From meticulously prepared pour-overs to hyper-specific latte art competitions, this city has elevated coffee to an art form. Visit small specialty shops like Onibus or Koffee Mameya, where beans are roasted in tiny batches and baristas treat each brew like a science experiment. Neighborhoods like Shimokitazawa and Koenji are havens for tiny cafes packed with personality. If you\'re willing to wander side streets and back alleys, you\'ll find hidden gems that make you feel like a local. Coffee culture in Tokyo is a daily adventure worth savoring.',
    portraitImage: '/tokyo_coffee_img_url',
    spotlight: false,
    feature: true,
    description: '',
    updatedAt: '2025-05-17',
    landscapeImage: null,
    locations: ['tokyo'],
  },
  {
    id: 'staying-berlin',
    title: 'Where to Stay in Berlin',
    author: 'John Doe',
    text: 'Berlin\'s hospitality scene mirrors the city itself: unpretentious, artistic, and slightly rebellious. From boutique hotels tucked inside 19th-century buildings in Prenzlauer Berg to stylish Airbnbs hidden in Kreuzberg courtyards, accommodation options abound. Mitte offers luxury and history side by side, while Friedrichshain delivers budget-friendly and youthful energy. When choosing your base, think about what you want within walking distance: art galleries, craft beer bars, flea markets? Berlin has it all — just pick a neighborhood that matches your vibe, and the city will take care of the rest.',
    portraitImage: '/berlin_stays_img_url',
    spotlight: false,
    feature: false,
    description: '',
    updatedAt: '2025-05-16',
    landscapeImage: null,
    locations: ['berlin'],
  },
  {
    id: 'radar-miami',
    title: 'Under the Radar in Miami',
    author: 'Anna Smith',
    text: 'Miami is more than beaches and neon-lit nightlife. Venture beyond South Beach to discover the city\'s booming art scene in Wynwood, authentic Cuban food in Little Havana, and lush botanical gardens in Coral Gables. Early risers should visit the farmers market at Legion Park for local produce and handmade crafts. The city\'s diversity shines through in its food, music, and art, creating a rich tapestry that rewards exploration. For a quieter day, head out to Virginia Key or the Deering Estate to experience Miami\'s stunning natural beauty without the crowds.',
    portraitImage: '/miami_img_url',
    spotlight: false,
    feature: false,
    description: '',
    updatedAt: '2025-05-15',
    landscapeImage: null,
    locations: ['miami'],
  },
  {
    id: 'lisbon-day-trips',
    title: 'Day Trips from Lisbon',
    author: 'Jane Doe',
    text: 'Lisbon may have your heart, but don\'t miss the incredible day trips surrounding it. Sintra\'s colorful palaces look like something straight out of a fairytale, while the beaches of Cascais offer sandy escapes just a short train ride away. Foodies should head north to the medieval town of Óbidos for ginginha and fresh pastries, or south to Setúbal for world-class seafood. Portugal\'s small size means you can experience lush forests, rocky cliffs, and historic castles all within an hour of Lisbon. Day trips offer a deeper glimpse into Portugal\'s magic.',
    portraitImage: '/lisbon_daytrips_img_url',
    spotlight: false,
    feature: false,
    description: '',
    updatedAt: '2025-05-14',
    landscapeImage: null,
    locations: ['lisbon'],
  },
  {
    id: 'no-location',
    title: 'No Location Article',
    author: 'No One',
    text: 'This article is not about any particular place.',
    portraitImage: null,
    spotlight: false,
    feature: false,
    description: '',
    updatedAt: '2025-05-12',
    landscapeImage: null,
    locations: [],
  },
]

export const mockArticleTiles = mockArticles
  .map(asArticleTile)