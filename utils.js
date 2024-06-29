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
      url: sauce1,
      title: "Red Chilli Sauce"
    },
    {
      url: sauce2,
      title: "Green Chilli Sauce"
    },
    {
      url: sauce3,
      title: "Soy Sauce"
    },
    {
      url: sauce4,
      title: "Garlic Sauce"
    }
  ];
  
  export const topRatedSauces = [
    {
      url: sauce5,
      title: "Barbecue Sauce"
    },
    {
      url: sauce6,
      title: "Habanero Sauce"
    },
    {
      url: sauce7,
      title: "Tomato Ketchup"
    },
    {
      url: sauce8,
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
  
  