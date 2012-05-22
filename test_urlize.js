test('Bare', function () {
    equal(urlize('The website www.ljosa.com is down', true),
	  'The website <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
});

test('Complete', function () {
    equal(urlize('The website http://www.ljosa.com/ is down', true),
	  'The website <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a> is down');
});

test ('Beginning bare', function () {
    equal(urlize('www.ljosa.com is down', true),
	  '<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
});

test ('End complete', function () {
    equal(urlize('Go to http://www.ljosa.com/', true),
	  'Go to <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a>');
});

test ('End bare', function () {
    equal(urlize('Go to www.ljosa.com', true),
	  'Go to <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test ('End bare non-com', function () {
    equal(urlize('Go to www.ljosa.priv.no', true),
	  'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>');
});

test ('End bare non-com trim period', function () {
    equal(urlize('Go to www.ljosa.priv.no.', true),
	  'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>.');
});

test ('End complete non-com', function () {
    equal(urlize('Go to http://www.ljosa.priv.no', true),
	  'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>');
});

test ('End complete trim period', function () {
    equal(urlize('Go to http://www.ljosa.priv.no.', true),
	  'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>.');
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

test('No autoescape parameter', function () {
    equal(urlize('This <b>is</b> www.ljosa.com', true),
	  'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test('autoescape == false', function () {
    equal(urlize('This <b>is</b> www.ljosa.com', true, false),
	  'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test('autoescape == true', function () {
    equal(urlize('This <b>is</b> www.ljosa.com', true, true),
	  'This &lt;b&gt;is&lt;/b&gt; <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test('url_trim_Limit', function () {
    equal(urlize('When you go to www.nemeet.com/somethinglong, you will find it.', false, true, 20),
	  'When you go to <a href="http://www.nemeet.com/somethinglong">www.nemeet.com/so...</a>, you will find it.');
});

test('No target parameter', function () {
    equal(urlize('Open the following in the same window www.ljosa.com', true, false, 20),
	  'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test('target == _blank', function () {
    equal(urlize('Open the following in new window www.ljosa.com', true, false, 20, '_blank'),
	  'Open the following in new window <a href="http://www.ljosa.com" rel="nofollow" target="_blank">www.ljosa.com</a>');
});

test('target == _self', function () {
    equal(urlize('Open the following in the same window www.ljosa.com', true, false, 20, '_self'),
	  'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow" target="_self">www.ljosa.com</a>');
});

test('autoescape == False and ampersands', function () {
    equal(urlize('http://foo.bar/?a=1&b=2', false, false),
	  '<a href="http://foo.bar/?a=1&b=2">http://foo.bar/?a=1&b=2</a>');
});

test('autoescape == True and ampersands', function () {
    equal(urlize('http://foo.bar/?a=1&b=2', false, true),
	  '<a href="http://foo.bar/?a=1&amp;b=2">http://foo.bar/?a=1&amp;b=2</a>');
});

test('autoescape == False and troublesome ampersands', function () {
    equal(urlize('http://foo.bar/?a=1&amp;=2', false, false),
	  '<a href="http://foo.bar/?a=1&amp;=2">http://foo.bar/?a=1&amp;=2</a>');
});

test('autoescape == True and troublesome ampersands', function () {
    equal(urlize('http://foo.bar/?a=1&amp;=2', false, true),
	  '<a href="http://foo.bar/?a=1&amp;amp;=2">http://foo.bar/?a=1&amp;amp;=2</a>');
});
