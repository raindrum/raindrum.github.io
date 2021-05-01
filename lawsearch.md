Slug: lawsearch
Date: 2020-11-24
Hide_Body: True
Modified: 2021-05-01


Type a legal citation into the box below, and I'll try to send you to whatever it references:
<script>
// This script was made with CiteURL, an extensible framework to turn
// legal references into URLs.
//
// The "templates" variable directly below holds the data necessary to 
// turn each kind of citation into a URL. Some or all of the templates may
// have been made by a third party and are not part of CiteURL itself.
//
// CiteURL is copyright of Simon Raindrum Sherred under the MIT License,
// and is available at https://github.com/raindrum/citeurl.

const templates = [
    {
        "name": "United States Code",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/uscode/text/{title}/{section}",
            "#{subsection}"
        ],
        "regexes": [
            "([Tt]itle )?(?<title>\\d+) (U\\.?|United) ?(S\\.?|States) ?C(ode|\\.?)( ?[AS]\\.?| Ann(otated|o?\\.)| Serv(ice|\\.))?((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?",
            "[Ss]ection((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))? of ([Tt]itle )?(?<title>\\d+) of the (U\\.?|United) ?(S\\.?|States) ?C(ode|\\.?)( ?[AS]\\.?| Ann(otated|o?\\.)| Serv(ice|\\.))?"
        ],
        "operations": [
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "United States Constitution",
        "defaults": {},
        "URL": [
            "https://constitution.congress.gov/browse/",
            "amendment-{amendment}/",
            "article-{article}",
            "#{article_roman}_S{section}",
            "#{amendment}_S{section}",
            "_C{clause}"
        ],
        "regexes": [
            "(^|(U\\.? ?S\\.?|United States) ?Const(itution|\\.))([Aa]rt(icle|\\.) (?<article>[\\dIViv]{1,3}|[Oo]ne|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ss]even)|[Aa]m(endment|(end|dt?)?\\.) (?<amendment>[\\dXIVxiv]{1,3}))((,? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>\\d+|[IVXivx]{1,7}))((,? ([Cc]l(ause|\\.) ?(?<clause>\\d+))))?)?",
            "(((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>\\d+|[IVXivx]{1,7})((,? ([Cc]l(ause|\\.) ?(?<clause>\\d+))))? of )?([Tt]he )?(?<amendment>\\d{1,2}(st|nd|rd|th)|([Tt]wenty(-| )?)?([Ff]irst|[Ss]econd|[Tt]hird|[Ff]ourth|[Ff]ifth|[Ss]ixth|[Ss]eventh|[Ee]ighth|[Nn]inth)|[Tt]enth|[Ee]leventh|[Tt]welfth|([Tt]hir|[Ff]our|[Ff]if|[Ss]ix|[Ss]even|[Ee]igh|[Nn]ine)teenth|[Tt]wentieth) [Aa]m(endment|dt?\\.|end\\.)",
            "(U\\.? ?S\\.?|United States) ?Const(itution|\\.),? ([Aa]rt(icle|\\.) (?<article>[\\dIViv]{1,3}|[Oo]ne|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ss]even)|[Aa]m(endment|(end|dt?)?\\.) (?<amendment>[\\dXIVxiv]{1,3}))((,? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>\\d+|[IVXivx]{1,7}))((,? ([Cc]l(ause|\\.) ?(?<clause>\\d+))))?)?",
            "([Aa]rt(icle|\\.) (?<article>[\\dIViv]{1,3}|[Oo]ne|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ss]even)|[Aa]m(endment|(end|dt?)?\\.) (?<amendment>[\\dXIVxiv]{1,3}))((,? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>\\d+|[IVXivx]{1,7}))((,? ([Cc]l(ause|\\.) ?(?<clause>\\d+))))?)? (of|to) the (U\\.? ?S\\.?|United States) ?Const(itution|\\.)",
            "(((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>\\d+|[IVXivx]{1,7})((,? ([Cc]l(ause|\\.) ?(?<clause>\\d+))))? of )?([Tt]he )?(?<amendment>\\d{1,2}(st|nd|rd|th)|([Tt]wenty(-| )?)?([Ff]irst|[Ss]econd|[Tt]hird|[Ff]ourth|[Ff]ifth|[Ss]ixth|[Ss]eventh|[Ee]ighth|[Nn]inth)|[Tt]enth|[Ee]leventh|[Tt]welfth|([Tt]hir|[Ff]our|[Ff]if|[Ss]ix|[Ss]even|[Ee]igh|[Nn]ine)teenth|[Tt]wentieth) [Aa]m(endment|dt?\\.|end\\.) (of|to) the (U\\.? ?S\\.?|United States) ?Const(itution|\\.)"
        ],
        "operations": [
            {
                "token": "article",
                "optionalLookup": {
                    "one": "1",
                    "two": "2",
                    "three": "3",
                    "four": "4",
                    "five": "5",
                    "six": "6",
                    "seven": "7"
                }
            },
            {
                "token": "amendment",
                "sub": [
                    "(st|nd|rd|th)$",
                    ""
                ]
            },
            {
                "token": "amendment",
                "optionalLookup": {
                    "fir": "1",
                    "seco": "2",
                    "thi": "3",
                    "four": "4",
                    "fif": "5",
                    "six": "6",
                    "seven": "7",
                    "eigh": "8",
                    "nin": "9",
                    "ten": "10",
                    "eleven": "11",
                    "twelf": "12",
                    "thirteen": "13",
                    "fourteen": "14",
                    "fifteen": "15",
                    "sixteen": "16",
                    "seventeen": "17",
                    "eighteen": "18",
                    "nineteen": "19",
                    "twentie": "20",
                    "twenty(- )?fir": "21",
                    "twenty(- )?seco": "22",
                    "twenty(- )?thi": "23",
                    "twenty(- )?four": "24",
                    "twenty(- )?fif": "25",
                    "twenty(- )?six": "26",
                    "twenty(- )?seven": "21",
                    "twenty(- )?eigh": "28",
                    "twenty(- )?nin": "29"
                }
            },
            {
                "token": "article",
                "numberFormat": "roman",
                "output": "article_roman"
            },
            {
                "token": "article",
                "numberFormat": "digit"
            },
            {
                "token": "amendment",
                "numberFormat": "digit"
            },
            {
                "token": "section",
                "numberFormat": "digit"
            }
        ]
    },
    {
        "name": "U.S. Public Laws",
        "defaults": {},
        "URL": [
            "https://uscode.house.gov/statutes/pl/{congress}/{law}.pdf"
        ],
        "regexes": [
            "Pub(\\.?|lic) ?L(\\.?|aw) ?(No\\.?)? ?(?<congress>\\d+)[–‑-](?<law>\\d+)"
        ]
    },
    {
        "name": "U.S. Statutes at Large",
        "defaults": {},
        "URL": [
            "https://www.govinfo.gov/content/pkg/STATUTE-{volume}/pdf/STATUTE-{volume}-Pg{page}.pdf"
        ],
        "regexes": [
            "(?<volume>\\d+) Stat\\.? (?<page>\\d+)([–‑-]\\d+)?"
        ]
    },
    {
        "name": "Federal Register",
        "defaults": {},
        "URL": [
            "https://www.federalregister.gov/documents/search?conditions[term]={volume}+FR+{page}"
        ],
        "regexes": [
            "(?<volume>\\d+) (Fed\\. ?Reg\\.|F\\.? ?R\\.?) (?<page>\\d([,\\d]+\\d)?)"
        ],
        "operations": [
            {
                "token": "page",
                "sub": [
                    ",",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Code of Federal Regulations",
        "defaults": {},
        "URL": [
            "https://ecfr.federalregister.gov/cfr-reference?cfr%5Bdate%5D=current&cfr%5Breference%5D={title} CFR {section}",
            "#p-{section}{subsection}"
        ],
        "regexes": [
            "([Tt]itle )?(?<title>\\d+) (C\\.? ?F\\.? ?R\\.?|Code of Federal Regulations)( [Pp]arts?| [Pp]ts?\\.)?((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Federal Rules of Civil Procedure",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/rules/frcp/rule_{rule}",
            "#rule_{rule}_{subsection}"
        ],
        "regexes": [
            "(F\\.? ?R\\.? ?C\\.? ?P\\.?|Fed\\.? ?R(\\.?|ule) ?Civ\\.? ?Pr?o?c?\\.?|Federal Rules? of Civil Procedure) ?(Rule )?(?<rule>\\d+(\\.\\d+)?[a-z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Federal Rules of Appellate Procedure",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/rules/frap/rule_{rule}",
            "#rule_{rule}_{subsection}"
        ],
        "regexes": [
            "(F\\.? ?R\\.? ?A\\.? ?P\\.?|Fed\\.? ?R(\\.?|ule) ?App\\.? ?Pr?o?c?\\.?|Federal Rules? of Appellate Procedure) ?(Rule )?(?<rule>\\d+(\\.\\d+)?[a-z]?)"
        ],
        "operations": [
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Federal Rules of Criminal Procedure",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/rules/frcrmp",
            "/rule_{rule}",
            "#rule_{rule}_{subsection}"
        ],
        "regexes": [
            "(F\\.? ?R\\.? ?Cr\\.? ?P\\.?|Fed\\.? ?R(\\.?|ule) ?Crim\\.? ?Pr?o?c?\\.?|Federal Rules? of Criminal Procedure) ?(Rule )?(?<rule>\\d+(\\.\\d+)?[a-z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Federal Rules of Evidence",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/rules/fre/rule_{rule}",
            "#rule_{rule}_{subsection}"
        ],
        "regexes": [
            "(F\\.? ?R\\.? ?E\\.?|Fed\\.? R(\\.?|ule) ?Evid\\.?|Federal Rules? of Evidence) ?(Rule )?(?<rule>\\d+(\\.\\d+)?[a-z]?)"
        ]
    },
    {
        "name": "Immigration and Nationality Act",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/uscode/text/8/{section}",
            "#{subsection}"
        ],
        "regexes": [
            "(Immigration ([Aa]nd|&) Nationality Act|I\\.?N\\.?A\\.?|I\\. N\\. A\\.)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "lookup": {
                    "101": "1101",
                    "102": "1102",
                    "103": "1103",
                    "104": "1104",
                    "105": "1105",
                    "106": "1105a",
                    "201": "1151",
                    "202": "1152",
                    "203": "1153",
                    "204": "1154",
                    "205": "1155",
                    "206": "1156",
                    "207": "1157",
                    "208": "1158",
                    "209": "1159",
                    "210": "1160",
                    "210a": "1161",
                    "211": "1181",
                    "212": "1182",
                    "213": "1183",
                    "213a": "1183a",
                    "214": "1184",
                    "215": "1185",
                    "216": "1186a",
                    "216a": "1186b",
                    "217": "1187",
                    "218": "1188",
                    "219": "1189",
                    "221": "1201",
                    "222": "1202",
                    "223": "1203",
                    "224": "1204",
                    "231": "1221",
                    "232": "1222",
                    "233": "1223",
                    "234": "1224",
                    "235": "1225",
                    "235a": "1225a",
                    "236": "1226",
                    "236a": "1226a",
                    "237": "1227",
                    "238": "1228",
                    "239": "1229",
                    "240": "1229a",
                    "240a": "1229b",
                    "240b": "1229c",
                    "240c": "1230",
                    "241": "1231",
                    "242": "1252",
                    "242a": "1252a",
                    "242b": "1252b",
                    "243": "1253",
                    "244": "1254a",
                    "245": "1255",
                    "245a": "1255a",
                    "246": "1256",
                    "247": "1257",
                    "248": "1258",
                    "249": "1259",
                    "250": "1260",
                    "251": "1281",
                    "252": "1282",
                    "253": "1283",
                    "254": "1284",
                    "255": "1285",
                    "256": "1286",
                    "257": "1287",
                    "258": "1288",
                    "261": "1301",
                    "262": "1302",
                    "263": "1303",
                    "264": "1304",
                    "265": "1305",
                    "266": "1306",
                    "271": "1321",
                    "272": "1322",
                    "273": "1323",
                    "274": "1324",
                    "274a": "1324a",
                    "274b": "1324b",
                    "274c": "1324c",
                    "274d": "1324d",
                    "275": "1325",
                    "276": "1326",
                    "277": "1327",
                    "278": "1328",
                    "279": "1329",
                    "280": "1330",
                    "281": "1351",
                    "282": "1352",
                    "283": "1353",
                    "284": "1354",
                    "285": "1355",
                    "286": "1356",
                    "287": "1357",
                    "288": "1358",
                    "289": "1359",
                    "290": "1360",
                    "291": "1361",
                    "292": "1362",
                    "293": "1363",
                    "294": "1363a",
                    "295": "1363b",
                    "301": "1401",
                    "302": "1402",
                    "303": "1403",
                    "304": "1404",
                    "305": "1405",
                    "306": "1406",
                    "307": "1407",
                    "308": "1408",
                    "309": "1409",
                    "310": "1421",
                    "311": "1422",
                    "312": "1423",
                    "313": "1424",
                    "314": "1425",
                    "315": "1426",
                    "316": "1427",
                    "317": "1428",
                    "318": "1429",
                    "319": "1430",
                    "320": "1431",
                    "321": "1432",
                    "322": "1433",
                    "323": "1434",
                    "324": "1435",
                    "325": "1436",
                    "326": "1437",
                    "327": "1438",
                    "328": "1439",
                    "329": "1440",
                    "329a": "1440-1",
                    "330": "1441",
                    "331": "1442",
                    "332": "1443",
                    "333": "1444",
                    "334": "1445",
                    "335": "1446",
                    "336": "1447",
                    "337": "1448",
                    "338": "1449",
                    "339": "1450",
                    "340": "1451",
                    "341": "1452",
                    "342": "1453",
                    "343": "1454",
                    "344": "1455",
                    "345": "1456",
                    "346": "1457",
                    "347": "1458",
                    "348": "1459",
                    "349": "1481",
                    "350": "1482",
                    "351": "1483",
                    "352": "1484",
                    "353": "1485",
                    "354": "1486",
                    "355": "1487",
                    "356": "1488",
                    "357": "1489",
                    "358": "1501",
                    "359": "1502",
                    "360": "1503",
                    "361": "1504",
                    "404": "1101",
                    "405": "1101",
                    "406": "1101",
                    "407": "1101",
                    "411": "1521",
                    "412": "1522",
                    "413": "1523",
                    "414": "1524",
                    "501": "1531",
                    "502": "1532",
                    "503": "1533",
                    "504": "1534",
                    "505": "1535",
                    "506": "1536",
                    "507": "1537"
                }
            },
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Internal Revenue Code",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/uscode/text/26/{section}",
            "#{subsection}"
        ],
        "regexes": [
            "(Internal Revenue Code|I\\.? ?R\\.? ?C\\.?)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Treasury Regulations",
        "defaults": {},
        "URL": [
            "https://ecfr.federalregister.gov/cfr-reference?cfr%5Bdate%5D=current&cfr%5Breference%5D=26 CFR {section}",
            "#p-{section}{subsection}"
        ],
        "regexes": [
            "Treas(ury|\\.?) ?Reg(ulations?|\\.?)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "National Labor Relations Act",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/uscode/text/29/{section}",
            "#{subsection}"
        ],
        "regexes": [
            "(National Labor Relations Act|N\\.? ?L\\.? ?R\\.? ?A\\.?)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "lookup": {
                    "1": "151",
                    "2": "152",
                    "3": "153",
                    "4": "154",
                    "5": "155",
                    "6": "156",
                    "7": "157",
                    "8": "158",
                    "9": "159",
                    "10": "160",
                    "11": "161",
                    "12": "162",
                    "13": "163",
                    "14": "164",
                    "15": "165",
                    "16": "166",
                    "17": "167",
                    "18": "168",
                    "19": "169"
                }
            },
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "National Labor Relations Board Decisions",
        "defaults": {},
        "URL": [
            "https://www.nlrb.gov/cases-decisions/decisions/board-decisions?search_term=&volume={volume}&page_number={page}"
        ],
        "regexes": [
            "(?<volume>\\d+) N\\.? ?L\\.? ?R\\.? ?B\\.? (?<page>\\d+)"
        ]
    },
    {
        "name": "National Labor Relations Board Slip Opinions",
        "defaults": {},
        "URL": [
            "https://www.nlrb.gov/cases-decisions/decisions/board-decisions?search_term=&volume={volume}&slip_opinion_number={slip}"
        ],
        "regexes": [
            "(?<volume>\\d+) N\\.? ?L\\.? ?R\\.? ?B\\.? (Slip Op\\. )?No\\. (?<slip>\\d+)"
        ]
    },
    {
        "name": "Endangered Species Act",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/uscode/text/16/{section}",
            "#{subsection}"
        ],
        "regexes": [
            "(Endangered Species Act|E\\.? ?S\\.? ?A\\.?)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "lookup": {
                    "2": "1531",
                    "3": "1532",
                    "4": "1533",
                    "5": "1534",
                    "6": "1535",
                    "7": "1536",
                    "8": "1537",
                    "8A": "1537a",
                    "9": "1538",
                    "10": "1539",
                    "11": "1540",
                    "12": "1541",
                    "15": "1542",
                    "17": "1543",
                    "18": "1544"
                }
            },
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Clean Air Act",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/uscode/text/42/{section}",
            "#{subsection}"
        ],
        "regexes": [
            "(C\\.? ?A\\.? ?A\\.?|Clean Air Act)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "lookup": {
                    "101": "7401",
                    "102": "7402",
                    "103": "7403",
                    "104": "7404",
                    "105": "7405",
                    "106": "7406",
                    "107": "7407",
                    "108": "7408",
                    "109": "7409",
                    "110": "7410",
                    "111": "7411",
                    "112": "7412",
                    "113": "7413",
                    "114": "7414",
                    "115": "7415",
                    "116": "7416",
                    "117": "7417",
                    "118": "7418",
                    "119": "7419",
                    "120": "7420",
                    "121": "7421",
                    "122": "7422",
                    "123": "7423",
                    "124": "7424",
                    "125": "7425",
                    "126": "7426",
                    "127": "7427",
                    "128": "7428",
                    "129": "7429",
                    "130": "7430",
                    "131": "7431",
                    "160": "7470",
                    "161": "7471",
                    "162": "7472",
                    "163": "7473",
                    "164": "7474",
                    "165": "7475",
                    "166": "7476",
                    "167": "7477",
                    "168": "7478",
                    "169": "7479",
                    "169a": "7491",
                    "169A": "7491",
                    "169b": "7492",
                    "169B": "7492",
                    "171": "7501",
                    "172": "7502",
                    "173": "7503",
                    "174": "7504",
                    "175": "7505",
                    "175a": "7505a",
                    "176": "7506",
                    "176a": "7506a",
                    "177": "7507",
                    "178": "7508",
                    "179": "7509",
                    "179b": "7509a",
                    "181": "7511",
                    "182": "7511a",
                    "183": "7511b",
                    "184": "7511c",
                    "185": "7511d",
                    "185a": "7511e",
                    "185b": "7511f",
                    "186": "7512",
                    "187": "7512a",
                    "188": "7513",
                    "189": "7513a",
                    "190": "7513b",
                    "191": "7514",
                    "192": "7514a",
                    "193": "7515",
                    "202": "7521",
                    "203": "7522",
                    "204": "7523",
                    "205": "7524",
                    "206": "7525",
                    "207": "7541",
                    "208": "7542",
                    "209": "7543",
                    "210": "7544",
                    "211": "7545",
                    "213": "7547",
                    "214": "7548",
                    "215": "7549",
                    "216": "7550",
                    "217": "7552",
                    "218": "7553",
                    "219": "7554",
                    "231": "7571",
                    "232": "7572",
                    "233": "7573",
                    "234": "7574",
                    "241": "7581",
                    "242": "7582",
                    "243": "7583",
                    "244": "7584",
                    "245": "7585",
                    "246": "7586",
                    "247": "7587",
                    "248": "7588",
                    "249": "7589",
                    "250": "7590",
                    "301": "7601",
                    "302": "7602",
                    "303": "7603",
                    "304": "7604",
                    "305": "7605",
                    "306": "7606",
                    "307": "7607",
                    "308": "7608",
                    "309": "7609",
                    "310": "7610",
                    "311": "7611",
                    "312": "7612",
                    "313": "7613",
                    "314": "7614",
                    "315": "7615",
                    "316": "7616",
                    "317": "7617",
                    "318": "7618",
                    "319": "7619",
                    "320": "7620",
                    "321": "7621",
                    "322": "7622",
                    "323": "7624",
                    "324": "7625",
                    "325": "7625-1",
                    "326": "7625a",
                    "327": "7626",
                    "328": "7627",
                    "201": "7641",
                    "401": "7651",
                    "402": "7651a",
                    "403": "7651b",
                    "404": "7651c",
                    "405": "7651d",
                    "406": "7651e",
                    "407": "7651f",
                    "408": "7651g",
                    "409": "7651h",
                    "410": "7651i",
                    "411": "7651j",
                    "412": "7651k",
                    "413": "7651l",
                    "414": "7651m",
                    "415": "7651n",
                    "416": "7651o",
                    "501": "7661",
                    "502": "7661a",
                    "503": "7661b",
                    "504": "7661c",
                    "505": "7661d",
                    "506": "7661e",
                    "507": "7661f",
                    "601": "7671",
                    "602": "7671a",
                    "603": "7671b",
                    "604": "7671c",
                    "605": "7671d",
                    "606": "7671e",
                    "607": "7671f",
                    "608": "7671g",
                    "609": "7671h",
                    "610": "7671i",
                    "611": "7671j",
                    "612": "7671k",
                    "613": "7671l",
                    "614": "7671m",
                    "615": "7671n",
                    "616": "7671o",
                    "617": "7671p",
                    "618": "7671q"
                }
            },
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Clean Water Act",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/uscode/text/33/{section}",
            "#{subsection}"
        ],
        "regexes": [
            "(Clean Water Act|C\\.? ?W\\.? ?A\\.?)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "lookup": {
                    "101": "1251",
                    "112": "1262",
                    "115": "1265",
                    "301": "1311",
                    "302": "1312",
                    "303": "1313",
                    "304": "1314",
                    "305": "1315",
                    "306": "1316",
                    "307": "1317",
                    "308": "1318",
                    "309": "1319",
                    "310": "1320",
                    "316": "1326",
                    "319": "1329",
                    "401": "1341",
                    "402": "1342",
                    "403": "1343",
                    "404": "1344",
                    "405": "1345",
                    "406": "1346",
                    "501": "1361",
                    "502": "1362",
                    "505": "1365",
                    "509": "1369",
                    "510": "1370",
                    "511": "1371",
                    "517": "1376",
                    "518": "1377"
                }
            },
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Fair Housing Act",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/uscode/text/42/{section}",
            "#{subsection}"
        ],
        "regexes": [
            "(Fair Housing Act|F\\.? ?H\\.? ?A\\.?)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "lookup": {
                    "801": "3601",
                    "802": "3602",
                    "803": "3603",
                    "804": "3604",
                    "805": "3605",
                    "806": "3606",
                    "807": "3607",
                    "808": "3608",
                    "808a": "3608a",
                    "809": "3609",
                    "810": "3610",
                    "811": "3611",
                    "812": "3612",
                    "813": "3613",
                    "814": "3614",
                    "814a": "3614-1",
                    "815": "3614a",
                    "816": "3615",
                    "817": "3616",
                    "817a": "3616a",
                    "818": "3617",
                    "819": "3618",
                    "820": "3619",
                    "901": "3631"
                }
            },
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Americans With Disabilities Act",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/uscode/text/42/{section}",
            "#{subsection}"
        ],
        "regexes": [
            "(Americans [Ww]ith Disabilities Act|A\\. D\\. A\\.|A\\.?D\\.?A\\.?)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "lookup": {
                    "2": "12101",
                    "3": "12102",
                    "101": "12111",
                    "102": "12112",
                    "103": "12113",
                    "104": "12114",
                    "105": "12115",
                    "106": "12116",
                    "107": "12117",
                    "201": "12131",
                    "202": "12132",
                    "203": "12133",
                    "204": "12134",
                    "221": "12141",
                    "222": "12142",
                    "223": "12143",
                    "224": "12144",
                    "225": "12145",
                    "226": "12146",
                    "227": "12147",
                    "228": "12148",
                    "229": "12149",
                    "230": "12150",
                    "241": "12161",
                    "242": "12162",
                    "243": "12163",
                    "244": "12164",
                    "245": "12165",
                    "301": "12181",
                    "302": "12182",
                    "303": "12183",
                    "304": "12184",
                    "305": "12185",
                    "306": "12186",
                    "307": "12187",
                    "308": "12188",
                    "309": "12189",
                    "501": "12201",
                    "502": "12202",
                    "503": "12203",
                    "504": "12204",
                    "505": "12205",
                    "506": "12206",
                    "507": "12207",
                    "508": "12208",
                    "509": "12209",
                    "510": "12210",
                    "511": "12211",
                    "513": "12212",
                    "514": "12213"
                }
            },
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Uniform Commercial Code",
        "defaults": {},
        "URL": [
            "https://www.law.cornell.edu/ucc/{article}/{article}-{section}",
            "#{article}-{section}{subsection}"
        ],
        "regexes": [
            "(Uniform Commercial Code|U\\.? ?C\\.? ?C\\.?)( ?§)? (?<article>\\d[a-z]?)[-‑–](?<section>\\d+)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "subsection",
                "sub": [
                    "\\W+",
                    "_"
                ]
            },
            {
                "token": "subsection",
                "sub": [
                    "^_|_$",
                    ""
                ]
            }
        ]
    },
    {
        "name": "Code of Alabama, 1975",
        "defaults": {},
        "URL": [
            "http://alisondb.legislature.state.al.us/alison/CodeOfAlabama/1975/{title}-{chapter}-{section}.htm"
        ],
        "regexes": [
            "(Ala(bama|\\.)|AL)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "title",
                "case": "upper"
            },
            {
                "token": "chapter",
                "case": "upper"
            }
        ]
    },
    {
        "name": "Alabama Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Alabama_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Ala(bama|\\.)|AL) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Alaska Statutes",
        "defaults": {},
        "URL": [
            "http://www.akleg.gov/basis/statutes.asp#{title}.{chapter}.{section}"
        ],
        "regexes": [
            "(Alaska|AK)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Za-z]?)\\.(?<chapter>\\d+[A-Za-z]?)\\.(?<section>\\d+[A-Za-z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Alaska Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Alaska_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Alaska|AK) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "American Samoa Code",
        "defaults": {},
        "URL": [
            "https://new.asbar.org/code-annotated/{title}-{section}"
        ],
        "regexes": [
            "Am(erican|\\.) ?Samoa( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+)\\.(?<section>\\d+)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "American Samoa Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_American_Samoa_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "Am(erican|\\.) ?Samoa ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Arkansas Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Arkansas_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Ark(ansas|\\.)|AR) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "digit"
            },
            {
                "token": "section",
                "numberFormat": "digit"
            }
        ]
    },
    {
        "name": "Arizona Revised Statutes",
        "defaults": {},
        "URL": [
            "https://www.azleg.gov/viewdocument/?docName=https://www.azleg.gov/ars/{title}/{section}.htm"
        ],
        "regexes": [
            "(Ariz(ona|\\.)|AZ)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "sub": [
                    "\\.",
                    "-"
                ]
            },
            {
                "token": "section",
                "lpad": 5
            }
        ]
    },
    {
        "name": "Arizona Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Arizona_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Ariz(ona|\\.)|AZ) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "digit"
            },
            {
                "token": "section",
                "numberFormat": "digit"
            }
        ]
    },
    {
        "name": "California Codes",
        "defaults": {},
        "URL": [
            "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode={codeAcronym}&sectionNum={section}"
        ],
        "regexes": [
            "(Cal(ifornia|\\.)|CAL?) ?(?<code>[BCDEFGHILMPRSUVW].{2,40}?)( ?C(ode|\\.)( Ann(otated|\\.))?,?)?((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "code",
                "output": "codeAcronym",
                "lookup": {
                    "Bus(iness|\\.) (and|&) Prof(essions|s?\\.)|B\\.? ?& ?P\\.?|BPC": "BPC",
                    "Civ(il|\\.)|CIV": "CIV",
                    "(Code( of)? )?(Civil Procedure|Civ\\. ?P(roc?)?\\.)|CCP": "CCP",
                    "Commercial|Comm?\\.|COM": "COM",
                    "Corp(orations?|\\.)|CORP": "CORP",
                    "Educ(ation|\\.)|EDU?C": "EDC",
                    "Elec(tions|\\.)|ELEC": "ELEC",
                    "Evid(ence|\\.)|EVID": "EVID",
                    "Fam(ily|\\.)|FAM": "FAM",
                    "Fin(ancial|\\.)|FIN": "FIN",
                    "Fish (and|&) Game|FGC|F&G": "FGC",
                    "Food (and|&) Agric(ultural|\\.)|FAC": "FAC",
                    "Gov(ernment|'?t?\\.?)|GOV": "GOV",
                    "Harb(ors|\\.) (and|&) Nav(igation|\\.)|HNC|H&N": "HNC",
                    "Health (and|&) Safety|HSC|H&S": "HSC",
                    "Ins(urance|\\.)|INS": "INS",
                    "Lab(or|\\.)|LAB": "LAB",
                    "Mil(itary|\\.) (and|&) Vet(erans|\\.)|MVC|M&V": "MVC",
                    "Penal|PEN": "PEN",
                    "Prob(ate|\\.)|PROB": "PROB",
                    "Pub(lic|\\.) Cont(ract|\\.)|PCC": "PCC",
                    "Pub(lic|\\.) ?Res(ources|\\.)|PRC": "PRC",
                    "Pub(lic|\\.) Util(ities|s?\\.)|PUC": "PUC",
                    "Rev(enue|\\.) (and|&) Tax(ation|\\.)|RTC|R&T": "RTC",
                    "St(reets|s\\.) (and|&) High(ways|\\.)|SHC|S&H": "SHC",
                    "Unemp(loyment|\\.) Ins(urance|(ur)?\\.)|UIC": "UIC",
                    "Veh(icle|(ic)?\\.)|VEH": "VEH",
                    "Water|WAT": "WAT",
                    "Welf(are|\\.) (and|&) Inst(itutions|s?\\.)|WIC": "WIC"
                }
            }
        ]
    },
    {
        "name": "California Constitution",
        "defaults": {
            "displayType": "Text"
        },
        "URL": [
            "https://leginfo.legislature.ca.gov/faces/codes_display{displayType}.xhtml?lawCode=CONS",
            "&article={article}",
            "&sectionNum=SEC. {section}."
        ],
        "regexes": [
            "(Cal(ifornia|\\.)|CAL?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            },
            {
                "token": "section",
                "output": "displayType",
                "optionalLookup": {
                    ".+": "Section"
                }
            }
        ]
    },
    {
        "name": "Colorado Revised Statutes",
        "defaults": {
            "year": "2020"
        },
        "URL": [
            "https://leg.colorado.gov/sites/default/files/images/olls/crs{year}-title-{lpad_title}.pdf#search={title}-{article}-{section}."
        ],
        "regexes": [
            "(Colo(rado|\\.)|CO)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?)[-‑–](?<article>\\d+(\\.\\d+)?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?(,? \\((?<year>\\d{4})\\))?"
        ],
        "operations": [
            {
                "token": "title",
                "output": "lpad_title",
                "lpad": 2
            },
            {
                "token": "year",
                "optionalLookup": {
                    "1[89]\\d{2}|200\\d|201[0-2]": "2020"
                }
            }
        ]
    },
    {
        "name": "Colorado Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Colorado_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Colo(rado|\\.)|CO) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "General Statutes of Connecticut",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/connecticut/ct-laws/connecticut_statutes_{section}"
        ],
        "regexes": [
            "(Conn(ecticut|\\.)|CT)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<section>(\\d[a-z\\-]*[\\w]+))(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Connecticut Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Connecticut_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Conn(ecticut|\\.)|CT) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Delaware Code",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/delaware/de-code/delaware_code_title_{title}_{section}"
        ],
        "regexes": [
            "([Tt]it(le|\\.) )?(?<title>\\d{1,2}),? (Del(aware|\\.)|DE) ?C(ode|\\.)((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "case": "lower"
            }
        ]
    },
    {
        "name": "Delaware General Corporations Law",
        "defaults": {},
        "URL": [
            "https://delcode.delaware.gov/title8/c001/sc{subchapter}/index.shtml#{section}."
        ],
        "regexes": [
            "(D\\.? ?G\\.? ?C\\.? ?L\\.?|Del(aware|\\.) ?Gen(eral|\\.) ?Corp(orations?|s?\\.) ?L(aw|\\.))((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "output": "subchapter",
                "lookup": {
                    "1[01]\\d": "01",
                    "12\\d": "02",
                    "13\\d": "03",
                    "14\\d": "04",
                    "1[5-7]\\d": "05",
                    "20\\d": "06",
                    "2[1-3]\\d": "07",
                    "24\\d": "08",
                    "2[56]\\d": "09",
                    "2[78]\\d": "10",
                    "29\\d|30\\d": "11",
                    "31\\d": "12",
                    "3[23]\\d": "13",
                    "3[45]\\d": "14",
                    "36\\d": "15",
                    "37\\d|38[0-5]": "16",
                    "38[89]|390": "17",
                    "39[1-9]": "18"
                }
            }
        ]
    },
    {
        "name": "Delaware Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Delaware_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Del(aware|\\.)|DE) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "District of Columbia Official Code",
        "defaults": {},
        "URL": [
            "https://code.dccouncil.us/dc/council/code/sections/{title}-{section}.html",
            "#{subsection}"
        ],
        "regexes": [
            "(District of Columbia( Official)?|D\\.? ?C\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Florida Statutes",
        "defaults": {
            "year": "2020"
        },
        "URL": [
            "https://www.flsenate.gov/Laws/Statutes/{year}/{chapter}.{section}"
        ],
        "regexes": [
            "(Fl(orida|a?\\.)|FL)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?(,? \\((?<year>\\d{4})\\))?"
        ],
        "operations": [
            {
                "token": "chapter",
                "lpad": 4
            }
        ]
    },
    {
        "name": "Florida Constitution",
        "defaults": {},
        "URL": [
            "https://www.flsenate.gov/Laws/Constitution#A{article}",
            "S{section}"
        ],
        "regexes": [
            "(Fl(orida|a?\\.)|FL) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "section",
                "lpad": 2
            },
            {
                "token": "article",
                "numberFormat": "digit"
            }
        ]
    },
    {
        "name": "Georgia Constitution",
        "defaults": {
            "paragraph": "1"
        },
        "URL": [
            "https://ballotpedia.org/Article_{article},_Georgia_Constitution"
        ],
        "regexes": [
            "G(eorgia|a\\.|A) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Pp]ar(agraph|a?\\.) ?(?<paragraph>[\\dIVXivx]{1,8})))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Hawaii Revised Statutes",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/hawaii/hi-statutes/hawaii_statutes_{chapter}-{section}"
        ],
        "regexes": [
            "(Haw(ai.?i|\\.)|HI)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Hawaii Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Hawaii_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Haw(ai.?i|\\.)|HI) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Idaho Code",
        "defaults": {},
        "URL": [
            "https://legislature.idaho.gov/statutesrules/idstat/Title{title}/T{title}CH{chapter}/SECT{title}-{section}/"
        ],
        "regexes": [
            "I(daho|D)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Z]?)[-‑–](?<section>(?<chapter>\\d{1,2})\\d{2}[A-Z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Idaho Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{roman_article},_Idaho_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "I(daho|D) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Illinois Compiled Statutes",
        "defaults": {},
        "URL": [
            "https://www.ilga.gov/legislation/ilcs/fulltext.asp?DocName={chapter}{act}0K{section}"
        ],
        "regexes": [
            "(?<chapter>\\d+) ILCS (?<act>\\d+)/(?<section>(\\d[\\d.-]*\\w|\\d))"
        ],
        "operations": [
            {
                "token": "chapter",
                "lpad": 4
            },
            {
                "token": "act",
                "lpad": 4
            }
        ]
    },
    {
        "name": "Illinois Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Illinois_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Il(linois|l?\\.)|IL) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Indiana Code",
        "defaults": {
            "year": "2020"
        },
        "URL": [
            "https://iga.in.gov/legislative/laws/{year}/ic/titles/{title}#{title}-{article}-{chapter}-{section}"
        ],
        "regexes": [
            "(Ind(iana|\\.)|IN)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+)-(?<article>\\d+(\\.\\d+)?)-(?<chapter>\\d+(\\.\\d+)?)-(?<section>\\d+(\\.\\d+)?)(,? \\((?<year>\\d{4})\\))?"
        ],
        "operations": [
            {
                "token": "title",
                "lpad": 2
            }
        ]
    },
    {
        "name": "Indiana Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Indiana_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Ind(iana|\\.)|IN) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "digit"
            },
            {
                "token": "section",
                "numberFormat": "digit"
            }
        ]
    },
    {
        "name": "Iowa Code",
        "defaults": {},
        "URL": [
            "https://www.legis.iowa.gov/docs/code/{chapter}.{section}.pdf"
        ],
        "regexes": [
            "I(owa|A)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Iowa Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Iowa_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "I(owa|A) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Kansas Statutes",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/kansas/ks-statutes/kansas_statutes_{chapter}-{section}"
        ],
        "regexes": [
            "(Kan(sas|\\.)|KS)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Kansas Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/",
            "Article_{article}",
            "{part}",
            ",_Kansas_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Kan(sas|\\.)|KS) ?Const(itution|\\.) ?([Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})|(?<part>Bill of Rights|Preamble))(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            },
            {
                "token": "section",
                "numberFormat": "roman"
            },
            {
                "token": "part",
                "sub": [
                    " ",
                    "_"
                ]
            }
        ]
    },
    {
        "name": "Kentucky Revised Statutes",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/kentucky/ky-statutes/kentucky_statutes_{chapter}-{section}"
        ],
        "regexes": [
            "(K(entucky|y\\.|Y)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|KRS )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>(\\d[\\d.]*\\w|\\d))\\.(?<section>\\d+)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "chapter",
                "case": "lower",
                "sub": [
                    "\\.",
                    "-"
                ]
            }
        ]
    },
    {
        "name": "Kentucky Constitution",
        "defaults": {},
        "URL": [
            "https://apps.legislature.ky.gov/Law/Constitution/Constitution/ViewConstitution?rsn={section}"
        ],
        "regexes": [
            "K(entucky|y\\.|Y) ?Const(itution|\\.),?( ?(Art(icle|\\.) ?)?([IVXivx]{1,7}|\\d{1,2}|Bill of Rights|Rights of Victims of Crime|Dist(ribution|\\.) of the Powers of Gov(ernment|('t)?\\.?)|(The )?(Leg(islative|(is)?\\.)|Exec(utive|\\.)|Jud(icial|\\.)) ?Dep(artment|('t)?\\.?)|Counties (and|&) County Seats|Impeachments|(C(ounty|ty\\.)|Fisc(al|\\.)) ?C(ourts|ts\\.)|Justices of the Peace|Suff(rage|\\.) ?(and|&) ?Elec(tions|\\.)|Mun(icipalities|i?\\.)|Rev(enue|\\.) ?(and|&) ?Tax(ation|\\.?)|Educ(ation|\\.)|Corp(orations?|s?\\.)|R(ailroads|\\.R\\.) (and|&) Com(merce|m?\\.)|(The )?Militia|Gen(eral|\\.) ?Prov(isions|s?\\.)|Mode of Rev(ision|\\.)),?)?((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)"
        ],
        "operations": [
            {
                "token": "section",
                "lookup": {
                    "1": "3",
                    "2": "4",
                    "3": "5",
                    "4": "6",
                    "5": "7",
                    "6": "8",
                    "7": "9",
                    "8": "10",
                    "9": "11",
                    "10": "12",
                    "11": "13",
                    "12": "14",
                    "13": "15",
                    "14": "16",
                    "15": "17",
                    "16": "18",
                    "17": "19",
                    "18": "20",
                    "19": "21",
                    "20": "22",
                    "21": "23",
                    "22": "24",
                    "23": "25",
                    "24": "26",
                    "25": "27",
                    "26": "28",
                    "26A": "305",
                    "27": "30",
                    "28": "31",
                    "29": "33",
                    "30": "34",
                    "31": "35",
                    "32": "36",
                    "33": "37",
                    "34": "38",
                    "35": "39",
                    "36": "40",
                    "37": "41",
                    "38": "42",
                    "39": "43",
                    "40": "44",
                    "41": "45",
                    "42": "46",
                    "43": "47",
                    "44": "48",
                    "45": "49",
                    "46": "50",
                    "47": "51",
                    "48": "52",
                    "49": "53",
                    "50": "54",
                    "51": "55",
                    "52": "56",
                    "53": "57",
                    "54": "58",
                    "55": "59",
                    "56": "60",
                    "57": "61",
                    "58": "62",
                    "59": "63",
                    "60": "64",
                    "61": "65",
                    "62": "66",
                    "63": "68",
                    "64": "69",
                    "65": "70",
                    "66": "72",
                    "67": "73",
                    "68": "74",
                    "69": "77",
                    "70": "78",
                    "71": "79",
                    "72": "80",
                    "73": "81",
                    "74": "82",
                    "75": "83",
                    "76": "84",
                    "77": "85",
                    "78": "86",
                    "79": "87",
                    "80": "88",
                    "81": "89",
                    "82": "90",
                    "83": "91",
                    "84": "92",
                    "85": "93",
                    "86": "94",
                    "87": "95",
                    "88": "96",
                    "89": "97",
                    "90": "98",
                    "91": "99",
                    "92": "100",
                    "93": "101",
                    "94": "102",
                    "95": "103",
                    "96": "104",
                    "97": "106",
                    "98": "107",
                    "99": "108",
                    "100": "109",
                    "101": "110",
                    "102": "111",
                    "103": "112",
                    "104": "113",
                    "105": "114",
                    "106": "115",
                    "107": "116",
                    "108": "117",
                    "109": "119",
                    "110": "121",
                    "111": "123",
                    "112": "125",
                    "113": "127",
                    "114": "129",
                    "115": "131",
                    "116": "132",
                    "117": "134",
                    "118": "135",
                    "119": "136",
                    "120": "137",
                    "121": "138",
                    "122": "139",
                    "123": "140",
                    "124": "141",
                    "125": "142",
                    "126": "143",
                    "127": "144",
                    "128": "145",
                    "129": "146",
                    "130": "147",
                    "131": "148",
                    "132": "149",
                    "133": "150",
                    "134": "151",
                    "135": "152",
                    "136": "153",
                    "137": "154",
                    "138": "155",
                    "139": "156",
                    "140": "158",
                    "141": "159",
                    "142": "161",
                    "143": "162",
                    "144": "164",
                    "145": "166",
                    "146": "167",
                    "147": "168",
                    "148": "169",
                    "149": "170",
                    "150": "171",
                    "151": "172",
                    "152": "173",
                    "153": "174",
                    "154": "175",
                    "155": "176",
                    "156": "180",
                    "156A": "177",
                    "156B": "178",
                    "157": "183",
                    "157A": "181",
                    "157B": "182",
                    "158": "184",
                    "159": "185",
                    "160": "186",
                    "161": "187",
                    "162": "188",
                    "163": "189",
                    "164": "190",
                    "165": "191",
                    "166": "192",
                    "167": "193",
                    "168": "194",
                    "169": "196",
                    "170": "197",
                    "171": "198",
                    "172": "201",
                    "172A": "199",
                    "172B": "200",
                    "173": "202",
                    "174": "203",
                    "175": "204",
                    "176": "205",
                    "177": "206",
                    "178": "207",
                    "179": "208",
                    "180": "209",
                    "181": "210",
                    "182": "211",
                    "183": "213",
                    "184": "214",
                    "185": "215",
                    "186": "216",
                    "187": "217",
                    "188": "218",
                    "189": "219",
                    "190": "221",
                    "191": "222",
                    "192": "223",
                    "193": "224",
                    "194": "225",
                    "195": "226",
                    "196": "227",
                    "197": "228",
                    "198": "229",
                    "199": "230",
                    "200": "231",
                    "201": "232",
                    "202": "233",
                    "203": "234",
                    "204": "235",
                    "205": "236",
                    "206": "237",
                    "207": "238",
                    "208": "239",
                    "210": "242",
                    "211": "243",
                    "212": "244",
                    "213": "245",
                    "214": "246",
                    "215": "247",
                    "216": "248",
                    "217": "249",
                    "218": "250",
                    "219": "252",
                    "220": "253",
                    "221": "254",
                    "222": "255",
                    "223": "256",
                    "224": "258",
                    "225": "259",
                    "226": "261",
                    "226A": "260",
                    "227": "262",
                    "228": "263",
                    "229": "264",
                    "230": "265",
                    "231": "266",
                    "232": "267",
                    "233": "269",
                    "233A": "268",
                    "234": "270",
                    "235": "271",
                    "236": "272",
                    "237": "273",
                    "238": "274",
                    "239": "275",
                    "240": "276",
                    "241": "277",
                    "242": "278",
                    "243": "279",
                    "244": "281",
                    "244A": "280",
                    "245": "282",
                    "246": "283",
                    "247": "284",
                    "248": "285",
                    "249": "286",
                    "250": "287",
                    "251": "288",
                    "252": "300",
                    "253": "290",
                    "254": "291",
                    "255": "292",
                    "255A": "302",
                    "256": "294",
                    "257": "295",
                    "258": "296",
                    "259": "297",
                    "260": "298",
                    "261": "299",
                    "263": "301"
                }
            }
        ]
    },
    {
        "name": "Louisiana Statutes",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/louisiana/la-laws/louisiana_revised_statutes_{title}-{section}"
        ],
        "regexes": [
            "L(ouisiana|a\\.|A)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Z]?):(?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Louisiana Codes",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/louisiana/la-codes/louisiana_{code}_{article}"
        ],
        "regexes": [
            "L(ouisiana|a\\.|A) ?(?<code>Civ(il|\\.) ?Code|Code( of)? ((Civ(il|\\.)|Crim(inal|\\.)) ?Proc(edure|\\.)|Evid(ence|\\.))|Child(ren'?s|\\.) ?Code)( Ann(otated|\\.))?,?( [Aa]rt(icle|\\.))? (?<article>\\d+)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "code",
                "lookup": {
                    "Civ(il|\\.) ?Code": "civil_code",
                    "Code( of)? Civ(il|\\.) ?Proc(edure|\\.)": "code_of_civil_procedure",
                    "Code( of)? Crim(inal|\\.) ?Proc(edure|\\.)": "code_of_criminal_procedure",
                    "Code( of)? Evid(ence|\\.)": "code_of_evidence",
                    "Child(ren'?s|\\.) ?Code": "childrens_code"
                }
            }
        ]
    },
    {
        "name": "Louisiana Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Louisiana_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "L(ouisiana|a\\.|A) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Maine Statutes",
        "defaults": {},
        "URL": [
            "https://legislature.maine.gov/legis/statutes/{title}/title{title}sec{section}.html"
        ],
        "regexes": [
            "M(aine|e\\.|E)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?,? [Tt]it(le|\\.) ?(?<title>\\d+([-‑–][A-Z])?),?((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "title",
                "sub": [
                    "—",
                    "-"
                ]
            },
            {
                "token": "section",
                "sub": [
                    "—",
                    "-"
                ]
            }
        ]
    },
    {
        "name": "Maine Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article}",
            "--Part_{part}",
            ",_Maine_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "M(aine|e\\.|E) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? [Pp](art|t\\.) ?(?<part>\\d))?(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            },
            {
                "token": "part",
                "lookup": {
                    "1": "First",
                    "2": "Second"
                }
            }
        ]
    },
    {
        "name": "Maryland Code",
        "defaults": {},
        "URL": [
            "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article={articleCode}&section={title}-{section}"
        ],
        "regexes": [
            "M(aryland|d\\.|D) (Code( Ann(otated|\\.))?,? )?(?<article>(Ac|Al|[BCEFHILNPRST]).{4,38}?) (Code( Ann(otated|\\.))?,? )?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Z]?)[-‑–](?<section>[\\dA-Z\\-–.]*[\\dA-Z])(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "sub": [
                    "–",
                    "-"
                ]
            },
            {
                "token": "article",
                "output": "articleCode",
                "lookup": {
                    "Acric(ulture|\\.)": "gag",
                    "Alco(holic|\\.) ?Bev(erages|s?\\.)": "gab",
                    "Bus(iness|\\.) ?Occ(upations|\\.) ?(and|&) ?Prof(essions|s?\\.)": "gbo",
                    "Bus(iness|\\.) ?Reg(ulation|\\.)": "gbr",
                    "Com(mercial|\\.) ?Law": "gcl",
                    "Corp(orations|s\\.) ?(and|&) Ass(ociations|'ns)": "gca",
                    "Corr(ectional|\\.) ?Serv(ices|s\\.)": "gcs",
                    "C(ourts|ts\\.) ?(and|&) ?Jud(icial|\\.) ?Proc(eedings|\\.)": "gcj",
                    "Crim(inal|\\.) ?Law": "gcr",
                    "Crim(inal|\\.) ?Proc(edure|\\.)": "gcp",
                    "Econ(omic|\\.) ?Dev(elopment|\\.)": "gec",
                    "Educ(ation|\\.)": "ged",
                    "Elec(tion|\\.) ?Law": "gel",
                    "Envir(onment|\\.)": "gen",
                    "Est(ates|\\.) ?(and|&) ?Trusts": "get",
                    "Fam(ily|\\.) ?Law": "gfl",
                    "Fin(ancial|\\.) Inst(itutions|\\.)": "gfi",
                    "Health ?[-–] ?Gen(eral|\\.)": "ggp",
                    "Health Occ(upations|\\.)": "gho",
                    "Hous(ing|\\.) ?(and|&) ?C(ommunity|mty\\.) ?Dev(elopment|'t|\\.)": "ghs",
                    "Hum(an|\\.) ?Serv(ices|s\\.)": "ghu",
                    "Ins(urance|\\.)": "gin",
                    "Lab(or|\\.) ?(and|&) ?Empl(oyment|\\.)": "gle",
                    "Land Use": "glu",
                    "Local Gov(ernment|'t)": "glg",
                    "Nat(ural|\\.) ?Res(ources|\\.)": "gnr",
                    "Pub(lic|\\.) ?Saf(ety|\\.)": "gps",
                    "Pub(lic|\\.) ?Util(ity|\\.)": "gpu",
                    "Real Prop(erty|\\.)": "grp",
                    "State Fin(ance|\\.) (and|&) Proc(urement|\\.)": "gsf",
                    "State Gov(ernment|'t)": "gsg",
                    "State Pers(onnel|\\.) (and|&) Pens(ions|\\.)": "gsp",
                    "Tax ?[-–] ?Gen(eral|\\.)": "gtg",
                    "Tax ?[-–] ?Prop(erty|\\.)": "gtp",
                    "Transp(ortation|\\.)": "gtr"
                }
            }
        ]
    },
    {
        "name": "Maryland Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Maryland_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "M(aryland|d\\.|D) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Massachusetts General Laws",
        "defaults": {},
        "URL": [
            "https://malegislature.gov/GeneralLaws/GoTo?ChapterGoTo={chapter}&SectionGoTo={section}"
        ],
        "regexes": [
            "((Mass(achusetts|\\.)|MA) ?(Gen(eral|\\.)|Ann(otated|\\.)) ?Laws( Ann(otated|\\.))?|M\\.?G\\.?L\\.?(A\\.?)?|A\\.?L\\.?M\\.?),? [Cc](hapter|h?\\.) ?(?<chapter>\\d+[A-Z]?),? ((&sect;|&#167|§){1,2}|Sect?(ions?|s?\\.))? ?(?<section>\\d+[A-Z]?\\d*([/]\\d+[A-Z]?)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "section",
                "sub": [
                    "/",
                    "~"
                ]
            }
        ]
    },
    {
        "name": "Massachusetts Constitution",
        "defaults": {
            "chapter": "I",
            "section": "I"
        },
        "URL": [
            "https://malegislature.gov/Laws/Constitution",
            "{isFirst}#article{article}",
            "{isSecond}#chapter{chapter}Section{section}",
            "{isSecond}Article{article}"
        ],
        "regexes": [
            "(Mass(achusetts|\\.)|MA) Const(itution|\\.),? [Pp](art|t\\.) ?(?<part>II?|1|2|[Tt]he ([Ff]irst|[Ss]econd))(,? [Cc](hapter|h?\\.) ?(?<chapter>\\d+|[IVXivx]{1,7})(,? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>\\d+|[IVXivx]{1,7}))?)?(,? [Aa]rt(icle|\\.) ?(?<article>\\d+|[IVXivx]{1,7}))?"
        ],
        "operations": [
            {
                "token": "part",
                "output": "isFirst",
                "optionalLookup": {
                    "1|I|.*irst": ""
                }
            },
            {
                "token": "part",
                "output": "isSecond",
                "optionalLookup": {
                    "2|II|.*econd": ""
                }
            },
            {
                "token": "chapter",
                "numberFormat": "roman"
            },
            {
                "token": "section",
                "numberFormat": "roman"
            },
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Michigan Compiled Laws",
        "defaults": {},
        "URL": [
            "https://legislature.mi.gov/doc.aspx?mcl-{chapter}-{section}"
        ],
        "regexes": [
            "(Mich(igan|\\.)|MI) Comp(iled|\\.) Laws( (Serv(ice|\\.)|Ann(otated|\\.)))? ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Michigan Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Michigan_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Mich(igan|\\.)|MI) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Minnesota Statutes",
        "defaults": {},
        "URL": [
            "https://www.revisor.mn.gov/statutes/cite/{chapter}.{section}",
            "#stat.{chapter}.{section}.{subdivision}"
        ],
        "regexes": [
            "(Minn(esota|\\.)|MN)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>\\((?<subdivision>\\d\\w*)\\)(\\(\\w+\\))*|(\\(\\w+\\))+)?"
        ]
    },
    {
        "name": "Minnesota Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Minnesota_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Minn(esota|\\.)|MN) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Mississippi Code",
        "defaults": {
            "year": "2019"
        },
        "URL": [
            "https://law.justia.com/codes/mississippi/{year}/title-{title}/chapter-{chapter}/section-{title}-{chapter}-{section}/index.html"
        ],
        "regexes": [
            "(Miss(issippi|\\.)|MS)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?(,? \\((?<year>\\d{4})\\))?"
        ]
    },
    {
        "name": "Mississippi Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Mississippi_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Miss(issippi|\\.)|MS) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Missouri Revised Statutes",
        "defaults": {},
        "URL": [
            "https://revisor.mo.gov/main/OneSection.aspx?section={chapter}.{section}"
        ],
        "regexes": [
            "((M(issouri|o\\.|O)( Ann(otated|\\.))? ?Rev(ised|\\.) ?Stat(utes|s?\\.)( Ann(otated|\\.))?|R\\.?S\\.?M[Oo]\\.?)) ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Missouri Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Missouri_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "M(issouri|o\\.|O) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Montana Code",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/montana/mt-code/montana_code_{title}-{chapter}-{section}"
        ],
        "regexes": [
            "(Mont(ana|\\.)|MT)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Montana Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Montana_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Mont(ana|\\.)|MT) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Revised Statutes of Nebraska",
        "defaults": {},
        "URL": [
            "https://www.nebraskalegislature.gov/laws/statutes.php?statute={chapter}-{section}"
        ],
        "regexes": [
            "(Neb(raska|\\.)|NE)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Nebraska Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Nebraska_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Neb(raska|\\.)|NE) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "New Hampshire Revised Statutes",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/new-hampshire/nh-statutes/new_hampshire_revised_statutes_{chapter}_{section}"
        ],
        "regexes": [
            "(New Hampshire|N\\.? ?H\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+([-–][A-Za-z])?):(?<section>\\d+([-‑–][A-Za-z])?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "chapter",
                "sub": [
                    "[–‑]",
                    "-"
                ]
            },
            {
                "token": "chapter",
                "case": "lower"
            },
            {
                "token": "section",
                "sub": [
                    "–‑",
                    "-"
                ]
            },
            {
                "token": "section",
                "case": "lower"
            }
        ]
    },
    {
        "name": "New Hampshire Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/",
            "{isPart1}Part_First",
            "{isPart2}{part2Section}",
            ",_New_Hampshire_Constitution",
            "#Article_{article}"
        ],
        "regexes": [
            "(New Hampshire|N\\.? ?H\\.?) ?Const(itution|\\.),? ?[Pp](art|t\\.) ?(?<part>II?|1|2|([Tt]he )([Ff]irst|[Ss]econd)),? [Aa]rt(icle|\\.) ?(?<article>\\d+(-\\w)?)"
        ],
        "operations": [
            {
                "token": "part",
                "output": "isPart1",
                "optionalLookup": {
                    "I|1|The First": ""
                }
            },
            {
                "token": "part",
                "output": "isPart2",
                "optionalLookup": {
                    "II|2|The Second": ""
                }
            },
            {
                "token": "article",
                "output": "part2Section",
                "optionalLookup": {
                    "[1-8](-[ab])?": "Part_Second",
                    "(9|2[0-4])(-[ab])?": "House_of_Representatives",
                    "(2[5-9]|3\\d|40)(-[ab])?": "Senate",
                    "(4[1-9]|5\\d)(-[ab])?": "Executive_Power_-_Governor",
                    "6[0-6]": "Council",
                    "(6[7-9]|70)": "Secretary",
                    "7[12]": "County_Treasurer",
                    "(7[3-9](-[ab])?|8[01])": "Judiciary_Power",
                    "82": "Clerks_of_Courts",
                    "83": "Encouragement_of_Literature,_Trade,_Etc.",
                    "(8[4-9]|9\\d|10[01])": "Oaths_and_Subscriptions_Exclusion_from_Offices,_Etc."
                }
            }
        ]
    },
    {
        "name": "New Jersey Statutes",
        "defaults": {},
        "URL": [
            "https://njlaw.rutgers.edu/collections/njstats/showsect.php?title={title}&chapter={chapter}&section={section}&actn=getsect"
        ],
        "regexes": [
            "((N\\.? ?J\\.?|New Jersey)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|N\\.?J\\.?S\\.?A )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Za-z]?):(?<chapter>\\d+[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?[A-Za-z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "New Jersey Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_New_Jersey_Constitution",
            "#Section_{section}",
            "#Paragraph_{paragraph}"
        ],
        "regexes": [
            "(N\\.? ?J\\.?|New Jersey) ?Const(itution|\\.),? ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8}),? ((&sect;|&#167|§|[Ss]ec(tion|t?\\.)) ?(?<section>[\\dIVXivx]{1,8})|[Pp](ar(agraph|a?\\.)) ?(?<paragraph>\\d+))"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            },
            {
                "token": "section",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Nevada Revised Statutes",
        "defaults": {},
        "URL": [
            "https://www.leg.state.nv.us/NRS/NRS-{lpad_chapter}.html#NRS{chapter}Sec{section}"
        ],
        "regexes": [
            "((Nev(ada|\\.)|NV)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|NRS )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "chapter",
                "output": "lpad_chapter",
                "lpad": 3
            }
        ]
    },
    {
        "name": "Nevada Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Nevada_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Nev(ada|\\.)|NV) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "digit"
            },
            {
                "token": "section",
                "numberFormat": "digit"
            }
        ]
    },
    {
        "name": "New Mexico Statutes Annotated 1978",
        "defaults": {},
        "URL": [
            "https://nmonesource.com/nmos/nmsa/en/item/{chapter_code}/index.do#!b/{chapter}-{article}-{section}"
        ],
        "regexes": [
            "((New Mexico|N\\.? ?M\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|NMSA )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Za-z]?)-(?<article>\\d+[A-Za-z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "chapter",
                "output": "chapter_code",
                "lookup": {
                    "1": "4351",
                    "2": "4359",
                    "3": "4362",
                    "4": "4372",
                    "5": "4376",
                    "6": "4381",
                    "7": "4340",
                    "8": "4354",
                    "9": "4357",
                    "10": "4364",
                    "11": "4370",
                    "12": "4374",
                    "13": "4378",
                    "14": "4384",
                    "15": "4387",
                    "16": "4390",
                    "17": "4341",
                    "18": "4346",
                    "19": "4350",
                    "20": "4356",
                    "21": "4361",
                    "22": "4368",
                    "22A": "4377",
                    "23": "4380",
                    "24": "4384",
                    "25": "4391",
                    "26": "4355",
                    "27": "4358",
                    "28": "4365",
                    "29": "4367",
                    "30": "4371",
                    "31": "4379",
                    "32": "4385",
                    "32A": "4389",
                    "33": "4396",
                    "34": "4399",
                    "35": "4360",
                    "36": "4363",
                    "37": "4366",
                    "38": "4369",
                    "39": "4373",
                    "40": "4375",
                    "41": "4382",
                    "42": "4386",
                    "42A": "4392",
                    "43": "4395",
                    "44": "4388",
                    "45": "4393",
                    "46": "4401",
                    "46A": "4405",
                    "46B": "4406",
                    "47": "4408",
                    "48": "4413",
                    "49": "4416",
                    "50": "4420",
                    "51": "4425",
                    "52": "4394",
                    "53": "4400",
                    "54": "4404",
                    "55": "4411",
                    "56": "4418",
                    "57": "4423",
                    "58": "4426",
                    "59": "4435",
                    "59A": "4438",
                    "60": "4443",
                    "61": "4397",
                    "62": "4407",
                    "63": "4412",
                    "64": "4414",
                    "65": "4417",
                    "66": "4422",
                    "67": "4429",
                    "68": "4434",
                    "69": "4437",
                    "70": "4440",
                    "71": "4398",
                    "72": "4402",
                    "73": "4409",
                    "74": "4415",
                    "75": "4421",
                    "76": "4424",
                    "77": "4427"
                }
            }
        ]
    },
    {
        "name": "New Mexico Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_New_Mexico_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(New Mexico|N\\.? ?M\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Consolidated Laws of New York",
        "defaults": {},
        "URL": [
            "https://www.nysenate.gov/legislation/laws/{chapterAcronym}/{section}"
        ],
        "regexes": [
            "(New York|N\\.? ?Y\\.?) ?(?<chapter>.{2,40}?)( Law)? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.-]*\\w|\\d))(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "chapter",
                "output": "chapterAcronym",
                "lookup": {
                    "Abandoned Property|ABP": "ABP",
                    "Agric(ulture|\\.) (and|&) M(arkets|kts)|AGM|A&M": null,
                    "Alc(oholic|o?\\.) Bev(erage|\\.) Cont(rol|\\.)|ABC": "ABC",
                    "Alt(ernative\\.) C(ounty|ty\\.) Gov(ernment|.t)|ACG": "ACG",
                    "Arts (and|&) Cult(ural|\\.) Aff(airs|\\.)|ACA": "ACA",
                    "Banking|BNK": "BNK",
                    "Ben(evolent|\\.) Ord(ers|\\.)|BVO": "BVO",
                    "Bus(iness|\\.) Corp(orations?|s?)|BSC|BCL": "BSC",
                    "Canal|CAL": "CAL",
                    "Civil Practice Law (and|&) Rules|CVP|CPLR|C\\. ?P\\. ?L\\. ?R": "CVP",
                    "Civ(il|\\.) Serv(ice|\\.)|CIV": "CIV",
                    "Coop(erative|\\.) Corp(orations|s?)|CCO": "CCO",
                    "Correct(ion|\\.)|COR": "COR",
                    "County|CNT": "CNT",
                    "Crim(inal|\\.) Pro(cedure|c?)|CPL": "CPL",
                    "Debt(or|\\.) (and|&) Cred(itor|\\.)|DCD": "DCD",
                    "Dom(estic|\\.) Rel(ations|\\.)|DOM": "DOM",
                    "Econ(omic|\\.) Dev(elopment|\\.)|COM": "COM",
                    "Educ(ation|\\.)|EDN": "EDN",
                    "Elder|ELD": "ELD",
                    "Elec(tion|\\.)|ELN": "ELN",
                    "Em(inent|\\.) Dom(ain|\\.) Proc(edure|\\.)|EDP": "EDP",
                    "Emp(loyer(s'?)?|l'rs) Liab(ility|\\.)|EML": "EML",
                    "Energy|ENG": "ENG",
                    "Env(ironmental|(tl)?\\.) Conserv(ation|\\.)|ENV": "ENV",
                    "Est(ates,|\\.) Powers (and|&) Trusts|EPT": "EPT",
                    "Exec(utive|\\.)|EXC": "EXC",
                    "Fin(ancial|\\.) Serv(ices|s?)|FIS": "FIS",
                    "Gen(eral|\\.) Associations|GAS": "GAS",
                    "Gen(eral|\\.) Bus(iness|\\.)|GBS": "GBS",
                    "Gen(eral|\\.) City|GCT": "GCT",
                    "Gen(eral|\\.) Constr(uction|\\.)|GCN": "GCN",
                    "Gen(eral|\\.) Mun(icipal|\\.)|GMU": "GMU",
                    "Gen(eral|\\.) Oblig(ations|\\.)|GOB": "GOB",
                    "High(way|\\.)|HAY": "HAY",
                    "Indian|IND": "IND",
                    "Jud(iciary|\\.)|JUD": "JUD",
                    "Legis(lative|\\.)|LEG": "LEG",
                    "Lien|LIE": "LIE",
                    "L(imited|td\\.) Liab(ility|\\.) Co(mpany|\\.)|LLC": "LLC",
                    "Local Fin(ance|\\.)|LFN": "LFN",
                    "Mental Hyg(iene|\\.)|MHY": "MHY",
                    "Mil(itary|\\.)|MIL": "MIL",
                    "Mult(iple|\\.) Dwell(ing|\\.)|MDW": "MDW",
                    "Mult(iple|\\.) Resid(ence|\\.)|MRE": "MRE",
                    "Mun(icipal|\\.) Home Rule|MHR": "MHR",
                    "Mun(icipal|i?\\.) Housing Authorities|MHA": "MHA",
                    "Nav(igation|\\.)|NAV": "NAV",
                    "(State )?Print(ing|\\.)? (and|&) Pub(lic|\\.) Doc(uments|s?)|PPD": "PPD",
                    "Parks,? Rec(reation|\\.) (and|&) Hist(oric|\\.) Preserv(ation|\\.)|PAR": "PAR",
                    "P(artnership|'ship)|PTR": "PTR",
                    "Penal|PEN": "PEN",
                    "Pers(onal|\\.) Prop(erty|\\.)|PEP": "PEP",
                    "Priv(ate|\\.) Hous(ing|\\.) Fin(ance|\\.)|PVH": "PVH",
                    "Pub(lic|\\.) Auth(orities|\\.)|PBA": "PBA",
                    "Pub(lic|\\.) Health|PBH": "PBH",
                    "Pub(lic|\\.) Housing|PBG": "PBG",
                    "Pub(lic|\\.) Off(icers|\\.)|PBO": "PBO",
                    "Rac(ing,|\\.) Pari-Mut(uel|\\.) Wag(ering|\\.) (and|&) Breed(ing|\\.)|PML": "PML",
                    "Railroad|R\\.R\\.|RRD": "RRD",
                    "Rapid Trans(it|\\.)|RAT": "RAT",
                    "Real Prop(erty|\\.) Act(ions|s\\.)( (and|&) Proceedings)?|RPA": "RPA",
                    "Real Prop(erty|\\.) Tax|RPT": "RPT",
                    "Real Prop(erty|\\.)|RPP": "RPP",
                    "Relig(ious|\\.) Corp(orations|s?\\.)|RCO": "RCO",
                    "Retire(ment|\\.) (and|&) Soc(ial|\\.) Sec(urity|\\.)|RSS": "RSS",
                    "Rural Elec(tric|\\.) Coop(eratives?|s?\\.)|REL": "REL",
                    "Second Class Cities|SCC": "SCC",
                    "Soil (and|&) Water Conserv(ation|\\.) Dist(ricts|s?\\.)|SWC": "SWC",
                    "State Administrative Procedure Act|A\\.P\\.A\\.|SAP": "SAP",
                    "State Fin(ance|\\.)|STF": "STF",
                    "State|STL": "STL",
                    "Statute of Local Gov(ernments|s?\\.)|SLG": "SLG",
                    "Town|TWN": "TWN",
                    "Trans(portation|p?\\.) Corp(orations|s?\\.)|TCP": "TCP",
                    "Trans(portation|p?\\.)|TRA": "TRA",
                    "Uniform Commercial Code|U\\.?C\\.?C\\.?": "UCC",
                    "Vill(age|\\.)|VIL": "VIL",
                    "Vol(unteer|\\.) Ambul(ance|\\.) Workers'? Benefit|VAW": "VAW",
                    "Vol(unteer|\\.) Fire(fighters'?|\\.) Ben(efit|\\.)|VOL": "VOL"
                }
            },
            {
                "token": "section",
                "case": "upper"
            }
        ]
    },
    {
        "name": "New York Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_New_York_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(New York|N\\.? ?Y\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "North Carolina General Statutes",
        "defaults": {},
        "URL": [
            "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_{chapter}/GS_{chapter}-{section}.html"
        ],
        "regexes": [
            "((North Carolina|N\\.? ?C\\.?) ?Gen(eral|\\.) ?Stat(utes|s?\\.?)|N\\.? ?C\\.? ?G\\.? ?S\\.?) ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "North Carolina Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_North_Carolina_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(North Carolina|N\\.? ?C\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "North Dakota Century Code",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/north-dakota/nd-code/north_dakota_code_{title}_{chapter}_{section}"
        ],
        "regexes": [
            "(North Dakota|N\\.? ?D\\.?) ?Cent(ury|\\.) ?Code( Ann(otated|\\.))? ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "chapter",
                "lpad": 2
            },
            {
                "token": "section",
                "lpad": 2
            }
        ]
    },
    {
        "name": "North Dakota Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{roman_article},_North_Dakota_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(North Dakota|N\\.? ?D\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Northern Mariana Islands Commonwealth Code",
        "defaults": {},
        "URL": [
            "https://cnmilaw.org/pdf/cmc_section/T{title}/{section}.pdf"
        ],
        "regexes": [
            "(?<title>\\d+) N(orthern|\\.) ?Mar(iana|\\.) ?I(slands|\\.)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Northern Mariana Islands Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Northern_Mariana_Islands_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "N(orthern|\\.) ?Mar(iana|\\.) ?I(slands|\\.) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Ohio Revised Code",
        "defaults": {},
        "URL": [
            "https://codes.ohio.gov/orc/{chapter}",
            ".{section}v1"
        ],
        "regexes": [
            "O(hio|H)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+)(\\.(?<section>\\d+)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?)?"
        ]
    },
    {
        "name": "Ohio Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Ohio_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "O(hio|H) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Oklahoma Statutes",
        "defaults": {
            "year": "2019"
        },
        "URL": [
            "https://law.justia.com/codes/oklahoma/{year}/title-{title}/section-{title}-{section}/index.html"
        ],
        "regexes": [
            "(Okla(homa|\\.)|OK)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?,? [Tt]it(le|\\.) ?(?<title>\\d+([-‑–][A-Z])?),?((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?(,? \\((?<year>\\d{4})\\))?"
        ],
        "operations": [
            {
                "token": "title",
                "case": "lower"
            }
        ]
    },
    {
        "name": "Oklahoma Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{roman_article},_Oklahoma_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Okla(homa|\\.)|OK) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Oregon Revised Statutes",
        "defaults": {},
        "URL": [
            "https://www.oregonlaws.org/ors/{chapter}.{section}"
        ],
        "regexes": [
            "(Or(egon|e?\\.)|OR)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Oregon Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Oregon_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Or(egon|e?\\.)|OR) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[IVXivx]{1,5}(-\\w(\\(\\d\\))?)?)(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "case": "upper"
            }
        ]
    },
    {
        "name": "Pennsylvania Code",
        "defaults": {},
        "URL": [
            "https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/{title}/chapter{chapter}/s{chapter}.{section}.html"
        ],
        "regexes": [
            "(?<title>\\d+) (Pennsylvania|Pa\\.|PA)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "title",
                "lpad": 3
            }
        ]
    },
    {
        "name": "Pennsylvania Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Pennsylvania_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Pennsylvania|Pa\\.|PA) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Puerto Rico Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Puerto_Rico_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Puerto Rico|P\\.? ?R\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "General Laws of Rhode Island",
        "defaults": {},
        "URL": [
            "http://webserver.rilin.state.ri.us/Statutes/TITLE{title}/{title}-{chapter}/{title}-{chapter}-{section}.HTM"
        ],
        "regexes": [
            "(Rhode Island|R\\.? ?I\\.?) ?Gen(eral|\\.) ?Laws ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Rhode Island Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Rhode_Island_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Rhode Island|R\\.? ?I\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "South Carolina Code of Laws",
        "defaults": {},
        "URL": [
            "https://www.scstatehouse.gov/code/t{title}c{lpad_chapter}.php#{title}-{chapter}-{section}"
        ],
        "regexes": [
            "(South Carolina|S\\.? ?C\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "chapter",
                "output": "lpad_chapter",
                "lpad": 3
            }
        ]
    },
    {
        "name": "South Carolina Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_South_Carolina_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(South Carolina|S\\.? ?C\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "South Dakota Codified Laws",
        "defaults": {},
        "URL": [
            "https://sdlegislature.gov/Statutes/Codified_Laws/DisplayStatute.aspx?Type=Statute&Statute={title}-{chapter}-{section}"
        ],
        "regexes": [
            "(South Dakota|S\\.? ?D\\.?) ?(Codified|Comp(iled|\\.)) Laws( Ann(otated|\\.))? ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "South Dakota Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_South_Dakota_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(South Dakota|S\\.? ?D\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Tennessee Code",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/tennessee/tn-code/tennessee_code_{title}-{chapter}-{section}"
        ],
        "regexes": [
            "(Tenn(essee|\\.)|TN)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Tennessee Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Tennessee_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Tenn(essee|\\.)|TN) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Texas Codes",
        "defaults": {},
        "URL": [
            "https://statutes.capitol.texas.gov/Docs/{codeAcronym}/htm/{codeAcronym}.{chapter}.htm#{chapter}.{section}"
        ],
        "regexes": [
            "(Tex(as|\\.)|TX) (?<code>\\w.{2,40}?)( Code( Ann(otated|\\.))?)? ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "code",
                "output": "codeAcronym",
                "lookup": {
                    "Agric(ulture|\\.)|AGC?": "AG",
                    "Alc(oholic|o?\\.) Bev(erage|\\.)|ABC?": "AL",
                    "Aux(iliary|\\.) Water Laws|A?WL": "WL",
                    "Bus(iness|\\.) (and|&) Com(merce|m?\\.)|B&C|BCC?": "BC",
                    "Bus(iness|\\.) Org(anizations|s\\.)|BOC?": "BO",
                    "Civ(il|\\.) Prac(tice|\\.) (and|&) Rem(edies|s?\\.)|CPR?C?": "CP",
                    "Code( of)? Crim(inal|\\.) ?Pro(cedure|c?\\.)|CCrP|CRC?": "CR",
                    "Educ(ation|\\.)|EDC?": "ED",
                    "Elec(tion|\\.)|ELC?": "EL",
                    "Est(ates|\\.)|ESC?": "ES",
                    "Fam(ily|\\.)|FAC?|FAM": "FA",
                    "Fin(ance|\\.)|FIC?|FIN": "FI",
                    "Gov(ernment|('?t)?\\.?)?|GO?VC?": "GV",
                    "Health (and|&) Safety|H&?SC?": "HS",
                    "Hum(an|\\.) Res(ources|\\.)|HRC?": "HR",
                    "Ins(urance|\\.)|INC?": "IN",
                    "Labor|LA": "LA",
                    "Local Gov(ernment|'t)|LGC?": "LG",
                    "Nat(ural|\\.) Res(ources|\\.)|NRC?": "NR",
                    "Occ(upations|\\.)|OC": "OC",
                    "Parks (and|&) Wild(life|\\.)|PWC?": "PW",
                    "Penal|PEN?|PC": "PE",
                    "Prop(erty|\\.)|PR|PC": "PR",
                    "Special Dist(rict|\\.) Local Laws|Spec\\. Dists\\.|SDC?": "SD",
                    "Tax|TX?C": "TX",
                    "Trans(portation|p?\\.)|TNC?": "TN",
                    "Util(ities|\\.)|UTC?": "UT",
                    "Water|WAC?": "WA",
                    "Vernon's Civ(il|\\.) Stat(utes|s?\\.)": "VC"
                }
            }
        ]
    },
    {
        "name": "Texas Constitution",
        "defaults": {},
        "URL": [
            "https://statutes.capitol.texas.gov/Docs/CN/htm/CN.{article}/CN.{article}.{section}.htm"
        ],
        "regexes": [
            "(Tex(as|\\.)|TX) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "digit"
            },
            {
                "token": "section",
                "numberFormat": "digit"
            }
        ]
    },
    {
        "name": "Utah Code",
        "defaults": {},
        "URL": [
            "https://le.utah.gov/xcode/Title{title}/Chapter{chapter}/{title}-{chapter}-S{section}.html",
            "#{title}-{chapter}-{section}{subsection}"
        ],
        "regexes": [
            "(Utah|UT)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "title",
                "case": "upper"
            }
        ]
    },
    {
        "name": "Utah Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Utah_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Utah|UT) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Vermont Statutes",
        "defaults": {},
        "URL": [
            "https://www.lawserver.com/law/state/vermont/vt-statutes/vermont_statutes_title_{title}_{section}"
        ],
        "regexes": [
            "V(ermont|t\\.|T)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?,? [Tt]it(le|\\.) ?(?<title>\\d+([-‑–][A-Z])?),?((,? )?(&sect;|&#167|§){1,2}|Sect?\\.?|Sections?)? ?(?<section>\\d[\\w.-]*\\w|\\d)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Vermont Constitution",
        "defaults": {
            "chapter2section": "Chapter_II"
        },
        "URL": [
            "https://ballotpedia.org/",
            "{isChapterI}Chapter_I",
            "{isChapterII}{chapter2section}",
            ",_Vermont_Constitution",
            "{isChapterI}#Article_{article}{articleSuffix}",
            "{isChapterII}#Section_{article}"
        ],
        "regexes": [
            "V(ermont|t\\.|T) ?Const(itution|\\.),? ?[Cc](hapter|h?\\.) ?(?<chapter>[Ii]{1,2})(,? ([Aa]rt(icle|\\.)|&sect;|&#167|§) ?(?<article>\\d+)(st|nd|th)?)?"
        ],
        "operations": [
            {
                "token": "chapter",
                "case": "upper"
            },
            {
                "token": "chapter",
                "output": "isChapterI",
                "optionalLookup": {
                    "I": ""
                }
            },
            {
                "token": "chapter",
                "output": "isChapterII",
                "optionalLookup": {
                    "II": ""
                }
            },
            {
                "token": "article",
                "output": "articleSuffix",
                "lookup": {
                    "(\\d*[02-9])?1": "st",
                    "(\\d*[02-9])?2": "nd",
                    "(\\d*[02-9])?3": "rd",
                    "(\\d*[02-9])?[4-9]|\\d*1\\d": "th"
                }
            },
            {
                "token": "article",
                "output": "chapter2section",
                "optionalLookup": {
                    "[1-5]": "Delegation_and_Distribution_of_Powers",
                    "[6-9]|1\\d": "Legislative_Department",
                    "2[0-7]": "Executive_Department",
                    "2[89]|3\\d|4[01]": "Judiciary_Department",
                    "42": "Qualifications_of_Freemen_and_Freewomen",
                    "4[3-9]|5[0-5]": "Elections;_Officers;_Terms_of_Office",
                    "56": "Oath_of_Allegiance;_Oath_of_Office",
                    "5[78]": "Impeachment",
                    "59": "Militia",
                    "6\\d|7[01]": "General_Provisions",
                    "7[23]": "Amendment_of_the_Constitution",
                    "7[4-6]": "Temporary_Provisions"
                }
            }
        ]
    },
    {
        "name": "Virginia Code",
        "defaults": {},
        "URL": [
            "https://law.lis.virginia.gov/vacode/title{title}/section{title}-{section}"
        ],
        "regexes": [
            "(?<!W\\. )(?<!West )(?<!W\\.)V(irginia|a\\.|A)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Virginia Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Virginia_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(?<!W\\. )(?<!West )(?<!W\\.)V(irginia|a\\.|A) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Virgin Islands Code",
        "defaults": {
            "year": "2019"
        },
        "URL": [
            "https://law.justia.com/codes/virgin-islands/{year}/title-{title}/chapter-{chapter}/{section}/"
        ],
        "regexes": [
            "(Virgin Islands|V\\.? ?I\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?,? [Tt]it(le|\\.) ?(?<title>\\d+([-‑–][A-Z])?),?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?(,? \\((?<year>\\d{4})\\))?"
        ]
    },
    {
        "name": "Revised Code of Washington",
        "defaults": {},
        "URL": [
            "https://app.leg.wa.gov/RCW/default.aspx?cite={title}.{chapter}.{section}"
        ],
        "regexes": [
            "((Wash(ington|\\.)|WA)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|R\\.?C\\.?W\\.? )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Za-z]?)\\.(?<chapter>\\d+[A-Za-z]?)\\.(?<section>\\d+[A-Za-z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Washington Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Washington_State_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Wash(ington|\\.)|WA) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "West Virginia Code",
        "defaults": {},
        "URL": [
            "http://www.wvlegislature.gov/wvcode/ChapterEntire.cfm?chap={chapter}&art={article}&section={section}"
        ],
        "regexes": [
            "(West Virginia|W\\. ?Va?\\.|WV)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Za-z]?)-(?<article>\\d+[A-Za-z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "West Virginia Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{roman_article},_West_Virginia_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(West Virginia|W\\. ?Va?\\.|WV) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Wisconsin Statutes",
        "defaults": {},
        "URL": [
            "https://docs.legis.wisconsin.gov/document/statutes/{chapter}.{section}",
            "{subsection}"
        ],
        "regexes": [
            "(Wis(consin|\\.)|WI)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ]
    },
    {
        "name": "Wisconsin Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Wisconsin_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Wis(consin|\\.)|WI) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "roman"
            }
        ]
    },
    {
        "name": "Wyoming Statutes",
        "defaults": {},
        "URL": [
            "https://wyoleg.gov/statutes/compress/title{lpad_title}.pdf#search={title}-{chapter}-{section}."
        ],
        "regexes": [
            "(Wyo(ming|\\.)|WY)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(((,? )?sub(sections?|divisions?|(sec|d(iv)?)?s?\\.) ?)?(?<subsection>(\\(\\w+\\))+))?"
        ],
        "operations": [
            {
                "token": "title",
                "output": "lpad_title",
                "lpad": 2
            }
        ]
    },
    {
        "name": "Wyoming Constitution",
        "defaults": {},
        "URL": [
            "https://ballotpedia.org/Article_{article},_Wyoming_Constitution",
            "#Section_{section}"
        ],
        "regexes": [
            "(Wyo(ming|\\.)|WY) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?"
        ],
        "operations": [
            {
                "token": "article",
                "numberFormat": "digit"
            },
            {
                "token": "section",
                "numberFormat": "digit"
            }
        ]
    },
    {
        "name": "Caselaw Access Project",
        "defaults": {},
        "URL": [
            "https://cite.case.law/{reporter}/{volume}/{page}",
            "#p{pincite}"
        ],
        "regexes": [
            "(?<volume>\\d+) (?<reporter>Abb\\. Ct\\. App\\.|Abb\\.N\\. Cas\\.|Abb\\. Pr\\.|Abb\\. Pr\\. \\(n\\.s\\.\\)|Va\\. \\(Va\\. Cas\\.\\)|Adams Co\\. L\\.J\\.|Add\\.|Dallam|Franklin Co\\. Legal J\\.|Aik\\.|Ala\\. App\\.|Ala\\.|Alaska Fed\\.|Alaska|Am\\. Samoa|Am\\. Samoa 2d|Am\\. Samoa 3d|Ohio App\\. Unrep\\.|Ant\\. N\\.P\\. Cas\\.|A\\.D\\. ?2d|A\\.D\\.|A\\.D\\. ?3d|Ky\\. \\(Hughes\\)|Ariz\\. App\\.|Ariz\\.|Ark\\. App\\.|Ark\\.|Armstrong\\. Election Cases|A\\.|Balt\\. C\\. Rep\\.|Barb\\. Ch\\.|Barb\\.|B\\. Co\\. Leg\\. J\\.|Berk's Co\\. L\\.J\\.\\.|Blackf\\.|Blair Co\\. L\\.R\\.|Blair Co\\. L\\.R\\. 2d|Bosworth Super\\. Ct\\. Rep\\.|Bradford Co\\. L\\.J\\.|Brad\\.|Brayt\\.|Bucks Co\\. L\\.R\\.|Bur\\.|Bur\\.|Butler Co\\. Legal J\\.|E\\.D\\. Pa\\.|Cai\\. Cas\\.|Cai\\.|Cal\\. ?App\\.|Cal\\. ?App\\. ?5th|Cal\\. ?App\\. ?4th|Cal\\. ?App\\. ?[23]d|Cal\\. ?[23]d|Cal\\. ?[45]th|Cal\\.|Cal\\. ?Super\\. ?Ct\\.|Cal\\. ?Unrep\\.|Cambria Co\\. L\\.J\\.|Cambria Co\\. Rep\\.|Carbon Co\\. L\\.J\\.|N\\.C\\. \\(Car\\. L\\. Rep\\.\\)|N\\.J\\. \\(Manumission\\)|S\\.C\\.L\\. \\(McMul\\.\\)|S\\.C\\.L\\. \\(Chev\\.\\)|Tapp\\. Rep\\.|D\\. Pa\\.|Ohio|S\\.C\\. Eq\\. \\(Chev\\. Eq\\.\\)|Monaghan|Sadler|Ky\\. \\(Litt\\. Sel\\. Cas\\.\\)|C\\.C\\.L\\.J\\.|C\\.C\\.L\\.J\\. 2d|S\\.C\\. Eq\\. \\(McCord Eq\\.\\)|S\\.C\\. Eq\\. \\(Ril\\. Eq\\.\\)|Chand\\.|Charlton Rep\\.|Ches\\. Co\\. Rep\\.|D\\. Chip\\.|N\\. Chip\\.|Mun\\.  L\\. Rep\\.|Hosea's Rep\\.|N\\.Y\\. City Ct\\. Rep\\.|Cl\\. Ch\\.|Cole\\. & Cai\\. Cas\\.|Cole\\. Cas\\.|Colo\\. App\\.|Colo\\. L\\. Rep\\.|Colo\\. N\\. P\\.|Colo\\.|Willson|White & W\\.|N\\.C\\. \\(Cam\\. & Nor\\.\\)|King's Conflicting Cases|Conn\\. App\\.|Conn\\. Cir\\. Ct\\.|Kirby|Root|Conn\\.|Conn\\. Supp\\.|Connoly Sur\\. Rep\\.|Ct\\. Cl\\.|C\\.C\\.P\\.A\\.|Ct\\. Cust\\.|Cow\\.|Craw\\. Co\\. Leg\\. J\\.|Cumberland L\\.J\\.|Cust\\. B\\. & Dec\\.|Dakota|Dallam|Dall\\.|Daly \\(N\\.Y\\.\\)|Dau\\. Co\\. Rep\\.|Day|T\\.C\\.A\\.|P\\.R\\. Dec\\.|Teiss\\.|Va\\. Ch\\. Dec\\.|Ky\\. \\(Sneed\\)|Pears\\.|Smith|Ga\\. Super\\. Ct\\.|Georgia Decisions|C\\.M\\.A\\.|Del\\. Cas\\.|Del\\. Ch\\.|Del\\. Co\\. Reps\\.|Del\\. \\(Harr\\.\\)|Del\\. \\(Penne\\.\\)|Del\\. \\(Boyce\\)|Del\\. \\(Marv\\.\\)|Del\\. \\(Houst\\.\\)|Del\\.|Dem\\. Sur\\.|Denio|Docket|Dudley Rep\\.|Duer Super\\. Ct\\. Rep\\.|Edm\\. Sel\\. Cas\\.|E\\.D\\. Smith|Edw\\. Ch\\.|S\\.C\\. Eq\\. \\(McMul\\. Eq\\.\\)|S\\.C\\. Eq\\. \\(Speers Eq\\.\\)|Erie\\. Co\\. L\\.J\\.|P\\.R\\. Sent\\.|Fay\\. L\\.J\\.|F\\. Cas\\.|Fed\\. Cl\\.|F\\.|F\\. ?2d|F\\. ?3d|F\\.R\\.D\\.|F\\. ?Supp\\.( ?[23]d)?|Fla\\.|Fla\\. Supp\\.|Fla\\. Supp\\. 2d|Ga\\. App\\.|Ga\\. L\\. Rep\\.|Ga\\.|Gault|Gibb\\. Surr\\.|Guam|Hall Super\\. Ct\\. Rep\\.|H\\. & G\\.|Haw\\. App\\.|Haw\\.|Haz\\. Pa\\. Reg\\.|Va\\. \\(Hen\\. & M\\.\\)|Hill & Den\\.|Hill|Hilt\\.|Hoff\\. Ch\\.|Hopk\\. Ch\\.|How\\. App\\. Cas\\.|How\\. Pr\\.|How\\. Pr\\. \\(n\\.s\\.\\)|Idaho|Ill\\. App\\.|Ill\\. App\\. 2d|Ill\\. App\\. 3d|Ill\\. Cir\\. Ct\\. Rep\\.|Ill\\. Ct\\. Cl\\.|Ill\\. \\(Scam\\)|Ill\\. \\(Breese\\)|Ill\\. \\(Gilm\\.\\)|Ill\\.|Ill\\. 2d|Ind\\. App\\.|Ind\\. L\\. Rep\\.|Ind\\.|Indian Terr\\.|Iowa|Jeff\\.|Johns\\. Cas\\.|Johns\\. Ch\\.|Johns\\.|Jones and Spencer's Super\\. Ct\\. Rep\\.|Edsall|Pa\\. \\(Admiralty\\)|Kan\\. App\\. 2d|Kan\\.|Ky\\. \\(A\\.K\\. Marsh\\.\\)|Ky\\. Op\\.|Ky\\.|Keyes|Lack\\. Bar\\. R\\.|Lack\\. Bar  R\\.|Lack\\. Jur\\.|Lack\\. L\\. N\\.|Lack\\. L\\.R\\.|Lanc\\. Bar|Lanc\\. L\\. Rev\\.|Lans\\. Ch\\.|Lans\\.|Law\\. L\\.J\\.|Law Times|Law Times \\(N\\.S\\.\\)|Lebanon Co\\. L\\.J\\.|Foster|Leg\\. Gaz\\.|Leg\\. Gaz\\.|Pa\\. Leg\\. Gaz\\.|Gunby|Leg\\. Rec\\. Rep\\.|Lehigh Co\\. L\\.J\\.|Lehigh Val\\. L\\. Rep\\.|Liquor Tax Rep\\.|Lock\\. Rev\\. Cas\\.|La\\. Ann\\.|La\\. App\\.|La\\.|La\\.|Luz\\. L\\.J\\.|Luz\\. L\\.O\\.|Luz\\. Leg\\. Reg\\.|Luz\\. Leg\\. Reg\\.|Lycoming R\\.|Magis\\. & Const\\.|Me\\.|McGrath|N\\.C\\. \\(Mart\\.\\)|Mart\\. \\(n\\.s\\.\\)|Mart\\. \\(o\\.s\\.\\)|Md\\. App\\.|Md\\.|H\\. & McH\\.|Mass\\. \\(Allen\\)|Mass\\. App\\. Ct\\.|Mass\\. App\\. Dec\\.|Davis L\\. Ct\\. Cas\\.|Davis L\\. Ct\\. Cas\\.|Mass\\. \\(Cush\\)|Mass\\. \\(Pick\\.\\)|Mass\\. \\(Gray\\)|Mass\\. \\(Tyng\\)|Mass\\. \\(Will\\.\\)|Mass\\. \\(Met\\.\\)|Mass\\.|Mass\\. Supp\\.|Mercer|Mich\\. App\\. |Howell N\\.P\\.|Mich\\.|M\\.C\\.L\\.J\\.|Mills Surr\\.|Minn\\.|Minor|Va\\.|Miss\\. Ct\\. Rec\\.|Miss\\. Dec\\.|Miss\\. \\(Walker\\)|Miss\\.|Miss\\. \\(Howard\\)|Miss\\. \\(S\\. & M\\.\\)|Mor\\. St\\. Cas\\.|Mo\\. App\\.|Mo\\.|Monroe L\\.R\\.|Mont\\.|Mont\\. Co\\. L\\. Rep\\.|Navajo Rptr\\.|Neb\\. App\\.|Neb\\.|Nev\\.|N\\.H\\.|N\\.J\\. Eq\\.|N\\.J\\.L\\.|N\\.J\\. Misc\\.|N\\.J\\.|N\\.J\\. Super\\.|N\\.J\\. Tax Ct\\.|N\\.M\\.|N\\.M\\.|N\\.Y\\. Crim\\.|Misc\\. ?2d|Misc\\. ?3d|Misc\\.|N\\.Y\\. ?2d|N\\.Y\\.|N\\.Y\\. ?3d|N\\.Y\\. St\\. Rptr\\.|Northam\\. Law Rep\\.|N\\.C\\. App\\.|N\\.C\\.|N\\.C\\. \\(Busb\\. Eq\\)|N\\.C\\. \\(Busb\\.\\)|N\\.C\\. \\(Dev\\. & Bat\\. Eq\\.\\)|N\\.C\\. \\(Dev\\. & Bat\\.\\)|N\\.C\\. \\(Dev\\. Eq\\.\\)|N\\.C\\. \\(Dev\\.\\)|N\\.C\\. \\(Hawks\\)|N\\.C\\. \\(Hayw\\.\\)|N\\.C\\. \\(Ired\\. Eq\\.\\)|N\\.C\\. \\(Ired\\.\\)|N\\.C\\. \\(Jones Eq\\.\\)|N\\.C\\. \\(Jones\\)|N\\.C\\. \\(Mur\\.\\)|N\\.C\\. \\(Phil\\. Eq\\.\\)|N\\.C\\. \\(Phil\\.\\)|N\\.C\\. \\(Tay\\.\\)|N\\.C\\. \\(Win\\.\\)|N\\.D\\.|N\\. ?E\\.|N\\.E\\. ?[23]d|N\\. E\\. [23]d|N\\. Mar\\. I\\. Commw\\.|N\\. Mar\\. I\\.|Northum\\. Co\\. Leg\\. N\\.|Northumb\\. L\\.J\\.|N\\. ?W\\.|N\\.W\\. ?2d|N\\. W\\. 2d|Ohio App\\.|Ohio App\\. 2d|Ohio App\\. 3d|Ohio C\\.C\\. Dec\\.|Ohio C\\.C\\. \\(N\\.S\\.\\)|Ohio Cir\\. Dec\\.|Ohio Ct\\. App\\.|Ohio Misc\\.|Ohio Misc\\. 2d|Ohio Nisi Prius|Ohio Nisi Prius \\(N\\.S\\.\\)|Ohio Op\\. 2d|Ohio Op\\. 3d|Ohio Op\\.|Ohio St\\.|Ohio St\\. \\(n\\.s\\.\\)|Ohio St\\. 2d|Ohio St\\. 3d|Okla\\. Crim\\.|Okla\\.|Olwine's L\\.J\\.|Or\\.|Or\\. App\\.|Or\\. Tax|P\\.|P\\. ?2d|P\\. ?3d|Paige Ch\\.|Park\\. Crim\\. Rep\\.|Pelt\\.|Pa\\. L\\. Rec\\.|Pa\\. Commw\\.|Pa\\. Corp\\. R\\.|Pa\\. Co\\. Ct\\.|Pa\\. D\\. & C\\. 2d|Pa\\. D\\. & C\\.|Pa\\. D\\. & C\\. 3d|Pa\\. D\\. & C\\. 5th|Pa\\. D\\. & C\\. 4th|Pa\\. Fid\\.|Pa\\. Fid\\. 2d|Pa\\. Fid\\. 3d|Pa\\. Just\\. L\\. Rep\\.|Pa\\. L\\.J\\. Rep\\.|Pa\\.|Pa\\. Super\\. Ct\\.|Pennyp\\.|Phila\\. Co\\. R\\.|Phila\\. Reports|Pin\\.|Pittsb\\. L\\.J\\.|Pitts\\. R\\.|Port\\.|P\\.R\\. Fed\\.|Pow\\. Surr\\.|Mich\\. Pr\\.|Singer Prob\\. Cas\\.|N\\.Y\\. Proc\\. Ct\\. Ass\\.|P\\.R\\.|Rec\\. Q\\. Ct\\.|Rec\\. Ct\\. Assistants|Rec\\. Co\\. Ch\\. \\(S\\.C\\.\\)|Rec\\. Ct\\. Gen\\. Sess\\.|Rec\\. Bucks\\. Co\\. \\(Pa\\.\\)|Rec\\. T\\. Warwick \\(R\\.I\\.\\)|Rec\\. Ct\\. Ches\\. Co\\. Pa\\.|Rec\\. Co\\. Ct\\.|Rec\\. V\\.A\\. Ct\\. \\(R\\.I\\.\\)|Redf\\.|S\\.C\\.L\\. \\(Ril\\.\\)|Ct\\. Cl\\.|Mich\\. Ct\\. Cl\\.|App\\. D\\.C\\.|Bro\\. Com\\. P\\.|Ashm\\. \\(Pa\\.\\)|Conn\\. Super\\. Ct\\.|Conn\\. Super\\. Ct\\.|Disney \\(Ohio\\)|Binn\\.|Pen\\. & W\\.|Rawle|Serg\\. & Rawl\\.|Watts & Serg\\.|Whart\\.|Yeates|S\\.C\\. Eq\\. \\(Des\\.Eq\\.\\)|Ky\\. \\(Hard\\.\\)|Handy|Super\\. Ct\\. Jud\\.|Tenn\\. \\(Hayw\\.\\)|Grant|D\\.C\\. \\(MacArth\\. & M\\.\\)|D\\.C\\. \\(Tuck\\. & Cl\\.\\)|Jahn|S\\.C\\.L\\. \\(Strob\\.\\)|Gill|G\\. & J\\.|S\\.C\\. Eq\\. \\(Dud\\. Eq\\.\\)|S\\.C\\.L\\. \\(Bail\\.\\)|N\\.Y\\.|Walk\\. Ch\\.|Tenn\\. Crim\\. App\\.|H\\. & J\\.|Wilson|Miss\\. \\(S\\. & M\\. Ch\\.\\)|S\\.C\\.L\\. \\(Bay\\)|Morris|Watts|Tenn\\. \\(Mart\\. & Yer\\.\\)|Tenn\\. \\(Cold\\.\\)|Tenn\\. \\(Heisk\\.\\)|Tenn\\. \\(Yer\\.\\)|Tenn\\. \\(Head\\)|Tenn\\. \\(Meigs\\)|Tenn\\. \\(Hum\\.\\)|D\\.C\\.|D\\.C\\. \\(MacArth\\.\\)|D\\.C\\. \\(Mackey\\)|Doug\\.|Ark\\. Terr\\. Rep\\.|McGl\\.|D\\.C\\. \\(patent\\)|Ky\\. \\(Bibb\\)|Ky\\. \\(Litt\\.\\)|Ky\\. \\(T\\.B\\. Mon\\.\\)|Ky\\. \\(B\\. Mon\\.\\)|Wright|Ohio Ch\\.|Ky\\. \\(J\\.J\\. Marsh\\.\\)|S\\.C\\.L\\. \\(Speers\\)|S\\.C\\.L\\. \\(Rich\\.\\)|S\\.C\\.L\\. \\(Rice\\)|S\\.C\\.L\\. \\(Rich\\.\\)|S\\.C\\.L\\. \\(Dud\\.\\)|S\\.C\\.L\\. \\(Hill\\)|Hay\\. & Haz\\.|D\\.C\\. Cir\\.|D\\.C\\. \\(Cranch\\)|Brightly|Walker|Ind\\. App\\.|Kan\\. App\\.|Md\\. Ch\\.|Md\\. Ch\\.|Freem\\. Ch\\.|Wilcox|S\\.C\\.L\\. \\(McCord\\)|S\\.C\\.L\\. \\(Nott & McC\\.\\)|S\\.C\\.L\\. \\(Harp\\.\\)|Harr\\. Ch\\.|Miles|Cal\\. ?Dist\\. Ct\\.|McCahon|S\\.C\\. Eq\\. \\(Rice Eq\\.\\)|S\\.C\\. Eq\\. \\(Rich\\. Eq\\.\\)|S\\.C\\. Eq\\. \\(Hill Eq\\.\\)|S\\.C\\. Eq\\. \\(Rich\\. Eq\\.\\)|S\\.C\\. Eq\\. \\(Rich\\. Cas\\.\\)|S\\.C\\. Eq\\. \\(Strobh\\. Eq\\.\\)|S\\.C\\. Eq\\. \\(Bail\\. Eq\\.\\)|Greene|Myrick|D\\. Haw\\.|Rep\\. Cont\\. Elect\\. Case\\.|Rep\\. Cont\\. El\\.|Howison|Coffey|Charlton|S\\.C\\. Eq\\. \\(Harp\\. Eq\\.\\)|Brewster|S\\.C\\.L\\. \\(Mill\\)|S\\.C\\.L\\. \\(Tread\\.\\)|S\\.C\\.L\\. \\(Brev\\.\\)|Mass\\. App\\. Div\\.|Mass\\. App\\. Div\\.|Goebel|Ky\\. \\(Dana\\)|Ky\\. \\(Duv\\.\\)|Ky\\. \\(Met\\.\\)|Ky\\. \\(Bush\\)|Vaux|Tenn\\. \\(Swan\\)|Tenn\\. \\(Sneed\\)|Bradf\\.|T\\.C\\.|B\\.T\\.A\\.|R\\.I\\. Ct\\. Rec\\.|R\\.I\\. Dec\\.|R\\.I\\.|Super\\. Ct\\. \\(R\\.I\\.\\)|Robertson's Super\\. Ct\\. Rep\\.|Rob\\.|Sand\\. Ch\\.|Sandford Super\\. Ct\\. Rep\\.|Sarat\\. Ch\\. Sent\\.|Schuy\\. L\\. Rec\\.|Schuy\\. Reg\\.|Seld\\. Notes|Yates|Parsons|Sick\\. Op\\. Att'y Gen\\.|Silv\\. Ct\\. App\\.|Silv\\. Sup\\.|Smith|Som\\. L\\.J\\.|S\\.C\\.|S\\.D\\.|S\\. ?E\\.|S\\.E\\. ?2d|S\\. E\\. 2d|So\\.|So\\. ?2d|So\\. ?3d|S\\. ?W\\.|S\\.W\\. ?[23]d|S\\. W\\. [23]d|Stew\\.|Stew\\. & P\\.|S\\.C\\.D\\.C\\. \\(N\\.S\\.\\)|N\\.Y\\. Sup\\. Ct\\.|Susq\\. Leg\\. Chron\\.|Sweeney Super\\. Ct\\. Rep\\.|Robards|N\\.C\\. \\(Taylor\\)|La\\. App\\. \\(Teiss\\.\\)|Tenn\\. App\\.|Tenn\\. Cas\\.|Tenn\\. Ch\\. R\\.|Tenn\\.|Tenn\\. \\(Peck\\)|Tenn\\. \\(Cooke\\)|Tenn\\. \\(Overt\\.\\)|Tex\\. Civ\\. App\\.|Tex\\. Ct\\. App\\.|Tex\\. Crim\\.|Tex\\. L\\. R\\.|Tex\\.|Posey|N\\.J\\. \\(Burlington County Ct\\.\\)|Cin\\. Sup\\. Ct\\. Rep\\.|Com\\. Pl\\. Rep\\.|Pa\\. Dist\\.|Mass\\. Law Rep\\.|Mich\\. N\\.P\\. R\\.|Westchester|Ohio Law Abs\\.|Ohio L\\.R\\.|Ald\\.|Thomp\\. & Cook|Blume Sup\\. Ct\\. Trans\\.|Trans\\. App\\.|Tuck\\. Surr\\.|Tyl\\.|Cl\\. Ct\\.|U\\.S\\. App\\. D\\.C\\.|Ct\\. Int'l Trade|Cust\\. Ct\\.|U\\. ?S\\.|U\\.S\\. \\(Black\\)|U\\.S\\. \\(Cranch\\)|U\\.S\\. \\(Dall\\.\\)|U\\.S\\. \\(How\\.\\)|U\\.S\\. \\(Pet\\.\\)|U\\.S\\. \\(Wall\\.\\)|U\\.S\\. \\(Wheat\\.\\)|Mann\\. Unrep\\. Cas\\.|Blume Unrep\\. Op\\.|Unrep\\. Tenn\\. Cas\\.|Cal\\.|Utah|Utah 2d|Vt\\.|Va\\. Cir\\.|Va\\. Col\\. Dec\\.|Va\\. App\\.|Va\\. Dec\\.|Va\\. \\(Rand\\.\\)|Va\\. \\(Munf\\.\\)|Va\\. \\(Wash\\.\\)|Va\\.|Va\\. \\(Gratt\\.\\)|Va\\. \\(Gilmer\\)|Va\\. \\(Call\\)|Va\\. \\(Patt\\. & Heath\\)|Va\\. \\(Rob\\.\\)|Va\\. \\(Leigh\\)|V\\.I\\.|Wash\\. App\\.|Wash\\. Co\\.\\(Pa\\.\\)|Wash\\.|Wash\\. 2d|Wash\\. Terr\\.|Week\\. No\\. Cas\\. \\(Pa\\.\\)|Wend\\.|Wes\\. C\\.L\\.J\\.|Tribal|A\\. ?2d|A\\. ?3d|B\\.R\\.|F\\. App'?x\\.?|Haw\\.|M\\.J\\.|N\\.Y\\.S\\. 2d|N\\.Y\\.S\\. 2d|N\\.Y\\.S\\.|Vet\\. App\\.|W\\. Va\\.|Wheel\\. Cr\\. Cas\\.|Wis\\.|Wis\\. 2d|Wyo\\.|Yates Sel\\. Cas\\.|York Leg\\. Rec\\.) (?<page>\\d+)\\b(,?( at)? (?<pincite>\\d+)(([-‑–]| to | through )(?<pincite_end>\\d+)|(,? )?(footnote|f?n\\.) ?(?<footnote>\\d+))?\\b(?! \\w))?"
        ],
        "operations": [
            {
                "token": "reporter",
                "case": "lower"
            },
            {
                "token": "reporter",
                "sub": [
                    "[.()&,']",
                    ""
                ]
            },
            {
                "token": "reporter",
                "sub": [
                    " ",
                    "-"
                ]
            },
            {
                "token": "reporter",
                "optionalLookup": {
                    "a-2d": "a2d",
                    "a-3d": "a3d",
                    "ad-2d": "ad2d",
                    "ad-3d": "ad3d",
                    "calapp": "cal-app",
                    "calapp2d": "cal-app-2d",
                    "calapp3d": "cal-app-3d",
                    "calapp4th": "cal-app-4th",
                    "calapp5th": "cal-app-5th",
                    "caldistct": "cal-dist-ct",
                    "calsuperct": "cal-super-ct",
                    "calunrep": "cal-unrep",
                    "cal2d": "cal-2d",
                    "cal3d": "cal-3d",
                    "cal4th": "cal-4th",
                    "cal5th": "cal-5th",
                    "fed-appx": "f-appx",
                    "f-2d": "f2d",
                    "f-3d": "f3d",
                    "fsupp": "f-supp",
                    "fsupp2d": "f-supp-2d",
                    "fsupp3d": "f-supp-3d",
                    "misc-2d": "misc2d",
                    "misc-3d": "misc3d",
                    "n-e": "ne",
                    "ne-2d": "ne2d",
                    "n-e-2d": "ne2d",
                    "ne-3d": "ne3d",
                    "n-e-3d": "ne3d",
                    "n-w": "nw",
                    "nw-2d": "nw2d",
                    "n-w-2d": "nw2d",
                    "ny-2d": "ny2d",
                    "ny-3d": "ny3d",
                    "p-2d": "p2d",
                    "p-3d": "p3d",
                    "s-e": "se",
                    "se-2d": "se2d",
                    "s-e-2d": "se2d",
                    "so-2d": "so2d",
                    "so-3d": "so3d",
                    "s-w": "sw",
                    "sw-2d": "sw2d",
                    "s-w-2d": "sw2d",
                    "sw-3d": "sw3d",
                    "s-w-3d": "sw3d",
                    "u-s": "us"
                }
            }
        ]
    }
];

// on page load, check whether there's a URL parameter.
// If there is, insert it into the search bar, and run the
// search. Otherwise, unhide the page for normal display.
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    if (!location.search) {
      return document.body.removeAttribute('hidden');
    }
    let query = decodeURIComponent(location.search);
    query = query.trim().replace(/^\?(?:q=)?|\.$|,$|;$/g, '');
    document.getElementById("q").value = query.replace(/\+/g, ' ');
    
    handleQuery(query);
  });
}

