const fs = require("fs");
const axios = require("axios");
const { convertArrayToCSV } = require("convert-array-to-csv");

const main = async (id, count) => {
  const results = [];

  for (let i = 0; i < count; i++) {
    try {
      const res = await axios.get(
        `https://api.nclbgc.org/v3/Qualifier?id=${id}`
      );

      res.data.forEach(async (each) => {
        const value = {
          id: each.qualifierId,
          business_name: each.name,
          phone_number: each.telephone,
          owner_name: each.qualifierName,
          zip: each.zip,
          status: each.status,
        };

        results.push(value);

        console.log(`${i}: Successfully scraped ${id}`);

        const csv = await convertArrayToCSV(results);

        fs.writeFile("./output.csv", csv, (e) => {
          if (e) {
            console.log(e);
          }
        });
      });
    } catch (e) {
      console.log(`${i}: Issue scraping ${id}`);
    }

    id++;
  }
};

main(32308, 5000);
