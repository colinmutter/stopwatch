# files
TEST_BUILD = build/tests.js
TEST_MERGE = test/tests.js
TESTS = $(wildcard test/*.test.js)
SRC = $(wildcard index.js lib/*.js)

# run make on refresh, use custom build file build-test
T= ./node_modules/.bin/duo-test -B $(TEST_BUILD) -c make -t "duo - mocha"

# builds a file of all tests
# depends on a single file that requires all tests
$(TEST_BUILD): $(TEST_MERGE)
	@duo --root . --type js < $< > $@

# generate the combined test file
$(TEST_MERGE): $(SRC) $(TESTS)
	@echo '// GENERATED FILE: DO NOT EDIT!' > $@
	@$(foreach test, $(TESTS), echo 'require("./$(test)");' >> $@;)

test: test-phantomjs

test-phantomjs: $(TEST_BUILD) $(SRC)
	@$(T) phantomjs --reporter spec

test-browser: $(TEST_BUILD) $(SRC)
	@$(T) browser

test-saucelabs: $(TEST_BUILD) $(SRC)
	@$(T) saucelabs -b safari:6..7

clean:
	rm -rf $(TEST_BUILD) $(TEST_MERGE) components

.PHONY: clean test test-phantomjs test-browser