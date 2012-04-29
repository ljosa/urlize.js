

ALL = urlize.min.js

all: $(ALL)

%.min.js: %.js
	uglifyjs $< > $@
