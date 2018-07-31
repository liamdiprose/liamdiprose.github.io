#!/bin/bash

# Build.sh
# Create the website from the sources:
#   * content.yml
#   * template.html
#   * Sass files

function assert_current_dir() {
    if [[ ! -d src ]]; then
        >&2 echo "Cannot find src/ directory (are you in the project root?)" 
        exit 1
    fi
    return 0
}

function generate_html() {
    CONTENT=$1
    TEMPLATE=$2
    OUTPUT=$3
    mustache $CONTENT $TEMPLATE > $OUTPUT
}

function generate_css() {
    SASS_COURSE=$1
    CSS_DEST=$2
    sass $SASS_COURSE $CSS_DEST
}

assert_current_dir
generate_html src/content.yml src/cv.template.html index.html

generate_css src/style.scss dist/style.css 
generate_css src/print.scss dist/print.css