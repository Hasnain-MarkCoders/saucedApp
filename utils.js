import sauce1 from "./assets/images/sauce1.png"
import sauce2 from "./assets/images/sauce2.png"
import sauce3 from "./assets/images/sauce3.png"
import sauce4 from "./assets/images/sauce4.png"
import sauce5 from "./assets/images/sauce5.png"
import sauce6 from "./assets/images/sauce6.png"
import sauce7 from "./assets/images/sauce7.png"
import sauce8 from "./assets/images/sauce8.png"


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