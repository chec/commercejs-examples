// Initialize commerce with your public API key
// new Commerce('YOUR_PUBLIC_API_KEY', true);
var commerce = new Commerce('pk_17054571618e73520760e522b00e08ee196503b14e95c', true);

$(document).ready(function(){

//Create a checkout token for the product with the permalink 'commerce-js-example'.
commerce.checkout.generateToken('black-leather-watch', 'permalink',
  function(resp){

  //Store the checkout token id as a global variable
  checkout_token_id = resp.id;

      /*
      CREATE THE SHIPPING METHOD <SELECT>'s
      */

        //Loop through each shipping option
        $.each(resp.shipping_methods, 
               
          function(k, method) {

          //Create an <option> for the method
          var option_html =  "<option value=\""+method.id+"\">"+method.description+" + "+method.price.formatted_with_symbol+"</option>";

          //Append the new option to the shipping option <select>
          $('select[name="fulfillment[shipping_method]"]').append(option_html);

        });

      //Let's use the List all countries helper to populate the shipping[country] <select> with countries
      commerce.services.localeListCountries(function(resp){
        $('select[name="shipping[country]"]').html(resp.html);

        //Pre select USA
        $('select[name="shipping[country]"] option[value="CA"]').prop('selected', true);

        //lets grab a list of all states for the US and populate the shipping[county_state] <select>
        get_regions('CA');
      });
  },
                                
    function(error){
      console.log(error);
    }
  );
});


//When the buyer select their country, lets grab a list of all provinces/states for that country and populate the shipping[county_state] <select>
function get_regions(country_code){

  commerce.services.localeListShippingSubdivisions(country_code, function(resp){
    $('select[name="shipping[county_state]"]').html(resp.html);
  });
}

/*
The capture function
*/
function capture(){

  //We're using jQuery.serializeJSON (https://github.com/marioizquierdo/jquery.serializeJSON) to convert the form into a json object so we don't have to do any extra formatting
     var order = $('#checkout').serializeJSON();
      console.log("the order is", order)

  commerce.checkout.capture(checkout_token_id, order,
    function(resp) {
        console.log(resp)
    },
    function(error) {
      console.log(error)
    }

  );

}