if (
    typeof window !== 'undefined'
    && typeof window.addEventListener !== 'undefined'
) {
  window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || (
      typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2
    );
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
  });
}

function log(text) {
  if (typeof console !== 'undefined') {
    console.log(text)
  }
}

class Citation {
  constructor(template, text) {
    // first, try matching the template
    let regexMatch = false;
    for (var r in template['regexes']) {
      regexMatch = text.match(new RegExp(template['regexes'][r], 'i'));
      if (regexMatch) {
        break;
      }
    }
    if (regexMatch) {
      log(
        '"' + text + '" matched regex for ' + template['name']
        + ', and these tokens were found:'
      );
      for (var group in regexMatch.groups) {
        if (typeof group !== 'undefined') {
          log(group + ': "' + regexMatch.groups[group] + '"');
        }
      }
      log(' ');
    }
    else {
      throw Error("The given query does not match the given template.");
    }
    
    this.tokens = regexMatch.groups;
    this.text = text;
    this.template = template['name'];
    
    // this variable will become this.processedTokens
    var tokens = {}
    Object.assign(tokens, this.tokens);
    
    // set default values for missing tokens
    for (var d in template.defaults) {
      if (!tokens[d]) {
        log(
          d + ' was not specified, so it will be set to "'
          + template.defaults[d] + '" by default'
        );
        tokens[d] = template.defaults[d];
        log(' ');
      }
    }
    
    // apply predefined operations to the found tokens
    let appliedAnOperation = false;
    if (!('operations' in template)) {
      return;
    }
    function titleCase (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
    for (var o in template.operations) {
      var operation = template.operations[o];
      var inputValue = tokens[operation['token']];
      
      // skip tokens that were not set
      if (inputValue === undefined) {
        continue;
      }
      else {
        appliedAnOperation = true;
      }
      
      // determine output token
      if ('output' in operation) {
        var output = operation['output'];
      }
      else {
        var output = operation['token'];
      }
      
      // handle case modification
      if ('case' in operation) {
        if (operation['case'] == 'upper') {
          tokens[output] = inputValue.toUpperCase();
        }
        else if (operation['case'] == 'lower') {
          tokens[output] = inputValue.toLowerCase();
        }
        else if (operation['case'] == 'title') {
          tokens[output] = inputValue.replace(/\w\S*/g, titleCase);
        }
      }
      
      // handle regex substitution
      if ('sub' in operation) {
        let regex = new RegExp(operation['sub'][0], 'ig');
        let outputValue = inputValue.replace(regex, operation['sub'][1]);
        tokens[output] = outputValue;
        log(
          'replaced all instances of regex "' + operation['sub'][0] + '" in '
          + 'token "' + operation['token'] + '" with "' + operation['sub'][1]
          + '" to set token "${output}" to "${outputValue}".'
        );
      }
      
      // handle regex lookups
      let lookupTypes = ['lookup', 'optionalLookup'];
      for (var t in lookupTypes) {
        if (lookupTypes[t] in operation) {
          let outputValue;
          
          for (var key in operation[lookupTypes[t]]) {
            let regexStr = '^(' + key + ')$';
            if (tokens[operation['token']].match(new RegExp(regexStr, 'i'))) {
              outputValue = operation[lookupTypes[t]][key];
              log(
                'Looked up ' + operation['token'] + ' "'
                + tokens[operation['token']] + '" in a table, and used that '
                + 'to set ' + output + ' to "' + outputValue + '"' 
              );
              break;
            }
          }
          if (outputValue !== undefined) {
            tokens[output] = outputValue;
          }
          else if (lookupTypes[t] == 'optionalLookup') {
            log(
              'tried to look up token "' + operation['token'] + '" in an index,'
              + 'but failed, so token "' + output + '" will not be modified.'
            );
          }
          else {
            throw Error(
              "Sorry, I can't find that" + operation['token'] + " in the " + template
            );
          }
        }
      }
      
      // Bidirectional conversion between digits and roman numerals. This method
      // is lazy and only goes up to 100, but if you need it to go higher, you
      // can just add more numeral-digit pairs to the list.
      if ('numberFormat' in operation) {
        let numerals = [
          ['I', '1'], ['II', '2'], ['III', '3'], ['IV', '4'], ['V', '5'],
          ['VI', '6'], ['VII', '7'], ['VIII', '8'], ['IX', '9'], ['X', '10'],
          ['XI', '11'], ['XII', '12'], ['XIII', '13'], ['XIV', '14'],
          ['XV', '15'], ['XVI', '16'], ['XVII', '17'], ['XVIII', '18'],
          ['XIX', '19'], ['XX', '20'], ['XXI', '21'], ['XXII', '22'],
          ['XXIII', '23'], ['XXIV', '24'], ['XXV', '25'], ['XXVI', '26'], 
          ['XXVII', '27'], ['XXVIII', '28'], ['XXIX', '29'], ['XXX', '30'],
          ['XXXI', '31'], ['XXXII', '32'], ['XXXIII', '33'], ['XXXIV', '34'],
          ['XXXV', '35'], ['XXXVI', '36'], ['XXXVII', '37'], ['XXXVIII', '38'],
          ['XXXIX', '39'], ['XL', '40'], ['XLI', '41'], ['XLII', '42'],
          ['XLIII', '43'], ['XLIV', '44'], ['XLV', '45'], ['XLVI', '46'],
          ['XLVII', '47'], ['XLVIII', '48'], ['XLIX', '49'], ['L', '50'],
          ['LI', '51'], ['LII', '52'], ['LIII', '53'], ['LIV', '54'],
          ['LV', '55'], ['LVI', '56'], ['LVII', '57'], ['LVIII', '58'],
          ['LIX', '59'], ['LX', '60'], ['LXI', '61'], ['LXII', '62'],
          ['LXIII', '63'], ['LXIV', '64'], ['LXV', '65'], ['LXVI', '66'],
          ['LXVII', '67'], ['LXVIII', '68'], ['LXIX', '69'], ['LXX', '70'],
          ['LXXI', '71'], ['LXXII', '72'], ['LXXIII', '73'], ['LXXIV', '74'],
          ['LXXV', '75'], ['LXXVI', '76'], ['LXXVII', '77'], ['LXXVIII', '78'],
          ['LXXIX', '79'], ['LXXX', '80'], ['LXXXI', '81'], ['LXXXII', '82'],
          ['LXXXIII', '83'], ['LXXXIV', '84'], ['LXXXV', '85'],
          ['LXXXVI', '86'], ['LXXXVII', '87'], ['LXXXVIII', '88'],
          ['LXXXIX', '89'], ['XC', '90'], ['XCI', '91'], ['XCII', '92'],
          ['XCIII', '93'], ['XCIV', '94'], ['XCV', '95'], ['XCVI', '96'],
          ['XCVII', '97'], ['XCVIII', '98'], ['XCIX', '99'], ['C', '100']
        ];
        // determine which format is being used to look up the other
        let key, value;
        if (operation['numberFormat'] == 'roman') {
          key = 1;
          value = 0;
        }
        else if (operation['numberFormat'] == 'digit') {
          key = 0;
          value = 1;
        }
        // perform the appropriate lookup, outputting the input value
        // unchanged if the lookup fails
        tokens[output] = inputValue;
        for (var pair in numerals) {
          if (numerals[pair][key].match(inputValue.toUpperCase())) {
            tokens[output] = numerals[pair][value];
            log(
              'translated ' + operation['token'] + ' to '
              + operation['numberFormat'] + " format if it wasn't already, and"
              + ' saved the result (' + tokens[output] + ') to ' + output
            );
            break;
          }
        }
      }
      
      // left pad with zeros
      if ('lpad' in operation) {
        let outputValue = inputValue;
        while (outputValue.length < operation['lpad']) {
          outputValue = '0' + outputValue;
        }
        tokens[output] = outputValue
        log(
          'added zeros to the beginning of ' + operation['token']
          + ' until it was ' + String(operation['lpad']) + ' characters long,'
          + ' and saved the result to ' + tokens[output]
        );
      }
    }
    if (appliedAnOperation) {
      log(' ');
    }
    this.processedTokens = tokens;
    
    // finally, fill in placeholders in the URL template to generate the
    // URL, skipping any sections of the template that contain a missing
    // placeholder.
    let URL = [];
    let missingPlaceholder = new RegExp("\\{.+\\}");
    log("filling in placeholders in each part of the URL template...");
    for (var part in template.URL) {
      let URLPart = template.URL[part]
      for (var k in this.processedTokens) {
        if (typeof this.processedTokens[k] === 'undefined') {
          continue;
        }
        let placeholder = new RegExp("\\{" + k + "\\}", 'g');
        URLPart = URLPart.replace(placeholder, this.processedTokens[k]);
      }
      if (!URLPart.match(missingPlaceholder)) {
        URL.push(URLPart);
        log('"' + template.URL[part] + '"   -->   "' + URLPart + '"')
      }
      else {
        log(
          'omitting "' + template.URL[part]
          + '" since it references a missing placeholder'
        )
      }
    }
    this.URL = URL.join('');
    log('Finished building URL: "' + this.URL + '"');
    log(' ');
  }
}

// run search from form entry
function handleSearch(event) {
  event.preventDefault()
  let query = document.getElementById("q").value;
  handleQuery(query);
}

// run search from URL parameter
function handleQuery(query) {
  try {
    // if no query provided, clear the search bar
    if (!query) {
      document.getElementById("explainer").innerHTML = "";
      return;
    }
    window.location.href = getUrlForQuery(query);
  }
  // on error, unhide the page and display explainer
  catch (error) {
    document.body.removeAttribute('hidden');
    document.getElementById("explainer").innerHTML = error.message;
  }
}

// perform each step to convert query into URL
function getUrlForQuery(query) {
  let citation = getCitations(query, true);
  return citation.URL;
}

// check the query against each template one-by-one,
// and return the tokens and template of the first match
const MATCH_ERROR = "Sorry, I couldn't recognize that citation.";
function getCitations(query, returnFirst) {
  var citations = [];
  for (var i in templates) {
    let citation = false;
    try {
      citation = new Citation(templates[i], query);
      if (returnFirst) { return citation }
      citations.push(citation);
    }
    catch (error) {
      continue;
    }
  }
  if (returnFirst) {
    log(
      '"' + query + '" did not match the regex for any template. Check the '
      + 'page source to see the templates and their regexes.'
    );
    throw Error(MATCH_ERROR);
  }
  return citations;
}
</script><form class="citeurl-form" onsubmit="handleSearch(event)">
  <input type="search" placeholder="Enter citation..." name="q" id="q"><input type="submit" value="Go"><br>
  <label for="q" id="explainer" class="citeurl-explainer"></label>
</form>
Law Search recognizes vaguely Bluebook-style citations to the following sources of law, plus a few others:

- most state and federal court cases
- the U.S. Code and Code of Federal Regulations
- the U.S. Constitution and all state constitutions
- codified laws for every state and territory except Arkansas, Georgia, Guam, and Puerto Rico

For a list of supported sources and their citation styles, see [Sources of Law](#sources-of-law).

## How it Works

Law Search is a JavaScript implementation of [CiteURL](https://raindrum.github.io/citeurl), a framework I wrote to translate citations into URLs. For each body of law that Law Search recognizes, there is a CiteURL template that defines what a citation has to look like, what its relevant fields are (e.g. volume and page number), and how to construct a URL from those fields. You can find the full list of these templates, and the websites they link to, [below](#sources-of-law).

When you type a citation into the search bar, Law Search tries to match your query against each of the templates. If your query *looks like* a valid citation to one of the supported sources of law, it translates the citation into a URL and sends you to that URL, whether it's actually valid or not.

The translation process occurs entirely in your browser, with no server-side logic or data collection. In fact, if you want to, you can even <a href="" download>download this page</a> and run it without connecting to my website; you'll just miss out on updates.

Two final notes for the more technically-inclined: First, Law Search is essentially a stripped-down version of [CiteURL](https://raindrum.github.io/citeurl), which can not only look up individual citations, but can also insert hyperlinks for every longform or shortform citation it finds in a document. Second, if you need to look up citations that Law Search doesn't support, it's not too hard to [make your own](https://raindrum.github.io/citeurl/frontends#javascript) personal instance of Law Search.

## Bookmark This Search!

You're totally welcome to use Law Search by coming to my site and typing your citation into the search bar whenever you want to look something up. But it's more convenient if you can set up a search keyword so that you can just type something like "ls 42 usc 1983" in your URL bar to look up the law.

To do that on Firefox, you can just right-click the search bar at the top of this page, and click `Add a Keyword for this Search...`.

On Chrome, go to `Settings > Manage Search Engines`. From there, click `Add`, and paste this address into the URL field:

<code id="bookmarkURL"></code>
<script>
document.getElementById("bookmarkURL").innerHTML = window.location.href.split(/\?|#/)[0] + "?%s";
</script>

For other browsers, you can follow [this guide](https://www.howtogeek.com/114176/HOW-TO-EASILY-CREATE-SEARCH-PLUGINS-ADD-ANY-SEARCH-ENGINE-TO-YOUR-BROWSER/).

## Sources of Law

Law Search supports the U.S. Code and Code of Federal Regulations, most pre-2018 state and federal court cases, and nearly every state's constitution and codified laws. It also supports a few federal rules and administrative materials like the Federal Register, as well as a few specific federal statutes like the National Labor Relations Act and the Immigration and Nationality Act.

Here's some information on the sites that Law Search links to most frequently:

- For **court opinions**, Law Search uses Harvard's [Caselaw Access Project](https://case.law/). I recommend you make a free account there so that you won't need to prove your non-robot status every time. Unfortunately, the site only supports pre-2018 cases, so anything more recent than that will be a broken link. Also note that you can go directly to a specific page of an opinion if you provide a pincite, like "338 <span>F.2d</span> 708, 715."

- For the **U.S. Code** and a number of federal rules like the FRCP, Law Search uses Cornell's [Legal Information Institute](https://www.law.cornell.edu/). If you cite a subsection of the law, you should be taken directly to the right place on the page. Unfortunately their website header gets in the way of the start of the subsection, so I recommend you hide the header with [Ublock Origin](https://ublockorigin.com/), or else get into a habit of scrolling up a little bit.

- Many major federal laws, like the Immigration and Nationality Act (INA) and National Labor Relations Act (NLRA), are often cited by reference to their original section numbers (e.g. "NLRA <span>§</span> 7") instead of the corresponding U.S. Code provisions. CiteURL supports a few such laws by translating their citations into the corresponding U.S. Code sections on the Cornell website. Note that this means that any cross-references on the resulting page will refer to the sections of the codified law, not the Act itself.

- For codified **state laws**, Law Search mostly uses individual state government websites, but when they aren't compatible, it uses [lawserver.com](https://www.lawserver.com/), or occasionally [Justia](https://law.justia.com/codes/). All U.S. states and territories are supported in some form, except for Arkansas, Georgia, Guam, and Puerto Rico, whose laws are only available on LexisNexis or on sites where generating a URL would require more information than a typical citation contains. Note that session laws and state regulations are not yet supported.

- For state constitutions, Law Search mostly uses [ballotpedia.org](https://ballotpedia.org/).

Finally, here's a complete list of all the supported bodies of law, in no particular order. If you're wondering what a citation to each source needs to look like, you can click `view regex` to see a diagram:

Source of Law | Website   | Citation Template
------------- | --------- | -----------------
United States Code | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28%5BTt%5Ditle%20%29%3F%28%5Cd%2B%29%20%28U%5C.%3F%7CUnited%29%20%3F%28S%5C.%3F%7CStates%29%20%3FC%28ode%7C%5C.%3F%29%28%20%3F%5BAS%5D%5C.%3F%7C%20Ann%28otated%7Co%3F%5C.%29%7C%20Serv%28ice%7C%5C.%29%29%3F%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F%7C%5BSs%5Dection%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F%20of%20%28%5BTt%5Ditle%20%29%3F%28%5Cd%2B%29%20of%20the%20%28U%5C.%3F%7CUnited%29%20%3F%28S%5C.%3F%7CStates%29%20%3FC%28ode%7C%5C.%3F%29%28%20%3F%5BAS%5D%5C.%3F%7C%20Ann%28otated%7Co%3F%5C.%29%7C%20Serv%28ice%7C%5C.%29%29%3F)
United States Constitution | [constitution.congress.gov](https://constitution.congress.gov) | [view regex](https://regexper.com#%28U%5C.%3F%20%3FS%5C.%3F%7CUnited%20States%29%20%3FConst%28itution%7C%5C.%29%2C%3F%20%28%5BAa%5Drt%28icle%7C%5C.%29%20%28%5B%5CdIViv%5D%7B1%2C3%7D%7C%5BOo%5Dne%7C%5BTt%5Dwo%7C%5BTt%5Dhree%7C%5BFf%5Dour%7C%5BFf%5Dive%7C%5BSs%5Dix%7C%5BSs%5Deven%29%7C%5BAa%5Dm%28endment%7C%28end%7Cdt%3F%29%3F%5C.%29%20%28%5B%5CdXIVxiv%5D%7B1%2C3%7D%29%29%28%28%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%5Cd%2B%7C%5BIVXivx%5D%7B1%2C7%7D%29%29%28%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%29%3F%29%3F%7C%28%5BAa%5Drt%28icle%7C%5C.%29%20%28%5B%5CdIViv%5D%7B1%2C3%7D%7C%5BOo%5Dne%7C%5BTt%5Dwo%7C%5BTt%5Dhree%7C%5BFf%5Dour%7C%5BFf%5Dive%7C%5BSs%5Dix%7C%5BSs%5Deven%29%7C%5BAa%5Dm%28endment%7C%28end%7Cdt%3F%29%3F%5C.%29%20%28%5B%5CdXIVxiv%5D%7B1%2C3%7D%29%29%28%28%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%5Cd%2B%7C%5BIVXivx%5D%7B1%2C7%7D%29%29%28%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%29%3F%29%3F%20%28of%7Cto%29%20the%20%28U%5C.%3F%20%3FS%5C.%3F%7CUnited%20States%29%20%3FConst%28itution%7C%5C.%29%7C%28%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%5Cd%2B%7C%5BIVXivx%5D%7B1%2C7%7D%29%28%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%29%3F%20of%20%29%3F%28%5BTt%5Dhe%20%29%3F%28%5Cd%7B1%2C2%7D%28st%7Cnd%7Crd%7Cth%29%7C%28%5BTt%5Dwenty%28-%7C%20%29%3F%29%3F%28%5BFf%5Dirst%7C%5BSs%5Decond%7C%5BTt%5Dhird%7C%5BFf%5Dourth%7C%5BFf%5Difth%7C%5BSs%5Dixth%7C%5BSs%5Deventh%7C%5BEe%5Dighth%7C%5BNn%5Dinth%29%7C%5BTt%5Denth%7C%5BEe%5Dleventh%7C%5BTt%5Dwelfth%7C%28%5BTt%5Dhir%7C%5BFf%5Dour%7C%5BFf%5Dif%7C%5BSs%5Dix%7C%5BSs%5Deven%7C%5BEe%5Digh%7C%5BNn%5Dine%29teenth%7C%5BTt%5Dwentieth%29%20%5BAa%5Dm%28endment%7Cdt%3F%5C.%7Cend%5C.%29%20%28of%7Cto%29%20the%20%28U%5C.%3F%20%3FS%5C.%3F%7CUnited%20States%29%20%3FConst%28itution%7C%5C.%29)
U.S. Public Laws | [uscode.house.gov](https://uscode.house.gov) | [view regex](https://regexper.com#Pub%28%5C.%3F%7Clic%29%20%3FL%28%5C.%3F%7Caw%29%20%3F%28No%5C.%3F%29%3F%20%3F%28%5Cd%2B%29%5B%E2%80%93%E2%80%91-%5D%28%5Cd%2B%29)
U.S. Statutes at Large | [www.govinfo.gov](https://www.govinfo.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20Stat%5C.%3F%20%28%5Cd%2B%29%28%5B%E2%80%93%E2%80%91-%5D%5Cd%2B%29%3F)
Federal Register | [www.federalregister.gov](https://www.federalregister.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20%28Fed%5C.%20%3FReg%5C.%7CF%5C.%3F%20%3FR%5C.%3F%29%20%28%5Cd%28%5B%2C%5Cd%5D%2B%5Cd%29%3F%29)
Code of Federal Regulations | [ecfr.federalregister.gov](https://ecfr.federalregister.gov) | [view regex](https://regexper.com#%28%5BTt%5Ditle%20%29%3F%28%5Cd%2B%29%20%28C%5C.%3F%20%3FF%5C.%3F%20%3FR%5C.%3F%7CCode%20of%20Federal%20Regulations%29%28%20%5BPp%5Darts%3F%7C%20%5BPp%5Dts%3F%5C.%29%3F%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Federal Rules of Civil Procedure | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28F%5C.%3F%20%3FR%5C.%3F%20%3FC%5C.%3F%20%3FP%5C.%3F%7CFed%5C.%3F%20%3FR%28%5C.%3F%7Cule%29%20%3FCiv%5C.%3F%20%3FPr%3Fo%3Fc%3F%5C.%3F%7CFederal%20Rules%3F%20of%20Civil%20Procedure%29%20%3F%28Rule%20%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5Ba-z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Federal Rules of Appellate Procedure | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28F%5C.%3F%20%3FR%5C.%3F%20%3FA%5C.%3F%20%3FP%5C.%3F%7CFed%5C.%3F%20%3FR%28%5C.%3F%7Cule%29%20%3FApp%5C.%3F%20%3FPr%3Fo%3Fc%3F%5C.%3F%7CFederal%20Rules%3F%20of%20Appellate%20Procedure%29%20%3F%28Rule%20%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5Ba-z%5D%3F%29)
Federal Rules of Criminal Procedure | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28F%5C.%3F%20%3FR%5C.%3F%20%3FCr%5C.%3F%20%3FP%5C.%3F%7CFed%5C.%3F%20%3FR%28%5C.%3F%7Cule%29%20%3FCrim%5C.%3F%20%3FPr%3Fo%3Fc%3F%5C.%3F%7CFederal%20Rules%3F%20of%20Criminal%20Procedure%29%20%3F%28Rule%20%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5Ba-z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Federal Rules of Evidence | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28F%5C.%3F%20%3FR%5C.%3F%20%3FE%5C.%3F%7CFed%5C.%3F%20R%28%5C.%3F%7Cule%29%20%3FEvid%5C.%3F%7CFederal%20Rules%3F%20of%20Evidence%29%20%3F%28Rule%20%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5Ba-z%5D%3F%29)
Immigration and Nationality Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Immigration%20%28%5BAa%5Dnd%7C%26%29%20Nationality%20Act%7CI%5C.%3FN%5C.%3FA%5C.%3F%7CI%5C.%20N%5C.%20A%5C.%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Internal Revenue Code | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Internal%20Revenue%20Code%7CI%5C.%3F%20%3FR%5C.%3F%20%3FC%5C.%3F%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Treasury Regulations | [ecfr.federalregister.gov](https://ecfr.federalregister.gov) | [view regex](https://regexper.com#Treas%28ury%7C%5C.%3F%29%20%3FReg%28ulations%3F%7C%5C.%3F%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
National Labor Relations Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28National%20Labor%20Relations%20Act%7CN%5C.%3F%20%3FL%5C.%3F%20%3FR%5C.%3F%20%3FA%5C.%3F%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
National Labor Relations Board Decisions | [www.nlrb.gov](https://www.nlrb.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20N%5C.%3F%20%3FL%5C.%3F%20%3FR%5C.%3F%20%3FB%5C.%3F%20%28%5Cd%2B%29)
National Labor Relations Board Slip Opinions | [www.nlrb.gov](https://www.nlrb.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20N%5C.%3F%20%3FL%5C.%3F%20%3FR%5C.%3F%20%3FB%5C.%3F%20%28Slip%20Op%5C.%20%29%3FNo%5C.%20%28%5Cd%2B%29)
Endangered Species Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Endangered%20Species%20Act%7CE%5C.%3F%20%3FS%5C.%3F%20%3FA%5C.%3F%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Clean Air Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28C%5C.%3F%20%3FA%5C.%3F%20%3FA%5C.%3F%7CClean%20Air%20Act%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Clean Water Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Clean%20Water%20Act%7CC%5C.%3F%20%3FW%5C.%3F%20%3FA%5C.%3F%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Fair Housing Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Fair%20Housing%20Act%7CF%5C.%3F%20%3FH%5C.%3F%20%3FA%5C.%3F%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Americans With Disabilities Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Americans%20%5BWw%5Dith%20Disabilities%20Act%7CA%5C.%20D%5C.%20A%5C.%7CA%5C.%3FD%5C.%3FA%5C.%3F%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Uniform Commercial Code | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Uniform%20Commercial%20Code%7CU%5C.%3F%20%3FC%5C.%3F%20%3FC%5C.%3F%29%28%20%3F%C2%A7%29%3F%20%28%5Cd%5Ba-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Code of Alabama, 1975 | [alisondb.legislature.state.al.us](http://alisondb.legislature.state.al.us) | [view regex](https://regexper.com#%28Ala%28bama%7C%5C.%29%7CAL%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Alabama Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Ala%28bama%7C%5C.%29%7CAL%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Alaska Statutes | [www.akleg.gov](http://www.akleg.gov) | [view regex](https://regexper.com#%28Alaska%7CAK%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29%5C.%28%5Cd%2B%5BA-Za-z%5D%3F%29%5C.%28%5Cd%2B%5BA-Za-z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Alaska Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Alaska%7CAK%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
American Samoa Code | [new.asbar.org](https://new.asbar.org) | [view regex](https://regexper.com#Am%28erican%7C%5C.%29%20%3FSamoa%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%29%5C.%28%5Cd%2B%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
American Samoa Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#Am%28erican%7C%5C.%29%20%3FSamoa%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Arkansas Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Ark%28ansas%7C%5C.%29%7CAR%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Arizona Revised Statutes | [www.azleg.gov](https://www.azleg.gov) | [view regex](https://regexper.com#%28Ariz%28ona%7C%5C.%29%7CAZ%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Arizona Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Ariz%28ona%7C%5C.%29%7CAZ%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
California Codes | [leginfo.legislature.ca.gov](https://leginfo.legislature.ca.gov) | [view regex](https://regexper.com#%28Cal%28ifornia%7C%5C.%29%7CCAL%3F%29%20%3F%28%5BBCDEFGHILMPRSUVW%5D.%7B2%2C40%7D%3F%29%28%20%3FC%28ode%7C%5C.%29%28%20Ann%28otated%7C%5C.%29%29%3F%2C%3F%29%3F%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
California Constitution | [leginfo.legislature.ca.gov](https://leginfo.legislature.ca.gov) | [view regex](https://regexper.com#%28Cal%28ifornia%7C%5C.%29%7CCAL%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Colorado Revised Statutes | [leg.colorado.gov](https://leg.colorado.gov) | [view regex](https://regexper.com#%28Colo%28rado%7C%5C.%29%7CCO%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Colorado Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Colo%28rado%7C%5C.%29%7CCO%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
General Statutes of Connecticut | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Conn%28ecticut%7C%5C.%29%7CCT%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%28%5Cd%5Ba-z%5C-%5D%2A%5B%5Cw%5D%2B%29%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Connecticut Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Conn%28ecticut%7C%5C.%29%7CCT%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Delaware Code | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28%5BTt%5Dit%28le%7C%5C.%29%20%29%3F%28%5Cd%7B1%2C2%7D%29%2C%3F%20%28Del%28aware%7C%5C.%29%7CDE%29%20%3FC%28ode%7C%5C.%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Delaware General Corporations Law | [delcode.delaware.gov](https://delcode.delaware.gov) | [view regex](https://regexper.com#%28D%5C.%3F%20%3FG%5C.%3F%20%3FC%5C.%3F%20%3FL%5C.%3F%7CDel%28aware%7C%5C.%29%20%3FGen%28eral%7C%5C.%29%20%3FCorp%28orations%3F%7Cs%3F%5C.%29%20%3FL%28aw%7C%5C.%29%29%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Delaware Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Del%28aware%7C%5C.%29%7CDE%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
District of Columbia Official Code | [code.dccouncil.us](https://code.dccouncil.us) | [view regex](https://regexper.com#%28District%20of%20Columbia%28%20Official%29%3F%7CD%5C.%3F%20%3FC%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Florida Statutes | [www.flsenate.gov](https://www.flsenate.gov) | [view regex](https://regexper.com#%28Fl%28orida%7Ca%3F%5C.%29%7CFL%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Florida Constitution | [www.flsenate.gov](https://www.flsenate.gov) | [view regex](https://regexper.com#%28Fl%28orida%7Ca%3F%5C.%29%7CFL%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Georgia Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#G%28eorgia%7Ca%5C.%7CA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BPp%5Dar%28agraph%7Ca%3F%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%29%29%3F%29%3F)
Hawaii Revised Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Haw%28ai.%3Fi%7C%5C.%29%7CHI%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Hawaii Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Haw%28ai.%3Fi%7C%5C.%29%7CHI%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Idaho Code | [legislature.idaho.gov](https://legislature.idaho.gov) | [view regex](https://regexper.com#I%28daho%7CD%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%28%5Cd%7B1%2C2%7D%29%5Cd%7B2%7D%5BA-Z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Idaho Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#I%28daho%7CD%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Illinois Compiled Statutes | [www.ilga.gov](https://www.ilga.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20ILCS%20%28%5Cd%2B%29%2F%28%28%5Cd%5B%5Cd.-%5D%2A%5Cw%7C%5Cd%29%29)
Illinois Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Il%28linois%7Cl%3F%5C.%29%7CIL%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Indiana Code | [iga.in.gov](https://iga.in.gov) | [view regex](https://regexper.com#%28Ind%28iana%7C%5C.%29%7CIN%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Indiana Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Ind%28iana%7C%5C.%29%7CIN%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Iowa Code | [www.legis.iowa.gov](https://www.legis.iowa.gov) | [view regex](https://regexper.com#I%28owa%7CA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Iowa Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#I%28owa%7CA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Kansas Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Kan%28sas%7C%5C.%29%7CKS%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Kansas Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Kan%28sas%7C%5C.%29%7CKS%29%20%3FConst%28itution%7C%5C.%29%20%3F%28%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%7C%28Bill%20of%20Rights%7CPreamble%29%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Kentucky Revised Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28K%28entucky%7Cy%5C.%7CY%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CKRS%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%28%5Cd%5B%5Cd.%5D%2A%5Cw%7C%5Cd%29%29%5C.%28%5Cd%2B%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Kentucky Constitution | [apps.legislature.ky.gov](https://apps.legislature.ky.gov) | [view regex](https://regexper.com#K%28entucky%7Cy%5C.%7CY%29%20%3FConst%28itution%7C%5C.%29%2C%3F%28%20%3F%28Art%28icle%7C%5C.%29%20%3F%29%3F%28%5BIVXivx%5D%7B1%2C7%7D%7C%5Cd%7B1%2C2%7D%7CBill%20of%20Rights%7CRights%20of%20Victims%20of%20Crime%7CDist%28ribution%7C%5C.%29%20of%20the%20Powers%20of%20Gov%28ernment%7C%28%27t%29%3F%5C.%3F%29%7C%28The%20%29%3F%28Leg%28islative%7C%28is%29%3F%5C.%29%7CExec%28utive%7C%5C.%29%7CJud%28icial%7C%5C.%29%29%20%3FDep%28artment%7C%28%27t%29%3F%5C.%3F%29%7CCounties%20%28and%7C%26%29%20County%20Seats%7CImpeachments%7C%28C%28ounty%7Cty%5C.%29%7CFisc%28al%7C%5C.%29%29%20%3FC%28ourts%7Cts%5C.%29%7CJustices%20of%20the%20Peace%7CSuff%28rage%7C%5C.%29%20%3F%28and%7C%26%29%20%3FElec%28tions%7C%5C.%29%7CMun%28icipalities%7Ci%3F%5C.%29%7CRev%28enue%7C%5C.%29%20%3F%28and%7C%26%29%20%3FTax%28ation%7C%5C.%3F%29%7CEduc%28ation%7C%5C.%29%7CCorp%28orations%3F%7Cs%3F%5C.%29%7CR%28ailroads%7C%5C.R%5C.%29%20%28and%7C%26%29%20Com%28merce%7Cm%3F%5C.%29%7C%28The%20%29%3FMilitia%7CGen%28eral%7C%5C.%29%20%3FProv%28isions%7Cs%3F%5C.%29%7CMode%20of%20Rev%28ision%7C%5C.%29%29%2C%3F%29%3F%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29)
Louisiana Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#L%28ouisiana%7Ca%5C.%7CA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%3A%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Louisiana Codes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#L%28ouisiana%7Ca%5C.%7CA%29%20%3F%28Civ%28il%7C%5C.%29%20%3FCode%7CCode%28%20of%29%3F%20%28%28Civ%28il%7C%5C.%29%7CCrim%28inal%7C%5C.%29%29%20%3FProc%28edure%7C%5C.%29%7CEvid%28ence%7C%5C.%29%29%7CChild%28ren%27%3Fs%7C%5C.%29%20%3FCode%29%28%20Ann%28otated%7C%5C.%29%29%3F%2C%3F%28%20%5BAa%5Drt%28icle%7C%5C.%29%29%3F%20%28%5Cd%2B%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Louisiana Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#L%28ouisiana%7Ca%5C.%7CA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Maine Statutes | [legislature.maine.gov](https://legislature.maine.gov) | [view regex](https://regexper.com#M%28aine%7Ce%5C.%7CE%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%2C%3F%20%5BTt%5Dit%28le%7C%5C.%29%20%3F%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Z%5D%29%3F%29%2C%3F%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Maine Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#M%28aine%7Ce%5C.%7CE%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%5BPp%5D%28art%7Ct%5C.%29%20%3F%28%5Cd%29%29%3F%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Maryland Code | [mgaleg.maryland.gov](https://mgaleg.maryland.gov) | [view regex](https://regexper.com#M%28aryland%7Cd%5C.%7CD%29%20%28Code%28%20Ann%28otated%7C%5C.%29%29%3F%2C%3F%20%29%3F%28%28Ac%7CAl%7C%5BBCEFHILNPRST%5D%29.%7B4%2C38%7D%3F%29%20%28Code%28%20Ann%28otated%7C%5C.%29%29%3F%2C%3F%20%29%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5B%5CdA-Z%5C-%E2%80%93.%5D%2A%5B%5CdA-Z%5D%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Maryland Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#M%28aryland%7Cd%5C.%7CD%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Massachusetts General Laws | [malegislature.gov](https://malegislature.gov) | [view regex](https://regexper.com#%28%28Mass%28achusetts%7C%5C.%29%7CMA%29%20%3F%28Gen%28eral%7C%5C.%29%7CAnn%28otated%7C%5C.%29%29%20%3FLaws%28%20Ann%28otated%7C%5C.%29%29%3F%7CM%5C.%3FG%5C.%3FL%5C.%3F%28A%5C.%3F%29%3F%7CA%5C.%3FL%5C.%3FM%5C.%3F%29%2C%3F%20%5BCc%5D%28hapter%7Ch%3F%5C.%29%20%3F%28%5Cd%2B%5BA-Z%5D%3F%29%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%5Cd%2B%5BA-Z%5D%3F%5Cd%2A%28%5B%2F%5D%5Cd%2B%5BA-Z%5D%3F%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Massachusetts Constitution | [malegislature.gov](https://malegislature.gov) | [view regex](https://regexper.com#%28Mass%28achusetts%7C%5C.%29%7CMA%29%20Const%28itution%7C%5C.%29%2C%3F%20%5BPp%5D%28art%7Ct%5C.%29%20%3F%28II%3F%7C1%7C2%7C%5BTt%5Dhe%20%28%5BFf%5Dirst%7C%5BSs%5Decond%29%29%28%2C%3F%20%5BCc%5D%28hapter%7Ch%3F%5C.%29%20%3F%28%5Cd%2B%7C%5BIVXivx%5D%7B1%2C7%7D%29%28%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%5Cd%2B%7C%5BIVXivx%5D%7B1%2C7%7D%29%29%3F%29%3F%28%2C%3F%20%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5Cd%2B%7C%5BIVXivx%5D%7B1%2C7%7D%29%29%3F)
Michigan Compiled Laws | [legislature.mi.gov](https://legislature.mi.gov) | [view regex](https://regexper.com#%28Mich%28igan%7C%5C.%29%7CMI%29%20Comp%28iled%7C%5C.%29%20Laws%28%20%28Serv%28ice%7C%5C.%29%7CAnn%28otated%7C%5C.%29%29%29%3F%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Michigan Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Mich%28igan%7C%5C.%29%7CMI%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Minnesota Statutes | [www.revisor.mn.gov](https://www.revisor.mn.gov) | [view regex](https://regexper.com#%28Minn%28esota%7C%5C.%29%7CMN%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%5C%28%28%5Cd%5Cw%2A%29%5C%29%28%5C%28%5Cw%2B%5C%29%29%2A%7C%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Minnesota Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Minn%28esota%7C%5C.%29%7CMN%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Mississippi Code | [law.justia.com](https://law.justia.com) | [view regex](https://regexper.com#%28Miss%28issippi%7C%5C.%29%7CMS%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Mississippi Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Miss%28issippi%7C%5C.%29%7CMS%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Missouri Revised Statutes | [revisor.mo.gov](https://revisor.mo.gov) | [view regex](https://regexper.com#%28%28M%28issouri%7Co%5C.%7CO%29%28%20Ann%28otated%7C%5C.%29%29%3F%20%3FRev%28ised%7C%5C.%29%20%3FStat%28utes%7Cs%3F%5C.%29%28%20Ann%28otated%7C%5C.%29%29%3F%7CR%5C.%3FS%5C.%3FM%5BOo%5D%5C.%3F%29%29%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Missouri Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#M%28issouri%7Co%5C.%7CO%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Montana Code | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Mont%28ana%7C%5C.%29%7CMT%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Montana Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Mont%28ana%7C%5C.%29%7CMT%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Revised Statutes of Nebraska | [www.nebraskalegislature.gov](https://www.nebraskalegislature.gov) | [view regex](https://regexper.com#%28Neb%28raska%7C%5C.%29%7CNE%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Nebraska Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Neb%28raska%7C%5C.%29%7CNE%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
New Hampshire Revised Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28New%20Hampshire%7CN%5C.%3F%20%3FH%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5B-%E2%80%93%5D%5BA-Za-z%5D%29%3F%29%3A%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Za-z%5D%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
New Hampshire Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28New%20Hampshire%7CN%5C.%3F%20%3FH%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%2C%3F%20%3F%5BPp%5D%28art%7Ct%5C.%29%20%3F%28II%3F%7C1%7C2%7C%28%5BTt%5Dhe%20%29%28%5BFf%5Dirst%7C%5BSs%5Decond%29%29%2C%3F%20%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5Cd%2B%28-%5Cw%29%3F%29)
New Jersey Statutes | [njlaw.rutgers.edu](https://njlaw.rutgers.edu) | [view regex](https://regexper.com#%28%28N%5C.%3F%20%3FJ%5C.%3F%7CNew%20Jersey%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CN%5C.%3FJ%5C.%3FS%5C.%3FA%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29%3A%28%5Cd%2B%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
New Jersey Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28N%5C.%3F%20%3FJ%5C.%3F%7CNew%20Jersey%29%20%3FConst%28itution%7C%5C.%29%2C%3F%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%7C%5BSs%5Dec%28tion%7Ct%3F%5C.%29%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%7C%5BPp%5D%28ar%28agraph%7Ca%3F%5C.%29%29%20%3F%28%5Cd%2B%29%29)
Nevada Revised Statutes | [www.leg.state.nv.us](https://www.leg.state.nv.us) | [view regex](https://regexper.com#%28%28Nev%28ada%7C%5C.%29%7CNV%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CNRS%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Nevada Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Nev%28ada%7C%5C.%29%7CNV%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
New Mexico Statutes Annotated 1978 | [nmonesource.com](https://nmonesource.com) | [view regex](https://regexper.com#%28%28New%20Mexico%7CN%5C.%3F%20%3FM%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CNMSA%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29-%28%5Cd%2B%5BA-Za-z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
New Mexico Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28New%20Mexico%7CN%5C.%3F%20%3FM%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Consolidated Laws of New York | [www.nysenate.gov](https://www.nysenate.gov) | [view regex](https://regexper.com#%28New%20York%7CN%5C.%3F%20%3FY%5C.%3F%29%20%3F%28.%7B2%2C40%7D%3F%29%28%20Law%29%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
New York Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28New%20York%7CN%5C.%3F%20%3FY%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
North Carolina General Statutes | [www.ncleg.gov](https://www.ncleg.gov) | [view regex](https://regexper.com#%28%28North%20Carolina%7CN%5C.%3F%20%3FC%5C.%3F%29%20%3FGen%28eral%7C%5C.%29%20%3FStat%28utes%7Cs%3F%5C.%3F%29%7CN%5C.%3F%20%3FC%5C.%3F%20%3FG%5C.%3F%20%3FS%5C.%3F%29%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
North Carolina Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28North%20Carolina%7CN%5C.%3F%20%3FC%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
North Dakota Century Code | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28North%20Dakota%7CN%5C.%3F%20%3FD%5C.%3F%29%20%3FCent%28ury%7C%5C.%29%20%3FCode%28%20Ann%28otated%7C%5C.%29%29%3F%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
North Dakota Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28North%20Dakota%7CN%5C.%3F%20%3FD%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Northern Mariana Islands Commonwealth Code | [cnmilaw.org](https://cnmilaw.org) | [view regex](https://regexper.com#%28%5Cd%2B%29%20N%28orthern%7C%5C.%29%20%3FMar%28iana%7C%5C.%29%20%3FI%28slands%7C%5C.%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Northern Mariana Islands Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#N%28orthern%7C%5C.%29%20%3FMar%28iana%7C%5C.%29%20%3FI%28slands%7C%5C.%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Ohio Revised Code | [codes.ohio.gov](https://codes.ohio.gov) | [view regex](https://regexper.com#O%28hio%7CH%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%29%28%5C.%28%5Cd%2B%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F%29%3F)
Ohio Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#O%28hio%7CH%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Oklahoma Statutes | [law.justia.com](https://law.justia.com) | [view regex](https://regexper.com#%28Okla%28homa%7C%5C.%29%7COK%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%2C%3F%20%5BTt%5Dit%28le%7C%5C.%29%20%3F%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Z%5D%29%3F%29%2C%3F%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Oklahoma Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Okla%28homa%7C%5C.%29%7COK%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Oregon Revised Statutes | [www.oregonlaws.org](https://www.oregonlaws.org) | [view regex](https://regexper.com#%28Or%28egon%7Ce%3F%5C.%29%7COR%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Oregon Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Or%28egon%7Ce%3F%5C.%29%7COR%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5BIVXivx%5D%7B1%2C5%7D%28-%5Cw%28%5C%28%5Cd%5C%29%29%3F%29%3F%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Pennsylvania Code | [www.pacodeandbulletin.gov](https://www.pacodeandbulletin.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20%28Pennsylvania%7CPa%5C.%7CPA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Pennsylvania Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Pennsylvania%7CPa%5C.%7CPA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Puerto Rico Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Puerto%20Rico%7CP%5C.%3F%20%3FR%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
General Laws of Rhode Island | [webserver.rilin.state.ri.us](http://webserver.rilin.state.ri.us) | [view regex](https://regexper.com#%28Rhode%20Island%7CR%5C.%3F%20%3FI%5C.%3F%29%20%3FGen%28eral%7C%5C.%29%20%3FLaws%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Rhode Island Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Rhode%20Island%7CR%5C.%3F%20%3FI%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
South Carolina Code of Laws | [www.scstatehouse.gov](https://www.scstatehouse.gov) | [view regex](https://regexper.com#%28South%20Carolina%7CS%5C.%3F%20%3FC%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
South Carolina Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28South%20Carolina%7CS%5C.%3F%20%3FC%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
South Dakota Codified Laws | [sdlegislature.gov](https://sdlegislature.gov) | [view regex](https://regexper.com#%28South%20Dakota%7CS%5C.%3F%20%3FD%5C.%3F%29%20%3F%28Codified%7CComp%28iled%7C%5C.%29%29%20Laws%28%20Ann%28otated%7C%5C.%29%29%3F%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
South Dakota Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28South%20Dakota%7CS%5C.%3F%20%3FD%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Tennessee Code | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Tenn%28essee%7C%5C.%29%7CTN%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Tennessee Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Tenn%28essee%7C%5C.%29%7CTN%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Texas Codes | [statutes.capitol.texas.gov](https://statutes.capitol.texas.gov) | [view regex](https://regexper.com#%28Tex%28as%7C%5C.%29%7CTX%29%20%28%5Cw.%7B2%2C40%7D%3F%29%28%20Code%28%20Ann%28otated%7C%5C.%29%29%3F%29%3F%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Texas Constitution | [statutes.capitol.texas.gov](https://statutes.capitol.texas.gov) | [view regex](https://regexper.com#%28Tex%28as%7C%5C.%29%7CTX%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Utah Code | [le.utah.gov](https://le.utah.gov) | [view regex](https://regexper.com#%28Utah%7CUT%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Utah Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Utah%7CUT%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Vermont Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#V%28ermont%7Ct%5C.%7CT%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%2C%3F%20%5BTt%5Dit%28le%7C%5C.%29%20%3F%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Z%5D%29%3F%29%2C%3F%28%28%2C%3F%20%29%3F%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%5C.%3F%7CSections%3F%29%3F%20%3F%28%5Cd%5B%5Cw.-%5D%2A%5Cw%7C%5Cd%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Vermont Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#V%28ermont%7Ct%5C.%7CT%29%20%3FConst%28itution%7C%5C.%29%2C%3F%20%3F%5BCc%5D%28hapter%7Ch%3F%5C.%29%20%3F%28%5BIi%5D%7B1%2C2%7D%29%28%2C%3F%20%28%5BAa%5Drt%28icle%7C%5C.%29%7C%26sect%3B%7C%26%23167%7C%C2%A7%29%20%3F%28%5Cd%2B%29%28st%7Cnd%7Cth%29%3F%29%3F)
Virginia Code | [law.lis.virginia.gov](https://law.lis.virginia.gov) | [view regex](https://regexper.com#V%28irginia%7Ca%5C.%7CA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Virginia Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#V%28irginia%7Ca%5C.%7CA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Virgin Islands Code | [law.justia.com](https://law.justia.com) | [view regex](https://regexper.com#%28Virgin%20Islands%7CV%5C.%3F%20%3FI%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%2C%3F%20%5BTt%5Dit%28le%7C%5C.%29%20%3F%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Z%5D%29%3F%29%2C%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Revised Code of Washington | [app.leg.wa.gov](https://app.leg.wa.gov) | [view regex](https://regexper.com#%28%28Wash%28ington%7C%5C.%29%7CWA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CR%5C.%3FC%5C.%3FW%5C.%3F%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29%5C.%28%5Cd%2B%5BA-Za-z%5D%3F%29%5C.%28%5Cd%2B%5BA-Za-z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Washington Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Wash%28ington%7C%5C.%29%7CWA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
West Virginia Code | [www.wvlegislature.gov](http://www.wvlegislature.gov) | [view regex](https://regexper.com#%28West%20Virginia%7CW%5C.%20%3FVa%3F%5C.%7CWV%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29-%28%5Cd%2B%5BA-Za-z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
West Virginia Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28West%20Virginia%7CW%5C.%20%3FVa%3F%5C.%7CWV%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Wisconsin Statutes | [docs.legis.wisconsin.gov](https://docs.legis.wisconsin.gov) | [view regex](https://regexper.com#%28Wis%28consin%7C%5C.%29%7CWI%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Wisconsin Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Wis%28consin%7C%5C.%29%7CWI%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Wyoming Statutes | [wyoleg.gov](https://wyoleg.gov) | [view regex](https://regexper.com#%28Wyo%28ming%7C%5C.%29%7CWY%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%28%2C%3F%20%29%3Fsub%28sections%3F%7Cdivisions%3F%7C%28sec%7Cd%28iv%29%3F%29%3Fs%3F%5C.%29%20%3F%29%3F%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%29%3F)
Wyoming Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Wyo%28ming%7C%5C.%29%7CWY%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Caselaw Access Project | [cite.case.law](https://cite.case.law) | [view regex](https://regexper.com#%28%5Cd%2B%29%20%28Abb%5C.%20Ct%5C.%20App%5C.%7CAbb%5C.N%5C.%20Cas%5C.%7CAbb%5C.%20Pr%5C.%7CAbb%5C.%20Pr%5C.%20%5C%28n%5C.s%5C.%5C%29%7CVa%5C.%20%5C%28Va%5C.%20Cas%5C.%5C%29%7CAdams%20Co%5C.%20L%5C.J%5C.%7CAdd%5C.%7CDallam%7CFranklin%20Co%5C.%20Legal%20J%5C.%7CAik%5C.%7CAla%5C.%20App%5C.%7CAla%5C.%7CAlaska%20Fed%5C.%7CAlaska%7CAm%5C.%20Samoa%7CAm%5C.%20Samoa%202d%7CAm%5C.%20Samoa%203d%7COhio%20App%5C.%20Unrep%5C.%7CAnt%5C.%20N%5C.P%5C.%20Cas%5C.%7CA%5C.D%5C.%20%3F2d%7CA%5C.D%5C.%7CA%5C.D%5C.%20%3F3d%7CKy%5C.%20%5C%28Hughes%5C%29%7CAriz%5C.%20App%5C.%7CAriz%5C.%7CArk%5C.%20App%5C.%7CArk%5C.%7CArmstrong%5C.%20Election%20Cases%7CA%5C.%7CBalt%5C.%20C%5C.%20Rep%5C.%7CBarb%5C.%20Ch%5C.%7CBarb%5C.%7CB%5C.%20Co%5C.%20Leg%5C.%20J%5C.%7CBerk%27s%20Co%5C.%20L%5C.J%5C.%5C.%7CBlackf%5C.%7CBlair%20Co%5C.%20L%5C.R%5C.%7CBlair%20Co%5C.%20L%5C.R%5C.%202d%7CBosworth%20Super%5C.%20Ct%5C.%20Rep%5C.%7CBradford%20Co%5C.%20L%5C.J%5C.%7CBrad%5C.%7CBrayt%5C.%7CBucks%20Co%5C.%20L%5C.R%5C.%7CBur%5C.%7CBur%5C.%7CButler%20Co%5C.%20Legal%20J%5C.%7CE%5C.D%5C.%20Pa%5C.%7CCai%5C.%20Cas%5C.%7CCai%5C.%7CCal%5C.%20%3FApp%5C.%7CCal%5C.%20%3FApp%5C.%20%3F5th%7CCal%5C.%20%3FApp%5C.%20%3F4th%7CCal%5C.%20%3FApp%5C.%20%3F%5B23%5Dd%7CCal%5C.%20%3F%5B23%5Dd%7CCal%5C.%20%3F%5B45%5Dth%7CCal%5C.%7CCal%5C.%20%3FSuper%5C.%20%3FCt%5C.%7CCal%5C.%20%3FUnrep%5C.%7CCambria%20Co%5C.%20L%5C.J%5C.%7CCambria%20Co%5C.%20Rep%5C.%7CCarbon%20Co%5C.%20L%5C.J%5C.%7CN%5C.C%5C.%20%5C%28Car%5C.%20L%5C.%20Rep%5C.%5C%29%7CN%5C.J%5C.%20%5C%28Manumission%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28McMul%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Chev%5C.%5C%29%7CTapp%5C.%20Rep%5C.%7CD%5C.%20Pa%5C.%7COhio%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Chev%5C.%20Eq%5C.%5C%29%7CMonaghan%7CSadler%7CKy%5C.%20%5C%28Litt%5C.%20Sel%5C.%20Cas%5C.%5C%29%7CC%5C.C%5C.L%5C.J%5C.%7CC%5C.C%5C.L%5C.J%5C.%202d%7CS%5C.C%5C.%20Eq%5C.%20%5C%28McCord%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Ril%5C.%20Eq%5C.%5C%29%7CChand%5C.%7CCharlton%20Rep%5C.%7CChes%5C.%20Co%5C.%20Rep%5C.%7CD%5C.%20Chip%5C.%7CN%5C.%20Chip%5C.%7CMun%5C.%20%20L%5C.%20Rep%5C.%7CHosea%27s%20Rep%5C.%7CN%5C.Y%5C.%20City%20Ct%5C.%20Rep%5C.%7CCl%5C.%20Ch%5C.%7CCole%5C.%20%26%20Cai%5C.%20Cas%5C.%7CCole%5C.%20Cas%5C.%7CColo%5C.%20App%5C.%7CColo%5C.%20L%5C.%20Rep%5C.%7CColo%5C.%20N%5C.%20P%5C.%7CColo%5C.%7CWillson%7CWhite%20%26%20W%5C.%7CN%5C.C%5C.%20%5C%28Cam%5C.%20%26%20Nor%5C.%5C%29%7CKing%27s%20Conflicting%20Cases%7CConn%5C.%20App%5C.%7CConn%5C.%20Cir%5C.%20Ct%5C.%7CKirby%7CRoot%7CConn%5C.%7CConn%5C.%20Supp%5C.%7CConnoly%20Sur%5C.%20Rep%5C.%7CCt%5C.%20Cl%5C.%7CC%5C.C%5C.P%5C.A%5C.%7CCt%5C.%20Cust%5C.%7CCow%5C.%7CCraw%5C.%20Co%5C.%20Leg%5C.%20J%5C.%7CCumberland%20L%5C.J%5C.%7CCust%5C.%20B%5C.%20%26%20Dec%5C.%7CDakota%7CDallam%7CDall%5C.%7CDaly%20%5C%28N%5C.Y%5C.%5C%29%7CDau%5C.%20Co%5C.%20Rep%5C.%7CDay%7CT%5C.C%5C.A%5C.%7CP%5C.R%5C.%20Dec%5C.%7CTeiss%5C.%7CVa%5C.%20Ch%5C.%20Dec%5C.%7CKy%5C.%20%5C%28Sneed%5C%29%7CPears%5C.%7CSmith%7CGa%5C.%20Super%5C.%20Ct%5C.%7CGeorgia%20Decisions%7CC%5C.M%5C.A%5C.%7CDel%5C.%20Cas%5C.%7CDel%5C.%20Ch%5C.%7CDel%5C.%20Co%5C.%20Reps%5C.%7CDel%5C.%20%5C%28Harr%5C.%5C%29%7CDel%5C.%20%5C%28Penne%5C.%5C%29%7CDel%5C.%20%5C%28Boyce%5C%29%7CDel%5C.%20%5C%28Marv%5C.%5C%29%7CDel%5C.%20%5C%28Houst%5C.%5C%29%7CDel%5C.%7CDem%5C.%20Sur%5C.%7CDenio%7CDocket%7CDudley%20Rep%5C.%7CDuer%20Super%5C.%20Ct%5C.%20Rep%5C.%7CEdm%5C.%20Sel%5C.%20Cas%5C.%7CE%5C.D%5C.%20Smith%7CEdw%5C.%20Ch%5C.%7CS%5C.C%5C.%20Eq%5C.%20%5C%28McMul%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Speers%20Eq%5C.%5C%29%7CErie%5C.%20Co%5C.%20L%5C.J%5C.%7CP%5C.R%5C.%20Sent%5C.%7CFay%5C.%20L%5C.J%5C.%7CF%5C.%20Cas%5C.%7CFed%5C.%20Cl%5C.%7CF%5C.%7CF%5C.%20%3F2d%7CF%5C.%20%3F3d%7CF%5C.R%5C.D%5C.%7CF%5C.%20%3FSupp%5C.%28%20%3F%5B23%5Dd%29%3F%7CFla%5C.%7CFla%5C.%20Supp%5C.%7CFla%5C.%20Supp%5C.%202d%7CGa%5C.%20App%5C.%7CGa%5C.%20L%5C.%20Rep%5C.%7CGa%5C.%7CGault%7CGibb%5C.%20Surr%5C.%7CGuam%7CHall%20Super%5C.%20Ct%5C.%20Rep%5C.%7CH%5C.%20%26%20G%5C.%7CHaw%5C.%20App%5C.%7CHaw%5C.%7CHaz%5C.%20Pa%5C.%20Reg%5C.%7CVa%5C.%20%5C%28Hen%5C.%20%26%20M%5C.%5C%29%7CHill%20%26%20Den%5C.%7CHill%7CHilt%5C.%7CHoff%5C.%20Ch%5C.%7CHopk%5C.%20Ch%5C.%7CHow%5C.%20App%5C.%20Cas%5C.%7CHow%5C.%20Pr%5C.%7CHow%5C.%20Pr%5C.%20%5C%28n%5C.s%5C.%5C%29%7CIdaho%7CIll%5C.%20App%5C.%7CIll%5C.%20App%5C.%202d%7CIll%5C.%20App%5C.%203d%7CIll%5C.%20Cir%5C.%20Ct%5C.%20Rep%5C.%7CIll%5C.%20Ct%5C.%20Cl%5C.%7CIll%5C.%20%5C%28Scam%5C%29%7CIll%5C.%20%5C%28Breese%5C%29%7CIll%5C.%20%5C%28Gilm%5C.%5C%29%7CIll%5C.%7CIll%5C.%202d%7CInd%5C.%20App%5C.%7CInd%5C.%20L%5C.%20Rep%5C.%7CInd%5C.%7CIndian%20Terr%5C.%7CIowa%7CJeff%5C.%7CJohns%5C.%20Cas%5C.%7CJohns%5C.%20Ch%5C.%7CJohns%5C.%7CJones%20and%20Spencer%27s%20Super%5C.%20Ct%5C.%20Rep%5C.%7CEdsall%7CPa%5C.%20%5C%28Admiralty%5C%29%7CKan%5C.%20App%5C.%202d%7CKan%5C.%7CKy%5C.%20%5C%28A%5C.K%5C.%20Marsh%5C.%5C%29%7CKy%5C.%20Op%5C.%7CKy%5C.%7CKeyes%7CLack%5C.%20Bar%5C.%20R%5C.%7CLack%5C.%20Bar%20%20R%5C.%7CLack%5C.%20Jur%5C.%7CLack%5C.%20L%5C.%20N%5C.%7CLack%5C.%20L%5C.R%5C.%7CLanc%5C.%20Bar%7CLanc%5C.%20L%5C.%20Rev%5C.%7CLans%5C.%20Ch%5C.%7CLans%5C.%7CLaw%5C.%20L%5C.J%5C.%7CLaw%20Times%7CLaw%20Times%20%5C%28N%5C.S%5C.%5C%29%7CLebanon%20Co%5C.%20L%5C.J%5C.%7CFoster%7CLeg%5C.%20Gaz%5C.%7CLeg%5C.%20Gaz%5C.%7CPa%5C.%20Leg%5C.%20Gaz%5C.%7CGunby%7CLeg%5C.%20Rec%5C.%20Rep%5C.%7CLehigh%20Co%5C.%20L%5C.J%5C.%7CLehigh%20Val%5C.%20L%5C.%20Rep%5C.%7CLiquor%20Tax%20Rep%5C.%7CLock%5C.%20Rev%5C.%20Cas%5C.%7CLa%5C.%20Ann%5C.%7CLa%5C.%20App%5C.%7CLa%5C.%7CLa%5C.%7CLuz%5C.%20L%5C.J%5C.%7CLuz%5C.%20L%5C.O%5C.%7CLuz%5C.%20Leg%5C.%20Reg%5C.%7CLuz%5C.%20Leg%5C.%20Reg%5C.%7CLycoming%20R%5C.%7CMagis%5C.%20%26%20Const%5C.%7CMe%5C.%7CMcGrath%7CN%5C.C%5C.%20%5C%28Mart%5C.%5C%29%7CMart%5C.%20%5C%28n%5C.s%5C.%5C%29%7CMart%5C.%20%5C%28o%5C.s%5C.%5C%29%7CMd%5C.%20App%5C.%7CMd%5C.%7CH%5C.%20%26%20McH%5C.%7CMass%5C.%20%5C%28Allen%5C%29%7CMass%5C.%20App%5C.%20Ct%5C.%7CMass%5C.%20App%5C.%20Dec%5C.%7CDavis%20L%5C.%20Ct%5C.%20Cas%5C.%7CDavis%20L%5C.%20Ct%5C.%20Cas%5C.%7CMass%5C.%20%5C%28Cush%5C%29%7CMass%5C.%20%5C%28Pick%5C.%5C%29%7CMass%5C.%20%5C%28Gray%5C%29%7CMass%5C.%20%5C%28Tyng%5C%29%7CMass%5C.%20%5C%28Will%5C.%5C%29%7CMass%5C.%20%5C%28Met%5C.%5C%29%7CMass%5C.%7CMass%5C.%20Supp%5C.%7CMercer%7CMich%5C.%20App%5C.%20%7CHowell%20N%5C.P%5C.%7CMich%5C.%7CM%5C.C%5C.L%5C.J%5C.%7CMills%20Surr%5C.%7CMinn%5C.%7CMinor%7CVa%5C.%7CMiss%5C.%20Ct%5C.%20Rec%5C.%7CMiss%5C.%20Dec%5C.%7CMiss%5C.%20%5C%28Walker%5C%29%7CMiss%5C.%7CMiss%5C.%20%5C%28Howard%5C%29%7CMiss%5C.%20%5C%28S%5C.%20%26%20M%5C.%5C%29%7CMor%5C.%20St%5C.%20Cas%5C.%7CMo%5C.%20App%5C.%7CMo%5C.%7CMonroe%20L%5C.R%5C.%7CMont%5C.%7CMont%5C.%20Co%5C.%20L%5C.%20Rep%5C.%7CNavajo%20Rptr%5C.%7CNeb%5C.%20App%5C.%7CNeb%5C.%7CNev%5C.%7CN%5C.H%5C.%7CN%5C.J%5C.%20Eq%5C.%7CN%5C.J%5C.L%5C.%7CN%5C.J%5C.%20Misc%5C.%7CN%5C.J%5C.%7CN%5C.J%5C.%20Super%5C.%7CN%5C.J%5C.%20Tax%20Ct%5C.%7CN%5C.M%5C.%7CN%5C.M%5C.%7CN%5C.Y%5C.%20Crim%5C.%7CMisc%5C.%20%3F2d%7CMisc%5C.%20%3F3d%7CMisc%5C.%7CN%5C.Y%5C.%20%3F2d%7CN%5C.Y%5C.%7CN%5C.Y%5C.%20%3F3d%7CN%5C.Y%5C.%20St%5C.%20Rptr%5C.%7CNortham%5C.%20Law%20Rep%5C.%7CN%5C.C%5C.%20App%5C.%7CN%5C.C%5C.%7CN%5C.C%5C.%20%5C%28Busb%5C.%20Eq%5C%29%7CN%5C.C%5C.%20%5C%28Busb%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Dev%5C.%20%26%20Bat%5C.%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Dev%5C.%20%26%20Bat%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Dev%5C.%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Dev%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Hawks%5C%29%7CN%5C.C%5C.%20%5C%28Hayw%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Ired%5C.%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Ired%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Jones%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Jones%5C%29%7CN%5C.C%5C.%20%5C%28Mur%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Phil%5C.%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Phil%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Tay%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Win%5C.%5C%29%7CN%5C.D%5C.%7CN%5C.%20%3FE%5C.%7CN%5C.E%5C.%20%3F%5B23%5Dd%7CN%5C.%20E%5C.%20%5B23%5Dd%7CN%5C.%20Mar%5C.%20I%5C.%20Commw%5C.%7CN%5C.%20Mar%5C.%20I%5C.%7CNorthum%5C.%20Co%5C.%20Leg%5C.%20N%5C.%7CNorthumb%5C.%20L%5C.J%5C.%7CN%5C.%20%3FW%5C.%7CN%5C.W%5C.%20%3F2d%7CN%5C.%20W%5C.%202d%7COhio%20App%5C.%7COhio%20App%5C.%202d%7COhio%20App%5C.%203d%7COhio%20C%5C.C%5C.%20Dec%5C.%7COhio%20C%5C.C%5C.%20%5C%28N%5C.S%5C.%5C%29%7COhio%20Cir%5C.%20Dec%5C.%7COhio%20Ct%5C.%20App%5C.%7COhio%20Misc%5C.%7COhio%20Misc%5C.%202d%7COhio%20Nisi%20Prius%7COhio%20Nisi%20Prius%20%5C%28N%5C.S%5C.%5C%29%7COhio%20Op%5C.%202d%7COhio%20Op%5C.%203d%7COhio%20Op%5C.%7COhio%20St%5C.%7COhio%20St%5C.%20%5C%28n%5C.s%5C.%5C%29%7COhio%20St%5C.%202d%7COhio%20St%5C.%203d%7COkla%5C.%20Crim%5C.%7COkla%5C.%7COlwine%27s%20L%5C.J%5C.%7COr%5C.%7COr%5C.%20App%5C.%7COr%5C.%20Tax%7CP%5C.%7CP%5C.%20%3F2d%7CP%5C.%20%3F3d%7CPaige%20Ch%5C.%7CPark%5C.%20Crim%5C.%20Rep%5C.%7CPelt%5C.%7CPa%5C.%20L%5C.%20Rec%5C.%7CPa%5C.%20Commw%5C.%7CPa%5C.%20Corp%5C.%20R%5C.%7CPa%5C.%20Co%5C.%20Ct%5C.%7CPa%5C.%20D%5C.%20%26%20C%5C.%202d%7CPa%5C.%20D%5C.%20%26%20C%5C.%7CPa%5C.%20D%5C.%20%26%20C%5C.%203d%7CPa%5C.%20D%5C.%20%26%20C%5C.%205th%7CPa%5C.%20D%5C.%20%26%20C%5C.%204th%7CPa%5C.%20Fid%5C.%7CPa%5C.%20Fid%5C.%202d%7CPa%5C.%20Fid%5C.%203d%7CPa%5C.%20Just%5C.%20L%5C.%20Rep%5C.%7CPa%5C.%20L%5C.J%5C.%20Rep%5C.%7CPa%5C.%7CPa%5C.%20Super%5C.%20Ct%5C.%7CPennyp%5C.%7CPhila%5C.%20Co%5C.%20R%5C.%7CPhila%5C.%20Reports%7CPin%5C.%7CPittsb%5C.%20L%5C.J%5C.%7CPitts%5C.%20R%5C.%7CPort%5C.%7CP%5C.R%5C.%20Fed%5C.%7CPow%5C.%20Surr%5C.%7CMich%5C.%20Pr%5C.%7CSinger%20Prob%5C.%20Cas%5C.%7CN%5C.Y%5C.%20Proc%5C.%20Ct%5C.%20Ass%5C.%7CP%5C.R%5C.%7CRec%5C.%20Q%5C.%20Ct%5C.%7CRec%5C.%20Ct%5C.%20Assistants%7CRec%5C.%20Co%5C.%20Ch%5C.%20%5C%28S%5C.C%5C.%5C%29%7CRec%5C.%20Ct%5C.%20Gen%5C.%20Sess%5C.%7CRec%5C.%20Bucks%5C.%20Co%5C.%20%5C%28Pa%5C.%5C%29%7CRec%5C.%20T%5C.%20Warwick%20%5C%28R%5C.I%5C.%5C%29%7CRec%5C.%20Ct%5C.%20Ches%5C.%20Co%5C.%20Pa%5C.%7CRec%5C.%20Co%5C.%20Ct%5C.%7CRec%5C.%20V%5C.A%5C.%20Ct%5C.%20%5C%28R%5C.I%5C.%5C%29%7CRedf%5C.%7CS%5C.C%5C.L%5C.%20%5C%28Ril%5C.%5C%29%7CCt%5C.%20Cl%5C.%7CMich%5C.%20Ct%5C.%20Cl%5C.%7CApp%5C.%20D%5C.C%5C.%7CBro%5C.%20Com%5C.%20P%5C.%7CAshm%5C.%20%5C%28Pa%5C.%5C%29%7CConn%5C.%20Super%5C.%20Ct%5C.%7CConn%5C.%20Super%5C.%20Ct%5C.%7CDisney%20%5C%28Ohio%5C%29%7CBinn%5C.%7CPen%5C.%20%26%20W%5C.%7CRawle%7CSerg%5C.%20%26%20Rawl%5C.%7CWatts%20%26%20Serg%5C.%7CWhart%5C.%7CYeates%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Des%5C.Eq%5C.%5C%29%7CKy%5C.%20%5C%28Hard%5C.%5C%29%7CHandy%7CSuper%5C.%20Ct%5C.%20Jud%5C.%7CTenn%5C.%20%5C%28Hayw%5C.%5C%29%7CGrant%7CD%5C.C%5C.%20%5C%28MacArth%5C.%20%26%20M%5C.%5C%29%7CD%5C.C%5C.%20%5C%28Tuck%5C.%20%26%20Cl%5C.%5C%29%7CJahn%7CS%5C.C%5C.L%5C.%20%5C%28Strob%5C.%5C%29%7CGill%7CG%5C.%20%26%20J%5C.%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Dud%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Bail%5C.%5C%29%7CN%5C.Y%5C.%7CWalk%5C.%20Ch%5C.%7CTenn%5C.%20Crim%5C.%20App%5C.%7CH%5C.%20%26%20J%5C.%7CWilson%7CMiss%5C.%20%5C%28S%5C.%20%26%20M%5C.%20Ch%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Bay%5C%29%7CMorris%7CWatts%7CTenn%5C.%20%5C%28Mart%5C.%20%26%20Yer%5C.%5C%29%7CTenn%5C.%20%5C%28Cold%5C.%5C%29%7CTenn%5C.%20%5C%28Heisk%5C.%5C%29%7CTenn%5C.%20%5C%28Yer%5C.%5C%29%7CTenn%5C.%20%5C%28Head%5C%29%7CTenn%5C.%20%5C%28Meigs%5C%29%7CTenn%5C.%20%5C%28Hum%5C.%5C%29%7CD%5C.C%5C.%7CD%5C.C%5C.%20%5C%28MacArth%5C.%5C%29%7CD%5C.C%5C.%20%5C%28Mackey%5C%29%7CDoug%5C.%7CArk%5C.%20Terr%5C.%20Rep%5C.%7CMcGl%5C.%7CD%5C.C%5C.%20%5C%28patent%5C%29%7CKy%5C.%20%5C%28Bibb%5C%29%7CKy%5C.%20%5C%28Litt%5C.%5C%29%7CKy%5C.%20%5C%28T%5C.B%5C.%20Mon%5C.%5C%29%7CKy%5C.%20%5C%28B%5C.%20Mon%5C.%5C%29%7CWright%7COhio%20Ch%5C.%7CKy%5C.%20%5C%28J%5C.J%5C.%20Marsh%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Speers%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Rich%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Rice%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Rich%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Dud%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Hill%5C%29%7CHay%5C.%20%26%20Haz%5C.%7CD%5C.C%5C.%20Cir%5C.%7CD%5C.C%5C.%20%5C%28Cranch%5C%29%7CBrightly%7CWalker%7CInd%5C.%20App%5C.%7CKan%5C.%20App%5C.%7CMd%5C.%20Ch%5C.%7CMd%5C.%20Ch%5C.%7CFreem%5C.%20Ch%5C.%7CWilcox%7CS%5C.C%5C.L%5C.%20%5C%28McCord%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Nott%20%26%20McC%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Harp%5C.%5C%29%7CHarr%5C.%20Ch%5C.%7CMiles%7CCal%5C.%20%3FDist%5C.%20Ct%5C.%7CMcCahon%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Rice%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Rich%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Hill%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Rich%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Rich%5C.%20Cas%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Strobh%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Bail%5C.%20Eq%5C.%5C%29%7CGreene%7CMyrick%7CD%5C.%20Haw%5C.%7CRep%5C.%20Cont%5C.%20Elect%5C.%20Case%5C.%7CRep%5C.%20Cont%5C.%20El%5C.%7CHowison%7CCoffey%7CCharlton%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Harp%5C.%20Eq%5C.%5C%29%7CBrewster%7CS%5C.C%5C.L%5C.%20%5C%28Mill%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Tread%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Brev%5C.%5C%29%7CMass%5C.%20App%5C.%20Div%5C.%7CMass%5C.%20App%5C.%20Div%5C.%7CGoebel%7CKy%5C.%20%5C%28Dana%5C%29%7CKy%5C.%20%5C%28Duv%5C.%5C%29%7CKy%5C.%20%5C%28Met%5C.%5C%29%7CKy%5C.%20%5C%28Bush%5C%29%7CVaux%7CTenn%5C.%20%5C%28Swan%5C%29%7CTenn%5C.%20%5C%28Sneed%5C%29%7CBradf%5C.%7CT%5C.C%5C.%7CB%5C.T%5C.A%5C.%7CR%5C.I%5C.%20Ct%5C.%20Rec%5C.%7CR%5C.I%5C.%20Dec%5C.%7CR%5C.I%5C.%7CSuper%5C.%20Ct%5C.%20%5C%28R%5C.I%5C.%5C%29%7CRobertson%27s%20Super%5C.%20Ct%5C.%20Rep%5C.%7CRob%5C.%7CSand%5C.%20Ch%5C.%7CSandford%20Super%5C.%20Ct%5C.%20Rep%5C.%7CSarat%5C.%20Ch%5C.%20Sent%5C.%7CSchuy%5C.%20L%5C.%20Rec%5C.%7CSchuy%5C.%20Reg%5C.%7CSeld%5C.%20Notes%7CYates%7CParsons%7CSick%5C.%20Op%5C.%20Att%27y%20Gen%5C.%7CSilv%5C.%20Ct%5C.%20App%5C.%7CSilv%5C.%20Sup%5C.%7CSmith%7CSom%5C.%20L%5C.J%5C.%7CS%5C.C%5C.%7CS%5C.D%5C.%7CS%5C.%20%3FE%5C.%7CS%5C.E%5C.%20%3F2d%7CS%5C.%20E%5C.%202d%7CSo%5C.%7CSo%5C.%20%3F2d%7CSo%5C.%20%3F3d%7CS%5C.%20%3FW%5C.%7CS%5C.W%5C.%20%3F%5B23%5Dd%7CS%5C.%20W%5C.%20%5B23%5Dd%7CStew%5C.%7CStew%5C.%20%26%20P%5C.%7CS%5C.C%5C.D%5C.C%5C.%20%5C%28N%5C.S%5C.%5C%29%7CN%5C.Y%5C.%20Sup%5C.%20Ct%5C.%7CSusq%5C.%20Leg%5C.%20Chron%5C.%7CSweeney%20Super%5C.%20Ct%5C.%20Rep%5C.%7CRobards%7CN%5C.C%5C.%20%5C%28Taylor%5C%29%7CLa%5C.%20App%5C.%20%5C%28Teiss%5C.%5C%29%7CTenn%5C.%20App%5C.%7CTenn%5C.%20Cas%5C.%7CTenn%5C.%20Ch%5C.%20R%5C.%7CTenn%5C.%7CTenn%5C.%20%5C%28Peck%5C%29%7CTenn%5C.%20%5C%28Cooke%5C%29%7CTenn%5C.%20%5C%28Overt%5C.%5C%29%7CTex%5C.%20Civ%5C.%20App%5C.%7CTex%5C.%20Ct%5C.%20App%5C.%7CTex%5C.%20Crim%5C.%7CTex%5C.%20L%5C.%20R%5C.%7CTex%5C.%7CPosey%7CN%5C.J%5C.%20%5C%28Burlington%20County%20Ct%5C.%5C%29%7CCin%5C.%20Sup%5C.%20Ct%5C.%20Rep%5C.%7CCom%5C.%20Pl%5C.%20Rep%5C.%7CPa%5C.%20Dist%5C.%7CMass%5C.%20Law%20Rep%5C.%7CMich%5C.%20N%5C.P%5C.%20R%5C.%7CWestchester%7COhio%20Law%20Abs%5C.%7COhio%20L%5C.R%5C.%7CAld%5C.%7CThomp%5C.%20%26%20Cook%7CBlume%20Sup%5C.%20Ct%5C.%20Trans%5C.%7CTrans%5C.%20App%5C.%7CTuck%5C.%20Surr%5C.%7CTyl%5C.%7CCl%5C.%20Ct%5C.%7CU%5C.S%5C.%20App%5C.%20D%5C.C%5C.%7CCt%5C.%20Int%27l%20Trade%7CCust%5C.%20Ct%5C.%7CU%5C.%20%3FS%5C.%7CU%5C.S%5C.%20%5C%28Black%5C%29%7CU%5C.S%5C.%20%5C%28Cranch%5C%29%7CU%5C.S%5C.%20%5C%28Dall%5C.%5C%29%7CU%5C.S%5C.%20%5C%28How%5C.%5C%29%7CU%5C.S%5C.%20%5C%28Pet%5C.%5C%29%7CU%5C.S%5C.%20%5C%28Wall%5C.%5C%29%7CU%5C.S%5C.%20%5C%28Wheat%5C.%5C%29%7CMann%5C.%20Unrep%5C.%20Cas%5C.%7CBlume%20Unrep%5C.%20Op%5C.%7CUnrep%5C.%20Tenn%5C.%20Cas%5C.%7CCal%5C.%7CUtah%7CUtah%202d%7CVt%5C.%7CVa%5C.%20Cir%5C.%7CVa%5C.%20Col%5C.%20Dec%5C.%7CVa%5C.%20App%5C.%7CVa%5C.%20Dec%5C.%7CVa%5C.%20%5C%28Rand%5C.%5C%29%7CVa%5C.%20%5C%28Munf%5C.%5C%29%7CVa%5C.%20%5C%28Wash%5C.%5C%29%7CVa%5C.%7CVa%5C.%20%5C%28Gratt%5C.%5C%29%7CVa%5C.%20%5C%28Gilmer%5C%29%7CVa%5C.%20%5C%28Call%5C%29%7CVa%5C.%20%5C%28Patt%5C.%20%26%20Heath%5C%29%7CVa%5C.%20%5C%28Rob%5C.%5C%29%7CVa%5C.%20%5C%28Leigh%5C%29%7CV%5C.I%5C.%7CWash%5C.%20App%5C.%7CWash%5C.%20Co%5C.%5C%28Pa%5C.%5C%29%7CWash%5C.%7CWash%5C.%202d%7CWash%5C.%20Terr%5C.%7CWeek%5C.%20No%5C.%20Cas%5C.%20%5C%28Pa%5C.%5C%29%7CWend%5C.%7CWes%5C.%20C%5C.L%5C.J%5C.%7CTribal%7CA%5C.%20%3F2d%7CA%5C.%20%3F3d%7CB%5C.R%5C.%7CF%5C.%20App%27%3Fx%5C.%3F%7CHaw%5C.%7CM%5C.J%5C.%7CN%5C.Y%5C.S%5C.%202d%7CN%5C.Y%5C.S%5C.%202d%7CN%5C.Y%5C.S%5C.%7CVet%5C.%20App%5C.%7CW%5C.%20Va%5C.%7CWheel%5C.%20Cr%5C.%20Cas%5C.%7CWis%5C.%7CWis%5C.%202d%7CWyo%5C.%7CYates%20Sel%5C.%20Cas%5C.%7CYork%20Leg%5C.%20Rec%5C.%29%20%28%5Cd%2B%29%5Cb%28%2C%3F%28%20at%29%3F%20%28%5Cd%2B%29%28%28%5B-%E2%80%91%E2%80%93%5D%7C%20to%20%7C%20through%20%29%28%5Cd%2B%29%7C%28%2C%3F%20%29%3F%28footnote%7Cf%3Fn%5C.%29%20%3F%28%5Cd%2B%29%29%3F%5Cb%29%3F)

If you find an issue with one of these, or if there's a source of law you'd like to see added, please open a ticket [here](https://github.com/raindrum/citeurl/issues)!

---

By the way, if you get a lot of use out of Law Search and want to support the project, you can use the link below:

<a href="https://ko-fi.com/simonsherred"><button>☕ Buy me a coffee</button></a>