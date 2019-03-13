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

function Process(processorType, accountType, card, address, bankAccount, amount) {
    var stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

    if (processorType == 'stripe') {
        if (accountType == 'credit-card') {
            stripe.tokens.create({
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
                }, function(err, token) {
                    if (err) {
                        return;
                    }
            
                    (async () => {
                        const charge = await stripe.charges.create({
                          amount: amount,
                          currency: 'usd',
                          description: '',
                          source: token,
                        });
                      })();
                });
    } else if (accountType == 'bank') {
        stripe.tokens.create({
            bank_account: {
                country: bankAccount.country,
                currency: 'usd',
                account_holder_name: bankAccount.name,
                account_holder_type: bankAccount.type,
                routing_number: bankAccount.routingNumber,
                account_number: bankAccount.number
              }
            }, function(err, token) {
                if (err) {
                    return;
                }
        
                (async () => {
                    const charge = await stripe.charges.create({
                      amount: amount,
                      currency: 'usd',
                      description: '',
                      source: token,
                    });
                  })();
            });
    
        } else if (accountType == 'invoice') {
            return createInvoice();
        }
    } else if (processorType == 'paypal') {
            if (accountType == 'credit-card') {
                ...
            } else if (accountType == 'bank') {
                ...
        } 
            else if (accountType == 'invoice') {
                return createInvoice();
            }
    }
}