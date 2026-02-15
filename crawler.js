const axios = require("axios");
const cheerio = require("cheerio");
const XLSX = require("xlsx");

const BASE = "https://bimeh.com";

let results = [];

async function getUrlsFromSitemap() {
    const sitemap = await axios.get(`${BASE}/sitemap.xml`);
    const urls = [...sitemap.data.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    return urls;
}

async function extractSchema(url) {
    try {
        const { data } = await axios.get(url, { timeout: 15000 });
        const $ = cheerio.load(data);

        $('script[type="application/ld+json"]').each((i, el) => {
            try {
                const json = JSON.parse($(el).html());

                results.push({
                    url,
                    type: json["@type"] || "",
                    raw: JSON.stringify(json),
                });

            } catch { }
        });

        console.log("✔", url);

    } catch (e) {
        console.log("❌", url);
    }
}

async function run() {
    const urls = await getUrlsFromSitemap();

    console.log("Total URLs:", urls.length);

    for (const url of urls) {
        await extractSchema(url);
    }

    const sheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, sheet, "Schemas");

    XLSX.writeFile(workbook, "schemas.xlsx");

    console.log("DONE → schemas.xlsx");
}

run();
