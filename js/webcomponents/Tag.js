function Tag(tagObject) {
	var self = this;

	this.obj = tagObject;

	this.domSidePanel = $('<li class = "tagTitle tag' + this.obj.id + '">').text(this.obj.title);

	this.domDialog = $('<div />');
	this.domInputTitle = this.domDialog.createAppend('<p>').text('Title: ').createAppend('<input />').text(this.obj.title);
	this.domInputShortTitle = this.domDialog.createAppend('<p>').text('Short Title: ').createAppend('<input />').text(this.obj.shortTitle);
	this.domInputBackgroundColor = this.domDialog.createAppend('<p>').text('Background color: ').createAppend('<input />').val(this.obj.backgroundColor);

	Tag.prototype.toDomSidePanel = function() {
		return this.domSidePanel;
	};

	Tag.prototype.requestUpdate = function() {
		ajaxRequest({
			url: "/updateTag",
			data: {
				id: window.tag.obj.id,
				newTitle: window.tag.domInputTitle.val(),
				shortTitle: window.tag.domInputShortTitle.val(),
				backgroundColor: window.tag.domInputBackgroundColor.val()
			}
		});
	};

	Tag.prototype.showDialog = function() {
		window.tag = self;

		self.domInputTitle.val(self.obj.title);
		self.domInputShortTitle.val(self.obj.shortTitle);

		$(self.domDialog).dialog({
			title: 'Tag Options for ' + self.obj.title,
			close: self.requestUpdate
		});	
	};

	this.domSidePanel.rightClick(self.showDialog);

	return this;
}


