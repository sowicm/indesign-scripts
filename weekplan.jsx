
main();
function main()
{
	// settings
	var progress_height = 3; //mm
	var progress_in_a_block = 2;
	var number_of_books_plan_to_read = 12;
	var left_width = 60; //mm
	var number_of_rows = 26;

	var progress_x1 = 72; //mm
	var progress_width = 90; //mm

	var days_in_this_year = 366;

	//
	var mydocument = app.documents.item(0);
	var mypage = mydocument.pages.item(0);

	var page_bounds = myGetBounds(mydocument, mypage);
	var page_width = page_bounds[3] - page_bounds[1];
	var page_height = page_bounds[2] - page_bounds[0];



	// splitframe
	var myX1, myY1, myX2, myY2, myNewObject;
	var myBounds = page_bounds
	var myWidth = myBounds[3]-myBounds[1];
	var myHeight =  myBounds[2]-myBounds[0];
	//Don't bother making the frames if the width/height of the frame is too small
	//to accomodate the row/column gutter values.	
	var right_width = myWidth - left_width;
	var myRowHeight =  myHeight / number_of_rows;
	for(var myRowCounter = 0; myRowCounter < number_of_rows; myRowCounter ++){
		myY1 = myBounds[0]+(myRowHeight*myRowCounter);
		myY2 = myY1 + myRowHeight;
		for(var myColumnCounter = 0; myColumnCounter < 2; myColumnCounter ++){
			if (myColumnCounter == 0)
			{
				myX1 = myBounds[1];
				myX2 = myX1 + left_width;
			}
			else
			{
				myX1 = myBounds[1] + left_width;
				myX2 = myX1 + right_width;
			}
			var block = mypage.rectangles.add(undefined, undefined, undefined, {geometricBounds:[myY1, myX1, myY2, myX2]});
			if (myColumnCounter == 1)
			{
				var block_top = block.geometricBounds[0];
				var block_bottom = block.geometricBounds[2];
				var block_height = block_bottom - block_top;
				var block_width = block.geometricBounds[3] - block.geometricBounds[1];

				var start_y = block_top + (block_height - progress_height * progress_in_a_block) / 2;
				var progress_x1 = block.geometricBounds[1] + (block_width - progress_width) / 2;
				for (var iprogress = 0; iprogress < progress_in_a_block; ++iprogress)
				{
					var y1 = start_y + iprogress * progress_height;
					var y2 = y1 + progress_height;
					var x1 = progress_x1;
					var x2 = x1 + progress_width;
					var rect = mypage.rectangles.add(undefined, undefined, undefined, {geometricBounds: [y1 + 'mm', x1 + 'mm', y2 + 'mm', x2 + 'mm'], contentType: ContentType.unassigned});

					var myPathPoint, myPoint, myPointA, myPointB, myPointC, myAnchor, myX, myY, myX1, myY1, myX2, myY2, myX3, myY3;
					var myNewX1, myNewY1, myNewX2, myNewY2, myXOffset, myYOffset, myPoint, myPathPoint;
					var myOffset = 3;// mm "12 pt";
					for (var ipath = 0; ipath < rect.paths.length; ++ipath)
					{
						var path = rect.paths.item(ipath);
						var point_array = new Array;
						for (var ipoint = 0; ipoint < path.pathPoints.length; ++ipoint)
						{
							if ((iprogress == 0 && (ipoint == 0 || ipoint == 3)) ||
								(iprogress == 1 && (ipoint == 1 || ipoint == 2)) )
							{
								myPointA = path.pathPoints.item(ipoint);
								myAnchor = myPointA.anchor;
								myX1 = myAnchor[0];
								myY1 = myAnchor[1];
								//myPointB is the *next* point on the path. If myPathPoint is the last point on the path, then
								//myPointB is the first point on the path.
								if (ipoint == (path.pathPoints.length - 1)){
									myPointB = path.pathPoints.item(0);
								}
								else{
									myPointB = path.pathPoints.item(ipoint + 1);
								}
								myAnchor = myPointB.anchor;
								myX2 = myAnchor[0];
								myY2 = myAnchor[1];
								//myPointC is the *previous* point on the path. If myPathPoint is the first point on the path,
								//then myPointC is the last point on the path.
								if (ipoint == 0){
									myPointC = path.pathPoints.item(path.pathPoints.length - 1);
								}
								else{
									myPointC = path.pathPoints.item((ipoint - 1) % path.pathPoints.length);
								}
								myAnchor = myPointC.anchor;
								myX3 = myAnchor[0];
								myY3 = myAnchor[1];
								var myPoints = myAddPoints(myX1, myY1, myX2, myY2, myX3, myY3, myOffset);
								myNewX1 = myPoints[0];
								myNewY1 = myPoints[1];
								myNewX2 = myPoints[2];
								myNewY2 = myPoints[3];
								//Calculate new path point values based on the path effect type.
								//We won't add the points to the path one at a time; instead, we'll
								//create an array that holds all of the point locations and curve
								//handle positions, and we will then 
								//Rounded corner effect.
								myPoint = [[myNewX2, myNewY2], [myNewX2, myNewY2], [myX1, myY1]];
								point_array.push(myPoint);
								myPoint = [[myNewX1, myNewY1], [myNewX1, myNewY1], [myNewX1, myNewY1]];
								point_array.push(myPoint);
							}
							else
							{
								myX1 = path.pathPoints.item(ipoint).leftDirection[0];
								myY1 = path.pathPoints.item(ipoint).leftDirection[1];
								myX2 = path.pathPoints.item(ipoint).anchor[0];
								myY2 = path.pathPoints.item(ipoint).anchor[1];
								myX3 = path.pathPoints.item(ipoint).rightDirection[0];
								myY3 = path.pathPoints.item(ipoint).rightDirection[1];
								myPoint = [[myX1, myY1], [myX2, myY2], [myX3, myY3]];
								point_array.push(myPoint);
							}
						}
						path.entirePath = point_array;
					}

					if (iprogress == 0)
					{
						var grid_width = progress_width / 7;

						var y1_ = rect.geometricBounds[0];
						var y2_ = rect.geometricBounds[2];
						for (var j = 1; j < 7; ++j)
						{
							var y1 = y1_;
							var y2 = y2_;
/*							switch (j)
							{
							case 1:
								y1 += 2.067;
								break;
							case 2:
								y1 += 1.167;
								break;
							case 3:
								y1 += 0.567;
								break;
							default:
								break;
							}
							switch (7 - j)
							{
							case 1:
								y1 += 2.067;
								break;
							case 2:
								y1 += 1.167;
								break;
							case 3:
								y1 += 0.567;
								break;
							default:
								break;
							}
							*/
							var x = rect.geometricBounds[1] + j * grid_width;
							var line = mypage.graphicLines.add(undefined, undefined, undefined, {geometricBounds: [y1 + 'mm', x + 'mm', y2 + 'mm', x + 'mm']});
						}
					}
					else
					{
						var quarter_grid_width = progress_width / 4;

						var y1 = rect.geometricBounds[0] + (rect.geometricBounds[2] - rect.geometricBounds[0]) * 2 / 3;
						var y2 = rect.geometricBounds[2];
						for (var j = 1; j < 4; ++j)
						{
							var x = rect.geometricBounds[1] + j * quarter_grid_width;
							var line = mypage.graphicLines.add(undefined, undefined, undefined, {geometricBounds: [y1 + 'mm', x + 'mm', y2 + 'mm', x + 'mm']});
							line.strokeWeight = "1pt";
						}
					}
				}
			}
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

function myAddPoints(myX1, myY1, myX2, myY2, myX3, myY3, myOffset){
	var myXAdjust, myYAdjust, myNewX1, myNewY1, myNewX2, myNewY2, myHypotenuse;
	myHypotenuse = Math.sqrt(Math.pow((myX1 - myX2),2) + Math.pow((myY1 - myY2),2));
	if (myY1 != myY2) {
		myXAdjust = ((myX1 - myX2) / myHypotenuse) * myOffset;
		myYAdjust = ((myY1 - myY2) / myHypotenuse) * myOffset;
		myNewX1 = myX1 - myXAdjust;
		myNewY1 = myY1 - myYAdjust;
	}
	else {
		myXAdjust = myOffset;
		myYAdjust = 0;
		if (myX1 < myX2) {
			myNewX1 = myX1 + myXAdjust;
			myNewY1 = myY1 + myYAdjust;
		}
		else{
			myNewX1 = myX1 - myXAdjust;
			myNewY1 = myY1 - myYAdjust;
		}
	}
	myHypotenuse = Math.sqrt(Math.pow((myX1 - myX3),2) + Math.pow((myY1 - myY3),2));
	if (myY1 != myY3) {
		myXAdjust = ((myX1 - myX3) / myHypotenuse) * myOffset;
		myYAdjust = ((myY1 - myY3) / myHypotenuse) * myOffset;
		myNewX2 = myX1 - myXAdjust;
		myNewY2 = myY1 - myYAdjust;
	}
	else{
		myXAdjust = myOffset;
		myYAdjust = 0;
		if (myX1 < myX3) {
			myNewX2 = myX1 + myXAdjust;
			myNewY2 = myY1 + myYAdjust;
		}
		else{
			myNewX2 = myX1 - myXAdjust;
			myNewY2 = myY1 - myYAdjust;
		}
	}
	return [myNewX1, myNewY1, myNewX2, myNewY2];
}

