import dotenv from 'dotenv';
import connectDb from "./config/db.mjs";
import StoreLocator from "./models/storelocatormodel.js";

dotenv.config();
await connectDb();

const storesData = [
  {
    id: 1,
    name: "Marol",
    address: "Shop 3 (Ground floor), Arkade Prime Bldg, Makwana Rd, Gamdevi, Marol, Andheri East, Mumbai, Maharashtra 400059",
    phone: "09167090720",
    mapLink: "https://maps.app.goo.gl/PsBT6yYJmiwm4H8F8",
    image: "https://lh3.googleusercontent.com/p/AF1QipNqUNhuQ3wHQl_jhoIU-l7dZDQk8S2JMirOnpOi=s1360-w1360-h1020-rw"
  },
  {
    id: 2,
    name: "Andheri",
    address: "B2, Shree Siddhivinayak Plaza, Off New Link Rd, Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra 400053",
    phone: "091366 79610",
    mapLink: "https://maps.app.goo.gl/DfZ3CcMMV3U47Gz68",
    image: "https://lh3.googleusercontent.com/p/AF1QipNpk3PmGxQp19AuvsoUm5CUpyynC_0T-bnqxsLZ=s1360-w1360-h1020-rw"
  },
  {
    id: 3,
    name: "Bandra",
    address: "1st Floor, A Wing, Pali Mala Rd, Pali Naka, Bandra West, Mumbai, Maharashtra 400050",
    phone: "084339 58389",
    mapLink: "https://maps.app.goo.gl/3svZh9E6a1bYsJdF7",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepVrTfjq4r5LSHmkaPXSS20hW5ckcRLz7xiBKIEiB4brME1MOq_yRVzqKma_wuSAEtgmLcw7iYVxNaFzpT8gHvIbKuhv3bcnslMinNPis5TYemUlNTxwDONVecMuY3Mi35nWNOT_KYjnTo=s1360-w1360-h1020-rw"
  },
  {
    id: 4,
    name: "Malad",
    address: "WING-E, 13-14, Off, New Link Rd, opp. Movie Time Cinema, Evershine Nagar, Malad West, Mumbai, Maharashtra 400064",
    phone: "088794 85752",
    mapLink: "https://maps.app.goo.gl/E2pAZhiGR7uLdq9y8",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerKT3Ulvr1xt4ZxyCS5uQPTh7BOC9v1mpWiQeBBMogrCUqMFd3IPNjsL6p8Nk3_DXetkwQMan48xIZSa3b8Wkd7CCSrNz59lr291mJtGlzrlVXd1H2HBlh12fzgFkLIwrudbBRPpg=s1360-w1360-h1020-rw"
  },
  {
    id: 5,
    name: "Vashi",
    address: "Shop 25, Ground Floor, Satra Plaza, Palm Beach Rd, Phase 2, Sector 19D, Vashi, Navi Mumbai, Maharashtra 400703",
    phone: "099305 00381",
    mapLink: "https://maps.app.goo.gl/ZV1KXQHM25obUa9F7",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweq-AxWwjLOW_5lKv6o9gzu-sRkdzvi5fCZN2MUz2cOTPJBuKL2-BHOtWeCnm_JSKXT2khhBgZj3CX3tAIYHBWXEo3ngM_JRNpQ48j1aUCmR7_slhBhnbwfRQ7XAbr8lmtalsIFNPzkR_eGS=w145-h156-n-k-no"
  },
  {
    id: 6,
    name: "Thane",
    address: "The Walk, Ventana 1st Floor S1032, Hiranandani Estate, Patlipada, Thane West, Thane, Maharashtra 400607",
    phone: "090046 78433",
    mapLink: "https://maps.app.goo.gl/ksU6NxVtAMLe8zjm7",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqHtIXP72eC1-ANd9ebbSM1zZk8qRDvMNKM1c1L0j_7e3ecbWimYX40SvO_hyNjsTH0w5Rwiv5awhSNAqfiSmBRotaIElzblrkC95Cz_S-SRhlJDhjV94_YHwvHXBlC3gyaCiJZyA=s1360-w1360-h1020-rw"
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await StoreLocator.deleteMany({});
    console.log("Cleared existing store data");

    // Insert new data
    await StoreLocator.insertMany(storesData);
    console.log("Successfully seeded store locator data!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
