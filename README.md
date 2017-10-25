# listings-parser

This is a tool to automate gathering of basic data from single restaurant listings for a data science project. As a lightweight tool that avoids the need for a formal API interaction, and as a practice project for scraping, parsing, and converting data, this project is not intended for crawling/scraping on a scaled basis.

Global Dependencies:
- Sass, Node, NPM, Rollup

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

### Use

1) Enter a yelp url of a restaurant you want to parse
- `https://www.yelp.com/biz/din-tai-fung-arcadia-3`
- `https://www.yelp.com/biz/din-tai-fung-arcadia-3?page_src=related_bizes`
  - Parser will automatically strip everything following a query `?`

2) Click on options buttons to review data

3) Send feedback/errors to a.maidah@gmail.com or Github issues

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
- 1_star (total 1 star review distribution count)
- 2_star
- 3_star
- 4_star
- 5_star

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
