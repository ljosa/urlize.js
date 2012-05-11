urlize.js
=========

Converts any URLs in text into clickable links.

Works on http://, https://, www. links, and also on links ending in
one of the original seven gTLDs (.com, .edu, .gov, .int, .mil, .net,
and .org).  Links can have trailing punctuation (periods, commas,
close-parens) and leading punctuation (opening parens) and it'll still
do the right thing.

Usage
-----

> `urlize(`*text*`, `*nofollow*`, `*autoescape*`, `*trim_url_limit*`, `*target*` )`
> &#x21D2; *html*

*Text* is the text in which to identify URLs.

The remaining arguments are optional (if not given, they are
`undefined`, which is false). If *nofollow* is true, the attribute
`rel="nofollow"` will be set on the generated `A` elements. If
*autoescape* is true, characters that have meaning in HTML
(&amp;&lt;&gt;&quot;&#39;) will be escaped. If given, *trim_url_limit*
should be a positive integer. The displayed URLs (contents of the A
elements) will be truncated to three characters less than the
specified length, and three periods (...) will be added. `target`
parameter allows you to specify html `target=""` parameter. For 
example, to make generate links that open in a new window, use 
`_blank` as `target` parameter.

Raison d'&ecirc;tre
-------------

Web applications frequently need to identify URLs in text that a user
has entered and render those URLs as clickable hyperlinks. Identifying
URLs is tricky because they are often surrounded by punctuation marks
and because users frequently do not use the full form of the URL.

Many JavaScript functions exist for replacing URLs with hyperlinks,
but I was unable to find one that works as well as the `urlize` filter
in the Python-based web framework [Django](https://www.djangoproject.com/). I therefore ported Django's
`urlize` filter to JavaScript.

Compatibility with Django
-------------------------

It is a goal for my port to be always produce the same results as the
[`django.utils.html.urlize`](https://docs.djangoproject.com/en/1.4/ref/templates/builtins/)
function in the latest release of
[Django](https://www.djangoproject.com/). That way, a Django
application can render text both on the server side (using Django's
[`urlize`](https://docs.djangoproject.com/en/1.4/ref/templates/builtins/#urlize)
or
[`urlizetrunc`](https://docs.djangoproject.com/en/1.4/ref/templates/builtins/#urlizetrunc)
filter) or on the client side (using this port, e.g., in order to show
a dynamic preview while the text is being entered). Any difference
between the two implementations is considered a bug.


