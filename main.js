(function(){

  const FIELDS = "?fields=name;capital;currencies;topLevelDomain;flag";

  $("form button[name=all]").click(e=>{
    getCountries("all", data=>{
      $("#countrieslist").text("");
      for (var i = 0; i < data.length; i++) {
        $("#countrieslist").append(viewCountry(data[i]))
      }
    });
  });

  $("form button[name=filter]").click(e=>{
    e.preventDefault();
    let searchCountry = $("input[name=country]").val();
    let validate = /^[a-zA-Z _]+$/;
    if (searchCountry.match (validate)){
      getCountries("name/"+searchCountry, data=>{
        $("#countrieslist").text("");
        for (var i = 0; i < data.length; i++) {
          $("#countrieslist").append(viewCountry(data[i]))
        }
      });
    } else {
      $("#countrieslist").html ("<h3 class='ui header red'>Please use only letters and spaces.<h3>");
    }

  });

  function viewCountry(country) {

    let countryHTML =
    `
    <div class="card">
      <div class="content">
        <div class="header">${country.name}</div>
        <div class="meta"><b>Capital: </b>${country.capital}</div>
        <div class="description">
          <b>Top Level Domain: </b>${country.topLevelDomain}
          <br /> <br />
          <b>Currencies:</b>`;
          countryHTML += `<table class="ui table">
            <thead><tr><th>Name</th><th>Code</th><th>Symbol</th></tr></thead>
            <tbody>`;
            $.each(country.currencies, ( index, value )=> {
              countryHTML += `<tr><td>${value.name}</td><td>${value.code}</td><td>${value.symbol}</td></tr>`;
            });
            countryHTML += `</tbody>
          </table>`;
        countryHTML +=`</div>
      </div>

        <div class="image"><img src="${country.flag}" alt="${country.name}" /></div>



     </div>

    `;

    return countryHTML
  }

  function getCountries(filter, callback) {
    $.ajax({ 
      type: "Get",
      url: `https://restcountries.eu/rest/v2/${filter}${FIELDS}`,
      success: function(result, status, xhr) {
        callback(result);
      }
    });
  }

})();
