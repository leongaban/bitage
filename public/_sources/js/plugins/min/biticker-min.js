!function(){var a=document.createElement("SCRIPT");a.src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js",a.type="text/javascript",document.getElementsByTagName("head")[0].appendChild(a);var e=function(a){window.jQuery?a(jQuery):window.setTimeout(function(){e(a)},20)};e(function($){function a(a,e){$(document).trigger(a,e)}function e(a,e){$(document).bind(a,e)}var n={SGD:"$",ZAR:"R",USD:"$",AUD:"$",BRL:"R$",CAD:"$",CNY:"¥",CZK:"Kč",EUR:"€",GBP:"£",ILS:"₪",JPY:"¥",NOK:"kr",NZD:"$",PLN:"zł",RUB:"RUB",SEK:"kr"},t='<div class="content"><span class="biticker-value">1 <div class="icon-bitcoin"></div> = #value#</span></div>',i=function(a){$.ajax({url:"https://api.bitcoinaverage.com/ticker/"+a+"?v="+Math.random(),type:"GET",dataType:"json",success:function(e){o(a,e)}})},c=function(a){var e=a.data("currency");i(e)},r=function(a,e){e=$(e),e.data("isBound")||(c(e),e.data("isBound",!0))};$(".biticker-container").each(function(){var a=$(this);a.data("isBound")||r(null,a)}),e("biticker:new-ticker-created",r);var o=function(a,e){var i=$("[data-currency="+a+"]"),c=n[a],r=t.replace("#value#",c+e.last).replace("#ask#",c+e.ask).replace("#bid#",c+e.bid);i.addClass("biticker-loading").html(r).removeClass("biticker-loading")}})}();