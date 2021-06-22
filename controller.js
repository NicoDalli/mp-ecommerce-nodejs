const mercadopago = require('mercadopago');
const mpConfig = require('./config');
const config = require("konphyg")(__dirname + "/configs")("main");

exports.detail = async function(req, res) {
    let preferenceId = null;

    try {
        const item = {
            id: 1234,
            title: req.query.title,
            description: "Dispositivo móvil de Tienda e-commerce",
            picture_url: `${config.baseUrl}/${req.query.img}`,
            quantity: +req.query.unit,
            unit_price: +req.query.price,
            category_id: "phones", 
            currency_id: "ARS"
        };

        const preference = {
            payer: mpConfig.payer,
            external_reference: mpConfig.externalReference,
            items: [ item ],
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: "amex"
                    },
                ],
                excluded_payment_types: [
                    {
                        id: "atm"
                    }
                ],
                installments: 6
            },
            back_urls: mpConfig.backUrls,
            notification_url: mpConfig.notificationUrl,
            auto_return: "approved"
        };

        const response = await mercadopago.preferences.create(preference);

        preferenceId = response.body.id;

        console.info(new Date(), "PREFERENCE ID: " + preferenceId);
    } catch (err) {
        console.error(err);
    }

    res.render('detail', {
        ...req.query,
        preferenceId,
        view: "item"
    });
} 

exports.success = function(req, res) {
    console.info(new Date(), "SUCCESS SCREEN DATA: " + JSON.stringify(req.query));

    res.render('success', {
        paymentId: req.query.payment_id,
        externalReference: req.query.external_reference,
        paymentType: req.query.payment_type
    });
}

exports.ipnHandler = function(req, res) {
    console.info(new Date(), "IPN HANDLER BODY: " + JSON.stringify(req.body));

    res.sendStatus(200);
}