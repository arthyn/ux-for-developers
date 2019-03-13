const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const address = {
    street: '123 Meadow Lane',
    city: 'Lafayette',
    zip: '70506',
    state: 'LA',
    country: 'US'
}

const card = {
    number: '4111 1111 1111 1111',
    name: 'Hunter Miller',
    expiration: '02/22',
    cvv: '222'
}

const bankAccount = {
    number: '000123456789',
    routing: '110000000',
    type: 'individual',
    country: 'US'
}

function createStripeToken(tokenInfo, callback) {
    stripe.tokens.create(tokenInfo, function(err, token) {
        if (err) {
            return;
        }

        callback(token);
    });
}

function stripeCharge(token, amount) {
    return stripe.charges.create({
        amount: amount,
        currency: 'usd',
        description: '',
        source: token,
      });
}

function ProcessPaypalCreditCardPayment(card, address, amount) { 
    var tokenInfo = {
        card: {
            address_city: address.city,
            number: card.number,
            address_line1: address.street.split('\n')[0],
            address_line2: address.street.split('\n')[1],
            exp_month: card.expiration.split('/')[0],
            exp_year: card.expiration.split('/')[1],
            cvc: card.cvv,
            address_state: address.state,
            name: card.name,
            address_country: address.country,
            address_zip: address.zip
        }
    };

    createStripeToken(tokenInfo, (token) => stripeCharge(token, amount));
}

function ProcessPaypalBankPayment(bankAccount, amount) {
    const tokenInfo = {
        bank_account: {
            country: bankAccount.country,
            currency: 'usd',
            account_holder_name: bankAccount.name,
            account_holder_type: bankAccount.type,
            routing_number: bankAccount.routingNumber,
            account_number: bankAccount.number
        }
    };
    
    createStripeToken(tokenInfo, (token) => stripeCharge(token, amount));
}

function ProcessInvoice() {
    return createInvoice();
}

function ProcessPaypalCreditCardPayment(card, address, amount) { ..... }

function ProcessPaypalBankPayment(bankInfo, amount) { ..... }