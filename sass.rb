require 'optparse'
require 'tempfile'
require 'fileutils'

options = {
	:type => :all,
	:debug => false,
	:style => 'expanded'
}
OptionParser.new do |opts|
	opts.banner = "Usage: sass.rb [options]"

	opts.on("-t [TYPE]", "--type [TYPE]" , [:wordpress, :wp, :joomla, :j, :appBuilder, :ab, :cloud, :c, :universal, :u, :all], "Select type (wordpress, wp, joomla, j, appBuilder, ab, cloud, c, universal, u, all)") do |t|
		puts "Please specify a valid type: [wordpress, wp, joomla, j, appBuilder, ab, all]" and exit unless [:wordpress, :wp, :joomla, :j, :appBuilder, :ab, :cloud, :c, :universal, :u, :all].include? t

		if t == :wordpress or t == :wp
			options[:type] = :wordpress
		elsif t == :joomla or t == :j
			options[:type] = :joomla
		elsif t == :appBuilder or t == :ab or t == :cloud or t == :c
			options[:type] = :cloud
		elsif t == :universal or t == :u
			options[:type] = :universal
		else
			options[:type] = :all
		end
	end

	opts.on("-s [STYLE]", "--style [STYLE]", [:nested, :expanded, :compact, :compressed], "Select output style (nested, expanded, compact, compressed)") do |s|
		puts "Please specify a valid style: [nested, expanded, compact, compressed]" and exit unless [:nested, :expanded, :compact, :compressed].include? s
		options[:style] = s
	end

	opts.on("-d", "--debug", "Enable Debug Mode") do |d|
		options[:debug] = d
	end
end.parse!

def write_files( options )
	puts "Compiling CSS files for #{options[:type]}."

	# Get the path to the CMS-specific SASS files.
	specific_files = "weeverapps/platforms/appbuilder-#{options[:type]}/wx-appbuilder-#{options[:type]}"

	path = './scss/app.scss'
	temp_path = './scss/_app.scss.tmp'
	temp_file = Tempfile.new('app.scss')
	begin
		# Write every line of the real app.scss to the temp app.scss, adding the CMS-specific files along the way.
		# (Currently, they are being added just below the line that says "// wx - platform styles")
		File.open(path, 'r') do |file|
			file.each_line do |line|
				temp_file.puts line
				if line =~ /platform styles/i
					temp_file.puts "@import \"#{specific_files}\";" unless options[:type] == :universal
				end
			end
		end

		if options[:debug]
			temp_file.puts("@import \"weeverapps/components/wx-css-development\";")
		end

		temp_file.rewind
		FileUtils.mv(path, temp_path)		# Copy the real app.scss to a temp location.
		FileUtils.mv(temp_file.path, path)	# Overwrite the real location with the temp file


		# Use commenting to choose between local and remote compiling
		# Recommended: mount a remote disk using MacFusion or similar		

		# Run Compass Compile
		  css_dir = options[:type] == :universal ? 'css' : "css_#{options[:type]}"
		
	
		# Run Compoass Compile to mounted remote disk
		# css_dir = options[:type] == :universal ? '/Volumes/enceladus/www/backbone/wp-content/plugins/wp_weeverapps/static/css' : "/Volumes/enceladus/www/backbone/wp-content/plugins/wp_weeverapps/static/css_#{options[:type]}"

		puts `compass compile --force -s #{options[:style]} --css-dir #{css_dir}`
	ensure
		FileUtils.mv(temp_path, path)		# Move the real file back to where it should be

		temp_file.close
		temp_file.unlink
	end
end

if options[:type] == :all
	
	options[:type] = :wordpress
	write_files options
	
	options[:type] = :joomla
	write_files options
	
	options[:type] = :cloud
	write_files options
	
	options[:type] = :universal
	write_files options
	
else
	write_files options
end

# DOCUMENTATION
# FILE NAME: sass.rb
#
# To run it, use ruby ./sass.rb
# To get all options, run ruby ./sass.rb -h
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
