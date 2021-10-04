require('dotenv').config()
const { ArgumentParser } = require('argparse');
const { version } = require('../package.json')
const { description } = require('../package.json')
const fs = require('fs')

const parser = new ArgumentParser({
  description: description
});

parser.add_argument('-v', '--version', { action: 'version', version })
parser.add_argument('-i', '--input', { help: 'path to BigBlueButton published presentation', required: true })
parser.add_argument('-o', '--output', { help: 'path to outfile', required: true })
parser.add_argument('-t', '--threads', { help: 'Threads numbers', required: false, default=1 })

const arguments = parser.parse_args()
validateArguments(arguments)

module.exports.config = {
  args: arguments,
  format: arguments.output.split('.').pop(),
  docker: fs.existsSync('/.dockerenv')
}

function validateArguments (arguments) {
  if (!arguments.output.endsWith('.mp4') && !arguments.output.endsWith('.webm'))
    throw new Error('Unsupported file type: ' + arguments.output)
  

}


