/* ***************************************** */
/* Wordt gebruikt voor Details Goedkoopste   */
/* /energie/goedkoopste-energieleveranciers/ */
/* ***************************************** */

var price_period = function (date_in_unixtime) {
  var months = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli",
    "Augustus", "September", "Oktober", "November", "December"
  ];
  var date = new Date(date_in_unixtime);
  return months[date.getMonth()] + " " + date.getFullYear();
};


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
var delta_1jrvast = function (all, current) {
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

var api_comparison_type = document.getElementById("api_comparison_type").value;
var api_locale = document.getElementById("api_locale").value;
var api_postal_code = document.getElementById("api_postal_code").value;
var api_usage_single = document.getElementById("api_usage_single").value;
var api_usage_gas = document.getElementById("api_usage_gas").value;
var api_only_energy_cost = document.getElementById("api_only_energy_cost").value;
var api_promo = document.getElementById("api_promo").value;

if(api_comparison_type==""){
api_comparison_type = "pack";
}

if(api_locale==""){
api_locale = "nl";
}

if(api_postal_code==""){
api_postal_code = 2000;
}

if(api_usage_single==""){
api_usage_single = 3500;
}

if(api_usage_gas==""){
//api_usage_gas = 25000;
}

if(api_promo==0){
api_promo = false;
}else{
api_promo = true;
}

if(api_only_energy_cost==0){
api_only_energy_cost = false;
}else{
api_only_energy_cost = true;
}

var s = new ProductSet.Selector(new ProductSet.Parameters({
  comparison_type: api_comparison_type,
  locale: api_locale,
  postal_code: api_postal_code,
  usage: {
    single: api_usage_single, 
      gas: api_usage_gas,
  },
  only_energy_cost: api_only_energy_cost,
  promo: api_promo
}));

s.select('1jrvast').by('pricing_type', 'fixed').
  decorate("price_period_end",ProductSet.Decorators.date).
  decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
  decorate("product_pricing_type",price_type).
  decorate("price_period_start",price_period).
  calculate("$delta", delta_1jrvast);

s.select('3jrvast').by('pricing_type', 'fixed').and('contract_duration', 3).
  decorate("price_period_end",ProductSet.Decorators.date).
  decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
  decorate("product_pricing_type",price_type).
  decorate("price_period_start",price_period).
  calculate("$delta", delta_3jrvast);

s.select('Groene').by('greenpeace_rating', 0.65).and('green','y').
  decorate("price_period_end",ProductSet.Decorators.date).
  decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
  decorate("product_pricing_type",price_type).
  decorate("price_period_start",price_period).
  calculate("$delta", delta_Groene);

s.select('Goedkoopste').
  decorate("price_period_end",ProductSet.Decorators.date).
  decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
  decorate("product_pricing_type",price_type).
  decorate("price_period_start",price_period);

s.select('Poweo').
  decorate("price_period_end",ProductSet.Decorators.date).
  decorate("product_contract_duration",ProductSet.Decorators.contract_duration).
  decorate("product_pricing_type",price_type).
  calculate("$delta", delta_Poweo).
  calculate("$delta_ex_promo", delta_Poweo_Excl_Promo) ;

//s.select("Prijsvast").by("pricing_type", "fixed");
s.select('Prijsvast').by('pricing_type', 'fixed').and('contract_duration', 13).
calculate("$delta", delta_Full);


s.execute(function(results) {
  //console.log(results);
  var keys = []; for(var key in results) { keys.push(key); }
  keys.sort(function(a, b) { return results[a].price_excl_promo_year_raw - results[b].price_excl_promo_year_raw });
  for (var i = keys.length - 1; i >= 0; i--) {
    var selecttype = keys[i];
    var result = results[selecttype];
    //console.log(selecttype);
    //console.log(result);

    // zie tariefchecker.js Decorator service_level()
    var sl = Decorators.service_level(result.product_service_level_payment, result.product_service_level_invoicing, result.product_service_level_contact);
    jQuery('.'+selecttype+'.product_service_level').html(sl);
  }
});

s.bind();

/*
console.log('Pack.js:');
console.log(s);
s.bind();
*/


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
