// Example: $('#someId').css({'prop' : 'value', 'prop1' : 'value1', ...});

//body: add padding 30px
$('body').css({
  'padding': '30px'
});

// id title: make align center, remove top margin
$('#title').css({
  'text-align': 'center',
  'margin-top': '0'
});

// div after header: add double border and padding 20px
$('header+div').css({
  'border': '3px double blue',
  'padding': '20px'
});

// change color for all h2 and set top margin to 0
$('h2').css({
  'color': 'maroon',
  'margin-top': '0'
});

// set font size 18px for all .list direct children
$('.list').css({
  'font-size': '1.1rem'
});

// in #list-1
// show all hidden and not cloned li
$('#list-1 li:hidden:not(".cloned")').show();

// hide empty li
$('#list-1').find(':empty').hide();
// $('#list-1').children(':empty').hide();

// in #list-3
// for all even li set margin-left -20px
$('#list-3').find(':nth-child(even)').css('margin-left', '-20px');

// for the first li set any different color
$('#list-3 li:first-of-type').css('color', 'orange');
// $('#list-3 li').first().css('color','green');

// for all li with index > 5 set color to #ccc
$('#list-3').find('li:nth-of-type(n+5)').css('color', '#ccc');

// for li wich has em add red color
$('li:has(em)').css('color', 'red');

// for li which contains text 'Buratino' set font weight to bold
$('li:contains(Buratino)').css('font-weight', 'bold');

// for b in p which is the only child set font size 36px
$('p>b:only-child').css('font-size', '36px');

// for em in p which is the last child of type set color to green
$('p>em:last-of-type').css('color', 'green');

// set width 80px for input with attribute name ended by 'age'
$('input[name$="age"]').width(80);

// set width 120px for input with attribute name started by 'my'
$('input[name^="my"]').width(120);

// console.log checked checkbox
$(document).ready(function () {
  if ($(":checkbox").is(':checked')) {
    console.log(`${$(':checked').val()} checked`);
  }
  $(':checkbox').click(function () {
    if ($(this).is(':checked')) {
      console.log(`${$(this).val()} checked`);
    } else {
      console.log(`${$(this).val()} un-checked`);
    }
  });
});

// show all images with a cat
$('img[src*="cat"]').show();

// wrap every image into the div
$('img').wrap('<div></div>');

// for .mbox with index 3 set padding-top 50px
$('.mbox').eq(3).css('padding-top','50px');

// for first div wraper for img set float left and border red
$('img').parent().css({'float':'left','border':'2px solid red'});