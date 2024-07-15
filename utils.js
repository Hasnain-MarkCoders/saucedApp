import sauce1 from "./assets/images/sauce1.png"
import sauce2 from "./assets/images/sauce2.png"
import sauce3 from "./assets/images/sauce3.png"
import sauce4 from "./assets/images/sauce4.png"
import sauce5 from "./assets/images/sauce5.png"
import sauce6 from "./assets/images/sauce6.png"
import sauce7 from "./assets/images/sauce7.png"
import sauce8 from "./assets/images/sauce8.png"

import brand1 from "./assets/images/brand1.png";
import brand2 from "./assets/images/brand2.png";
import brand3 from "./assets/images/brand3.png";
import brand4 from "./assets/images/brand4.png";
import brand5 from "./assets/images/brand5.png";
import brand6 from "./assets/images/brand6.png";
const myurl = "https://images.unsplash.com/photo-1720357632208-63f783022899?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTg0NjV8MHwxfGFsbHwzfHx8fHx8Mnx8MTcyMDYxMzQ4NXw&ixlib=rb-4.0.3&q=80&w=400"
export const welcomeLists = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Maecenas id metus efficitur, sollicitudin mauris in, pellentesque risus.",
    "Vivamus euismod nulla et ex tincidunt porta.",
    "Cras venenatis purus ac nisi finibus fringilla.",
    "Nunc varius sapien quis leo commodo varius.",
    "Vestibulum semper orci et ante pulvinar, vitae vulputate purus facilisis.",
    "Proin nec purus accumsan, ullamcorper nibh eget, ultricies est.",
    "Maecenas sollicitudin eros et pretium fringilla.",
    "Phasellus fermentum nisi sit amet finibus dignissim.",
]

export const handleText = (value,name, updaterFn) => {
    updaterFn(prev => ({ ...prev, [name]: value }));
  };
  

  export const featuredSauces = [
    {
      url: myurl,
      title: "Red Chilli Sauce"
    },
    {
      url: myurl,
      title: "Green Chilli Sauce"
    },
    {
      url: myurl,
      title: "Soy Sauce"
    },
    {
      url: myurl,
      title: "Garlic Sauce"
    }
  ];
  
  export const topRatedSauces = [
    {
      url: myurl,
      title: "Barbecue Sauce"
    },
    {
      url: myurl,
      title: "Habanero Sauce"
    },
    {
      url: myurl,
      title: "Tomato Ketchup"
    },
    {
      url: myurl,
      title: "Mustard Sauce"
    }
  ];

  export const Brands = [
    {
      url: brand1,
      title: "Alpha Inc."
    },
    {
      url: brand4,
      title: "Beta Technologies"
    },
    {
      url: brand6,
      title: "Gamma Solutions"
    },
    {
      url: brand2,
      title: "Delta Corp."
    },
    {
      url: brand3,
      title: "Epsilon Ltd."
    },
    {
      url: brand4,
      title: "Zeta Industries"
    },
    {
      url: brand5,
      title: "Eta Products"
    },
    {
      url: brand6,
      title: "Theta Services"
    },
    {
      url: brand2,
      title: "Iota Enterprises"
    },
    {
      url: brand3,
      title: "Kappa Co."
    }
  ];
  
  
  export function generateThreeDigitRandomNumber() {
    // Generate a random number between 100 and 999 inclusive
    return Math.floor(Math.random() * 900) + 100;
  }

  export function getRandomDate() {
    // Generate a random year between 2020 and 2025
    const year = Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020;
  
    // Generate a random month between 1 and 12
    const month = Math.floor(Math.random() * 12) + 1;
  
    // Generate a random day based on the selected month (considering leap years for February)
    let maxDays = 31; // Default to maximum days in a month (for most months)
    if (month === 4 || month === 6 || month === 9 || month === 11) {
      maxDays = 30; // April, June, September, November have 30 days
    } else if (month === 2) {
      // February, consider leap year (not included in this basic example)
      maxDays = 28; // Assume non-leap year for simplicity
    }
  
    const day = Math.floor(Math.random() * maxDays) + 1;
  
    // Format day, month, and year into "DD-MM-YYYY" format
    const formattedDay = day.toString().padStart(2, '0'); // Ensure two digits with leading zero if necessary
    const formattedMonth = month.toString().padStart(2, '0'); // Ensure two digits with leading zero if necessary
    const formattedYear = year.toString();
  
    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  }