

ALL = urlize.min.js

all: $(ALL)

%.min.js: %.js
	uglifyjs $< > $@.tmp && mv $@.tmp $@ || rm -f $@
