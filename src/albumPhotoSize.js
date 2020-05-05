
alert('Hello world!');

// create array of all CSS elements
var photoArray = ['album_001_photo_001', 'album_001_photo_002', 'album_001_photo_003', 'album_001_photo_004'];

// go through the array
for (var i = 0, c = photoArray.length; i < c; i++) {
	
	// draw random width
	width = getRandomSize(20, 100);

	// draw random margins
	marginHorizontal = getRandomSize(10, width);
	marginVertical = 24 * getRandomSize(1, 10);
	horizontalSplit = getRandomSize(0, 10) / 10;
	veticalSplit = getRandomSize(0, 10) / 10;

	// apply width
	eval(photoArray[i]).style.width = String(width) + '%';

	// apply margins
	eval(photoArray[i]).style.marginLeft = String(marginHorizontal * horizontalSplit) + '%';
	eval(photoArray[i]).style.marginRight = String(marginHorizontal * (1 - horizontalSplit)) + '%';
	eval(photoArray[i]).style.marginTop = String(marginVertical * veticalSplit) + 'px';
	eval(photoArray[i]).style.marginBottom = String(marginVertical * (1 - veticalSplit)) + 'px';

	//eval(photoArray[i]).style.marginLeft = '80px';
	//eval(photoArray[i]).style.marginRight = '8px';
	//eval(photoArray[i]).style.marginTop = '24px';
	//eval(photoArray[i]).style.marginBottom = '40px';


		
}


//alert(string(eval(getRandomSize(0.2, 1.0))));

// computation method
//width = calc(100% * getRandomSize(0.2, 1.0));


// copied from web

function getRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//var allImages = "";

//for (var i = 0; i < 25; i++) {
//  var width = getRandomSize(200, 400);
//  var height =  getRandomSize(200, 400);
//  allImages += '<img src="https://placekitten.com/'+width+'/'+height+'" alt="pretty kitty">';
//}

//$('#photos').append(allImages);






//album_001_photo_002.style.width = '10%';
//album_001_photo_002.style.marginBottom = '48px';
