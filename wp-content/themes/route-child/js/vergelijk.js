var s = new ProductSet.Selector(new ProductSet.Parameters({
      comparison_type: "pack",
      locale: "nl",
      postal_code: 2000,
      usage: {
        single: 3500,
          gas: 25000,
      },
      only_energy_cost: true,
      promo: true
    }));

s.select('3jrvast').by('pricing_type', 'fixed').and('contract_duration', 3).
decorate("price_period_end",ProductSet.Decorators.date).
decorate("product_contract_duration",ProductSet.Decorators.contract_duration);
