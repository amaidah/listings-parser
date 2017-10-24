# listings-parser

Parses and allows for export data

### Getting Started

- `git clone <repo>`
- `npm install`

Serve production
- `npm run start`
- navigate to `http://localhost:3030`

Serve dev server
- `npm run dev`
- navigate to `http://localhost:3030`

### Output

- full_name
- short_name (default = null)
- phone_number (stripped of formatting [no parenthesis, spaces, dashes])
- website (stripped of www)
- form (default = null)
- description (default = null)
- seating (default = 'Indoors', else 'Mixed')
- latitude (default = null)
- longitude (default = null)
- address_one
- address_two
- address_city
- address_state
- address_zip
- address_country (default = null)
- primary (first cuisine/genre type)
- secondary (second cuisine/genre type)
- cc_accepted ('Yes'/'No')
- budget (dollar signs as numeral string: '2')
- time (converts to military time, read below)

#### Time Conversion

- Mon 11:00 am - 2:00 am  
- Tue 11:00 am - 2:00 am  

Converted to:

- Tue 0000 - 0200, 1100 - 2400

Daily format:

- mon_hours_start_1
- mon_hours_end_1
- mon_hours_start_2
- mon_hours_end_2
- mon_hours_start_3
- mon_hours_end_3

#### Issues

Mac

No sass?
- `gem install sass`
- `sass -v`

No node? https://nodejs.org/en/download/package-manager/#macos
- `brew install node@6`
- `node --version`

No npm?
- should come with node install
- `npm -v`

No brew? https://brew.sh/
- `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- `brew -v`

No git cli?
- try to run `git`
- should prompt an install if not already installed

No Rollup?
- npm install --global rollup
