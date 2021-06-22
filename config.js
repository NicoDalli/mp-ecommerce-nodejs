const config = require("konphyg")(__dirname + "/configs")("main");

exports.integratorId = "dev_24c65fb163bf11ea96500242ac130004";
exports.accessToken = "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398";
exports.externalReference = "nicodalli98@gmail.com";
exports.notificationUrl = `${config.baseUrl}/ipn`;

exports.backUrls = {
    "success": `${config.baseUrl}/success`,
    "failure": `${config.baseUrl}/failure`,
    "pending": `${config.baseUrl}/pending`
};

exports.payer = {
    name: "Lalo",
    surname: "Landa",
    email: "test_user_63274575@testuser.com",
    date_created: "2015-06-02T12:58:41.425-04:00",
    phone: {
        area_code: "11",
        number: 22223333
    },
    identification: {
        type: "DNI",
        number: "12345678"
    },
    address: {
        street_name: "Falsa",
        street_number: 123,
        zip_code: "1111"
    }
}