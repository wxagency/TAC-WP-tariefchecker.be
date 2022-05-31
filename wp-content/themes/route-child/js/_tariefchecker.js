var cheapest_pack_url = "http://www.tariefchecker.be/energievergelijker/gas_elektriciteit_energieleveranciers_maandelijks_overzicht_nl/";
var cheapest_e_url    = "http://www.tariefchecker.be/energievergelijker/elektriciteit_energieleveranciers_maandelijks_overzicht_nl/";

var Decorators = {
  pricing_type: function(v) {
    if (v == 'variable') {
      return "Variabel";
    } else if (v == 'fixed') {
      return "Vast";
    } else {
      return "Combinatie";
    }
  },
  pricing_type_description: function(v) {
    if (v == 'variable') {
      return "Variabele prijs";
    } else if (v == 'fixed') {
      return "Vaste prijs";
    } else {
      return "Combinatie van vast en variabel";
    }
  },
  price_period: function(date_in_unixtime) {
        var months = [
      "januari", "februari", "maart", "april", "mei", "juni", "juli",
      "augustus", "september", "oktober", "november", "december"
    ];
        var date = new Date(date_in_unixtime);
    return months[date.getMonth()] + " " + date.getFullYear();
  },
  delta: function(a, b) {
    return Math.round((a.price_excl_promo_year_raw - b.price_incl_promo_year_raw) / b.price_incl_promo_year_raw * 100);
  },
  service_level: function(service_level) {
        if (service_level == "epayment") {
      return "Domiciliëring verplicht,<br>facturen enkel per e-mail";
    } else if (service_level == "online") {
      return "Domiciliëring verplicht,<br>contact enkel per e-mail";
    } else if (service_level == "prepaid") {
      return "Jaarbedrag op voorhand te betalen";
    } else if (service_level == "econtact") {
      return "Facturen en support uitsluitend per e-mail";
    } else if (service_level == "digi_invoice") {
      return "Facturen worden uitsluitend per e-mail gestuurd,<br>niet via post";
    } else {
      return "Volwaardige dienstverlening";
    }
      }
}

function cheapestProduct(results) {
  var cheapest = results['Cheapest'];

  var elements = document.querySelectorAll('[data-ps-product="Cheapest"]');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var field   = element.getAttribute('data-ps-field');
    var value   = cheapest[field]
    if (field == 'price_period_start') {
      value = Decorators.price_period(value);
    } else if (field == '$delta') {
      var last = null;
      for (var name in results) { last = results[name]; }
      var d = last['price_excl_promo_year_raw'] - cheapest['price_incl_promo_year_raw'];
      value = Math.round(d / cheapest['price_excl_promo_year_raw'] * 100);
    } else if (field == 'product_subscribe_url') {
      var href = element.getAttribute('href');
      if (href == '#') {
        element.setAttribute('href', value);
      }
      continue;
    }

    element.innerHTML = value;
  }
}

function table(results, supplier) {
  body = "";
  var keys = []; for(var key in results) { keys.push(key); }
  keys.sort(function(a, b) { return results[a].price_excl_promo_year_raw - results[b].price_excl_promo_year_raw });

  for (var i = keys.length - 1; i >= 0; i--) {
    var result = results[keys[i]];

    if (result.supplier_name.toLowerCase() != supplier) { continue; }
    var safe_product_name = result.product_name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-");

    body += '<tr>'
    + '<th scope="row">' + result.product_name + '</th>'
    + '<td data-title="Duurtijd">' + ProductSet.Decorators.contract_duration(result.product_contract_duration) + ' jaar </td>'
    + '<td data-title="Vast of variabel">' + Decorators.pricing_type(result.product_pricing_type) + '</td>'
    + '<td data-title="Groene energie">' + (result.product_green_percentage > 0 ? "Ja" : "Nee") + '</td>'
    + '<td data-title="Dienstverlening" class="hidemobile">'+ result.product_service_level +' - '+ Decorators.service_level(result.product_service_level) + '</td>'
    + '<td data-title="Klant worden"><a href="' + result.product_subscribe_url + '" target="_blank" id="table-signup-'+ safe_product_name +'">Klik hier</a></td>'
    + '</tr>';
  }

  if (body !== "") {
    var tbody = document.querySelector('#tariefformules tbody');
    tbody.innerHTML = body;
  } else {
    var to_hide = document.querySelectorAll('.row.show');
    var to_show = document.querySelectorAll('.row.hide');
    for (var i = 0; i < to_hide.length; i++) {
      to_hide[i].className = to_hide[i].className.replace('show', 'hide');
    }
    for (var i = 0; i < to_show.length; i++) {
      to_show[i].className = to_show[i].className.replace('hide', 'show');
    }
  }
}

