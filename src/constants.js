// Brand Constants
export const WHATSAPP_NUMBER = "233244910331";
export const WHATSAPP_BASE   = "https://wa.me/" + "233244910331";
export const EMAIL            = "hamzatfarms@gmail.com";
export const FACEBOOK_URL     = "https://www.facebook.com/share/1LA1BNLG3a/";
export const TIKTOK_URL       = "";
export const LOCATION         = "Kokobiriko, 2km from Abidjan Nkwanta, Bosomtwe District, Ashanti, Ghana";

export const ORDER_MESSAGE = encodeURIComponent(
  "Hello Hamzat Farms! I'd like to place an order.\n\nProduct: \nGrade/Type: \nQuantity: \nDelivery or Pickup: \nLocation (if delivery): \nName: "
);

export const buildBookingMessage = ({ name, phone, date, visitors }) =>
  encodeURIComponent(
    "Hello Hamzat Farms! I'd like to book a farm visit.\n\nName: " + name + "\nPhone: " + phone + "\nPreferred Date: " + date + "\nNumber of Visitors: " + visitors
  );

export const EGG_PRICES = [
  { grade: "Pullet",   price: 25 },
  { grade: "Small",    price: 35 },
  { grade: "Medium",   price: 40 },
  { grade: "Large",    price: 45 },
  { grade: "Jumbo",    price: 60 },
  { grade: "Unsorted", price: 45 },
];

export const BIRD_PRICES = [
  { type: "Spent Layer (Brown)",         price: 85 },
  { type: "Spent Layer (White Leghorn)", price: 60 },
];

export const PRODUCT_CATEGORIES = [
  {
    icon: "🥚",
    title: "Fresh Eggs",
    description: "Available in Pullet, Small, Medium, Large, Jumbo, and Unsorted grades. Priced per crate in line with National Poultry Farmers Association guidelines.",
    cta: "Order Eggs",
  },
  {
    icon: "🐔",
    title: "Live Chickens (Spent Layers)",
    description: "We sell spent layer hens — both Brown and White Leghorn varieties. Healthy birds at fair prices, available for direct pickup or delivery.",
    cta: "Order Birds",
  },
  {
    icon: "🌱",
    title: "Poultry Litter",
    description: "High-quality organic poultry manure ideal for cocoa farms, cabbage farms, and other crops. A natural fertiliser that improves soil health and yield.",
    cta: "Enquire Now",
  },
  {
    icon: "📋",
    title: "Animal Consultancy",
    description: "Want to start a poultry farm? We offer hands-on consultancy for anyone getting into animal farming, especially poultry. Learn from our experience at Hamzat Farms.",
    cta: "Book Consultation",
  },
];

export const VISIT_SLOTS = [
  { day: "Saturday", time: "9:00 AM - 4:00 PM" },
  { day: "Sunday",   time: "10:00 AM - 2:00 PM" },
];

export const STATS = [
  { label: "Founded",        value: 2021, suffix: "" },
  { label: "Starting Flock", value: 1000, suffix: "+" },
  { label: "Years Growing",  value: 4,    suffix: "" },
  { label: "Delivery",       value: "Nationwide", suffix: "", isText: true },
];
