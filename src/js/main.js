function View (data) {
    this.data = data;
    this.el = $('<div></div>');
}

/**
* AppView
*/

function AppView (images) {
    View.call(this, images);
    this.imagesG = 0;
}

AppView.prototype = Object.create(View.prototype);

AppView.prototype.render = function () {
    var fullView = new FullView();
    var galleryView = new GalleryView(this.data, function (url) {
        fullView.show(url);
    });

    fullView.render();
    galleryView.render();

    this.el.append(fullView.el);
    this.el.append(galleryView.el);

    fullView.show(this.data[0].image);
};

/**
* GalleryView
*/

function GalleryView (images, callback) {
    View.call(this, images);
    this.callback = callback;
}

GalleryView.prototype = Object.create(View.prototype);

GalleryView.prototype.render = function () {
	var _this = this;

	var thumbnail;

    this.el.addClass('gallery');

	for (var i = 0; i < this.data.length; i++) {
		thumbnail = $('<img>');
		thumbnail.attr('src', this.data[i].image);
		this.el.append(thumbnail);
	}

    this.el.on('click', function (e) {
        var url = $(e.target).attr('src');
        _this.callback(url);
    });
};

/**
* FullView
*/

function FullView () {
    View.call(this);
}

FullView.prototype = Object.create(View.prototype);

FullView.prototype.show = function (url) {
    this.el.css('background-image', 'url(' + url + ')');
};

FullView.prototype.render = function () {
	this.el.addClass('full','full-screen');

    this.el.on('click', function (e) {
        $(e.target).toggleClass('full-screen');
    });
};

// Images from URLs
var imagesG = [ {image: "http://www.fondosgratis.mx/imagenItem/4804/1024/1.jpg"
	}, 
	{image: "http://onehdwallpaper.com/wp-content/uploads/2015/07/Free-Download-Mountain-Hd-Wallpapers.jpg"	
	}, 
	{image: "https://photosbyravi.files.wordpress.com/2013/03/a-mountain-backdrop.jpg"
	}];


var app = new AppView(imagesG);

app.render();

$(document.body).append(app.el); 
