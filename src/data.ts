import { Property, City } from './types';

export const CITIES: City[] = [
  { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570160897040-30430ef2015a?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Pune', image: 'https://images.unsplash.com/photo-1562033247-3c4c4422ac59?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Kolkata', image: 'https://images.unsplash.com/photo-1558431382-bb7b58ce4d83?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Ahmedabad', image: 'https://images.unsplash.com/photo-1597042313364-c68962630043?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Jaipur', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Lucknow', image: 'https://images.unsplash.com/photo-1583143874828-de3d288be51a?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Chandigarh', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Indore', image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Bhopal', image: 'https://images.unsplash.com/photo-1569416078500-383780003820?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Nagpur', image: 'https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Kochi', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Coimbatore', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Visakhapatnam', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Patna', image: 'https://images.unsplash.com/photo-1622196033991-3c67b55f287c?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Surat', image: 'https://images.unsplash.com/photo-1597042313364-c68962630043?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
  { name: 'Vadodara', image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=800&q=80', totalProperties: 50 },
];

const PROPERTY_TYPES: Property['type'][] = ['Apartment', 'Villa', 'Independent House', 'Plot', 'Commercial'];

const AMENITIES_POOL = ['Parking', 'Garden', 'Gym', 'Swimming Pool', 'Security', 'Lift', 'Clubhouse', 'Power Backup', 'Water Supply'];

const LOCATIONS: Record<string, string[]> = {
  'Mumbai': ['Andheri West', 'Bandra East', 'Juhu', 'Colaba', 'Borivali', 'Worli', 'Powai'],
  'Delhi': ['Rohini', 'Dwarka', 'Saket', 'Vasant Kunj', 'Janakpuri', 'Lajpat Nagar'],
  'Bangalore': ['Whitefield', 'Indiranagar', 'Koramangala', 'HSR Layout', 'Electronic City', 'Jayanagar'],
  'Hyderabad': ['Banjara Hills', 'Gachibowli', 'Hitech City', 'Kukatpally', 'Jubilee Hills'],
  'Chennai': ['Adyar', 'Velachery', 'Anna Nagar', 'T Nagar', 'OMR'],
  'Pune': ['Kothrud', 'Baner', 'Viman Nagar', 'Hinjewadi', 'Magarpatta'],
  'Kolkata': ['Salt Lake', 'New Town', 'Ballygunge', 'Park Street', 'Behala'],
  'Ahmedabad': ['Satellite', 'Prahlad Nagar', 'Bopal', 'Ghatlodia', 'Navrangpura'],
  'Jaipur': ['Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'C Scheme', 'Raja Park'],
  'Lucknow': ['Gomti Nagar', 'Aliganj', 'Indira Nagar', 'Hazratganj', 'Jankipuram'],
  'Chandigarh': ['Sector 17', 'Sector 35', 'Sector 44', 'Sector 22', 'Sector 8'],
  'Indore': ['Vijay Nagar', 'Saket', 'Palasia', 'Rajendra Nagar', 'Bhawarkua'],
  'Bhopal': ['Arera Colony', 'MP Nagar', 'Gulmohar', 'Kolar Road', 'Indrapuri'],
  'Nagpur': ['Dharampeth', 'Ramdaspeth', 'Laxmi Nagar', 'Manish Nagar', 'Civil Lines'],
  'Kochi': ['Edappally', 'Kadavanthra', 'Vyttila', 'Marine Drive', 'Kakkanad'],
  'Coimbatore': ['RS Puram', 'Race Course', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony'],
  'Visakhapatnam': ['MVP Colony', 'Seethammadhara', 'Gajuwaka', 'Madhurawada', 'Rushikonda'],
  'Patna': ['Boring Road', 'Kankarbagh', 'Patliputra', 'Bailey Road', 'Rajendra Nagar'],
  'Surat': ['Adajan', 'Vesu', 'Piplod', 'Varachha', 'Katargam'],
  'Vadodara': ['Alkapuri', 'Gotri', 'Sayajigunj', 'Akota', 'Manjalpur']
};

const HOUSE_IMAGE_IDS = [
  '1568605114967-8130f3a36994', '1512917774080-9991f1c4c750', '1600585154340-be6161a56a0c', '1518780664697-55e3ad937233',
  '1448630360428-65ff2c0257ef', '1480074568708-e7b720bb3f09', '1500382017468-9049fed747ef', '1472224371017-08207f84aaae',
  '1494526585095-c41746248156', '1513584684032-43f52a5850b4', '1523217582562-09d0def993a6', '1570129477492-45c003edd2be',
  '1564013799919-ab600027ffc6', '1580587767503-3997489cd524', '1510798831971-661eb04b3739', '1505843513577-22bb7d21ef45',
  '1501183638710-841dd1904471', '1432316858286-de7cb60d0eaa', '1502672260266-1c1ef2d93688', '1512915920337-382e75243f63'
];

const LIVING_IMAGE_IDS = ['1586023492125-27b2c045efd7', '1484154218962-a197022b5858', '1600210492486-724fe5c67fb0', '1556912177-450034b7e507'];
const BEDROOM_IMAGE_IDS = ['1595526114035-0d45ed16cfbf', '1560185127-6ed189bf02f4', '1560184897-ae75f418493e', '1505691938895-1758d7eaa511'];
const KITCHEN_IMAGE_IDS = ['1556911220-e15b29be8c8f', '1556909114-f6e7ad7d3136', '1556912177-450034b7e507', '1584622650111-993a426fbf0a'];
const BATHROOM_IMAGE_IDS = ['1584622650111-993a426fbf0a', '1552321554-5fefe8c9ef14', '1507652313519-d4e9174996dd', '1552321554-5fefe8c9ef14'];

const generateProperties = (): Property[] => {
  const properties: Property[] = [];
  let idCounter = 1;

  CITIES.forEach(city => {
    const distribution = [
      { type: 'Apartment', count: 20 },
      { type: 'Villa', count: 10 },
      { type: 'Independent House', count: 10 },
      { type: 'Plot', count: 5 },
      { type: 'Commercial', count: 5 }
    ];

    distribution.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        const currentId = idCounter++;
        const propId = `PROP${String(currentId).padStart(4, '0')}`;
        
        let priceValue: number;
        if (type === 'Apartment') {
          const rand = Math.random();
          if (rand < 0.4) priceValue = 10 + Math.random() * 40;
          else if (rand < 0.8) priceValue = 50 + Math.random() * 100;
          else priceValue = 150 + Math.random() * 850;
        } else if (type === 'Villa' || type === 'Independent House') {
          const rand = Math.random();
          if (rand < 0.3) priceValue = 40 + Math.random() * 60;
          else priceValue = 100 + Math.random() * 900;
        } else {
          priceValue = 10 + Math.random() * 990;
        }

        const location = LOCATIONS[city.name][Math.floor(Math.random() * LOCATIONS[city.name].length)];
        const houseImgId = HOUSE_IMAGE_IDS[currentId % HOUSE_IMAGE_IDS.length];
        
        const priceStr = priceValue >= 100 
          ? `₹${(priceValue / 100).toFixed(2)} Cr` 
          : `₹${Math.round(priceValue)} Lakhs`;

        properties.push({
          id: propId,
          name: `${location} ${type} ${i + 1}`,
          city: city.name,
          location: location,
          type: type as any,
          price: priceStr,
          priceValue: priceValue,
          area: `${500 + Math.floor(Math.random() * 4500)} sq ft`,
          bedrooms: type === 'Plot' || type === 'Commercial' ? 'N/A' : `${1 + Math.floor(Math.random() * 5)} BHK`,
          image: `https://images.unsplash.com/photo-${houseImgId}?auto=format&fit=crop&w=800&q=80&sig=${currentId}`,
          gallery: {
            exterior: `https://images.unsplash.com/photo-${houseImgId}?auto=format&fit=crop&w=800&q=80&sig=${currentId}_ext`,
            living: `https://images.unsplash.com/photo-${LIVING_IMAGE_IDS[currentId % LIVING_IMAGE_IDS.length]}?auto=format&fit=crop&w=800&q=80&sig=${currentId}_liv`,
            bedroom: `https://images.unsplash.com/photo-${BEDROOM_IMAGE_IDS[currentId % BEDROOM_IMAGE_IDS.length]}?auto=format&fit=crop&w=800&q=80&sig=${currentId}_bed`,
            kitchen: `https://images.unsplash.com/photo-${KITCHEN_IMAGE_IDS[currentId % KITCHEN_IMAGE_IDS.length]}?auto=format&fit=crop&w=800&q=80&sig=${currentId}_kit`,
            bathroom: `https://images.unsplash.com/photo-${BATHROOM_IMAGE_IDS[currentId % BATHROOM_IMAGE_IDS.length]}?auto=format&fit=crop&w=800&q=80&sig=${currentId}_bath`,
            balcony: `https://images.unsplash.com/photo-1594498257602-32638e98529c?auto=format&fit=crop&w=800&q=80&sig=${currentId}_balc`,
            surroundings: `https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80&sig=${currentId}_surr`,
            aerial: `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80&sig=${currentId}_aer`
          },
          description: `A premium ${type} located in ${location}, ${city.name}. This property offers exceptional value with modern architecture and high-quality construction.`,
          amenities: AMENITIES_POOL.slice(0, 4 + Math.floor(Math.random() * 5)),
          reviews: []
        });
      }
    });
  });

  return properties;
};

export const PROPERTIES = generateProperties();
