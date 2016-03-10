
main();
function main()
{
	// settings
	var number_of_progresses = 6;
	var progress_height = 5; //mm
	var progress_in_a_block = 2;
	var number_of_books_plan_to_read = 12;

	var progress_x1 = 72; //mm
	var progress_width = 320; //mm

	var days_in_this_year = 366;

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
			var x1 = progress_x1;
			var x2 = x1 + progress_width;
			mypage.rectangles.add(undefined, undefined, undefined, {geometricBounds: [y1 + 'mm', x1 + 'mm', y2 + 'mm', x2 + 'mm'], contentType: ContentType.unassigned});
		}
	}

	if (days_in_this_year == 366)
	{
		var months_days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	}
	else
	{
		var months_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	}
	for (var i = 1; i < months_days.length; ++i)
	{
		months_days[i] += months_days[i - 1];
	}

	var grid_width = progress_width / days_in_this_year;

	for (var i = 0; i < number_of_progresses; ++i)
	{
		var rect = mypage.rectangles.item(i * 2 + 1);
		var im = 0;
		var y1 = rect.geometricBounds[0];
		var y2 = rect.geometricBounds[2];
		for (var j = 1; j < days_in_this_year; ++j)
		{
			var x = rect.geometricBounds[1] + j * grid_width;
			var line = mypage.graphicLines.add(undefined, undefined, undefined, {geometricBounds: [y1 + 'mm', x + 'mm', y2 + 'mm', x + 'mm']});
			if (j == months_days[im])
			{
				++im;
				line.strokeWeight = "1pt";
			}
			else
			{
				line.strokeWeight = "0.25pt";
			}

		}
	}

	var rect = mypage.rectangles.item( (number_of_progresses - 1) * 2 );

	var book_grid_width = progress_width / number_of_books_plan_to_read;

	var y1 = rect.geometricBounds[0];
	var y2 = rect.geometricBounds[2];
	for (var i = 1; i < number_of_books_plan_to_read; ++i)
	{
		var x = rect.geometricBounds[1] + i * book_grid_width;
		var line = mypage.graphicLines.add(undefined, undefined, undefined, {geometricBounds: [y1 + 'mm', x + 'mm', y2 + 'mm', x + 'mm']});
		line.strokeWeight = "1pt";
	}

	var quarter_grid_width = progress_width / 4;

	for (var i = 0; i < number_of_progresses - 1; ++i)
	{
		var rect = mypage.rectangles.item(i * 2);
		var y1 = rect.geometricBounds[0];
		var y2 = rect.geometricBounds[2];
		for (var j = 1; j < 4; ++j)
		{
			var x = rect.geometricBounds[1] + j * quarter_grid_width;
			var line = mypage.graphicLines.add(undefined, undefined, undefined, {geometricBounds: [y1 + 'mm', x + 'mm', y2 + 'mm', x + 'mm']});
			line.strokeWeight = "1pt";
		}
	}

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
