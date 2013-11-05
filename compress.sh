#!/bin/bash

containsElement () {
	local e
	for e in "${@:2}"
	do 
		[[ "$e" == "$1" ]] && return 1
	done
	return 0
}

JS_DIR='js'
JS_TEMP="$JS_DIR/_combined.js"
JS_COMBINED_FILE="$JS_DIR/combined.js"

CSS_DIR='css'
CSS_TEMP="$CSS_DIR/_combined.css"
CSS_COMBINED_FILE="$CSS_DIR/combined.css"

echo 'Compressing JavaScripts...'

# 0. Include base files
vendorFiles=(weever.js modernizr.min.js jscolor/jscolor.js vendor/zepto.js foundation/foundation.js foundation/foundation.*.js account.js wx.js config/wx.features.js wx.list.wordpress.ini.js swipe.js fileuploader.js theme.js list.js)

# 1. Get an array of all of the model javascripts.
allModels=(models/*.js)
# 2. Create a new array of just the items that need to be moved to the front.
modelsToBeMovedForwards=(models/tab.js models/subtab.js models/formbuilder.control.js models/formbuilder.control.input.js)

# 3. Loop through the first array. Remove the items that need to be moved to the front.
length=${#allModels[@]}
for ((i=1; i<$length; i++))
do
   containsElement "${allModels[$i]}" ${modelsToBeMovedForwards}
   if [[ "$?" == "1" ]]; then
      unset allModels[$i]
      i=$i-1
   fi
done

# 4. Concatonate the arrays and include all collections.
final=("${vendorFiles[@]} ${modelsToBeMovedForwards[@]}" "${allModels[@]}" collections/*.js)

# 5. Repeat the above for views
allViews=(views/*.js)
viewsToBeMovedForward=(views/formbuilder.control.js views/tab.js views/subtab.edit.js views/style.js)

length=${#allViews[@]}
for ((i=1; i<$length; i++))
do
	containsElement "${allViews[$i]}" $viewsToBeMovedForward
	if [[ "$?" == "1" ]]; then
		unset allViews[$i]
		i=$i-1
	fi
done

final=("${final[@]}" "${viewsToBeMovedForward[@]} ${allViews[@]}")
> $JS_TEMP

for F in ${final[@]}; do
  CURR_FILE="$JS_DIR/$F"
  cat $CURR_FILE >> $JS_TEMP
done

# Clear the old combined file
> $JS_COMBINED_FILE
> $CSS_COMBINED_FILE

# Compress the temp file into the real file
java -jar yuicompressor-2.4.8.jar $JS_TEMP -o $JS_COMBINED_FILE

# Now do the same above for Style Sheets.
echo 'Compressing Style Sheets...'
styleSheets=(app.css weever-icon-font-1.css imgareaselect-default.css)

for F in ${styleSheets[@]}; do
	CURR_FILE="$CSS_DIR/$F"
	cat $CURR_FILE >> $CSS_TEMP
done

java -jar yuicompressor-2.4.8.jar $CSS_TEMP -o $CSS_COMBINED_FILE

# Remove the temp files
echo 'Cleanup...'
rm $JS_TEMP
rm $CSS_TEMP

echo 'Compression complete!'

# Add to git.
# git add $JS_COMBINED_FILE
# git add $CSS_COMBINED_FILE