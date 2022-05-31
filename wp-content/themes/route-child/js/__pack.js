var price_period = function (date_in_unixtime) {
  var months = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli",
    "Augustus", "September", "Oktober", "November", "December"
  ];
  var date = new Date(date_in_unixtime);
  return months[date.getMonth()] + " " + date.getFullYear();
};

// custom decorator voor de service-levels
var service_level = function(v) {
    if (v == 'full') {
      return "Geen bijzondere voorwaarden qua service";
    }
    if (v == 'online') {
      return "Betaling per domiciliëring verplicht, en uitsluitend communicatie per email";
    }
    if (v == 'e-payment') {
      return "Betaling per domiciliëring verplicht";
    }
    if (v == 'e-contact') {
      return "Uitsluitend communicatie per mail";
    }
    if (v == 'pre-paid') {
      return "Jaarfactuur in 1 keer te betalen";
    }
    if (v== 'digi_invoice') {
        return "Facturen enkel per email te ontvangen";
    }
}


// custom decorator voor de pricing_type
var price_type = function(v) {
    if (v == 'variable') {
      return "variabele prijs";
    }else if (v == 'fixed') {
      return "vast tarief";
    }
    else {
        return "combinatie variabel en vast";
    }
}


// custom decorator voor het berekening van het verschil met een specifiek product --> te herhalen dus voor elk van de producten
var delta = function (all, current) {
  var d = current.price_incl_promo_year_raw - all['Goedkoopste'].price_incl_promo_year_raw;
  return ProductSet.Decorators.euro(d);
};

var delta_Full = function (all, current) {
  var d = current.price_incl_promo_year_raw - all['Goedkoopste'].price_incl_promo_year_raw;

  return ProductSet.Decorators.euro(d);
};
var delta_Poweo = function (all, current) {
  var d = current.price_incl_promo_year_raw - all['Goedkoopste'].price_incl_promo_year_raw;

  return ProductSet.Decorators.euro(d);
};
var delta_Poweo_Excl_Promo = function (all, current) {
  var d = current.price_excl_promo_year_raw - all['Goedkoopste'].price_excl_promo_year_raw;

  return ProductSet.Decorators.euro(-d);
};
var delta_Groene = function (all, current) {
  var d = current.price_incl_promo_year_raw - all['Goedkoopste'].price_incl_promo_year_raw;

  return ProductSet.Decorators.euro(d);
};
var delta_3jrvast = function (all, current) {
  var d = current.price_incl_promo_year_raw - all['Goedkoopste'].price_incl_promo_year_raw;

  return ProductSet.Decorators.euro(d);
};

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

s.select('1jrvast').by('pricing_type', 'fixed').and('contract_duration', 1).
decorate("price_period_end",ProductSet.Decorators.date).
decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
decorate("product_service_level",service_level).
decorate("product_pricing_type",price_type).
decorate("price_period_start",price_period).
calculate("$delta", delta);

s.select('3jrvast').by('pricing_type', 'fixed').and('contract_duration', 3).
  decorate("price_period_end",ProductSet.Decorators.date).
  decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
  decorate("product_service_level",service_level).
  decorate("product_pricing_type",price_type).
  decorate("price_period_start",price_period).
  calculate("$delta", delta_3jrvast);

s.select('Groene').by('greenpeace_rating', 0.65).and('green','y').
  decorate("price_period_end",ProductSet.Decorators.date).
  decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
  decorate("product_service_level",service_level).
  decorate("product_pricing_type",price_type).
  decorate("price_period_start",price_period).
  calculate("$delta", delta_Groene);

s.select('Goedkoopste').
  decorate("price_period_end",ProductSet.Decorators.date).
  decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
  decorate("product_service_level",service_level).
  decorate("product_pricing_type",price_type).
  decorate("price_period_start",price_period);

s.select('Poweo').
  decorate("price_period_end",ProductSet.Decorators.date).
  decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
  decorate("product_service_level",service_level).
  decorate("product_pricing_type",price_type).
  calculate("$delta", delta_Poweo).
  calculate("$delta_ex_promo", delta_Poweo_Excl_Promo) ;

s.select("Prijsvast").by("pricing_type", "fixed");

s.bind();

console.log('Pack.js:');
console.log(s);
s.bind();



