
main();
function main()
{
	// settings
	var number_of_progresses = 6;
	var progress_height = 5; //mm

	//
	var block_height = app.documents.length / number_of_progresses;

	//create_progress_frames()
	//
	for (var i = 0; i < number_of_progresses; ++i)
	{
		var block_top = i * block_height;
		var block_bottom = block_top + block_height;

		var y1 = block_top + (block_height - progress_height) / 2;
		var y2 = block_top + (block_height + progress_height) / 2;
		var x1 = 72;
		var x2 = 392;
		app.documents.rectangels.add(undefined, undefined, undefined, {geometricBounds: []}, contentType: ContentType.graphicType);
	}
}