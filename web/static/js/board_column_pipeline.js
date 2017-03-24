export var BoardColumnPipeline = {
  start: function(){
    var jwtToken = document.querySelector('meta[name="guardian_token"]').content;
    var originalOrder;
    $( '#board_columns' ).sortable({
      cursor: 'move',
      cancel: '#add_new_column',
      start: function (event, ui) {
        ui.item.addClass('tilt');
        originalOrder = $( '#board_columns' ).sortable( 'toArray', { attribute: 'data-id' } );
        console.log(originalOrder);
      },
      stop: function (event, ui) {
        ui.item.removeClass('tilt');
        var sorted = $( '#board_columns' ).sortable( 'toArray', { attribute: 'data-id' } );
        console.log(sorted);
        var sourceId = $(ui.item).data('id');
        var sourceNewOrder = sorted.indexOf(sourceId.toString());
        var targetId = originalOrder[sourceNewOrder];
        var targetNewOrder = sorted.indexOf(targetId.toString());
        var idOrderList = {};
        idOrderList[sourceId] = sourceNewOrder;
        idOrderList[targetId] = targetNewOrder;
        for (var key in idOrderList) {
          $.ajax({
            type: 'PUT',
            headers: {'Authorization': 'Bearer '+jwtToken},
            url: '/api/v2/board_column/'+ key,
            data: {
              boardColumn : {order: idOrderList[key]}
            }
          });
        }
      }
    });
  }
};