/*var params = new ProductSet.Parameters({
  comparison_type: "pack",
  postal_code: 2000,
  usage: {
    single: 3500,
      gas: 25000,
  },
  only_energy_cost: true,
  promo: true,
});

var selector = new ProductSet.Selector(params);

// custom decorator voor de service-levels
var service_level = function(v) {
    if (v == 'full') {
      return "Geen bijzondere voorwaarden qua service";
    }
    if (v == 'online') {
      return "Betaling per domiciliëring verplicht, en uitsluitend communicatie per email";
    }
    if (v == 'e-payment') {
      return "Betaling per domiciliëring verplicht";
    }
    if (v == 'e-contact') {
      return "Uitsluitend communicatie per mail";
    }
    if (v == 'pre-paid') {
      return "Jaarfactuur in 1 keer te betalen";
    }
    if (v== 'digi_invoice') {
        return "Facturen enkel per email te ontvangen";
    }
  }

// custom decorator voor de pricing_type
var price_type = function(v) {
    if (v == 'variable') {
      return "variabel";
    }
    if (v == 'fixed') {
      return "vast";
    }
    else {
        return "combinatie variabel en vast";
    }
  }

// custom decorator voor de geldigheidsperiode, uitgedrukt in maand + jaar --> gedefinieerd bij het product dat zeker vaste prijs heeft en als beginperiode omdat we dat nergens anders nodig hebben
var price_period = function (date_in_unixtime) {
  var months = [
    "januari", "februari", "maart", "april", "mei", "juni", "juli",
    "augustus", "september", "oktober", "november", "december"
  ];
  var date = new Date(date_in_unixtime);
  return months[date.getMonth()] + " " + date.getFullYear();
};


// custom decorator voor het berekening van het verschil met een specifiek product --> te herhalen dus voor elk van de producten
var delta_Full = function (all, current) {
  var d = current.price_incl_promo_year_raw - all['Goedkoopste'].price_incl_promo_year_raw;

  return ProductSet.Decorators.euro(d);
};
var delta_Poweo = function (all, current) {
  var d = current.price_incl_promo_year_raw - all['Goedkoopste'].price_incl_promo_year_raw;

  return ProductSet.Decorators.euro(d);
};
var delta_Poweo_Excl_Promo = function (all, current) {
  var d = current.price_excl_promo_year_raw - all['Goedkoopste'].price_excl_promo_year_raw;

  return ProductSet.Decorators.euro(-d);
};
var delta_Groene = function (all, current) {
  var d = current.price_incl_promo_year_raw - all['Goedkoopste'].price_incl_promo_year_raw;

  return ProductSet.Decorators.euro(d);
};
var delta_3jrvast = function (all, current) {
  var d = current.price_incl_promo_year_raw - all['Goedkoopste'].price_incl_promo_year_raw;

  return ProductSet.Decorators.euro(d);
};

// definitie van het te gebruiken producten
selector.select('Goedkoopste').
decorate("price_period_end",ProductSet.Decorators.date).
decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
decorate("product_service_level",service_level).
decorate("product_pricing_type",price_type) ;

// relevant als het goedkoopste product een online product is
selector.select('Full').
  by('service_level', 'full').
decorate("price_period_end",ProductSet.Decorators.date).
decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
decorate("product_service_level",service_level).
decorate("product_pricing_type",price_type).
calculate("$delta", delta_Full) ;

selector.select('Poweo').
  by('id', 'POW-PAR-FIXVLA-1-DF').
decorate("price_period_end",ProductSet.Decorators.date).
decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
decorate("product_service_level",service_level).
decorate("product_pricing_type",price_type).
calculate("$delta", delta_Poweo).
calculate("$delta_ex_promo", delta_Poweo_Excl_Promo) ;

selector.select('Groene').
  by('greenpeace_rating', 0.65).and('green','y').
decorate("price_period_end",ProductSet.Decorators.date).
decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
decorate("product_service_level",service_level).
decorate("product_pricing_type",price_type).
calculate("$delta", delta_Groene) ;

selector.select('3jrvast').
  by('pricing_type', 'fixed').and('contract_duration', 3).
decorate("price_period_end",ProductSet.Decorators.date).
decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
decorate("product_service_level",service_level).
decorate("product_pricing_type",price_type).
decorate("price_period_start",price_period).
calculate("$delta", delta_3jrvast) ;

selector.bind(function (product, fields) {
   var parser = document.createElement('a');
   parser.href = fields.product_subscribe_url;
   var subscribe_url = "clkn/" + parser.protocol.substring(0, parser.protocol.length-1) + '/' + parser.href.replace(/http(s?):\/\//, "");
   if (product == 'Goedkoopste') {
     document.getElementById('lp-pom-button-341').setAttribute('href', subscribe_url);
     document.getElementById('lp-pom-button-377').setAttribute('href', subscribe_url);
   }
   if (product == 'Groene') {

     document.getElementById('lp-pom-button-126').setAttribute('href', subscribe_url);
     document.getElementById('lp-pom-button-404').setAttribute('href', subscribe_url);
   }

   if (product == 'Poweo') {
     document.getElementById('lp-pom-button-331').setAttribute('href', subscribe_url);
     document.getElementById('lp-pom-button-391').setAttribute('href', subscribe_url);

   }
   if (product == '3jrvast') {
     document.getElementById('lp-pom-button-337').setAttribute('href', subscribe_url);
     document.getElementById('lp-pom-button-398').setAttribute('href', subscribe_url);
   }
  });
*/
