# listings-parser

Parses and allows for export data

### Technology

JavaScript ES6 | Node | Express | Handlebars

HTML5 | CSS3 | Bootstrap 4 | SCSS

json2csv | superagent | Rollup

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

Dependencies:

Sass, Node, NPM, Rollup
