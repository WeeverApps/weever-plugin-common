require 'zurb-foundation'
# Require any additional compass plugins here.


# Set this to the root of your project when deployed:
http_path = "/"

# local
# css_dir =  "css"

# remote
  css_dir = "/Volumes/enceladus.weeverdev.com/www/backbone/wp-content/plugins/wp_weeverapps/static/css"

sass_dir = "scss"
# add_import_path = "scss/weeverapps/platforms/appbuilder-cloud/appbuilder-cloud"
images_dir = "img"
javascripts_dir = "js"



# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

output_style = :expanded



# To enable relative paths to assets via compass helper functions. Uncomment:

relative_assets = true



# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# DOCUMENTATION
# FILE NAME: sass.rb
#
# To run it, use ruby ./sass.rb
# To get all options, use ruby ./sass.rb -h
#
# Here's some examples:
#
# For generating a wordpress-friendly app.css:
#    ruby ./sass.rb --type wordpress
# or
#   ruby ./sass.rb -t wp
#
# For generating a joomla friendly app.css:
#   ruby ./sass.rb --type joomla
# or
#   ruby ./sass.rb -t j
#
# AppBuilder is the default type, but can be specified using "appBuilder" or "ab".
#
# You can specify the "output style" (nested, expanded, compact, compressed) using the -s or --style switch:
#   ruby ./sass.rb --type wordpress --style compact
#
# And you can include the wx-css-development folder by adding the --debug (-d) switch:
#   ruby ./sass.rb -d
