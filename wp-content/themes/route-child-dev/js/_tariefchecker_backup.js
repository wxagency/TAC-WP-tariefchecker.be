var params = new ProductSet.Parameters({
locale: "nl",
customer_type: "residential",
comparison_type: "electricity",
postal_code: 2000,
residents: 3,
usage: {
day: 3500,
night: 3500,
excl_night: 5000,
},
only_energy_cost: true,
promo: true,
});

var selector = new ProductSet.Selector(params);
/*
selector.select('Goedkoopste groene').by('green', 'y');
selector.select('Prijsvast').by('pricing_type', 'fixed').and('contract_duration', 13);
console.log(selector.select('Goedkoopste groene').by('green', 'y').decorate('supplier_greenpeace_rating', 'supplier_naam'));
*/

selector.select('Goedkoopste groene').by('green', 'y').decorate("supplier_greenpeace_rating", ProductSet.Decorators.greenpeace);

selector.bind();

console.log(selector);
