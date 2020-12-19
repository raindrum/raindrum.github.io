Slug: lawsearch
Date: 2020-11-24
Modified: 2020-12-19
Hide_Body: True

With this, you can use rough legal citations to look up federal statutes and court cases, plus [a few other bodies of law](#recognized-bodies-of-law). It usually recognizes subsections and pincites, too!

<form class="main-search" onsubmit="handleSearch(event)">
    <input type="search" placeholder="Enter citation..." name="q" id="q"><input type="submit" value="Go">
    <br>
    <label for="q" id="explainer" class="search-label"></label>
</form>

<script type="text/javascript" src="../static/citeurl/citation-schemas.js"></script>
<script type="text/javascript" src="../static/citeurl/citeurl.js"></script>

If you're looking for ideas, try some example searches:

- 42 <span>USC §</span> 1983
- usc 42 1983
- nlra 8 b 4
- CAL CIV § <span>1947.12</span>
- 347 <span>U.S.</span> 483
- Kinsman Transit Company, 338 <span>F.2d 708</span>, 715 (1964)

## How it Works

The program tries to match your search query against a series of [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) (regexes), where each regex recognizes a type of citation. For instance, one regex recognizes citations to the Code of Federal Regulations; another recognizes citations to the Federal Rules of Civil Procedure, and a third recognizes court case citations in rough Bluebook format. 

If the search query matches a regex, the program generates a URL redirect to look up the appropriate law or case.

### 1. Statutes

First, the program tries to parse your query as a reference to one of [the bodies of law it knows](#recognized-bodies-of-law). It's not a very long list, but I'm happy to add more on request,

For most of these bodies of law, it's possible to specify a statutory subsection as well, like "NLRA § <span>8(b)(4)</span>", and you'll be linked directly to the correct subsection.

The regexes are fairly flexible, to accommodate shorthand and various citation formats. For instance, "42 usc 1988 b" is treated the same as "42 U. S. C. § 1988(b)". However, subsection identifiers are case-sensitive.

Also note that the subsection you searched for will likely be hidden behind Cornell's website header, so you'll need to scroll up a bit or else disable the header with something like [uBlock Origin](https://ublockorigin.com/).

### 2. Cases

The program looks up court case citations using [Case.Law](https://case.law/), though I will probably change it to [CourtListener](https://www.courtlistener.com/) in the future.

Court case lookups require you to provide a reporter citation in the `VOLUME REPORTER PAGE [PINCITE]` format, where the pincite is optional. Other parts of the citation, such as the case name, are ignored.

If you specify a pincite, like "347 <span>U.S.</span> 483, 491", the program will try to link you directly to the appropriate page of the opinion. However, pincites may be unreliable when Case.Law's copy of the opinion is from a different reporter than the one you cited.

## Bookmark This Search!

You're totally welcome to use the search engine by coming to my site and typing your citation into the search bar whenever you want to look something up. But it's more convenient if you can set up a search keyword so that you can just type something like "ls 42 usc 1983" in your URL bar to look up the law.

To do that on Firefox, you can just right-click the search bar and click "Add a Keyword For This Search."

On Chrome, it's a little more complicated. First, copy this URL:

<code id="bookmarkURL"></code>
<script>
document.getElementById("bookmarkURL").innerHTML = window.location.href.split(/\?|#/)[0] + "?%s";
</script>

Next, go to `Settings > Manage Search Engines`. From there, click "Add", and paste the address in the URL field.

Either way, you'll also need to designate a keyword. I use "ls" (for "law search"), but anything works.


## Recognized Bodies of Law

These are the bodies of law the program is able to recognize, not including the [court case formats](#2-cases) described above. The generic query format allows for some differences in capitalization and punctuation, as shown in the example queries. Most bodies of law, but not all, support citations to specific subsections.

| Body of Law                                                  | Approximate Format                       | Example Query                              |
| ------------------------------------------------------------ | ---------------------------------------- | ------------------------------------------ |
| [U.S. Code](https://www.law.cornell.edu/uscode/text)         | `TITLE usc SECTION [SUBSECTIONS]`        | usc 42 1983                                |
| [Code of Federal Regulations](https://www.law.cornell.edu/cfr/text) | `TITLE cfr SECTION [SUBSECTIONS]`        | 29 <span>CFR § 1926.1053</span>(b)(17)(ii) |
| [U.S. Public Laws](https://uscode.house.gov/)                | `public law CONGRESS-LAW`                | pub. l. 89-110                             |
| [Uniform Commercial Code](https://www.law.cornell.edu/ucc)   | `ucc ARTICLE SECTION [FIRST_SUBSECTION]` | ucc 8-108                                  |
| [California Codes](https://leginfo.legislature.ca.gov/faces/codes.xhtml) (e.g. PEN, CIV, CCP ...) | `cal CODE SECTION`                       | CAL CCP <span>1161.1</span>                |
| [Federal Rules of Civil Procedure](https://www.law.cornell.edu/rules/frcp) | `frcp RULE [SUBSECTIONS]`                | frcp 12 b 6                                |
| [Immigration and Nationality Act](https://www.law.cornell.edu/topn/immigration_and_nationality_act) * | `ina SECTION [SUBSECTIONS]`              | I.N.A. <span>§ 212</span>(a)(4)            |
| [National Labor Relations Act](https://www.law.cornell.edu/topn/national_labor_relations_act) * | `nlra SECTION [SUBSECTIONS]`             | nlra § 7                                   |
| [Americans With Disabilities Act](https://www.law.cornell.edu/topn/americans_with_disabilities_act_of_1990) * | `ada SECTION [SUBSECTIONS]`              | ada 102 c 2 C iii                          |
| [Fair Housing Act](https://www.law.cornell.edu/topn/fair_housing_act) * | `fha SECTION [SUBSECTIONS]`              | fha 804 f 3 C iii V                        |
| [Endangered Species Act](https://www.law.cornell.edu/topn/endangered_species_act_of_1973) * | `esa SECTION [SUBSECTIONS]`              | E. S. A. § 7                               |
| [Clean Air Act](https://www.law.cornell.edu/topn/clean_air_act) * | `caa SECTION [SUBSECTIONS]`              | CAA <span>§ 112</span>(k)(3)               |
| [Clean Water Act](https://www.law.cornell.edu/topn/clean_water_act_of_1977) * | `cwa SECTION [SUBSECTIONS]`              | cwa 301 b 2 A                              |

\* As codified. Cross-references in the text will refer to U.S. Code section numbers, not sections of the original Act.

Obviously this is far from a complete list. A lot of the laws it supports are there because I was studying them while working on this. If you'd like me to add other laws, or if you find any errors, [send me an email](mailto:simonraindrum@gmail.com) and I'll see what I can do!
