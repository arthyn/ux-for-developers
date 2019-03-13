function Process(processorType, accountType, expiration, address, name, cvv, amount, city, zip, state, number, country, routingNumber, bankAccountType) {
    var stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

    if (processorType == 'stripe') {
        if (accountType == 'credit-card') {
            stripe.tokens.create({
                card: {
                    address_city: city,
                    number: number,
                    address_line1: address.split('\n')[0],
                    address_line2: address.split('\n')[1],
                    exp_month: expiration.split('/')[0],
                    exp_year: expiration.split('/')[1],
                    cvc: cvv,
                    address_state: state,
                    name: name,
                    address_country: country,
                    address_zip: zip
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
                country: country,
                currency: 'usd',
                account_holder_name: name,
                account_holder_type: bankAccountType,
                routing_number: routingNumber,
                account_number: number
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