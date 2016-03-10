
main();
function main()
{
	// settings
	var number_of_progresses = 6;
	var progress_height = 5; //mm
	var progress_in_a_block = 2;

	//
	var mydocument = app.documents.item(0);
	var mypage = mydocument.pages.item(0);

	var page_bounds = myGetBounds(mydocument, mypage);
	var page_width = page_bounds[3] - page_bounds[1];
	var page_height = page_bounds[2] - page_bounds[0];

	var block_height = page_height / number_of_progresses;


	//create_progress_frames()
	//
	for (var i = 0; i < number_of_progresses; ++i)
	{
		var block_top = i * block_height + page_bounds[0];
		var block_bottom = block_top + block_height;

		var start_y = block_top + (block_height - progress_height * progress_in_a_block) / 2;
		for (var j = 0; j < progress_in_a_block; ++j)
		{
			var y1 = start_y + j * progress_height;
			var y2 = y1 + progress_height;
			var x1 = "72mm";
			var x2 = "392mm";
			mypage.rectangles.add(undefined, undefined, undefined, {geometricBounds: [y1 + 'mm', x1, y2 + 'mm', x2], contentType: ContentType.unassigned});
		}
	}
//	var testframe = mypage.textFrames.add();
//	testframe.geometricBounds = ["6p", "6p", "24p", "24"p];
}

function myGetBounds(myDocument, myPage){
	var myPageWidth = myDocument.documentPreferences.pageWidth;
	var myPageHeight = myDocument.documentPreferences.pageHeight
	if(myPage.side == PageSideOptions.leftHand){
		var myX2 = myPage.marginPreferences.left;
		var myX1 = myPage.marginPreferences.right;
	}
	else{
		var myX1 = myPage.marginPreferences.left;
		var myX2 = myPage.marginPreferences.right;
	}
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myPageWidth - myX2;
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
	return [myY1, myX1, myY2, myX2];
}