function descriptions(results,supplier) {
  html = "";
  console.log(results);
  var keys = []; for(var key in results) { keys.push(key); }
  keys.sort(function(a, b) { return results[a].price_excl_promo_year_raw - results[b].price_excl_promo_year_raw });

  var cheapest = "";

  for (var i = keys.length - 1; i >= 0; i--) {
      var result = results[keys[i]];
      var korting = "";

      if (result.supplier_name.toLowerCase() != supplier) { continue; }

      if(result.price_promo_year_raw > 0){
        korting = '<li><strong>korting van '+ result.price_promo_year +'/jaar</strong>. Enkel geldig voor nieuwe klanten die zich <strong>via Tariefchecker</strong> registreren voor '+ ProductSet.Decorators.date(result.price_period_end) +'</li>';
      }

      html += '<div class="col-md-12 col-lg-12 details"><div class="col-md-6 col-lg-5 detail-info">'
      + '<h3>' + result.name + '</h3>'
      + '<ul>'
      + '<li>Duurtijd: '+ ProductSet.Decorators.contract_duration(result.product_contract_duration) +' jaar</li>'
      + '<li>'+ Decorators.pricing_type_description(result.product_pricing_type) +'</li>'
      + '<li>'+ result.product_green_percentage +'% groene energie</li>'
      + '<li>'+ Decorators.service_level(result.product_service_level) + '</li>'
      + korting
      + '</ul>'
      + '</div><div class="col-md-6 col-lg-6 col-lg-offset-1">'
      + '<h5>Voor wie is dit tarief</h5>'
      + '<p>'+result.product_tariff_description+'</p>'
      + '<p><strong class="dark">Tariefkaarten:</strong> <a href="/energie/tariefkaarten/2017-2/">Elektriciteit</a> / <a href="/energie/tariefkaarten/2017-2/">Gas</a></p>'
      + '<p><a href="' + result.product_subscribe_url + '" target="_blank" class="red">Bereken jouw persoonlijk tarief</a></p>'
      + '</div>'
      //+ '<div class="col-sm-12"><p class="diff"><strong>'+ result.name +' is '+ Decorators.delta(result, results['Cheapest']) +'% duurder</strong> dan het allergoedkoopste energietarief. '
      + '<div class="col-sm-12"><p class="diff"><a href="'+(result.product_type == 'pack' ? cheapest_pack_url : cheapest_e_url)+'" target="_blank">Lees meer over dit tarief &gt;&gt;</a></p></div>'
      + '</div>';

      //cheapest = '<div class="col-sm-12"><p class="cheapest">'+ result.name +' is het goedkoopste tarief van '+result.supplier_name+'. <a href="'+result.product_subscribe_url+'" target="_blank">Kies dit tarief.</a></p></div>';
  }

  html = html.replace(/<\/div>$/, cheapest + '</div>');

  var descriptions = document.querySelector('#tariefbeschrijvingen');
  descriptions.innerHTML = html;
}

function render(ids,type,supplier) {
  if (type == 'electricity') {
    var s = new ProductSet.Selector(new ProductSet.Parameters({
      comparison_type: "electricity",
      locale: "nl",
      postal_code: 2000,
      usage: {
        single: 3500
      },
      only_energy_cost: true,
      promo: true
    }));
  } else {
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
  }

  s.select("Cheapest");

  for(var i = 0; i < ids.length; i++) {
    var id = ids[i];
    s.select(id).by('id', id);
  }

  s.execute(function(results) {
    //console.log(results);
    // results.sort(function(a, b) {
    //   if (a.price_excl_promo_year_raw < b.price_excl_promo_year_raw) { return -1; }
    //   if (a.price_excl_promo_year_raw > b.price_excl_promo_year_raw) { return  1; }
    //   return 0;
    // });
    //cheapestProduct(results);
    table(results, supplier);
    descriptions(results, supplier);
  });
}
