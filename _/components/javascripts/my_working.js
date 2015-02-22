(function() {
  $(function() {
    $("#slider-range").slider({
      range: true,
      min: 18000,
      max: 50000,
      values: [22650, 31643],
      slide: function(event, ui) {
        return $("#amount").val(ui.values[0] + "р. - " + ui.values[1] + "р.");
      }
    });
    return $("#amount").val($("#slider-range").slider("values", 0) + "р. - " + $("#slider-range").slider("values", 1) + "р.");
  });

}).call(this);
