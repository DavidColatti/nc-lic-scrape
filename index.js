const axios = require("axios");

const main = async (id, count) => {
  const results = [];

  for (let i = 0; i < count; i++) {
    try {
      const res = await axios.get(
        `https://api.nclbgc.org/v3/Qualifier?id=${id}`
      );

      res.data.forEach((each) => {
        const value = {
          id: each.qualifierId,
          business_name: each.name,
          phone_number: each.telephone,
          owner_name: each.qualifierName,
          zip: each.zip,
          status: each.status,
        };

        results.push(value);

        console.log(`Successfully scraped ${id}`);
      });
    } catch (e) {
      console.log(`Issue scraping ${id}`);
    }

    id++;
  }
};

main(32308, 5);
