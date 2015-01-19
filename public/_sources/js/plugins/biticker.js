(function(){
  var script = document.createElement("SCRIPT");
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js';
  script.type = 'text/javascript';
  document.getElementsByTagName("head")[0].appendChild(script);
  var checkReady = function(callback) {
    if (window.jQuery) {
      callback(jQuery);
    }
    else {
      window.setTimeout(function() { checkReady(callback); }, 20);
    }
  };
  checkReady(function($) {
    function trigger(event, data) {
      $(document).trigger(event, data);
    }
    function bind(event, handler) {
      $(document).bind(event, handler);
    }

    var symbolsRepo = {SGD: '$', ZAR: 'R',
      USD: '$', AUD: '$', BRL: 'R$', CAD: '$', CNY: '¥',
      CZK: 'Kč', EUR: '€', GBP: '£', ILS: '₪', JPY: '¥',
      NOK: 'kr', NZD: '$', PLN: 'zł', RUB: 'RUB', SEK: 'kr'
    };

    var singleHtml =  '<div class="content"><span class="biticker-value">1 BTC = #value#</span></div>';

    var fetchDataForCurrency = function(currency){
      $.ajax({
        url: 'https://api.bitcoinaverage.com/ticker/'+currency+'?v=' + Math.random(),
        type: 'GET',
        dataType: 'json',
        success: function(json){
          updateTicker(currency, json);
        }
      });
    };

    var createTicker = function(ticker){
      var currency = ticker.data('currency');
      fetchDataForCurrency(currency);

      // update every minute/30secs with flicker
      setInterval(function(){
        fetchDataForCurrency(currency);
        $('.biticker-value').addClass('biticker-loading');

        setInterval(function(){
          $('.biticker-value').removeClass('biticker-loading');
        }, 1000);
      }, 30000);
    };

    var bindTicker = function(e, ticker){
      ticker = $(ticker);
      if(ticker.data('isBound'))
        return;
      createTicker(ticker);
      ticker.data('isBound', true)
    };

    $('.biticker-container').each(function(){
      var ticker = $(this);
      if(ticker.data('isBound'))
        return;
      bindTicker(null, ticker);
    });

    bind('biticker:new-ticker-created', bindTicker);

    var updateTicker = function(currency, data){
      var ticker = $('[data-currency='+currency+']');
      var symbol = symbolsRepo[currency];
      var html =  singleHtml.replace('#value#', symbol + data.last)
                            .replace('#ask#', symbol + data.ask)
                            .replace('#bid#', symbol + data.bid);

      ticker.addClass('biticker-loading')
            .html(html)
            .removeClass('biticker-loading');

    };
  });
})();