// using QUnit - https://qunitjs.com. Test is setup by ../test_urlize.html

module('IE7');

test('Two words, no URL', function () {
  equal(urlize('foo bar'), 'foo bar');
});

test('Split words', function () {
  deepEqual(urlize.test.split('foo bar', /(\s+)/), ['foo', ' ', 'bar']);
});

module('Basic functionality');

test('Bare', function () {
  equal(urlize('The website www.ljosa.com is down', true),
   'The website <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
  equal(urlize('The website www.ljosa.com is down', {nofollow: true}),
   'The website <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
});

test('Complete', function () {
  equal(urlize('The website http://www.ljosa.com/ is down', true),
   'The website <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a> is down');
  equal(urlize('The website http://www.ljosa.com/ is down', {nofollow: true}),
   'The website <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a> is down');
});

test ('Beginning bare', function () {
  equal(urlize('www.ljosa.com is down', true),
   '<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
  equal(urlize('www.ljosa.com is down', {nofollow: true}),
   '<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
});

test ('End complete', function () {
  equal(urlize('Go to http://www.ljosa.com/', true),
   'Go to <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a>');
  equal(urlize('Go to http://www.ljosa.com/', {nofollow: true}),
   'Go to <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a>');
});

test ('End bare', function () {
  equal(urlize('Go to www.ljosa.com', true),
   'Go to <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  equal(urlize('Go to www.ljosa.com', {nofollow: true}),
   'Go to <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test ('End bare non-com', function () {
  equal(urlize('Go to www.ljosa.priv.no', true),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>');
  equal(urlize('Go to www.ljosa.priv.no', {nofollow: true}),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>');
});

test ('End bare non-com trim period', function () {
  equal(urlize('Go to www.ljosa.priv.no.', true),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>.');
  equal(urlize('Go to www.ljosa.priv.no.', {nofollow: true}),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>.');
});

test ('End complete non-com', function () {
  equal(urlize('Go to http://www.ljosa.priv.no', true),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>');
  equal(urlize('Go to http://www.ljosa.priv.no', {nofollow: true}),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>');
});

test ('End complete trim period', function () {
  equal(urlize('Go to http://www.ljosa.priv.no.', true),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>.');
  equal(urlize('Go to http://www.ljosa.priv.no.', {nofollow: true}),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>.');
});

test('Email', function () {
  equal(urlize('Contact me at vebjorn@ljosa.com', true),
   'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>');
  equal(urlize('Contact me at vebjorn@ljosa.com', {nofollow: true}),
   'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>');
});

test('Email trim period', function () {
  equal(urlize('Contact me at vebjorn@ljosa.com.', true),
   'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>.');
  equal(urlize('Contact me at vebjorn@ljosa.com.', {nofollow: true}),
   'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>.');
});

// PENDING
// test('IDN', function () {
//     equal(urlize(unescape('www.r%F8asenter.no')),
// 	  unescape('<a href="http%3A//www.xn--rasenter-54a.no">www.r%F8asenter.no</a>'));
//     equal(urlize(unescape('www.r%F8asenter.no'), {}),
// 	  unescape('<a href="http%3A//www.xn--rasenter-54a.no">www.r%F8asenter.no</a>'));
// });

test('Bare parens', function () {
  equal(urlize('My web site (www.ljosa.com)', true),
   'My web site (<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>)');
  equal(urlize('My web site (www.ljosa.com)', {nofollow: true}),
   'My web site (<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>)');
