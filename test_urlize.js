test('Bare', function () {
    equal(urlize('The website www.nemeet.com is down', true),
	  'The website <a href="http://www.nemeet.com" rel="nofollow">www.nemeet.com</a> is down');
});

test('Complete', function () {
    equal(urlize('The website http://www.nemeet.com/ is down', true),
	  'The website <a href="http://www.nemeet.com/" rel="nofollow">http://www.nemeet.com/</a> is down');
});

test ('Beginning bare', function () {
    equal(urlize('www.nemeet.com is down', true),
	  '<a href="http://www.nemeet.com" rel="nofollow">www.nemeet.com</a> is down');
});

test ('End complete', function () {
    equal(urlize('Go to http://www.nemeet.com/', true),
	  'Go to <a href="http://www.nemeet.com/" rel="nofollow">http://www.nemeet.com/</a>');
});

test ('End bare', function () {
    equal(urlize('Go to www.nemeet.com', true),
	  'Go to <a href="http://www.nemeet.com" rel="nofollow">www.nemeet.com</a>');
});

test ('End bare non-com', function () {
    equal(urlize('Go to www.nemeet.no', true),
	  'Go to <a href="http://www.nemeet.no" rel="nofollow">www.nemeet.no</a>');
});

test ('End bare non-com trim period', function () {
    equal(urlize('Go to www.nemeet.no.', true),
	  'Go to <a href="http://www.nemeet.no" rel="nofollow">www.nemeet.no</a>.');
});

test ('End complete non-com', function () {
    equal(urlize('Go to http://www.nemeet.no', true),
	  'Go to <a href="http://www.nemeet.no" rel="nofollow">http://www.nemeet.no</a>');
});

test ('End complete trim period', function () {
    equal(urlize('Go to http://www.nemeet.no.', true),
	  'Go to <a href="http://www.nemeet.no" rel="nofollow">http://www.nemeet.no</a>.');
});

test('Email', function () {
    equal(urlize('Contact me at vebjorn@ljosa.com', true),
	  'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>');
});

test('Email trim period', function () {
    equal(urlize('Contact me at vebjorn@ljosa.com.', true),
	  'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>.');
});

test('IDN', function () {
    equal(urlize(unescape('www.r%F8asenter.no')),
	  unescape('<a href="http%3A//www.xn--rasenter-54a.no">www.r%F8asenter.no</a>'));
});

test('Bare parens', function () {
    equal(urlize('My web site (www.ljosa.com)', true),
	  'My web site (<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>)');
});

