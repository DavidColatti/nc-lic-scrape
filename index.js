const fs = require("fs");
const axios = require("axios");
const { convertArrayToCSV } = require("convert-array-to-csv");

const main = async (id, count) => {
  const results = [];

  for (let i = 0; i < count; i++) {
    try {
      const res = await axios.get(
        `https://api.nclbgc.org/v3/License?number=${id}`
      );

      const value = {
        lic_number: res.data.number,
        business_name: res.data.name1,
        business_dba: res.data.name2,
        phone_number: res.data.telephone,
        qualifier: res.data.qualifiers[0],
        zip: res.data.zip,
        renewal_date: res.data.renewalDate,
        classification: res.data.classifications[0],
        status: res.data.status,
      };

      results.push(value);

      console.log(`${i}: Successfully scraped ${id}`);

      const csv = await convertArrayToCSV(results);

      fs.writeFile("./output.csv", csv, (e) => {
        if (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(`${i}: Issue scraping ${id}`);
    }

    id++;
  }
};

main(83294, 5000);
