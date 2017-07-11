function validateCount() {
  let count =  140 - (this.value.length);

  if( count < 0) {

    let wordCount = $('<span class=\'counter invalid\' >' + count + '</span>');
    let removeCounter = $(this).parent().find('.counter');
    removeCounter.remove();
    let addCounter = $(this).parent();
    addCounter.append(wordCount);

  } else {

    let wordCount = $('<span class=\'counter\'>' + count + '</span>');
    let removeCounter = $(this).parent().find('.counter');
    removeCounter.remove();
    let addCounter = $(this).parent();
    addCounter.append(wordCount);

  }
}

$( document ).ready(function() {
  $('textarea').on('input', validateCount);
});