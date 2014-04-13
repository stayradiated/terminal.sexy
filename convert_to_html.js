var ansi = require('ansi-html-stream');
var fs = require('fs');

var input = fs.createReadStream('tmux.hardcopy');
var output = fs.createWriteStream('./tmux.html');

var middleware = ansi({ chunked: false, theme: {

  resets:    { '0': false },
  bold:      { '1': { 'class': 'bold' } },
  underline: { '4': { 'class': 'underline' } },
  foregrounds: {
    '30': { 'class': 'fg-0' },
    '31': { 'class': 'fg-1' },
    '32': { 'class': 'fg-2' },
    '33': { 'class': 'fg-3' },
    '34': { 'class': 'fg-4' },
    '35': { 'class': 'fg-5' },
    '36': { 'class': 'fg-6' },
    '37': { 'class': 'fg-7' },
    '39': false, // default
    '90': { 'class': 'fg-8' },
    '91': { 'class': 'fg-9' },
    '92': { 'class': 'fg-10' },
    '93': { 'class': 'fg-11' },
    '94': { 'class': 'fg-12' },
    '95': { 'class': 'fg-13' },
    '96': { 'class': 'fg-14' },
    '97': { 'class': 'fg-15' }
  },
  backgrounds: {
    '40': { 'class': 'bg-0' },
    '41': { 'class': 'bg-1' },
    '42': { 'class': 'bg-2' },
    '43': { 'class': 'bg-3' },
    '44': { 'class': 'bg-4' },
    '45': { 'class': 'bg-5' },
    '46': { 'class': 'bg-6' },
    '47': { 'class': 'bg-7' },
    '49': false, // default
    '100': { 'class': 'bg-8' },
    '101': { 'class': 'bg-9' },
    '102': { 'class': 'bg-10' },
    '103': { 'class': 'bg-11' },
    '104': { 'class': 'bg-12' },
    '105': { 'class': 'bg-13' },
    '106': { 'class': 'bg-14' },
    '107': { 'class': 'bg-15' }
  }

}});

input.pipe(middleware);
middleware.pipe(output, { end: false });

// wrap in <pre> tags

middleware.once('end', function() {
    output.end('</pre>\n')
})

output.write('<pre>\n');
