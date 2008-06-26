#!/usr/bin/env ruby
if ARGV.size != 1
  puts 'Usage: ./deploy.rb 0.01'
  exit
end

version = ARGV[0]
name = "Memo-v#{version}"

commands = [
  'cd ../..',
  "cp -rf Memo #{name}",
  "rm -rf #{name}/tools",
  "rm -rf #{name}/.git",
  "zip -r -9 #{name}.zip #{name}",
  "rm -rf #{name}"
]

system(commands.join(';'))
system("wc -c ../../#{name}.zip")
