Slug: lawsearch
Date: 2020-11-24
Hide_Body: True
Modified: 2021-03-02


Type a legal citation into the box below, and I'll try to send you to whatever it references:

<form class="main-search" onsubmit="handleSearch(event)">
    <input type="search" placeholder="Enter citation..." name="q" id="q"><input type="submit" value="Go">
    <br>
    <label for="q" id="explainer" class="search-label"></label>
</form>
<script>
const schemas =
[{
    "name": "United States Code",
    "regex": "(Title )?(?<title>\\d+) (U\\.?|United) ?(S\\.?|States) ?(C\\.?|Code)( ?[AS]\\.?)? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/uscode/text/{title}/{section}",
        "#{subsection}"
    ],
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }]
}, {
    "name": "United States Constitution",
    "regex": "(^|(U\\.? ?S\\.?|United States) ?Const(itution|\\.),? )([Aa]rt(icle|\\.) (?<article>[\\dIViv]{1,3})|[Aa]m(endment|(end|dt?)?\\.) (?<amendment>[\\dXIVxiv]{1,3}))((,? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>\\d+))((,? ([Cc]l(ause|\\.) ?(?<clause>\\d+))))?)?",
    "URL": ["https://constitution.congress.gov/browse/",
        "amendment-{amendment}/",
        "article-{article}",
        "#{article_roman}_S{section}",
        "#{amendment}_S{section}",
        "_C{clause}"
    ],
    "mutations": [{
        "token": "article",
        "case": "lower"
    }, {
        "token": "amendment",
        "case": "lower"
    }],
    "substitutions": [{
        "token": "article",
        "outputToken": "article_roman",
        "useRegex": true,
        "index": {
            "1|i": "I",
            "2|ii": "II",
            "3|iii": "III",
            "4|iv": "IV",
            "5|v": "V",
            "6|vi": "VI",
            "7|vii": "VII"
        }
    }, {
        "token": "article",
        "useRegex": true,
        "allowUnmatched": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }, {
        "token": "amendment",
        "useRegex": true,
        "allowUnmatched": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }]
}, {
    "name": "U.S. Public Laws",
    "regex": "Pub(\\.?|lic) ?L(\\.?|aw) ?(No\\.?)? ?(?<congress>\\d+)[–‑-](?<law>\\d+)",
    "URL": ["https://uscode.house.gov/statutes/pl/{congress}/{law}.pdf"]
}, {
    "name": "U.S. Statutes at Large",
    "regex": "(?<volume>\\d+) Stat\\.? (?<page>\\d+)([–‑-]\\d+)?",
    "URL": ["https://www.govinfo.gov/content/pkg/STATUTE-{volume}/pdf/STATUTE-{volume}-Pg{page}.pdf"]
}, {
    "name": "Federal Register",
    "regex": "(?<volume>\\d+) (Fed\\. ?Reg\\.|F\\.? ?R\\.?) (?<page>\\d([,\\d]+\\d)?)",
    "URL": ["https://www.federalregister.gov/documents/search?conditions[term]={volume}+FR+{page}"],
    "mutations": [{
        "token": "page",
        "omit": ","
    }]
}, {
    "name": "Code of Federal Regulations",
    "regex": "(Title )?(?<title>\\d+) (C\\.? ?F\\.? ?R\\.?|Code of Federal Regulations)( [Pp]arts?| [Pp]ts?\\.)? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://ecfr.federalregister.gov/cfr-reference?cfr%5Bdate%5D=current&cfr%5Breference%5D={title} CFR {section}",
        "#p-{section}{subsection}"
    ]
}, {
    "name": "Federal Rules of Civil Procedure",
    "regex": "(F\\.? ?R\\.? ?C\\.? ?P\\.?|Fed\\.? ?R(\\.?|ule) ?Civ\\.? ?Pr?o?c?\\.?|Federal Rules? of Civil Procedure) ?(Rule )?(?<rule>\\d+[a-z]?)( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/rules/frcp/rule_{rule}",
        "#rule_{rule}_{subsection}"
    ],
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }]
}, {
    "name": "Federal Rules of Appellate Procedure",
    "regex": "(F\\.? ?R\\.? ?A\\.? ?P\\.?|Fed\\.? ?R(\\.?|ule) ?App\\.? ?Pr?o?c?\\.?|Federal Rules? of Appellate Procedure) ?(Rule )?(?<rule>\\d+[a-z]?)",
    "URL": ["https://www.law.cornell.edu/rules/frap/rule_{rule}"]
}, {
    "name": "Federal Rules of Criminal Procedure",
    "regex": "(F\\.? ?R\\.? ?Cr\\.? ?P\\.?|Fed\\.? ?R(\\.?|ule) ?Crim\\.? ?Pr?o?c?\\.?|Federal Rules? of Criminal Procedure) ?(Rule )?(?<rule>\\d+[a-z]?)( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/rules/frcrmp",
        "/rule_{rule}",
        "#rule_{rule}_{subsection}"
    ],
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }]
}, {
    "name": "Federal Rules of Evidence",
    "regex": "(F\\.? ?R\\.? ?E\\.?|Fed\\.? R(\\.?|ule) ?Evid\\.?|Federal Rules? of Evidence) ?(Rule )?(?<rule>\\d+[a-z]?)",
    "URL": ["https://www.law.cornell.edu/rules/fre/rule_{rule}"]
}, {
    "name": "Immigration and Nationality Act",
    "regex": "(Immigration ([Aa]nd|&) Nationality Act|I\\.? ?N\\.? ?A\\.?) ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/uscode/text/{title}/{section}",
        "#{subsection}"
    ],
    "defaults": {
        "title": "8"
    },
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }],
    "substitutions": [{
        "token": "section",
        "index": {
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
    }]
}, {
    "name": "Internal Revenue Code",
    "regex": "(Internal Revenue Code|I\\.? ?R\\.? ?C\\.?) ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/uscode/text/{title}/{section}",
        "#{subsection}"
    ],
    "defaults": {
        "title": "26"
    },
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }]
}, {
    "name": "Treasury Regulations",
    "regex": "Treas(ury|\\.?) ?Reg(ulations?|\\.?) ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://ecfr.federalregister.gov/cfr-reference?cfr%5Bdate%5D=current&cfr%5Breference%5D={title} CFR {section}",
        "#p-{section}{subsection}"
    ],
    "defaults": {
        "title": "26"
    },
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }]
}, {
    "name": "National Labor Relations Act",
    "regex": "(Natioanal Labor Relations Act|N\\.? ?L\\.? ?R\\.? ?A\\.?) ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/uscode/text/{title}/{section}",
        "#{subsection}"
    ],
    "defaults": {
        "title": "29"
    },
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }],
    "substitutions": [{
        "token": "section",
        "index": {
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
    }]
}, {
    "name": "National Labor Relations Board Decisions",
    "regex": "(?<volume>\\d+) N\\.? ?L\\.? ?R\\.? ?B\\.? (?<page>\\d+)",
    "URL": ["https://www.nlrb.gov/cases-decisions/decisions/board-decisions?search_term=&volume={volume}&page_number={page}"]
}, {
    "name": "National Labor Relations Board Slip Opinions",
    "regex": "(?<volume>\\d+) N\\.? ?L\\.? ?R\\.? ?B\\.? (Slip Op\\. )?No\\. (?<slip>\\d+)",
    "URL": ["https://www.nlrb.gov/cases-decisions/decisions/board-decisions?search_term=&volume={volume}&slip_opinion_number={slip}"]
}, {
    "name": "Endangered Species Act",
    "regex": "(Endangered Species Act|E\\.? ?S\\.? ?A\\.?) ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/uscode/text/{title}/{section}",
        "#{subsection}"
    ],
    "defaults": {
        "title": "16"
    },
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }],
    "substitutions": [{
        "token": "section",
        "index": {
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
    }]
}, {
    "name": "Clean Air Act",
    "regex": "C\\.? ?A\\.? ?A\\.? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/uscode/text/{title}/{section}",
        "#{subsection}"
    ],
    "defaults": {
        "title": "42"
    },
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }],
    "substitutions": [{
        "token": "section",
        "index": {
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
    }]
}, {
    "name": "Clean Water Act",
    "regex": "(Clean Water Act|C\\.? ?W\\.? ?A\\.?) ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/uscode/text/{title}/{section}",
        "#{subsection}"
    ],
    "defaults": {
        "title": "33"
    },
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }],
    "substitutions": [{
        "token": "section",
        "index": {
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
    }]
}, {
    "name": "Fair Housing Act",
    "regex": "(Fair Housing Act|F\\.? ?h\\.? ?A\\.?) ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/uscode/text/{title}/{section}",
        "#{subsection}"
    ],
    "defaults": {
        "title": "42"
    },
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }],
    "substitutions": [{
        "token": "section",
        "index": {
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
    }]
}, {
    "name": "Americans With Disabilities Act",
    "regex": "(Americans [Ww]ith Disabilities Act|A\\.? ?D\\.? ?A\\.?) ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/uscode/text/{title}/{section}",
        "#{subsection}"
    ],
    "defaults": {
        "title": "42"
    },
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }],
    "substitutions": [{
        "token": "section",
        "index": {
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
    }]
}, {
    "name": "Uniform Commercial Code",
    "regex": "(Uniform Commercial Code|U\\.? ?C\\.? ?C\\.?)( ?§)? (?<article>\\d[a-z]?)\\W+(?<section>\\d+)( ?(?<subsection>(\\(\\w+\\))+|((\\w{1,5}) ?)+))?",
    "URL": ["https://www.law.cornell.edu/ucc/{article}/{article}-{section}",
        "#{article}-{section}{subsection}"
    ],
    "mutations": [{
        "token": "subsection",
        "splitter": "\\W",
        "joiner": "_"
    }]
}, {
    "name": "Code of Alabama, 1975",
    "regex": "(Ala(bama|\\.)|AL)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://alisondb.legislature.state.al.us/alison/CodeOfAlabama/1975/{title}-{chapter}-{section}.htm"],
    "mutations": [{
        "token": "title",
        "case": "upper"
    }, {
        "token": "chapter",
        "case": "upper"
    }]
}, {
    "name": "Alabama Constitution",
    "regex": "(Ala(bama|\\.)|AL) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Alabama_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Alaska Statutes",
    "regex": "(Alaska|AK)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Za-z]?)\\.(?<chapter>\\d+[A-Za-z]?)\\.(?<section>\\d+[A-Za-z]?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["http://www.akleg.gov/basis/statutes.asp#{title}.{chapter}.{section}"]
}, {
    "name": "Alaska Constitution",
    "regex": "(Alaska|AK) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Alaska_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "American Samoa Code",
    "regex": "Am(erican|\\.) ?Samoa( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+)\\.(?<section>\\d+)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://new.asbar.org/code-annotated/{title}-{section}"]
}, {
    "name": "American Samoa Constitution",
    "regex": "Am(erican|\\.) ?Samoa ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_American_Samoa_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Arkansas Constitution",
    "regex": "(Ark(ansas|\\.)|AR) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{arabic_article},_Arkansas_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "arabic_article",
        "useRegex": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }]
}, {
    "name": "Arizona Revised Statutes",
    "regex": "(Ariz(ona|\\.)|AZ)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.azleg.gov/viewdocument/?docName=https://www.azleg.gov/ars/{title}/{lpad}{section}.htm"],
    "mutations": [{
        "token": "section",
        "splitter": "\\.",
        "joiner": "-"
    }],
    "substitutions": [{
        "token": "section",
        "outputToken": "lpad",
        "useRegex": true,
        "index": {
            "\\d{5}(\\D\\d+)?": "",
            "\\d{4}(\\D\\d+)?": "0",
            "\\d{3}(\\D\\d+)?": "00",
            "\\d{2}(\\D\\d+)?": "000",
            "\\d(\\D\\d+)?": "0000"
        }
    }]
}, {
    "name": "Arizona Constitution",
    "regex": "(Ariz(ona|\\.)|AZ) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{arabic_article},_Arizona_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "arabic_article",
        "useRegex": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }]
}, {
    "name": "California Codes",
    "regex": "(Cal(ifornia|\\.)|CAL?) ?(?<code>[BCDEFGHILMPRSUVW].{2,40}?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode={codeAcronym}&sectionNum={section}"],
    "mutations": [{
        "token": "code",
        "case": "upper"
    }],
    "substitutions": [{
        "token": "code",
        "outputToken": "codeAcronym",
        "useRegex": true,
        "index": {
            "Bus(iness|\\.) (and|&) Prof(essions|s?\\.)|B\\.? ?& ?P\\.?|BPC": "BPC",
            "Civ(il|\\.)|CIV": "CIV",
            "(Code( of)? )?(Civil Procedure|Civ\\. ?P(roc?)?\\.)|CCP": "CCP",
            "Commercial|Comm?\\.|COM": "COM",
            "Educ(ation|\\.)|EDU?C": "EDC",
            "Elec(tions|\\.)|ELEC": "ELEC",
            "Evid(ence|\\.)|EVID": "EVID",
            "Fam(ily|\\.)|FAM": "FAM",
            "Fin(ancial|\\.)|FIN": "FIN",
            "Fish (and|&) Game|FGC|F&G": "FGC",
            "Food (and|&) Agric(ultural|\\.)|FAC": "FAC",
            "Gov(ernment|'?t\\.?)|GOV": "GOV",
            "Harb(ors|\\.) (and|&) Nav(igation|\\.)|HNC|H&N": "HNC",
            "Health (and|&) Safety|HSC|H&S": "HSC",
            "Ins(urance|\\.)|INS": "INS",
            "Lab(or|\\.)|LAB": "LAB",
            "Mil(itary|\\.) (and|&) Vet(erans|\\.)|MVC|M&V": "MVC",
            "Penal|PEN": "PEN",
            "Prob(ate|\\.)|PROB": "PROB",
            "Pub(lic|\\.) Cont(ract|\\.)|PCC": "PCC",
            "Pub(lic|\\.) Res(ources|\\.)|PRC": "PRC",
            "Pub(lic|\\.) Util(ities|s?\\.)|PUC": "PUC",
            "Rev(enue|\\.) (and|&) Tax(ation|\\.)|RTC|R&T": "RTC",
            "St(reets|s\\.) (and|&) High(ways|\\.)|SHC|S&H": "SHC",
            "Unemp(loyment|\\.) Ins(urance|(ur)?\\.)|UIC": "UIC",
            "Veh(icle|(ic)?\\.)|VEH": "VEH",
            "Water|WAT": "WAT",
            "Welf(are|\\.) (and|&) Inst(itutions|s?\\.)|WIC": "WIC"
        }
    }]
}, {
    "name": "California Constitution",
    "regex": "(Cal(ifornia|\\.)|CAL?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://leginfo.legislature.ca.gov/faces/codes_display{displayType}.xhtml?lawCode=CONS",
        "&article={roman_article}",
        "&sectionNum=SEC.%20{section}."
    ],
    "defaults": {
        "displayType": "Text"
    },
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }, {
        "token": "section",
        "outputToken": "displayType",
        "useRegex": true,
        "allowUnmatched": true,
        "index": {
            ".+": "Section"
        }
    }]
}, {
    "name": "Colorado Revised Statutes",
    "regex": "(Colo(rado|\\.)|CO)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?)[-‑–](?<article>\\d+(\\.\\d+)?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?(,? \\((?<year>\\d{4})\\))?",
    "URL": ["https://leg.colorado.gov/sites/default/files/images/olls/crs{year}-title-{title}.pdf#search={lpad}{title}-{article}-{section}."],
    "defaults": {
        "year": "2020"
    },
    "substitutions": [{
        "token": "title",
        "outputToken": "lpad",
        "useRegex": true,
        "index": {
            "\\d{2}": "",
            "\\d": "0"
        }
    }, {
        "token": "year",
        "allowUnmatched": true,
        "useRegex": true,
        "index": {
            "1[89]\\d{2}|200\\d|201[0-2]": "2020"
        }
    }]
}, {
    "name": "Colorado Constitution",
    "regex": "(Colo(rado|\\.)|CO) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Colorado_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "General Statutes of Connecticut",
    "regex": "(Conn(ecticut|\\.)|CT)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<section>(\\d[a-z\\-]*\\w|\\d+))(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/connecticut/ct-laws/connecticut_statutes_{section}"]
}, {
    "name": "Connecticut Constitution",
    "regex": "(Conn(ecticut|\\.)|CT) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Connecticut_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Delaware Code",
    "regex": "(Del(aware|\\.)|DE)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?,? [Tt]it(le|\\.) ?(?<title>\\d+([-‑–][A-Z])?),? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/delaware/de-code/delaware_code_title_{title}_{section}"],
    "mutations": [{
        "token": "section",
        "case": "lower"
    }]
}, {
    "name": "Delaware General Corporations Law",
    "regex": "(D\\.? ?G\\.? ?C\\.? ?L\\.?|Del(aware|\\.) ?Gen(eral|\\.) ?Corp(orations?|s?\\.) ?L(aw|\\.)) ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://delcode.delaware.gov/title8/c001/sc{subchapter}/index.shtml#{section}."],
    "substitutions": [{
        "token": "section",
        "outputToken": "subchapter",
        "useRegex": true,
        "index": {
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
    }]
}, {
    "name": "Delaware Constitution",
    "regex": "(Del(aware|\\.)|DE) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Delaware_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "District of Columbia Official Code",
    "regex": "(District of Columbia( Official)?|D\\.? ?C\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://code.dccouncil.us/dc/council/code/sections/{title}-{section}.html",
        "#{subsection}"
    ]
}, {
    "name": "Florida Statutes",
    "regex": "(Fl(orida|a?\\.)|FL)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>(\\(\\w+\\))+)?(,? \\((?<year>\\d{4})\\))?",
    "URL": ["https://www.flsenate.gov/Laws/Statutes/{year}/{lpad}{chapter}.{section}"],
    "defaults": {
        "year": "2020"
    },
    "substitutions": [{
        "token": "chapter",
        "outputToken": "lpad",
        "useRegex": true,
        "index": {
            "\\d{4}": "",
            "\\d{3}": "0",
            "\\d{2}": "00",
            "\\d{1}": "000"
        }
    }]
}, {
    "name": "Florida Constitution",
    "regex": "(Fl(orida|a?\\.)|FL) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://www.flsenate.gov/Laws/Constitution#A{arabic_article}",
        "S{lpad}{section}"
    ],
    "substitutions": [{
        "token": "section",
        "outputToken": "lpad",
        "useRegex": true,
        "index": {
            "\\d{2}": "",
            "\\d": "0"
        }
    }, {
        "token": "article",
        "outputToken": "arabic_article",
        "useRegex": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }]
}, {
    "name": "Georgia Constitution",
    "regex": "G(eorgia|a\\.|A) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Pp]ar(agraph|a?\\.) ?(?<paragraph>[\\dIVXivx]{1,8})))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Georgia_Constitution"],
    "defaults": {
        "paragraph": "1"
    },
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Hawaii Revised Statutes",
    "regex": "(Haw(ai.?i|\\.)|HI)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/hawaii/hi-statutes/hawaii_statutes_{chapter}-{section}"]
}, {
    "name": "Hawaii Constitution",
    "regex": "(Haw(ai.?i|\\.)|HI) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Hawaii_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Idaho Code",
    "regex": "I(daho|D)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Z]?)[-‑–](?<section>(?<chapter>\\d{1,2})\\d{2}[A-Z]?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://legislature.idaho.gov/statutesrules/idstat/Title{title}/T{title}CH{chapter}/SECT{title}-{section}/"]
}, {
    "name": "Idaho Constitution",
    "regex": "I(daho|D) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Idaho_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Illinois Compiled Statutes",
    "regex": "(?<chapter>\\d+) ILCS (?<act>\\d+)/(?<section>(\\d[\\d.-]*\\w|\\d))",
    "URL": ["https://www.ilga.gov/legislation/ilcs/fulltext.asp?DocName={chlpad}{chapter}{actlpad}{act}0K{section}"],
    "substitutions": [{
        "token": "chapter",
        "outputToken": "chlpad",
        "useRegex": true,
        "index": {
            "\\d{4}": "",
            "\\d{3}": "0",
            "\\d{2}": "00",
            "\\d{1}": "000"
        }
    }, {
        "token": "act",
        "outputToken": "actlpad",
        "useRegex": true,
        "index": {
            "\\d{4}": "",
            "\\d{3}": "0",
            "\\d{2}": "00",
            "\\d{1}": "000"
        }
    }]
}, {
    "name": "Illinois Constitution",
    "regex": "(Il(linois|l?\\.)|IL) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Illinois_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Indiana Code",
    "regex": "(Ind(iana|\\.)|IN)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+)-(?<article>\\d+(\\.\\d+)?)-(?<chapter>\\d+(\\.\\d+)?)-(?<section>\\d+(\\.\\d+)?)(,? \\((?<year>\\d{4})\\))?",
    "URL": ["https://iga.in.gov/legislative/laws/{year}/ic/titles/{lpad}{title}#{title}-{article}-{chapter}-{section}"],
    "defaults": {
        "year": "2020"
    },
    "substitutions": [{
        "token": "title",
        "outputToken": "lpad",
        "useRegex": true,
        "index": {
            "\\d{2}": "0",
            "\\d": "0"
        }
    }]
}, {
    "name": "Indiana Constitution",
    "regex": "(Ind(iana|\\.)|IN) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{arabic_article},_Indiana_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "arabic_article",
        "useRegex": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }]
}, {
    "name": "Iowa Code",
    "regex": "I(owa|A)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.legis.iowa.gov/docs/code/{chapter}.{section}.pdf"]
}, {
    "name": "Iowa Constitution",
    "regex": "I(owa|A) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Iowa_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Kansas Statutes",
    "regex": "(Kan(sas|\\.)|KS)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/kansas/ks-statutes/kansas_statutes_{chapter}-{section}"]
}, {
    "name": "Kansas Constitution",
    "regex": "(Kan(sas|\\.)|KS) ?Const(itution|\\.) ?([Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})|(?<part>Bill of Rights|Preamble))(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/",
        "Article_{arabic_article}",
        "{part}",
        ",_Kansas_Constitution",
        "#Section_{section}"
    ],
    "mutations": [{
        "token": "part",
        "splitter": " ",
        "joiner": "_"
    }],
    "substitutions": [{
        "token": "article",
        "outputToken": "arabic_article",
        "useRegex": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }]
}, {
    "name": "Kentucky Revised Statutes",
    "regex": "(K(entucky|y\\.|Y)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|KRS )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>(\\d[\\d.]*\\w|\\d))\\.(?<section>\\d+)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/kentucky/ky-statutes/kentucky_statutes_{chapter}-{section}"],
    "mutations": [{
        "token": "chapter",
        "case": "lower",
        "splitter": "\\.",
        "joiner": "-"
    }]
}, {
    "name": "Louisiana Statutes",
    "regex": "L(ouisiana|a\\.|A)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Z]?):(?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/louisiana/la-laws/louisiana_revised_statutes_{title}-{section}"]
}, {
    "name": "Louisiana Codes",
    "regex": "L(ouisiana|a\\.|A) ?(?<code>Civ(il|\\.) ?Code|Code( of)? ((Civ(il|\\.)|Crim(inal|\\.)) ?Proc(edure|\\.)|Evid(ence|\\.))|Child(ren'?s|\\.) ?Code)( Ann(otated|\\.))?,?( [Aa]rt(icle|\\.))? (?<article>\\d+)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/louisiana/la-codes/louisiana_{code_slug}_{article}"],
    "substitutions": [{
        "token": "code",
        "outputToken": "code_slug",
        "useRegex": true,
        "index": {
            "Civ(il|\\.) ?Code": "civil_code",
            "Code( of)? Civ(il|\\.) ?Proc(edure|\\.)": "code_of_civil_procedure",
            "Code( of)? Crim(inal|\\.) ?Proc(edure|\\.)": "code_of_criminal_procedure",
            "Code( of)? Evid(ence|\\.)": "code_of_evidence",
            "Child(ren'?s|\\.) ?Code": "childrens_code"
        }
    }]
}, {
    "name": "Louisiana Constitution",
    "regex": "L(ouisiana|a\\.|A) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Louisiana_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Maine Statutes",
    "regex": "M(aine|e\\.|E)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?,? [Tt]it(le|\\.) ?(?<title>\\d+([-‑–][A-Z])?),? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://legislature.maine.gov/legis/statutes/{title}/title{title}sec{section}.html"],
    "mutations": [{
        "token": "title",
        "splitter": "—",
        "joiner": "-"
    }, {
        "token": "section",
        "splitter": "—",
        "joiner": "-"
    }]
}, {
    "name": "Maine Constitution",
    "regex": "M(aine|e\\.|E) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Maine_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Maryland Code",
    "regex": "M(aryland|d\\.|D)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?(?<article>(Ac|Al|[BCEFHILNPRST]).{4,38}?) ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Z]?)[-‑–](?<section>[\\dA-Z\\-–.]*[\\dA-Z])(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article={article_code}&section={title}-{section}"],
    "mutations": [{
        "token": "section",
        "splitter": "–",
        "joiner": "-"
    }],
    "substitutions": [{
        "token": "article",
        "outputToken": "article_code",
        "useRegex": true,
        "index": {
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
            "Pub(lic|\\.) ?Safety": "gps",
            "Pub(lic|\\.) ?Util(ity|\\.)": "gpu",
            "Real Prop(erty|\\.)": "grp",
            "State Fin(ance|\\.) (and|&) Proc(urement|\\.)": "gsf",
            "State Gov(ernment|'t)": "gsg",
            "State Pers(onnel|\\.) (and|&) Pens(ions|\\.)": "gsp",
            "Tax ?[-–] ?Gen(eral|\\.)": "gtg",
            "Tax ?[-–] ?Prop(erty|\\.)": "gtp",
            "Transp(ortation|\\.)": "gtr"
        }
    }]
}, {
    "name": "Maryland Constitution",
    "regex": "M(aryland|d\\.|D) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Maryland_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Massachusetts General Laws",
    "regex": "((Mass(achusetts|\\.)|MA) ?(Gen(eral|\\.)|Ann(otated|\\.)) ?Laws( Ann(otated|\\.))?|M\\.?G\\.?L\\.?(A\\.?)?|A\\.?L\\.?M\\.?),? [Cc](hapter|h?\\.) ?(?<chapter>\\d+[A-Z]?),? ((&sect;|&#167|§){1,2}|Sect?(ions?|s?\\.))? ?(?<section>\\d+[A-Z]?\\d*([/]\\d+[A-Z]?)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://malegislature.gov/GeneralLaws/GoTo?ChapterGoTo={chapter}&SectionGoTo={section}"],
    "mutations": [{
        "token": "section",
        "splitter": "/",
        "joiner": "~"
    }]
}, {
    "name": "Michigan Compiled Laws",
    "regex": "(Mich(igan|\\.)|MI) Comp(iled|\\.) Laws( (Serv(ice|\\.)|Ann(otated|\\.)))? ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://legislature.mi.gov/doc.aspx?mcl-{chapter}-{section}"]
}, {
    "name": "Michigan Constitution",
    "regex": "(Mich(igan|\\.)|MI) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Michigan_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Minnesota Statutes",
    "regex": "(Minn(esota|\\.)|MN)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>\\((?<subdivision>\\d\\w*)\\)(\\(\\w+\\))*|(\\(\\w+\\))+)?",
    "URL": ["https://www.revisor.mn.gov/statutes/cite/{chapter}.{section}",
        "#stat.{chapter}.{section}.{subdivision}"
    ]
}, {
    "name": "Minnesota Constitution",
    "regex": "(Minn(esota|\\.)|MN) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Minnesota_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Mississippi Code",
    "regex": "(Miss(issippi|\\.)|MS)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?(,? \\((?<year>\\d{4})\\))?",
    "URL": ["https://law.justia.com/codes/mississippi/{year}/title-{title}/chapter-{chapter}/section-{title}-{chapter}-{section}/index.html"],
    "defaults": {
        "year": "2019"
    }
}, {
    "name": "Mississippi Constitution",
    "regex": "(Miss(issippi|\\.)|MS) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Mississippi_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Missouri Revised Statutes",
    "regex": "((M(issouri|o\\.|O)( Ann(otated|\\.))? ?Rev(ised|\\.) ?Stat(utes|s?\\.)( Ann(otated|\\.))?|R\\.?S\\.?M[Oo]\\.?)) ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://revisor.mo.gov/main/OneSection.aspx?section={chapter}.{section}"]
}, {
    "name": "Missouri Constitution",
    "regex": "M(issouri|o\\.|O) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Missouri_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Montana Code",
    "regex": "(Mont(ana|\\.)|MT)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/montana/mt-code/montana_code_{title}-{chapter}-{section}"]
}, {
    "name": "Montana Constitution",
    "regex": "(Mont(ana|\\.)|MT) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Montana_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Revised Statutes of Nebraska",
    "regex": "(Neb(raska|\\.)|NE)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.nebraskalegislature.gov/laws/statutes.php?statute={chapter}-{section}"]
}, {
    "name": "Nebraska Constitution",
    "regex": "(Neb(raska|\\.)|NE) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Nebraska_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "New Hampshire Revised Statutes",
    "regex": "(New Hampshire|N\\.? ?H\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+([-–][A-Za-z])?):(?<section>\\d+([-‑–][A-Za-z])?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/new-hampshire/nh-statutes/new_hampshire_revised_statutes_{chapter}_{section}"],
    "mutations": [{
        "token": "chapter",
        "splitter": "[–‑]",
        "joiner": "-",
        "case": "lower"
    }, {
        "token": "section",
        "splitter": "–",
        "joiner": "-",
        "case": "lower"
    }]
}, {
    "name": "New Jersey Statutes",
    "regex": "((N\\.? ?J\\.?|New Jersey)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|N\\.?J\\.?S\\.?A )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Za-z]?):(?<chapter>\\d+[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?[A-Za-z]?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://njlaw.rutgers.edu/collections/njstats/showsect.php?title={title}&chapter={chapter}&section={section}&actn=getsect"]
}, {
    "name": "New Jersey Constitution",
    "regex": "(N\\.? ?J\\.?|New Jersey) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_New_Jersey_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Nevada Revised Statutes",
    "regex": "((Nev(ada|\\.)|NV)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|NRS )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.leg.state.nv.us/NRS/NRS-{lpad}{chapter}.html#NRS{lpad}{chapter}Sec{section}"],
    "substitutions": [{
        "token": "chapter",
        "outputToken": "lpad",
        "useRegex": true,
        "index": {
            "\\d{3}[A-Z]?": "",
            "\\d{2}[A-Z]?": "0",
            "\\d{1}[A-Z]?": "00"
        }
    }]
}, {
    "name": "Nevada Constitution",
    "regex": "(Nev(ada|\\.)|NV) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{arabic_article},_Nevada_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "arabic_article",
        "useRegex": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }]
}, {
    "name": "New Mexico Statutes Annotated 1978",
    "regex": "((New Mexico|N\\.? ?M\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|NMSA )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Za-z]?)-(?<article>\\d+[A-Za-z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://nmonesource.com/nmos/nmsa/en/item/{chapter_code}/index.do#!b/{chapter}-{article}-{section}"],
    "substitutions": [{
        "token": "chapter",
        "outputToken": "chapter_code",
        "index": {
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
    }]
}, {
    "name": "New Mexico Constitution",
    "regex": "(New Mexico|N\\.? ?M\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_New_Mexico_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Consolidated Laws of New York",
    "regex": "(New York|N\\.? ?Y\\.?) ?(?<chapter>.{2,40}?)( Law)? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.nysenate.gov/legislation/laws/{chapterAcronym}/{section}"],
    "substitutions": [{
        "token": "chapter",
        "outputToken": "chapterAcronym",
        "useRegex": true,
        "index": {
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
            "Village|VIL": "VIL",
            "Vol(unteer|\\.) Ambul(ance|\\.) Workers'? Benefit|VAW": "VAW",
            "Vol(unteer|\\.) Fire(fighters'?|\\.) Ben(efit|\\.)|VOL": "VOL"
        }
    }]
}, {
    "name": "New York Constitution",
    "regex": "(New York|N\\.? ?Y\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_New_York_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "North Carolina General Statutes",
    "regex": "((North Carolina|N\\.? ?C\\.?) ?Gen(eral|\\.) ?Stat(utes|s?\\.)|N\\.? ?C\\.? ?G\\.? ?S\\.?) ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_{chapter}/GS_{chapter}-{section}.html"]
}, {
    "name": "North Carolina Constitution",
    "regex": "(North Carolina|N\\.? ?C\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_North_Carolina_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "North Dakota Century Code",
    "regex": "(North Dakota|N\\.? ?D\\.?) ?Cent(ury|\\.) ?Code( Ann(otated|\\.))? ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/north-dakota/nd-code/north_dakota_code_{title}_{chapter_lpad}{chapter}_{section_lpad}{section}"],
    "mutations": [{
        "token": "title",
        "splitter": "\\.",
        "joiner": "-"
    }, {
        "token": "chapter",
        "splitter": "\\.",
        "joiner": "-"
    }],
    "substitutions": [{
        "token": "chapter",
        "outputToken": "chapter_lpad",
        "useRegex": true,
        "allowUnmatched": true,
        "index": {
            "\\d{2}(\\D\\d+)?": "",
            "\\d(\\D\\d+)?": "0"
        }
    }, {
        "token": "section",
        "outputToken": "section_lpad",
        "useRegex": true,
        "allowUnmatched": true,
        "index": {
            "\\d{2}(\\D\\d+)?": "",
            "\\d(\\D\\d+)?": "0"
        }
    }]
}, {
    "name": "North Dakota Constitution",
    "regex": "(North Dakota|N\\.? ?D\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_North_Dakota_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Northern Mariana Islands Commonwealth Code",
    "regex": "(?<title>\\d+) N(orthern|\\.) ?Mar(iana|\\.) ?I(slands|\\.)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://cnmilaw.org/pdf/cmc_section/T{title}/{section}.pdf"]
}, {
    "name": "Northern Mariana Islands Constitution",
    "regex": "N(orthern|\\.) ?Mar(iana|\\.) ?I(slands|\\.) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Northern_Mariana_Islands_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Ohio Revised Code",
    "regex": "O(hio|H)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+)(\\.(?<section>\\d+)(?<subsection>(\\(\\w+\\))+)?)?",
    "URL": ["https://codes.ohio.gov/orc/{chapter}",
        ".{section}v1"
    ]
}, {
    "name": "Ohio Constitution",
    "regex": "O(hio|H) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Ohio_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Oklahoma Statutes",
    "regex": "(Okla(homa|\\.)|OK)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?,? [Tt]it(le|\\.) ?(?<title>\\d+([-‑–][A-Z])?),? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))(?<subsection>(\\(\\w+\\))+)?(,? \\((?<year>\\d{4})\\))?",
    "URL": ["https://law.justia.com/codes/oklahoma/{year}/title-{title}/section-{title}-{section}/index.html"],
    "defaults": {
        "year": "2019"
    },
    "mutations": [{
        "token": "title",
        "case": "lower"
    }]
}, {
    "name": "Oklahoma Constitution",
    "regex": "(Okla(homa|\\.)|OK) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Oklahoma_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Oregon Revised Statutes",
    "regex": "(Or(egon|e?\\.)|OR)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.oregonlaws.org/ors/{chapter}.{section}"]
}, {
    "name": "Oregon Constitution",
    "regex": "(Or(egon|e?\\.)|OR) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Oregon_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Pennsylvania Code",
    "regex": "(?<title>\\d+) (Pennsylvania|Pa\\.|PA)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/{lpad}{title}/chapter{chapter}/s{chapter}.{section}.html"],
    "substitutions": [{
        "token": "title",
        "outputToken": "lpad",
        "useRegex": true,
        "index": {
            "\\d{3}": "",
            "\\d{2}": "0",
            "\\d{1}": "00"
        }
    }]
}, {
    "name": "Pennsylvania Constitution",
    "regex": "(Pennsylvania|Pa\\.|PA) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Pennsylvania_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Puerto Rico Constitution",
    "regex": "(Puerto Rico|P\\.? ?R\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Puerto_Rico_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "General Laws of Rhode Island",
    "regex": "(Rhode Island|R\\.? ?I\\.?) ?Gen(eral|\\.) ?Laws ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["http://webserver.rilin.state.ri.us/Statutes/TITLE{title}/{title}-{chapter}/{title}-{chapter}-{section}.HTM"]
}, {
    "name": "Rhode Island Constitution",
    "regex": "(Rhode Island|R\\.? ?I\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Rhode_Island_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "South Carolina Code of Laws",
    "regex": "(South Carolina|S\\.? ?C\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.scstatehouse.gov/code/t{title}c{lpad}{chapter}.php#{title}-{chapter}-{section}"],
    "substitutions": [{
        "token": "chapter",
        "outputToken": "lpad",
        "useRegex": true,
        "index": {
            "\\d{3}": "",
            "\\d{2}": "0",
            "\\d": "00"
        }
    }]
}, {
    "name": "South Carolina Constitution",
    "regex": "(South Carolina|S\\.? ?C\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_South_Carolina_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "South Dakota Codified Laws",
    "regex": "(South Dakota|S\\.? ?D\\.?) ?(Codified|Comp(iled|\\.)) Laws( Ann(otated|\\.))? ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://sdlegislature.gov/Statutes/Codified_Laws/DisplayStatute.aspx?Type=Statute&Statute={title}-{chapter}-{section}"]
}, {
    "name": "South Dakota Constitution",
    "regex": "(South Dakota|S\\.? ?D\\.?) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_South_Dakota_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Tennessee Code",
    "regex": "(Tenn(essee|\\.)|TN)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/tennessee/tn-code/tennessee_code_{title}-{chapter}-{section}"]
}, {
    "name": "Tennessee Constitution",
    "regex": "(Tenn(essee|\\.)|TN) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Tennessee_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Texas Codes",
    "regex": "(Tex(as|\\.)|TX) (?<code>\\w.{2,40}?)( Code( Ann(otated|\\.))?)? ((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://statutes.capitol.texas.gov/Docs/{codeAcronym}/htm/{codeAcronym}.{chapter}.htm#{chapter}.{section}"],
    "substitutions": [{
        "token": "code",
        "outputToken": "codeAcronym",
        "useRegex": true,
        "index": {
            "Agric(ulture|\\.)|AGC?": "AG",
            "Alc(oholic|o?\\.) Bev(erage|\\.)|ABC?": "AB",
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
    }]
}, {
    "name": "Texas Constitution",
    "regex": "(Tex(as|\\.)|TX) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://statutes.capitol.texas.gov/Docs/CN/htm/CN.{arabic_article}/CN.{arabic_article}.{section}.htm"],
    "substitutions": [{
        "token": "article",
        "outputToken": "arabic_article",
        "useRegex": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }]
}, {
    "name": "Utah Code",
    "regex": "(Utah|UT)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://le.utah.gov/xcode/Title{title}/Chapter{chapter}/{title}-{chapter}-S{section}.html",
        "#{title}-{chapter}-{section}{subsection}"
    ],
    "mutations": [{
        "token": "title",
        "case": "upper"
    }]
}, {
    "name": "Utah Constitution",
    "regex": "(Utah|UT) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Utah_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Vermont Statutes",
    "regex": "V(ermont|t\\.|T)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?,? [Tt]it(le|\\.) ?(?<title>\\d+([-‑–][A-Z])?),? ((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.))? ?(?<section>(\\d[\\w.]*\\w|\\d))(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://www.lawserver.com/law/state/vermont/vt-statutes/vermont_statutes_title_{title}_{section}"]
}, {
    "name": "Virginia Code",
    "regex": "(?<!W\\. )(?<!West )(?<!W\\.)V(irginia|a\\.|A)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://law.lis.virginia.gov/vacode/title{title}/section{title}-{section}"]
}, {
    "name": "Virginia Constitution",
    "regex": "(?<!W\\. )(?<!West )(?<!W\\.)V(irginia|a\\.|A) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Virginia_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Virgin Islands Code",
    "regex": "(Virgin Islands|V\\.? ?I\\.?)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?,? [Tt]it(le|\\.) ?(?<title>\\d+([-‑–][A-Z])?),?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?(,? \\((?<year>\\d{4})\\))?",
    "URL": ["https://law.justia.com/codes/virgin-islands/{year}/title-{title}/chapter-{chapter}/{section}/"],
    "defaults": {
        "year": "2019"
    }
}, {
    "name": "Revised Code of Washington",
    "regex": "((Wash(ington|\\.)|WA)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?|R\\.?C\\.?W\\.? )((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+[A-Za-z]?)\\.(?<chapter>\\d+[A-Za-z]?)\\.(?<section>\\d+[A-Za-z]?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://app.leg.wa.gov/RCW/default.aspx?cite={title}.{chapter}.{section}"]
}, {
    "name": "Washington Constitution",
    "regex": "(Wash(ington|\\.)|WA) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Washington_State_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "West Virginia Code",
    "regex": "(West Virginia|W\\. ?Va?\\.|WV)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Za-z]?)-(?<article>\\d+[A-Za-z]?)-(?<section>\\d+(\\.\\d+)?[A-Z]?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["http://www.wvlegislature.gov/wvcode/ChapterEntire.cfm?chap={chapter}&art={article}&section={section}"]
}, {
    "name": "West Virginia Constitution",
    "regex": "(West Virginia|W\\. ?Va?\\.|WV) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_West_Virginia_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Wisconsin Statutes",
    "regex": "(Wis(consin|\\.)|WI)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<chapter>\\d+[A-Z]?)\\.(?<section>\\d+\\w?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://docs.legis.wisconsin.gov/document/statutes/{chapter}.{section}",
        "{subsection}"
    ]
}, {
    "name": "Wisconsin Constitution",
    "regex": "(Wis(consin|\\.)|WI) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{roman_article},_Wisconsin_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "roman_article",
        "useRegex": true,
        "index": {
            "1|I": "I",
            "2|II": "II",
            "3|III": "III",
            "4|IV": "IV",
            "5|V": "V",
            "6|VI": "VI",
            "7|VII": "VII",
            "8|VIII": "VIII",
            "9|IX": "IX",
            "10|X": "X",
            "11|XI": "XI",
            "12|XII": "XII",
            "13|XIII": "XIII",
            "14|XIV": "XIV",
            "15|XV": "XV",
            "16|XVI": "XVI",
            "17|XVII": "XVII",
            "18|XVIII": "XVIII",
            "19|XIX": "XIX",
            "20|XX": "XX",
            "21|XXI": "XXI",
            "22|XXII": "XXII",
            "23|XXIII": "XXIII",
            "24|XXIV": "XXIV",
            "25|XXV": "XXV",
            "26|XXVI": "XXVI",
            "27|XXVII": "XXVII",
            "28|XXVIII": "XXVIII",
            "29|XXIX": "XXIX",
            "30|XXX": "XXX",
            "31|XXXI": "XXXI",
            "32|XXXII": "XXXII",
            "33|XXXIII": "XXXIII",
            "34|XXXIV": "XXXIV",
            "35|XXXV": "XXXV",
            "36|XXXVI": "XXXVI",
            "37|XXXVII": "XXXVII",
            "38|XXXVIII": "XXXVIII",
            "39|XXXIX": "XXXIX",
            "40|XXXX": "XXXX"
        }
    }]
}, {
    "name": "Wyoming Statutes",
    "regex": "(Wyo(ming|\\.)|WY)( ?Rev(ised|\\.))?( ?Ann(otated|\\.))?( ?Gen(eral|\\.))? ?(Codes?|Stat(utes|s?\\.?))( ?Ann(otated|\\.))?,? ?((Sections?|(&sect;|&#167|§){1,2}) ?)?(?<title>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<chapter>\\d+(\\.\\d+)?[A-Za-z]?)[-‑–](?<section>\\d+(\\.\\d+)?)(?<subsection>(\\(\\w+\\))+)?",
    "URL": ["https://wyoleg.gov/statutes/compress/title{lpad}{title}.pdf#search={title}-{chapter}-{section}."],
    "substitutions": [{
        "token": "title",
        "outputToken": "lpad",
        "useRegex": true,
        "index": {
            "\\d": "0",
            "\\d{2}": ""
        }
    }]
}, {
    "name": "Wyoming Constitution",
    "regex": "(Wyo(ming|\\.)|WY) ?Const(itution|\\.) ?[Aa]rt(icle|\\.) ?(?<article>[\\dIVXivx]{1,8})(,? ?((&sect;|&#167|§){1,2}|[Ss]ect?(ions?|s?\\.)) ?(?<section>(\\d[\\w.]*\\w|\\d))(,? ([Cc]l(ause|\\.) ?(?<clause>\\d+)))?)?",
    "URL": ["https://ballotpedia.org/Article_{arabic_article},_Wyoming_Constitution",
        "#Section_{section}"
    ],
    "substitutions": [{
        "token": "article",
        "outputToken": "arabic_article",
        "useRegex": true,
        "index": {
            "I|1": "1",
            "II|2": "2",
            "III|3": "3",
            "IV|4": "4",
            "V|5": "5",
            "VI|6": "6",
            "VII|7": "7",
            "VIII|8": "8",
            "IX|9": "9",
            "X|10": "10",
            "XI|11": "11",
            "XII|12": "12",
            "XIII|13": "13",
            "XIV|14": "14",
            "XV|15": "15",
            "XVI|16": "16",
            "XVII|17": "17",
            "XVIII|18": "18",
            "XIX|19": "19",
            "XX|20": "20",
            "XXI|21": "21",
            "XXII|22": "22",
            "XXIII|23": "23",
            "XXIV|24": "24",
            "XXV|25": "25",
            "XXVI|26": "26",
            "XXVII|27": "27",
            "XXVIII|28": "28",
            "XXIX|29": "29",
            "XXX|30": "30",
            "XXXI|31": "31",
            "XXXII|32": "32",
            "XXXIII|33": "33",
            "XXXIV|34": "34",
            "XXXV|35": "35",
            "XXXVI|36": "36",
            "XXXVII|37": "37",
            "XXXVIII|38": "38",
            "XXXIX|39": "39",
            "XXXX|40": "40"
        }
    }]
}, {
    "name": "Caselaw Access Project",
    "regex": "(?<=\\b)(?<volume>\\d+) (?<reporter>Abb\\. Ct\\. App\\.|Abb\\.N\\. Cas\\.|Abb\\. Pr\\.|Abb\\. Pr\\. \\(n\\.s\\.\\)|Va\\. \\(Va\\. Cas\\.\\)|Adams Co\\. L\\.J\\.|Add\\.|Dallam|Franklin Co\\. Legal J\\.|Aik\\.|Ala\\. App\\.|Ala\\.|Alaska Fed\\.|Alaska|Am\\. Samoa|Am\\. Samoa 2d|Am\\. Samoa 3d|Ohio App\\. Unrep\\.|Ant\\. N\\.P\\. Cas\\.|A\\.D\\.2d|A\\.D\\.|A\\.D\\.3d|Ky\\. \\(Hughes\\)|Ariz\\. App\\.|Ariz\\.|Ark\\. App\\.|Ark\\.|Armstrong\\. Election Cases|A\\.|Balt\\. C\\. Rep\\.|Barb\\. Ch\\.|Barb\\.|B\\. Co\\. Leg\\. J\\.|Berk's Co\\. L\\.J\\.\\.|Blackf\\.|Blair Co\\. L\\.R\\.|Blair Co\\. L\\.R\\. 2d|Bosworth Super\\. Ct\\. Rep\\.|Bradford Co\\. L\\.J\\.|Brad\\.|Brayt\\.|Bucks Co\\. L\\.R\\.|Bur\\.|Bur\\.|Butler Co\\. Legal J\\.|E\\.D\\. Pa\\.|Cai\\. Cas\\.|Cai\\.|Cal\\. ?App\\.|Cal\\. ?App\\. ?5th|Cal\\. ?App\\. ?4th|Cal\\. ?App\\. ?2d|Cal\\. ?App\\. ?3d|Cal\\. ?3d|Cal\\. ?4th|Cal\\.|Cal\\. ?2d|Cal\\. ?Super\\. ?Ct\\.|Cal\\. ?Unrep\\.|Cambria Co\\. L\\.J\\.|Cambria Co\\. Rep\\.|Carbon Co\\. L\\.J\\.|N\\.C\\. \\(Car\\. L\\. Rep\\.\\)|N\\.J\\. \\(Manumission\\)|S\\.C\\.L\\. \\(McMul\\.\\)|S\\.C\\.L\\. \\(Chev\\.\\)|Tapp\\. Rep\\.|D\\. Pa\\.|Ohio|S\\.C\\. Eq\\. \\(Chev\\. Eq\\.\\)|Monaghan|Sadler|Ky\\. \\(Litt\\. Sel\\. Cas\\.\\)|C\\.C\\.L\\.J\\.|C\\.C\\.L\\.J\\. 2d|S\\.C\\. Eq\\. \\(McCord Eq\\.\\)|S\\.C\\. Eq\\. \\(Ril\\. Eq\\.\\)|Chand\\.|Charlton Rep\\.|Ches\\. Co\\. Rep\\.|D\\. Chip\\.|N\\. Chip\\.|Mun\\.  L\\. Rep\\.|Hosea's Rep\\.|N\\.Y\\. City Ct\\. Rep\\.|Cl\\. Ch\\.|Cole\\. & Cai\\. Cas\\.|Cole\\. Cas\\.|Colo\\. App\\.|Colo\\. L\\. Rep\\.|Colo\\. N\\. P\\.|Colo\\.|Willson|White & W\\.|N\\.C\\. \\(Cam\\. & Nor\\.\\)|King's Conflicting Cases|Conn\\. App\\.|Conn\\. Cir\\. Ct\\.|Kirby|Root|Conn\\.|Conn\\. Supp\\.|Connoly Sur\\. Rep\\.|Ct\\. Cl\\.|C\\.C\\.P\\.A\\.|Ct\\. Cust\\.|Cow\\.|Craw\\. Co\\. Leg\\. J\\.|Cumberland L\\.J\\.|Cust\\. B\\. & Dec\\.|Dakota|Dallam|Dall\\.|Daly \\(N\\.Y\\.\\)|Dau\\. Co\\. Rep\\.|Day|T\\.C\\.A\\.|P\\.R\\. Dec\\.|Teiss\\.|Va\\. Ch\\. Dec\\.|Ky\\. \\(Sneed\\)|Pears\\.|Smith|Ga\\. Super\\. Ct\\.|Georgia Decisions|C\\.M\\.A\\.|Del\\. Cas\\.|Del\\. Ch\\.|Del\\. Co\\. Reps\\.|Del\\. \\(Harr\\.\\)|Del\\. \\(Penne\\.\\)|Del\\. \\(Boyce\\)|Del\\. \\(Marv\\.\\)|Del\\. \\(Houst\\.\\)|Del\\.|Dem\\. Sur\\.|Denio|Docket|Dudley Rep\\.|Duer Super\\. Ct\\. Rep\\.|Edm\\. Sel\\. Cas\\.|E\\.D\\. Smith|Edw\\. Ch\\.|S\\.C\\. Eq\\. \\(McMul\\. Eq\\.\\)|S\\.C\\. Eq\\. \\(Speers Eq\\.\\)|Erie\\. Co\\. L\\.J\\.|P\\.R\\. Sent\\.|Fay\\. L\\.J\\.|F\\. Cas\\.|Fed\\. Cl\\.|F\\.|F\\. ?2d|F\\. ?3d|F\\.R\\.D\\.|F\\. ?Supp\\.( ?[23]d)?|Fla\\.|Fla\\. Supp\\.|Fla\\. Supp\\. 2d|Ga\\. App\\.|Ga\\. L\\. Rep\\.|Ga\\.|Gault|Gibb\\. Surr\\.|Guam|Hall Super\\. Ct\\. Rep\\.|H\\. & G\\.|Haw\\. App\\.|Haw\\.|Haz\\. Pa\\. Reg\\.|Va\\. \\(Hen\\. & M\\.\\)|Hill & Den\\.|Hill|Hilt\\.|Hoff\\. Ch\\.|Hopk\\. Ch\\.|How\\. App\\. Cas\\.|How\\. Pr\\.|How\\. Pr\\. \\(n\\.s\\.\\)|Idaho|Ill\\. App\\.|Ill\\. App\\. 2d|Ill\\. App\\. 3d|Ill\\. Cir\\. Ct\\. Rep\\.|Ill\\. Ct\\. Cl\\.|Ill\\. \\(Scam\\)|Ill\\. \\(Breese\\)|Ill\\. \\(Gilm\\.\\)|Ill\\.|Ill\\. 2d|Ind\\. App\\.|Ind\\. L\\. Rep\\.|Ind\\.|Indian Terr\\.|Iowa|Jeff\\.|Johns\\. Cas\\.|Johns\\. Ch\\.|Johns\\.|Jones and Spencer's Super\\. Ct\\. Rep\\.|Edsall|Pa\\. \\(Admiralty\\)|Kan\\. App\\. 2d|Kan\\.|Ky\\. \\(A\\.K\\. Marsh\\.\\)|Ky\\. Op\\.|Ky\\.|Keyes|Lack\\. Bar\\. R\\.|Lack\\. Bar  R\\.|Lack\\. Jur\\.|Lack\\. L\\. N\\.|Lack\\. L\\.R\\.|Lanc\\. Bar|Lanc\\. L\\. Rev\\.|Lans\\. Ch\\.|Lans\\.|Law\\. L\\.J\\.|Law Times|Law Times \\(N\\.S\\.\\)|Lebanon Co\\. L\\.J\\.|Foster|Leg\\. Gaz\\.|Leg\\. Gaz\\.|Pa\\. Leg\\. Gaz\\.|Gunby|Leg\\. Rec\\. Rep\\.|Lehigh Co\\. L\\.J\\.|Lehigh Val\\. L\\. Rep\\.|Liquor Tax Rep\\.|Lock\\. Rev\\. Cas\\.|La\\. Ann\\.|La\\. App\\.|La\\.|La\\.|Luz\\. L\\.J\\.|Luz\\. L\\.O\\.|Luz\\. Leg\\. Reg\\.|Luz\\. Leg\\. Reg\\.|Lycoming R\\.|Magis\\. & Const\\.|Me\\.|McGrath|N\\.C\\. \\(Mart\\.\\)|Mart\\. \\(n\\.s\\.\\)|Mart\\. \\(o\\.s\\.\\)|Md\\. App\\.|Md\\.|H\\. & McH\\.|Mass\\. \\(Allen\\)|Mass\\. App\\. Ct\\.|Mass\\. App\\. Dec\\.|Davis L\\. Ct\\. Cas\\.|Davis L\\. Ct\\. Cas\\.|Mass\\. \\(Cush\\)|Mass\\. \\(Pick\\.\\)|Mass\\. \\(Gray\\)|Mass\\. \\(Tyng\\)|Mass\\. \\(Will\\.\\)|Mass\\. \\(Met\\.\\)|Mass\\.|Mass\\. Supp\\.|Mercer|Mich\\. App\\. |Howell N\\.P\\.|Mich\\.|M\\.C\\.L\\.J\\.|Mills Surr\\.|Minn\\.|Minor|Va\\.|Miss\\. Ct\\. Rec\\.|Miss\\. Dec\\.|Miss\\. \\(Walker\\)|Miss\\.|Miss\\. \\(Howard\\)|Miss\\. \\(S\\. & M\\.\\)|Mor\\. St\\. Cas\\.|Mo\\. App\\.|Mo\\.|Monroe L\\.R\\.|Mont\\.|Mont\\. Co\\. L\\. Rep\\.|Navajo Rptr\\.|Neb\\. App\\.|Neb\\.|Nev\\.|N\\.H\\.|N\\.J\\. Eq\\.|N\\.J\\.L\\.|N\\.J\\. Misc\\.|N\\.J\\.|N\\.J\\. Super\\.|N\\.J\\. Tax Ct\\.|N\\.M\\.|N\\.M\\.|N\\.Y\\. Crim\\.|Misc\\.2d|Misc\\.3d|Misc\\.|N\\.Y\\. ?2d|N\\.Y\\.|N\\.Y\\. ?3d|N\\.Y\\. St\\. Rptr\\.|Northam\\. Law Rep\\.|N\\.C\\. App\\.|N\\.C\\.|N\\.C\\. \\(Busb\\. Eq\\)|N\\.C\\. \\(Busb\\.\\)|N\\.C\\. \\(Dev\\. & Bat\\. Eq\\.\\)|N\\.C\\. \\(Dev\\. & Bat\\.\\)|N\\.C\\. \\(Dev\\. Eq\\.\\)|N\\.C\\. \\(Dev\\.\\)|N\\.C\\. \\(Hawks\\)|N\\.C\\. \\(Hayw\\.\\)|N\\.C\\. \\(Ired\\. Eq\\.\\)|N\\.C\\. \\(Ired\\.\\)|N\\.C\\. \\(Jones Eq\\.\\)|N\\.C\\. \\(Jones\\)|N\\.C\\. \\(Mur\\.\\)|N\\.C\\. \\(Phil\\. Eq\\.\\)|N\\.C\\. \\(Phil\\.\\)|N\\.C\\. \\(Tay\\.\\)|N\\.C\\. \\(Win\\.\\)|N\\.D\\.|N\\.E\\.|N\\.E\\.2d|N\\.E\\.3d|N\\. Mar\\. I\\. Commw\\.|N\\. Mar\\. I\\.|Northum\\. Co\\. Leg\\. N\\.|Northumb\\. L\\.J\\.|N\\.W\\.|N\\.W\\.2d|Ohio App\\.|Ohio App\\. 2d|Ohio App\\. 3d|Ohio C\\.C\\. Dec\\.|Ohio C\\.C\\. \\(N\\.S\\.\\)|Ohio Cir\\. Dec\\.|Ohio Ct\\. App\\.|Ohio Misc\\.|Ohio Misc\\. 2d|Ohio Nisi Prius|Ohio Nisi Prius \\(N\\.S\\.\\)|Ohio Op\\. 2d|Ohio Op\\. 3d|Ohio Op\\.|Ohio St\\.|Ohio St\\. \\(n\\.s\\.\\)|Ohio St\\. 2d|Ohio St\\. 3d|Okla\\. Crim\\.|Okla\\.|Olwine's L\\.J\\.|Or\\.|Or\\. App\\.|Or\\. Tax|P\\.|P\\.2d|P\\.3d|Paige Ch\\.|Park\\. Crim\\. Rep\\.|Pelt\\.|Pa\\. L\\. Rec\\.|Pa\\. Commw\\.|Pa\\. Corp\\. R\\.|Pa\\. Co\\. Ct\\.|Pa\\. D\\. & C\\. 2d|Pa\\. D\\. & C\\.|Pa\\. D\\. & C\\. 3d|Pa\\. D\\. & C\\. 5th|Pa\\. D\\. & C\\. 4th|Pa\\. Fid\\.|Pa\\. Fid\\. 2d|Pa\\. Fid\\. 3d|Pa\\. Just\\. L\\. Rep\\.|Pa\\. L\\.J\\. Rep\\.|Pa\\.|Pa\\. Super\\. Ct\\.|Pennyp\\.|Phila\\. Co\\. R\\.|Phila\\. Reports|Pin\\.|Pittsb\\. L\\.J\\.|Pitts\\. R\\.|Port\\.|P\\.R\\. Fed\\.|Pow\\. Surr\\.|Mich\\. Pr\\.|Singer Prob\\. Cas\\.|N\\.Y\\. Proc\\. Ct\\. Ass\\.|P\\.R\\.|Rec\\. Q\\. Ct\\.|Rec\\. Ct\\. Assistants|Rec\\. Co\\. Ch\\. \\(S\\.C\\.\\)|Rec\\. Ct\\. Gen\\. Sess\\.|Rec\\. Bucks\\. Co\\. \\(Pa\\.\\)|Rec\\. T\\. Warwick \\(R\\.I\\.\\)|Rec\\. Ct\\. Ches\\. Co\\. Pa\\.|Rec\\. Co\\. Ct\\.|Rec\\. V\\.A\\. Ct\\. \\(R\\.I\\.\\)|Redf\\.|S\\.C\\.L\\. \\(Ril\\.\\)|Ct\\. Cl\\.|Mich\\. Ct\\. Cl\\.|App\\. D\\.C\\.|Bro\\. Com\\. P\\.|Ashm\\. \\(Pa\\.\\)|Conn\\. Super\\. Ct\\.|Conn\\. Super\\. Ct\\.|Disney \\(Ohio\\)|Binn\\.|Pen\\. & W\\.|Rawle|Serg\\. & Rawl\\.|Watts & Serg\\.|Whart\\.|Yeates|S\\.C\\. Eq\\. \\(Des\\.Eq\\.\\)|Ky\\. \\(Hard\\.\\)|Handy|Super\\. Ct\\. Jud\\.|Tenn\\. \\(Hayw\\.\\)|Grant|D\\.C\\. \\(MacArth\\. & M\\.\\)|D\\.C\\. \\(Tuck\\. & Cl\\.\\)|Jahn|S\\.C\\.L\\. \\(Strob\\.\\)|Gill|G\\. & J\\.|S\\.C\\. Eq\\. \\(Dud\\. Eq\\.\\)|S\\.C\\.L\\. \\(Bail\\.\\)|N\\.Y\\.|Walk\\. Ch\\.|Tenn\\. Crim\\. App\\.|H\\. & J\\.|Wilson|Miss\\. \\(S\\. & M\\. Ch\\.\\)|S\\.C\\.L\\. \\(Bay\\)|Morris|Watts|Tenn\\. \\(Mart\\. & Yer\\.\\)|Tenn\\. \\(Cold\\.\\)|Tenn\\. \\(Heisk\\.\\)|Tenn\\. \\(Yer\\.\\)|Tenn\\. \\(Head\\)|Tenn\\. \\(Meigs\\)|Tenn\\. \\(Hum\\.\\)|D\\.C\\.|D\\.C\\. \\(MacArth\\.\\)|D\\.C\\. \\(Mackey\\)|Doug\\.|Ark\\. Terr\\. Rep\\.|McGl\\.|D\\.C\\. \\(patent\\)|Ky\\. \\(Bibb\\)|Ky\\. \\(Litt\\.\\)|Ky\\. \\(T\\.B\\. Mon\\.\\)|Ky\\. \\(B\\. Mon\\.\\)|Wright|Ohio Ch\\.|Ky\\. \\(J\\.J\\. Marsh\\.\\)|S\\.C\\.L\\. \\(Speers\\)|S\\.C\\.L\\. \\(Rich\\.\\)|S\\.C\\.L\\. \\(Rice\\)|S\\.C\\.L\\. \\(Rich\\.\\)|S\\.C\\.L\\. \\(Dud\\.\\)|S\\.C\\.L\\. \\(Hill\\)|Hay\\. & Haz\\.|D\\.C\\. Cir\\.|D\\.C\\. \\(Cranch\\)|Brightly|Walker|Ind\\. App\\.|Kan\\. App\\.|Md\\. Ch\\.|Md\\. Ch\\.|Freem\\. Ch\\.|Wilcox|S\\.C\\.L\\. \\(McCord\\)|S\\.C\\.L\\. \\(Nott & McC\\.\\)|S\\.C\\.L\\. \\(Harp\\.\\)|Harr\\. Ch\\.|Miles|Cal\\. ?Dist\\. Ct\\.|McCahon|S\\.C\\. Eq\\. \\(Rice Eq\\.\\)|S\\.C\\. Eq\\. \\(Rich\\. Eq\\.\\)|S\\.C\\. Eq\\. \\(Hill Eq\\.\\)|S\\.C\\. Eq\\. \\(Rich\\. Eq\\.\\)|S\\.C\\. Eq\\. \\(Rich\\. Cas\\.\\)|S\\.C\\. Eq\\. \\(Strobh\\. Eq\\.\\)|S\\.C\\. Eq\\. \\(Bail\\. Eq\\.\\)|Greene|Myrick|D\\. Haw\\.|Rep\\. Cont\\. Elect\\. Case\\.|Rep\\. Cont\\. El\\.|Howison|Coffey|Charlton|S\\.C\\. Eq\\. \\(Harp\\. Eq\\.\\)|Brewster|S\\.C\\.L\\. \\(Mill\\)|S\\.C\\.L\\. \\(Tread\\.\\)|S\\.C\\.L\\. \\(Brev\\.\\)|Mass\\. App\\. Div\\.|Mass\\. App\\. Div\\.|Goebel|Ky\\. \\(Dana\\)|Ky\\. \\(Duv\\.\\)|Ky\\. \\(Met\\.\\)|Ky\\. \\(Bush\\)|Vaux|Tenn\\. \\(Swan\\)|Tenn\\. \\(Sneed\\)|Bradf\\.|T\\.C\\.|B\\.T\\.A\\.|R\\.I\\. Ct\\. Rec\\.|R\\.I\\. Dec\\.|R\\.I\\.|Super\\. Ct\\. \\(R\\.I\\.\\)|Robertson's Super\\. Ct\\. Rep\\.|Rob\\.|Sand\\. Ch\\.|Sandford Super\\. Ct\\. Rep\\.|Sarat\\. Ch\\. Sent\\.|Schuy\\. L\\. Rec\\.|Schuy\\. Reg\\.|Seld\\. Notes|Yates|Parsons|Sick\\. Op\\. Att'y Gen\\.|Silv\\. Ct\\. App\\.|Silv\\. Sup\\.|Smith|Som\\. L\\.J\\.|S\\.C\\.|S\\.D\\.|S\\.E\\.|S\\.E\\.2d|So\\.|So\\.2d|So\\.3d|S\\.W\\.|S\\.W\\.2d|S\\.W\\.3d|Stew\\.|Stew\\. & P\\.|S\\.C\\.D\\.C\\. \\(N\\.S\\.\\)|N\\.Y\\. Sup\\. Ct\\.|Susq\\. Leg\\. Chron\\.|Sweeney Super\\. Ct\\. Rep\\.|Robards|N\\.C\\. \\(Taylor\\)|La\\. App\\. \\(Teiss\\.\\)|Tenn\\. App\\.|Tenn\\. Cas\\.|Tenn\\. Ch\\. R\\.|Tenn\\.|Tenn\\. \\(Peck\\)|Tenn\\. \\(Cooke\\)|Tenn\\. \\(Overt\\.\\)|Tex\\. Civ\\. App\\.|Tex\\. Ct\\. App\\.|Tex\\. Crim\\.|Tex\\. L\\. R\\.|Tex\\.|Posey|N\\.J\\. \\(Burlington County Ct\\.\\)|Cin\\. Sup\\. Ct\\. Rep\\.|Com\\. Pl\\. Rep\\.|Pa\\. Dist\\.|Mass\\. Law Rep\\.|Mich\\. N\\.P\\. R\\.|Westchester|Ohio Law Abs\\.|Ohio L\\.R\\.|Ald\\.|Thomp\\. & Cook|Blume Sup\\. Ct\\. Trans\\.|Trans\\. App\\.|Tuck\\. Surr\\.|Tyl\\.|Cl\\. Ct\\.|U\\.S\\. App\\. D\\.C\\.|Ct\\. Int'l Trade|Cust\\. Ct\\.|U\\. ?S\\.|U\\.S\\. \\(Black\\)|U\\.S\\. \\(Cranch\\)|U\\.S\\. \\(Dall\\.\\)|U\\.S\\. \\(How\\.\\)|U\\.S\\. \\(Pet\\.\\)|U\\.S\\. \\(Wall\\.\\)|U\\.S\\. \\(Wheat\\.\\)|Mann\\. Unrep\\. Cas\\.|Blume Unrep\\. Op\\.|Unrep\\. Tenn\\. Cas\\.|Cal\\.|Utah|Utah 2d|Vt\\.|Va\\. Cir\\.|Va\\. Col\\. Dec\\.|Va\\. App\\.|Va\\. Dec\\.|Va\\. \\(Rand\\.\\)|Va\\. \\(Munf\\.\\)|Va\\. \\(Wash\\.\\)|Va\\.|Va\\. \\(Gratt\\.\\)|Va\\. \\(Gilmer\\)|Va\\. \\(Call\\)|Va\\. \\(Patt\\. & Heath\\)|Va\\. \\(Rob\\.\\)|Va\\. \\(Leigh\\)|V\\.I\\.|Wash\\. App\\.|Wash\\. Co\\.\\(Pa\\.\\)|Wash\\.|Wash\\. 2d|Wash\\. Terr\\.|Week\\. No\\. Cas\\. \\(Pa\\.\\)|Wend\\.|Wes\\. C\\.L\\.J\\.|Tribal|A\\. ?2d|A\\. ?3d|B\\.R\\.|F\\. App'?x\\.?|Haw\\.|M\\.J\\.|N\\.Y\\.S\\. 2d|N\\.Y\\.S\\. 2d|N\\.Y\\.S\\.|Vet\\. App\\.|W\\. Va\\.|Wheel\\. Cr\\. Cas\\.|Wis\\.|Wis\\. 2d|Wyo\\.|Yates Sel\\. Cas\\.|York Leg\\. Rec\\.) (?<page>\\d+)\\b(,?( at)? (?<pincite>\\d+)(([-‑–]| to | through )(?<pincite_end>\\d+))?\\b)?",
    "URL": ["https://cite.case.law/{reporter}/{volume}/{page}",
        "#p{pincite}"
    ],
    "mutations": [{
        "token": "reporter",
        "case": "lower",
        "omit": "[.()&,']",
        "splitter": " ",
        "joiner": "-"
    }],
    "substitutions": [{
        "token": "reporter",
        "index": {
            "a-2d": "a2d",
            "a-3d": "a3d",
            "fed-appx": "f-appx",
            "f-2d": "f2d",
            "f-3d": "f3d",
            "fsupp": "f-supp",
            "fsupp2d": "f-supp-2d",
            "fsupp3d": "f-supp-3d",
            "ny-2d": "ny2d",
            "ny-3d": "ny3d",
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
            "u-s": "us"
        },
        "allowUnmatched": true
    }]
}];
/*
  Parses URL search query, and passes it to handleQuery().
  Runs upon page load, while the LawSearch page is hidden.
  Also puts the query into the search bar.
*/
document.addEventListener("DOMContentLoaded", () => {
  if (!location.search) {
    return document.body.removeAttribute('hidden');
  }

  let query = decodeURIComponent(location.search).trim().replace(/^\?(?:q=)?|\.$|,$|;$/g, '');
  document.getElementById("q").value = query.replace(/\+/g, ' ');

  handleQuery(query);
});

window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || 
                         ( typeof window.performance != "undefined" && 
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});

function handleSearch(event) {
  event.preventDefault()
  let query = document.getElementById("q").value;
  handleQuery(query);
}

function handleQuery(query) {
  try {
    if (!query) return document.getElementById("explainer").innerHTML = "";
    window.location.href = getUrlForQuery(query);
  } catch (error) {
    document.body.removeAttribute('hidden');
    document.getElementById("explainer").innerHTML = error.message;
  }
}

function getUrlForQuery(query) {
  let match = getMatch(query);
  
  handleDefaults(match);
  handleMutations(match);
  handleSubstitutions(match);
  updateUrlParts(match);

  return buildUrl(match);
}

const MATCH_ERROR = "Sorry, I couldn't recognize that citation. Is it on the list of <a href='#sources-of-law'>supported sources of law</a>?"
function getMatch(query) {
  for (var i = 0; i < schemas.length; i++) {
    var schema = schemas[i];
    var match = query.match(new RegExp(schema['regex'], 'i'));
    if (match) {
      console.log('"' + query + '" matched regex for ' + schema['name'] + ': ' + schema['regex']); 
      for (var group in match.groups) {
        console.log(group + ': ' + match.groups[group]);
      }
      return {
        keys: match.groups,
        schema: schema
      }
    }
  }
  console.log('"' + query + '" did not match the regex for any schema. Check the page source to see the schemas and their regexes.');
  throw Error(MATCH_ERROR);
}

function handleDefaults(match) {
  let {schema, keys} = match;
  for (d in schema.defaults) {
    if (!keys[d]) {
      console.log('did not detect ' + d + ', so it will be set to "' + schema.defaults[d] + '" by default');
      keys[d] = schema.defaults[d];
    }
  }
}

function handleMutations(match) {
  let {schema, keys} = match;
  for (m in schema.mutations) {
    let mutation = schema.mutations[m];
    if (typeof keys[mutation['token']] === 'undefined') {
      continue;
    }
    let key = keys[mutation['token']];
    if (!key) { continue; }
    if ('omit' in mutation) {
      let omission = new RegExp(mutation['omit']);
      key = key.replace(omission, '');
    }
    if (('splitter' in mutation) & ('joiner' in mutation)) {
      let splitter = new RegExp(mutation['splitter']);
      key = key.split(splitter).filter(Boolean).join(mutation['joiner']);
    }
    if ('case' in mutation) {
      if (mutation['case'] == 'upper') {
        key = key.toUpperCase();
      }
      else if (mutation['case'] == 'lower') {
        key = key.toLowerCase();
      }
    }
    console.log('performed string mutation to turn "' + keys[mutation['token']] + '" into "' + key + '"');
    keys[mutation['token']] = key;
  }
}

const SUBSTITUTION_ERROR = "Sorry, I couldn't find that {token} in the {schema}. If it exists, please open a ticket <a href='https://github.com/raindrum/citeurl/issues'>here</a>!"
function handleSubstitutions(match) {
  let {schema, keys} = match;
  for (var s in schema.substitutions) {
    let sub = schema.substitutions[s];
    if (keys[sub['token']] === undefined) {
      continue;
    }
    let outputToken;
    if ('outputToken' in sub) {
      outputToken = sub['outputToken'];
    }
    else {
      outputToken = sub['token'];
    }
    let newKey;
    if (sub['useRegex']) {
      for (var key in sub['index']) {
        var regexStr = '^(' + key + ')$';
        if (keys[sub['token']].match(new RegExp(regexStr, 'i'))) {
          newKey = sub['index'][key];
          console.log(sub['token'] + ' matches ' + regexStr + ' so ' + outputToken + ' will be set to ' + newKey);
          break;
        }
      }
    }
    else {
      newKey = sub['index'][keys[sub['token']]];
      if (newKey === undefined) {
        newKey = sub['index'][keys[sub['token']].toUpperCase()];
      }
      if (newKey === undefined) {
        newKey = sub['index'][keys[sub['token']].toLowerCase()];
      }
    }
    if (newKey === undefined) {
      let matchPattern;
      if (sub['useRegex']) {
        matchPattern = 'regex "' + regexStr + '"';
      }
      else {
        matchPattern = 'any value in the index';
      }
      console.log(sub['token'] + ' "' + keys[sub['token']] + '" does not match "' + matchPattern + '" so ' + outputToken + ' was not set.');
      if (('allowUnmatched' in sub) & sub['allowUnmatched']) {
        continue;
      }
      else {
        console.log('since ' + outputToken + ' is necessary, no URL can be built.');
        error_text = SUBSTITUTION_ERROR.replace('{schema}', schema.name);
        error_text = error_text.replace('{token}', sub['token']);
        throw Error(error_text);
      }
    }
    keys[outputToken] = newKey;
  }
}

function updateUrlParts(match) {
  let {schema, keys} = match;
  for (var k in keys) {
    if (typeof keys[k] === 'undefined') {
      continue;
    }
    let placeholder = new RegExp("\\{" + k + "\\}", 'g');
    for (var part in schema.URL) {
      schema.URL[part] = schema.URL[part].replace(placeholder, keys[k]);
    }
  }
}

function buildUrl(match) {
  let {schema, keys} = match;
  let url = '';
  let missingPlaceholder = new RegExp("\\{.+\\}");
  console.log('Building URL...');
  for (p in schema.URL) {
    let part = schema.URL[p];
    if (!part.match(missingPlaceholder)) {
      url += part;
      console.log('Added "' + part + '"');
    }
    else {
      console.log('did not add "' + part + '" because it references an undefined token');
    }
  }
  console.log('finished building URL: ' + url);
  return url;
}
</script>
Law Search recognizes vaguely Bluebook-style citations to court cases, sections of federal law, and the vast majority of state statutes, plus a few other sources. For the full list, and the recognized citation formats for each, see [Sources of Law](#sources-of-law).

## Bookmark This Search!

You're totally welcome to use the search engine by coming to my site and typing your citation into the search bar whenever you want to look something up. But it's more convenient if you can set up a search keyword so that you can just type something like "ls 42 usc 1983" in your URL bar to look up the law.

To do that on Firefox, you can just right-click the search bar at the top of this page, and click "Add a Keyword For This Search."

On Chrome, go to `Settings > Manage Search Engines`. From there, click `Add`, and paste this address into the URL field:

<code id="bookmarkURL"></code>
<script>
document.getElementById("bookmarkURL").innerHTML = window.location.href.split(/\?|#/)[0] + "?%s";
</script>

Either way, you'll also need to designate a keyword. I use "ls", but anything works. Then you can just type "ls " in your URL bar, followed by a citation, to be redirected to the relevant page immediately.

## How it Works

Law Search is not technically a search engine. Essentially it tries to match your query against a series of templates (technically [regexes](https://en.wikipedia.org/wiki/Regular_expression), each one recognizing one kind of citation. These templates are listed [below](#sources-of-law). Each template has instructions for how to turn a citation into a link to a website where you can read it.

The websites vary across different sources of law, but here are some of the most prominent ones:

- For court opinions, Law Search uses Harvard's [Caselaw Access Project](https://case.law/). I recommend making an account there, so you won't need to prove your non-robot status quite as often. Unfortunately they only support pre-2018 cases, so anything more recent than that will be a broken link. Also note that you can go directly to a specific page of an opinion if you provide a pincite, like "338 <span>F.2d</span> 708, 715."
- For the U.S. code and a number of federal rules (e.g. rules of civil procedure), it uses Cornell's [Legal Information Institute](https://www.law.cornell.edu/). Unfortunately their website header gets in the way when you link directly to a subsection, so I recommend the header with [Ublock Origin](https://ublockorigin.com/), or getting into a habit of scrolling up slightly.
- Many federal laws, like the Immigration and Nationality Act (INA) and National Labor Relations Act (NLRA), are often cited by their original section numbers (e.g. "NLRA <span>§</span> 7") instead of the corresponding U.S. Code provisions. Law Search supports this kind of citation for a few bodies of law, by linking directly to the corresponding U.S. code citation on the Cornell website.
- For codified state laws, Law Search mostly uses individual states' websites, but when they aren't compatible, it uses [lawserver.com](https://www.lawserver.com/), or occasionally [Justia](https://law.justia.com/codes/). All U.S. states and territories are supported in some form, except for Arkansas, Georgia, Guam, and Puerto Rico, whose laws are only available on LexisNexis or on sites where generating a URL would require more information than a typical citation contains.
- For state constitutions, it mostly uses [ballotpedia.org](https://ballotpedia.org/). A few states (KY, MA, ME, MD, OR, NH, NJ, and VT) aren't fully supported yet, but I'll try to add them soon.

Note that it's entirely possible for Law Search to generate broken links, because it will create a link from any citation that *looks* correct, regardless of whether the referenced law actually exists.

Two final notes for those interested in the more technical side:

- Law Search runs entirely in your browser, without any server-side logic. If you want to, you can even <a href="" download>download this page</a> and run the search locally without even connecting to my website; you'll just miss out on updates.
- I also maintain Law Search as a Python library called [CiteURL](https://github.com/raindrum/citeurl/). The advantage of the Python version is that it can process an entire block of text, like a court opinion, and insert hyperlinks for every citation it finds, including shortform citations.

## Sources of Law

These are the sources of law the program is able to recognize. If you're wondering about what citation formats are recognized for a particular source, you can click the 'view regex' link to see a diagram of what a citation needs to look like for that source.

Body of Law | Source    | Citation Template
----------- | --------- | -----------------
United States Code | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Title%20%29%3F%28%5Cd%2B%29%20%28U%5C.%3F%7CUnited%29%20%3F%28S%5C.%3F%7CStates%29%20%3F%28C%5C.%3F%7CCode%29%28%20%3F%5BAS%5D%5C.%3F%29%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
United States Constitution | [constitution.congress.gov](https://constitution.congress.gov) | [view regex](https://regexper.com#%28U%5C.%3F%20%3FS%5C.%3F%7CUnited%20States%29%20%3FConst%28itution%7C%5C.%29%2C%3F%20%28%5BAa%5Drt%28icle%7C%5C.%29%20%28%5B%5CdIViv%5D%7B1%2C3%7D%29%7C%5BAa%5Dm%28endment%7C%28end%7Cdt%3F%29%3F%5C.%29%20%28%5B%5CdXIVxiv%5D%7B1%2C3%7D%29%29%28%28%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%5Cd%2B%29%29%28%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%29%3F%29%3F)
U.S. Public Laws | [uscode.house.gov](https://uscode.house.gov) | [view regex](https://regexper.com#Pub%28%5C.%3F%7Clic%29%20%3FL%28%5C.%3F%7Caw%29%20%3F%28No%5C.%3F%29%3F%20%3F%28%5Cd%2B%29%5B%E2%80%93%E2%80%91-%5D%28%5Cd%2B%29)
U.S. Statutes at Large | [www.govinfo.gov](https://www.govinfo.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20Stat%5C.%3F%20%28%5Cd%2B%29%28%5B%E2%80%93%E2%80%91-%5D%5Cd%2B%29%3F)
Federal Register | [www.federalregister.gov](https://www.federalregister.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20%28Fed%5C.%20%3FReg%5C.%7CF%5C.%3F%20%3FR%5C.%3F%29%20%28%5Cd%28%5B%2C%5Cd%5D%2B%5Cd%29%3F%29)
Code of Federal Regulations | [ecfr.federalregister.gov](https://ecfr.federalregister.gov) | [view regex](https://regexper.com#%28Title%20%29%3F%28%5Cd%2B%29%20%28C%5C.%3F%20%3FF%5C.%3F%20%3FR%5C.%3F%7CCode%20of%20Federal%20Regulations%29%28%20%5BPp%5Darts%3F%7C%20%5BPp%5Dts%3F%5C.%29%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Federal Rules of Civil Procedure | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28F%5C.%3F%20%3FR%5C.%3F%20%3FC%5C.%3F%20%3FP%5C.%3F%7CFed%5C.%3F%20%3FR%28%5C.%3F%7Cule%29%20%3FCiv%5C.%3F%20%3FPr%3Fo%3Fc%3F%5C.%3F%7CFederal%20Rules%3F%20of%20Civil%20Procedure%29%20%3F%28Rule%20%29%3F%28%5Cd%2B%5Ba-z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Federal Rules of Appellate Procedure | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28F%5C.%3F%20%3FR%5C.%3F%20%3FA%5C.%3F%20%3FP%5C.%3F%7CFed%5C.%3F%20%3FR%28%5C.%3F%7Cule%29%20%3FApp%5C.%3F%20%3FPr%3Fo%3Fc%3F%5C.%3F%7CFederal%20Rules%3F%20of%20Appellate%20Procedure%29%20%3F%28Rule%20%29%3F%28%5Cd%2B%5Ba-z%5D%3F%29)
Federal Rules of Criminal Procedure | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28F%5C.%3F%20%3FR%5C.%3F%20%3FCr%5C.%3F%20%3FP%5C.%3F%7CFed%5C.%3F%20%3FR%28%5C.%3F%7Cule%29%20%3FCrim%5C.%3F%20%3FPr%3Fo%3Fc%3F%5C.%3F%7CFederal%20Rules%3F%20of%20Criminal%20Procedure%29%20%3F%28Rule%20%29%3F%28%5Cd%2B%5Ba-z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Federal Rules of Evidence | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28F%5C.%3F%20%3FR%5C.%3F%20%3FE%5C.%3F%7CFed%5C.%3F%20R%28%5C.%3F%7Cule%29%20%3FEvid%5C.%3F%7CFederal%20Rules%3F%20of%20Evidence%29%20%3F%28Rule%20%29%3F%28%5Cd%2B%5Ba-z%5D%3F%29)
Immigration and Nationality Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Immigration%20%28%5BAa%5Dnd%7C%26%29%20Nationality%20Act%7CI%5C.%3F%20%3FN%5C.%3F%20%3FA%5C.%3F%29%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Internal Revenue Code | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Internal%20Revenue%20Code%7CI%5C.%3F%20%3FR%5C.%3F%20%3FC%5C.%3F%29%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Treasury Regulations | [ecfr.federalregister.gov](https://ecfr.federalregister.gov) | [view regex](https://regexper.com#Treas%28ury%7C%5C.%3F%29%20%3FReg%28ulations%3F%7C%5C.%3F%29%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
National Labor Relations Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Natioanal%20Labor%20Relations%20Act%7CN%5C.%3F%20%3FL%5C.%3F%20%3FR%5C.%3F%20%3FA%5C.%3F%29%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
National Labor Relations Board Decisions | [www.nlrb.gov](https://www.nlrb.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20N%5C.%3F%20%3FL%5C.%3F%20%3FR%5C.%3F%20%3FB%5C.%3F%20%28%5Cd%2B%29)
National Labor Relations Board Slip Opinions | [www.nlrb.gov](https://www.nlrb.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20N%5C.%3F%20%3FL%5C.%3F%20%3FR%5C.%3F%20%3FB%5C.%3F%20%28Slip%20Op%5C.%20%29%3FNo%5C.%20%28%5Cd%2B%29)
Endangered Species Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Endangered%20Species%20Act%7CE%5C.%3F%20%3FS%5C.%3F%20%3FA%5C.%3F%29%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Clean Air Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#C%5C.%3F%20%3FA%5C.%3F%20%3FA%5C.%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Clean Water Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Clean%20Water%20Act%7CC%5C.%3F%20%3FW%5C.%3F%20%3FA%5C.%3F%29%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Fair Housing Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Fair%20Housing%20Act%7CF%5C.%3F%20%3Fh%5C.%3F%20%3FA%5C.%3F%29%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Americans With Disabilities Act | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Americans%20%5BWw%5Dith%20Disabilities%20Act%7CA%5C.%3F%20%3FD%5C.%3F%20%3FA%5C.%3F%29%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Uniform Commercial Code | [www.law.cornell.edu](https://www.law.cornell.edu) | [view regex](https://regexper.com#%28Uniform%20Commercial%20Code%7CU%5C.%3F%20%3FC%5C.%3F%20%3FC%5C.%3F%29%28%20%3F%C2%A7%29%3F%20%28%5Cd%5Ba-z%5D%3F%29%5CW%2B%28%5Cd%2B%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Code of Alabama, 1975 | [alisondb.legislature.state.al.us](https://alisondb.legislature.state.al.us) | [view regex](https://regexper.com#%28Ala%28bama%7C%5C.%29%7CAL%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Alabama Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Ala%28bama%7C%5C.%29%7CAL%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Alaska Statutes | [www.akleg.gov](http://www.akleg.gov) | [view regex](https://regexper.com#%28Alaska%7CAK%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29%5C.%28%5Cd%2B%5BA-Za-z%5D%3F%29%5C.%28%5Cd%2B%5BA-Za-z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Alaska Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Alaska%7CAK%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
American Samoa Code | [new.asbar.org](https://new.asbar.org) | [view regex](https://regexper.com#Am%28erican%7C%5C.%29%20%3FSamoa%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%29%5C.%28%5Cd%2B%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
American Samoa Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#Am%28erican%7C%5C.%29%20%3FSamoa%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Arkansas Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Ark%28ansas%7C%5C.%29%7CAR%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Arizona Revised Statutes | [www.azleg.gov](https://www.azleg.gov) | [view regex](https://regexper.com#%28Ariz%28ona%7C%5C.%29%7CAZ%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Arizona Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Ariz%28ona%7C%5C.%29%7CAZ%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
California Codes | [leginfo.legislature.ca.gov](https://leginfo.legislature.ca.gov) | [view regex](https://regexper.com#%28Cal%28ifornia%7C%5C.%29%7CCAL%3F%29%20%3F%28%5BBCDEFGHILMPRSUVW%5D.%7B2%2C40%7D%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
California Constitution | [leginfo.legislature.ca.gov](https://leginfo.legislature.ca.gov) | [view regex](https://regexper.com#%28Cal%28ifornia%7C%5C.%29%7CCAL%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Colorado Revised Statutes | [leg.colorado.gov](https://leg.colorado.gov) | [view regex](https://regexper.com#%28Colo%28rado%7C%5C.%29%7CCO%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Colorado Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Colo%28rado%7C%5C.%29%7CCO%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
General Statutes of Connecticut | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Conn%28ecticut%7C%5C.%29%7CCT%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%28%5Cd%5Ba-z%5C-%5D%2A%5Cw%7C%5Cd%2B%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Connecticut Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Conn%28ecticut%7C%5C.%29%7CCT%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Delaware Code | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Del%28aware%7C%5C.%29%7CDE%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%2C%3F%20%5BTt%5Dit%28le%7C%5C.%29%20%3F%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Z%5D%29%3F%29%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Delaware General Corporations Law | [delcode.delaware.gov](https://delcode.delaware.gov) | [view regex](https://regexper.com#%28D%5C.%3F%20%3FG%5C.%3F%20%3FC%5C.%3F%20%3FL%5C.%3F%7CDel%28aware%7C%5C.%29%20%3FGen%28eral%7C%5C.%29%20%3FCorp%28orations%3F%7Cs%3F%5C.%29%20%3FL%28aw%7C%5C.%29%29%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Delaware Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Del%28aware%7C%5C.%29%7CDE%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
District of Columbia Official Code | [code.dccouncil.us](https://code.dccouncil.us) | [view regex](https://regexper.com#%28District%20of%20Columbia%28%20Official%29%3F%7CD%5C.%3F%20%3FC%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Florida Statutes | [www.flsenate.gov](https://www.flsenate.gov) | [view regex](https://regexper.com#%28Fl%28orida%7Ca%3F%5C.%29%7CFL%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Florida Constitution | [www.flsenate.gov](https://www.flsenate.gov) | [view regex](https://regexper.com#%28Fl%28orida%7Ca%3F%5C.%29%7CFL%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Georgia Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#G%28eorgia%7Ca%5C.%7CA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BPp%5Dar%28agraph%7Ca%3F%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%29%29%3F%29%3F)
Hawaii Revised Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Haw%28ai.%3Fi%7C%5C.%29%7CHI%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Hawaii Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Haw%28ai.%3Fi%7C%5C.%29%7CHI%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Idaho Code | [legislature.idaho.gov](https://legislature.idaho.gov) | [view regex](https://regexper.com#I%28daho%7CD%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%28%5Cd%7B1%2C2%7D%29%5Cd%7B2%7D%5BA-Z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Idaho Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#I%28daho%7CD%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Illinois Compiled Statutes | [www.ilga.gov](https://www.ilga.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20ILCS%20%28%5Cd%2B%29%2F%28%28%5Cd%5B%5Cd.-%5D%2A%5Cw%7C%5Cd%29%29)
Illinois Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Il%28linois%7Cl%3F%5C.%29%7CIL%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Indiana Code | [iga.in.gov](https://iga.in.gov) | [view regex](https://regexper.com#%28Ind%28iana%7C%5C.%29%7CIN%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Indiana Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Ind%28iana%7C%5C.%29%7CIN%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Iowa Code | [www.legis.iowa.gov](https://www.legis.iowa.gov) | [view regex](https://regexper.com#I%28owa%7CA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Iowa Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#I%28owa%7CA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Kansas Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Kan%28sas%7C%5C.%29%7CKS%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Kansas Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Kan%28sas%7C%5C.%29%7CKS%29%20%3FConst%28itution%7C%5C.%29%20%3F%28%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%7C%28Bill%20of%20Rights%7CPreamble%29%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Kentucky Revised Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28K%28entucky%7Cy%5C.%7CY%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CKRS%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%28%5Cd%5B%5Cd.%5D%2A%5Cw%7C%5Cd%29%29%5C.%28%5Cd%2B%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Louisiana Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#L%28ouisiana%7Ca%5C.%7CA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%3A%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Louisiana Codes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#L%28ouisiana%7Ca%5C.%7CA%29%20%3F%28Civ%28il%7C%5C.%29%20%3FCode%7CCode%28%20of%29%3F%20%28%28Civ%28il%7C%5C.%29%7CCrim%28inal%7C%5C.%29%29%20%3FProc%28edure%7C%5C.%29%7CEvid%28ence%7C%5C.%29%29%7CChild%28ren%27%3Fs%7C%5C.%29%20%3FCode%29%28%20Ann%28otated%7C%5C.%29%29%3F%2C%3F%28%20%5BAa%5Drt%28icle%7C%5C.%29%29%3F%20%28%5Cd%2B%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Louisiana Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#L%28ouisiana%7Ca%5C.%7CA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Maine Statutes | [legislature.maine.gov](https://legislature.maine.gov) | [view regex](https://regexper.com#M%28aine%7Ce%5C.%7CE%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%2C%3F%20%5BTt%5Dit%28le%7C%5C.%29%20%3F%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Z%5D%29%3F%29%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Maine Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#M%28aine%7Ce%5C.%7CE%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Maryland Code | [mgaleg.maryland.gov](https://mgaleg.maryland.gov) | [view regex](https://regexper.com#M%28aryland%7Cd%5C.%7CD%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Ac%7CAl%7C%5BBCEFHILNPRST%5D%29.%7B4%2C38%7D%3F%29%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5B%5CdA-Z%5C-%E2%80%93.%5D%2A%5B%5CdA-Z%5D%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Maryland Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#M%28aryland%7Cd%5C.%7CD%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Massachusetts General Laws | [malegislature.gov](https://malegislature.gov) | [view regex](https://regexper.com#%28%28Mass%28achusetts%7C%5C.%29%7CMA%29%20%3F%28Gen%28eral%7C%5C.%29%7CAnn%28otated%7C%5C.%29%29%20%3FLaws%28%20Ann%28otated%7C%5C.%29%29%3F%7CM%5C.%3FG%5C.%3FL%5C.%3F%28A%5C.%3F%29%3F%7CA%5C.%3FL%5C.%3FM%5C.%3F%29%2C%3F%20%5BCc%5D%28hapter%7Ch%3F%5C.%29%20%3F%28%5Cd%2B%5BA-Z%5D%3F%29%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7CSect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%5Cd%2B%5BA-Z%5D%3F%5Cd%2A%28%5B%2F%5D%5Cd%2B%5BA-Z%5D%3F%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Michigan Compiled Laws | [legislature.mi.gov](https://legislature.mi.gov) | [view regex](https://regexper.com#%28Mich%28igan%7C%5C.%29%7CMI%29%20Comp%28iled%7C%5C.%29%20Laws%28%20%28Serv%28ice%7C%5C.%29%7CAnn%28otated%7C%5C.%29%29%29%3F%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Michigan Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Mich%28igan%7C%5C.%29%7CMI%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Minnesota Statutes | [www.revisor.mn.gov](https://www.revisor.mn.gov) | [view regex](https://regexper.com#%28Minn%28esota%7C%5C.%29%7CMN%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%5C%28%28%5Cd%5Cw%2A%29%5C%29%28%5C%28%5Cw%2B%5C%29%29%2A%7C%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Minnesota Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Minn%28esota%7C%5C.%29%7CMN%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Mississippi Code | [law.justia.com](https://law.justia.com) | [view regex](https://regexper.com#%28Miss%28issippi%7C%5C.%29%7CMS%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Mississippi Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Miss%28issippi%7C%5C.%29%7CMS%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Missouri Revised Statutes | [revisor.mo.gov](https://revisor.mo.gov) | [view regex](https://regexper.com#%28%28M%28issouri%7Co%5C.%7CO%29%28%20Ann%28otated%7C%5C.%29%29%3F%20%3FRev%28ised%7C%5C.%29%20%3FStat%28utes%7Cs%3F%5C.%29%28%20Ann%28otated%7C%5C.%29%29%3F%7CR%5C.%3FS%5C.%3FM%5BOo%5D%5C.%3F%29%29%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Missouri Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#M%28issouri%7Co%5C.%7CO%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Montana Code | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Mont%28ana%7C%5C.%29%7CMT%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Montana Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Mont%28ana%7C%5C.%29%7CMT%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Revised Statutes of Nebraska | [www.nebraskalegislature.gov](https://www.nebraskalegislature.gov) | [view regex](https://regexper.com#%28Neb%28raska%7C%5C.%29%7CNE%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Nebraska Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Neb%28raska%7C%5C.%29%7CNE%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
New Hampshire Revised Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28New%20Hampshire%7CN%5C.%3F%20%3FH%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5B-%E2%80%93%5D%5BA-Za-z%5D%29%3F%29%3A%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Za-z%5D%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
New Jersey Statutes | [njlaw.rutgers.edu](https://njlaw.rutgers.edu) | [view regex](https://regexper.com#%28%28N%5C.%3F%20%3FJ%5C.%3F%7CNew%20Jersey%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CN%5C.%3FJ%5C.%3FS%5C.%3FA%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29%3A%28%5Cd%2B%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
New Jersey Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28N%5C.%3F%20%3FJ%5C.%3F%7CNew%20Jersey%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Nevada Revised Statutes | [www.leg.state.nv.us](https://www.leg.state.nv.us) | [view regex](https://regexper.com#%28%28Nev%28ada%7C%5C.%29%7CNV%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CNRS%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Nevada Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Nev%28ada%7C%5C.%29%7CNV%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
New Mexico Statutes Annotated 1978 | [nmonesource.com](https://nmonesource.com) | [view regex](https://regexper.com#%28%28New%20Mexico%7CN%5C.%3F%20%3FM%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CNMSA%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29-%28%5Cd%2B%5BA-Za-z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
New Mexico Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28New%20Mexico%7CN%5C.%3F%20%3FM%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Consolidated Laws of New York | [www.nysenate.gov](https://www.nysenate.gov) | [view regex](https://regexper.com#%28New%20York%7CN%5C.%3F%20%3FY%5C.%3F%29%20%3F%28.%7B2%2C40%7D%3F%29%28%20Law%29%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
New York Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28New%20York%7CN%5C.%3F%20%3FY%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
North Carolina General Statutes | [www.ncleg.gov](https://www.ncleg.gov) | [view regex](https://regexper.com#%28%28North%20Carolina%7CN%5C.%3F%20%3FC%5C.%3F%29%20%3FGen%28eral%7C%5C.%29%20%3FStat%28utes%7Cs%3F%5C.%29%7CN%5C.%3F%20%3FC%5C.%3F%20%3FG%5C.%3F%20%3FS%5C.%3F%29%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
North Carolina Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28North%20Carolina%7CN%5C.%3F%20%3FC%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
North Dakota Century Code | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28North%20Dakota%7CN%5C.%3F%20%3FD%5C.%3F%29%20%3FCent%28ury%7C%5C.%29%20%3FCode%28%20Ann%28otated%7C%5C.%29%29%3F%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
North Dakota Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28North%20Dakota%7CN%5C.%3F%20%3FD%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Northern Mariana Islands Commonwealth Code | [cnmilaw.org](https://cnmilaw.org) | [view regex](https://regexper.com#%28%5Cd%2B%29%20N%28orthern%7C%5C.%29%20%3FMar%28iana%7C%5C.%29%20%3FI%28slands%7C%5C.%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Northern Mariana Islands Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#N%28orthern%7C%5C.%29%20%3FMar%28iana%7C%5C.%29%20%3FI%28slands%7C%5C.%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Ohio Revised Code | [codes.ohio.gov](https://codes.ohio.gov) | [view regex](https://regexper.com#O%28hio%7CH%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%29%28%5C.%28%5Cd%2B%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F%29%3F)
Ohio Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#O%28hio%7CH%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Oklahoma Statutes | [law.justia.com](https://law.justia.com) | [view regex](https://regexper.com#%28Okla%28homa%7C%5C.%29%7COK%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%2C%3F%20%5BTt%5Dit%28le%7C%5C.%29%20%3F%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Z%5D%29%3F%29%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Oklahoma Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Okla%28homa%7C%5C.%29%7COK%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Oregon Revised Statutes | [www.oregonlaws.org](https://www.oregonlaws.org) | [view regex](https://regexper.com#%28Or%28egon%7Ce%3F%5C.%29%7COR%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Oregon Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Or%28egon%7Ce%3F%5C.%29%7COR%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Pennsylvania Code | [www.pacodeandbulletin.gov](https://www.pacodeandbulletin.gov) | [view regex](https://regexper.com#%28%5Cd%2B%29%20%28Pennsylvania%7CPa%5C.%7CPA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Pennsylvania Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Pennsylvania%7CPa%5C.%7CPA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Puerto Rico Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Puerto%20Rico%7CP%5C.%3F%20%3FR%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
General Laws of Rhode Island | [webserver.rilin.state.ri.us](http://webserver.rilin.state.ri.us) | [view regex](https://regexper.com#%28Rhode%20Island%7CR%5C.%3F%20%3FI%5C.%3F%29%20%3FGen%28eral%7C%5C.%29%20%3FLaws%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Rhode Island Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Rhode%20Island%7CR%5C.%3F%20%3FI%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
South Carolina Code of Laws | [www.scstatehouse.gov](https://www.scstatehouse.gov) | [view regex](https://regexper.com#%28South%20Carolina%7CS%5C.%3F%20%3FC%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
South Carolina Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28South%20Carolina%7CS%5C.%3F%20%3FC%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
South Dakota Codified Laws | [sdlegislature.gov](https://sdlegislature.gov) | [view regex](https://regexper.com#%28South%20Dakota%7CS%5C.%3F%20%3FD%5C.%3F%29%20%3F%28Codified%7CComp%28iled%7C%5C.%29%29%20Laws%28%20Ann%28otated%7C%5C.%29%29%3F%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
South Dakota Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28South%20Dakota%7CS%5C.%3F%20%3FD%5C.%3F%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Tennessee Code | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#%28Tenn%28essee%7C%5C.%29%7CTN%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Tennessee Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Tenn%28essee%7C%5C.%29%7CTN%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Texas Codes | [statutes.capitol.texas.gov](https://statutes.capitol.texas.gov) | [view regex](https://regexper.com#%28Tex%28as%7C%5C.%29%7CTX%29%20%28%5Cw.%7B2%2C40%7D%3F%29%28%20Code%28%20Ann%28otated%7C%5C.%29%29%3F%29%3F%20%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Texas Constitution | [statutes.capitol.texas.gov](https://statutes.capitol.texas.gov) | [view regex](https://regexper.com#%28Tex%28as%7C%5C.%29%7CTX%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Utah Code | [le.utah.gov](https://le.utah.gov) | [view regex](https://regexper.com#%28Utah%7CUT%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Utah Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Utah%7CUT%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Vermont Statutes | [www.lawserver.com](https://www.lawserver.com) | [view regex](https://regexper.com#V%28ermont%7Ct%5C.%7CT%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%2C%3F%20%5BTt%5Dit%28le%7C%5C.%29%20%3F%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Z%5D%29%3F%29%2C%3F%20%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%3F%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Virginia Code | [law.lis.virginia.gov](https://law.lis.virginia.gov) | [view regex](https://regexper.com#V%28irginia%7Ca%5C.%7CA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Virginia Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#V%28irginia%7Ca%5C.%7CA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Virgin Islands Code | [law.justia.com](https://law.justia.com) | [view regex](https://regexper.com#%28Virgin%20Islands%7CV%5C.%3F%20%3FI%5C.%3F%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%2C%3F%20%5BTt%5Dit%28le%7C%5C.%29%20%3F%28%5Cd%2B%28%5B-%E2%80%91%E2%80%93%5D%5BA-Z%5D%29%3F%29%2C%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F%28%2C%3F%20%5C%28%28%5Cd%7B4%7D%29%5C%29%29%3F)
Revised Code of Washington | [app.leg.wa.gov](https://app.leg.wa.gov) | [view regex](https://regexper.com#%28%28Wash%28ington%7C%5C.%29%7CWA%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%7CR%5C.%3FC%5C.%3FW%5C.%3F%20%29%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29%5C.%28%5Cd%2B%5BA-Za-z%5D%3F%29%5C.%28%5Cd%2B%5BA-Za-z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Washington Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Wash%28ington%7C%5C.%29%7CWA%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
West Virginia Code | [www.wvlegislature.gov](http://www.wvlegislature.gov) | [view regex](https://regexper.com#%28West%20Virginia%7CW%5C.%20%3FVa%3F%5C.%7CWV%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Za-z%5D%3F%29-%28%5Cd%2B%5BA-Za-z%5D%3F%29-%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Z%5D%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
West Virginia Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28West%20Virginia%7CW%5C.%20%3FVa%3F%5C.%7CWV%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Wisconsin Statutes | [docs.legis.wisconsin.gov](https://docs.legis.wisconsin.gov) | [view regex](https://regexper.com#%28Wis%28consin%7C%5C.%29%7CWI%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%5BA-Z%5D%3F%29%5C.%28%5Cd%2B%5Cw%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Wisconsin Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Wis%28consin%7C%5C.%29%7CWI%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Wyoming Statutes | [wyoleg.gov](https://wyoleg.gov) | [view regex](https://regexper.com#%28Wyo%28ming%7C%5C.%29%7CWY%29%28%20%3FRev%28ised%7C%5C.%29%29%3F%28%20%3FAnn%28otated%7C%5C.%29%29%3F%28%20%3FGen%28eral%7C%5C.%29%29%3F%20%3F%28Codes%3F%7CStat%28utes%7Cs%3F%5C.%3F%29%29%28%20%3FAnn%28otated%7C%5C.%29%29%3F%2C%3F%20%3F%28%28Sections%3F%7C%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%29%20%3F%29%3F%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%5BA-Za-z%5D%3F%29%5B-%E2%80%91%E2%80%93%5D%28%5Cd%2B%28%5C.%5Cd%2B%29%3F%29%28%28%5C%28%5Cw%2B%5C%29%29%2B%29%3F)
Wyoming Constitution | [ballotpedia.org](https://ballotpedia.org) | [view regex](https://regexper.com#%28Wyo%28ming%7C%5C.%29%7CWY%29%20%3FConst%28itution%7C%5C.%29%20%3F%5BAa%5Drt%28icle%7C%5C.%29%20%3F%28%5B%5CdIVXivx%5D%7B1%2C8%7D%29%28%2C%3F%20%3F%28%28%26sect%3B%7C%26%23167%7C%C2%A7%29%7B1%2C2%7D%7C%5BSs%5Dect%3F%28ions%3F%7Cs%3F%5C.%29%29%20%3F%28%28%5Cd%5B%5Cw.%5D%2A%5Cw%7C%5Cd%29%29%28%2C%3F%20%28%5BCc%5Dl%28ause%7C%5C.%29%20%3F%28%5Cd%2B%29%29%29%3F%29%3F)
Caselaw Access Project | [cite.case.law](https://cite.case.law) | [view regex](https://regexper.com#%28%5Cd%2B%29%20%28Abb%5C.%20Ct%5C.%20App%5C.%7CAbb%5C.N%5C.%20Cas%5C.%7CAbb%5C.%20Pr%5C.%7CAbb%5C.%20Pr%5C.%20%5C%28n%5C.s%5C.%5C%29%7CVa%5C.%20%5C%28Va%5C.%20Cas%5C.%5C%29%7CAdams%20Co%5C.%20L%5C.J%5C.%7CAdd%5C.%7CDallam%7CFranklin%20Co%5C.%20Legal%20J%5C.%7CAik%5C.%7CAla%5C.%20App%5C.%7CAla%5C.%7CAlaska%20Fed%5C.%7CAlaska%7CAm%5C.%20Samoa%7CAm%5C.%20Samoa%202d%7CAm%5C.%20Samoa%203d%7COhio%20App%5C.%20Unrep%5C.%7CAnt%5C.%20N%5C.P%5C.%20Cas%5C.%7CA%5C.D%5C.2d%7CA%5C.D%5C.%7CA%5C.D%5C.3d%7CKy%5C.%20%5C%28Hughes%5C%29%7CAriz%5C.%20App%5C.%7CAriz%5C.%7CArk%5C.%20App%5C.%7CArk%5C.%7CArmstrong%5C.%20Election%20Cases%7CA%5C.%7CBalt%5C.%20C%5C.%20Rep%5C.%7CBarb%5C.%20Ch%5C.%7CBarb%5C.%7CB%5C.%20Co%5C.%20Leg%5C.%20J%5C.%7CBerk%27s%20Co%5C.%20L%5C.J%5C.%5C.%7CBlackf%5C.%7CBlair%20Co%5C.%20L%5C.R%5C.%7CBlair%20Co%5C.%20L%5C.R%5C.%202d%7CBosworth%20Super%5C.%20Ct%5C.%20Rep%5C.%7CBradford%20Co%5C.%20L%5C.J%5C.%7CBrad%5C.%7CBrayt%5C.%7CBucks%20Co%5C.%20L%5C.R%5C.%7CBur%5C.%7CBur%5C.%7CButler%20Co%5C.%20Legal%20J%5C.%7CE%5C.D%5C.%20Pa%5C.%7CCai%5C.%20Cas%5C.%7CCai%5C.%7CCal%5C.%20%3FApp%5C.%7CCal%5C.%20%3FApp%5C.%20%3F5th%7CCal%5C.%20%3FApp%5C.%20%3F4th%7CCal%5C.%20%3FApp%5C.%20%3F2d%7CCal%5C.%20%3FApp%5C.%20%3F3d%7CCal%5C.%20%3F3d%7CCal%5C.%20%3F4th%7CCal%5C.%7CCal%5C.%20%3F2d%7CCal%5C.%20%3FSuper%5C.%20%3FCt%5C.%7CCal%5C.%20%3FUnrep%5C.%7CCambria%20Co%5C.%20L%5C.J%5C.%7CCambria%20Co%5C.%20Rep%5C.%7CCarbon%20Co%5C.%20L%5C.J%5C.%7CN%5C.C%5C.%20%5C%28Car%5C.%20L%5C.%20Rep%5C.%5C%29%7CN%5C.J%5C.%20%5C%28Manumission%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28McMul%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Chev%5C.%5C%29%7CTapp%5C.%20Rep%5C.%7CD%5C.%20Pa%5C.%7COhio%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Chev%5C.%20Eq%5C.%5C%29%7CMonaghan%7CSadler%7CKy%5C.%20%5C%28Litt%5C.%20Sel%5C.%20Cas%5C.%5C%29%7CC%5C.C%5C.L%5C.J%5C.%7CC%5C.C%5C.L%5C.J%5C.%202d%7CS%5C.C%5C.%20Eq%5C.%20%5C%28McCord%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Ril%5C.%20Eq%5C.%5C%29%7CChand%5C.%7CCharlton%20Rep%5C.%7CChes%5C.%20Co%5C.%20Rep%5C.%7CD%5C.%20Chip%5C.%7CN%5C.%20Chip%5C.%7CMun%5C.%20%20L%5C.%20Rep%5C.%7CHosea%27s%20Rep%5C.%7CN%5C.Y%5C.%20City%20Ct%5C.%20Rep%5C.%7CCl%5C.%20Ch%5C.%7CCole%5C.%20%26%20Cai%5C.%20Cas%5C.%7CCole%5C.%20Cas%5C.%7CColo%5C.%20App%5C.%7CColo%5C.%20L%5C.%20Rep%5C.%7CColo%5C.%20N%5C.%20P%5C.%7CColo%5C.%7CWillson%7CWhite%20%26%20W%5C.%7CN%5C.C%5C.%20%5C%28Cam%5C.%20%26%20Nor%5C.%5C%29%7CKing%27s%20Conflicting%20Cases%7CConn%5C.%20App%5C.%7CConn%5C.%20Cir%5C.%20Ct%5C.%7CKirby%7CRoot%7CConn%5C.%7CConn%5C.%20Supp%5C.%7CConnoly%20Sur%5C.%20Rep%5C.%7CCt%5C.%20Cl%5C.%7CC%5C.C%5C.P%5C.A%5C.%7CCt%5C.%20Cust%5C.%7CCow%5C.%7CCraw%5C.%20Co%5C.%20Leg%5C.%20J%5C.%7CCumberland%20L%5C.J%5C.%7CCust%5C.%20B%5C.%20%26%20Dec%5C.%7CDakota%7CDallam%7CDall%5C.%7CDaly%20%5C%28N%5C.Y%5C.%5C%29%7CDau%5C.%20Co%5C.%20Rep%5C.%7CDay%7CT%5C.C%5C.A%5C.%7CP%5C.R%5C.%20Dec%5C.%7CTeiss%5C.%7CVa%5C.%20Ch%5C.%20Dec%5C.%7CKy%5C.%20%5C%28Sneed%5C%29%7CPears%5C.%7CSmith%7CGa%5C.%20Super%5C.%20Ct%5C.%7CGeorgia%20Decisions%7CC%5C.M%5C.A%5C.%7CDel%5C.%20Cas%5C.%7CDel%5C.%20Ch%5C.%7CDel%5C.%20Co%5C.%20Reps%5C.%7CDel%5C.%20%5C%28Harr%5C.%5C%29%7CDel%5C.%20%5C%28Penne%5C.%5C%29%7CDel%5C.%20%5C%28Boyce%5C%29%7CDel%5C.%20%5C%28Marv%5C.%5C%29%7CDel%5C.%20%5C%28Houst%5C.%5C%29%7CDel%5C.%7CDem%5C.%20Sur%5C.%7CDenio%7CDocket%7CDudley%20Rep%5C.%7CDuer%20Super%5C.%20Ct%5C.%20Rep%5C.%7CEdm%5C.%20Sel%5C.%20Cas%5C.%7CE%5C.D%5C.%20Smith%7CEdw%5C.%20Ch%5C.%7CS%5C.C%5C.%20Eq%5C.%20%5C%28McMul%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Speers%20Eq%5C.%5C%29%7CErie%5C.%20Co%5C.%20L%5C.J%5C.%7CP%5C.R%5C.%20Sent%5C.%7CFay%5C.%20L%5C.J%5C.%7CF%5C.%20Cas%5C.%7CFed%5C.%20Cl%5C.%7CF%5C.%7CF%5C.%20%3F2d%7CF%5C.%20%3F3d%7CF%5C.R%5C.D%5C.%7CF%5C.%20%3FSupp%5C.%28%20%3F%5B23%5Dd%29%3F%7CFla%5C.%7CFla%5C.%20Supp%5C.%7CFla%5C.%20Supp%5C.%202d%7CGa%5C.%20App%5C.%7CGa%5C.%20L%5C.%20Rep%5C.%7CGa%5C.%7CGault%7CGibb%5C.%20Surr%5C.%7CGuam%7CHall%20Super%5C.%20Ct%5C.%20Rep%5C.%7CH%5C.%20%26%20G%5C.%7CHaw%5C.%20App%5C.%7CHaw%5C.%7CHaz%5C.%20Pa%5C.%20Reg%5C.%7CVa%5C.%20%5C%28Hen%5C.%20%26%20M%5C.%5C%29%7CHill%20%26%20Den%5C.%7CHill%7CHilt%5C.%7CHoff%5C.%20Ch%5C.%7CHopk%5C.%20Ch%5C.%7CHow%5C.%20App%5C.%20Cas%5C.%7CHow%5C.%20Pr%5C.%7CHow%5C.%20Pr%5C.%20%5C%28n%5C.s%5C.%5C%29%7CIdaho%7CIll%5C.%20App%5C.%7CIll%5C.%20App%5C.%202d%7CIll%5C.%20App%5C.%203d%7CIll%5C.%20Cir%5C.%20Ct%5C.%20Rep%5C.%7CIll%5C.%20Ct%5C.%20Cl%5C.%7CIll%5C.%20%5C%28Scam%5C%29%7CIll%5C.%20%5C%28Breese%5C%29%7CIll%5C.%20%5C%28Gilm%5C.%5C%29%7CIll%5C.%7CIll%5C.%202d%7CInd%5C.%20App%5C.%7CInd%5C.%20L%5C.%20Rep%5C.%7CInd%5C.%7CIndian%20Terr%5C.%7CIowa%7CJeff%5C.%7CJohns%5C.%20Cas%5C.%7CJohns%5C.%20Ch%5C.%7CJohns%5C.%7CJones%20and%20Spencer%27s%20Super%5C.%20Ct%5C.%20Rep%5C.%7CEdsall%7CPa%5C.%20%5C%28Admiralty%5C%29%7CKan%5C.%20App%5C.%202d%7CKan%5C.%7CKy%5C.%20%5C%28A%5C.K%5C.%20Marsh%5C.%5C%29%7CKy%5C.%20Op%5C.%7CKy%5C.%7CKeyes%7CLack%5C.%20Bar%5C.%20R%5C.%7CLack%5C.%20Bar%20%20R%5C.%7CLack%5C.%20Jur%5C.%7CLack%5C.%20L%5C.%20N%5C.%7CLack%5C.%20L%5C.R%5C.%7CLanc%5C.%20Bar%7CLanc%5C.%20L%5C.%20Rev%5C.%7CLans%5C.%20Ch%5C.%7CLans%5C.%7CLaw%5C.%20L%5C.J%5C.%7CLaw%20Times%7CLaw%20Times%20%5C%28N%5C.S%5C.%5C%29%7CLebanon%20Co%5C.%20L%5C.J%5C.%7CFoster%7CLeg%5C.%20Gaz%5C.%7CLeg%5C.%20Gaz%5C.%7CPa%5C.%20Leg%5C.%20Gaz%5C.%7CGunby%7CLeg%5C.%20Rec%5C.%20Rep%5C.%7CLehigh%20Co%5C.%20L%5C.J%5C.%7CLehigh%20Val%5C.%20L%5C.%20Rep%5C.%7CLiquor%20Tax%20Rep%5C.%7CLock%5C.%20Rev%5C.%20Cas%5C.%7CLa%5C.%20Ann%5C.%7CLa%5C.%20App%5C.%7CLa%5C.%7CLa%5C.%7CLuz%5C.%20L%5C.J%5C.%7CLuz%5C.%20L%5C.O%5C.%7CLuz%5C.%20Leg%5C.%20Reg%5C.%7CLuz%5C.%20Leg%5C.%20Reg%5C.%7CLycoming%20R%5C.%7CMagis%5C.%20%26%20Const%5C.%7CMe%5C.%7CMcGrath%7CN%5C.C%5C.%20%5C%28Mart%5C.%5C%29%7CMart%5C.%20%5C%28n%5C.s%5C.%5C%29%7CMart%5C.%20%5C%28o%5C.s%5C.%5C%29%7CMd%5C.%20App%5C.%7CMd%5C.%7CH%5C.%20%26%20McH%5C.%7CMass%5C.%20%5C%28Allen%5C%29%7CMass%5C.%20App%5C.%20Ct%5C.%7CMass%5C.%20App%5C.%20Dec%5C.%7CDavis%20L%5C.%20Ct%5C.%20Cas%5C.%7CDavis%20L%5C.%20Ct%5C.%20Cas%5C.%7CMass%5C.%20%5C%28Cush%5C%29%7CMass%5C.%20%5C%28Pick%5C.%5C%29%7CMass%5C.%20%5C%28Gray%5C%29%7CMass%5C.%20%5C%28Tyng%5C%29%7CMass%5C.%20%5C%28Will%5C.%5C%29%7CMass%5C.%20%5C%28Met%5C.%5C%29%7CMass%5C.%7CMass%5C.%20Supp%5C.%7CMercer%7CMich%5C.%20App%5C.%20%7CHowell%20N%5C.P%5C.%7CMich%5C.%7CM%5C.C%5C.L%5C.J%5C.%7CMills%20Surr%5C.%7CMinn%5C.%7CMinor%7CVa%5C.%7CMiss%5C.%20Ct%5C.%20Rec%5C.%7CMiss%5C.%20Dec%5C.%7CMiss%5C.%20%5C%28Walker%5C%29%7CMiss%5C.%7CMiss%5C.%20%5C%28Howard%5C%29%7CMiss%5C.%20%5C%28S%5C.%20%26%20M%5C.%5C%29%7CMor%5C.%20St%5C.%20Cas%5C.%7CMo%5C.%20App%5C.%7CMo%5C.%7CMonroe%20L%5C.R%5C.%7CMont%5C.%7CMont%5C.%20Co%5C.%20L%5C.%20Rep%5C.%7CNavajo%20Rptr%5C.%7CNeb%5C.%20App%5C.%7CNeb%5C.%7CNev%5C.%7CN%5C.H%5C.%7CN%5C.J%5C.%20Eq%5C.%7CN%5C.J%5C.L%5C.%7CN%5C.J%5C.%20Misc%5C.%7CN%5C.J%5C.%7CN%5C.J%5C.%20Super%5C.%7CN%5C.J%5C.%20Tax%20Ct%5C.%7CN%5C.M%5C.%7CN%5C.M%5C.%7CN%5C.Y%5C.%20Crim%5C.%7CMisc%5C.2d%7CMisc%5C.3d%7CMisc%5C.%7CN%5C.Y%5C.%20%3F2d%7CN%5C.Y%5C.%7CN%5C.Y%5C.%20%3F3d%7CN%5C.Y%5C.%20St%5C.%20Rptr%5C.%7CNortham%5C.%20Law%20Rep%5C.%7CN%5C.C%5C.%20App%5C.%7CN%5C.C%5C.%7CN%5C.C%5C.%20%5C%28Busb%5C.%20Eq%5C%29%7CN%5C.C%5C.%20%5C%28Busb%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Dev%5C.%20%26%20Bat%5C.%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Dev%5C.%20%26%20Bat%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Dev%5C.%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Dev%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Hawks%5C%29%7CN%5C.C%5C.%20%5C%28Hayw%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Ired%5C.%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Ired%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Jones%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Jones%5C%29%7CN%5C.C%5C.%20%5C%28Mur%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Phil%5C.%20Eq%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Phil%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Tay%5C.%5C%29%7CN%5C.C%5C.%20%5C%28Win%5C.%5C%29%7CN%5C.D%5C.%7CN%5C.E%5C.%7CN%5C.E%5C.2d%7CN%5C.E%5C.3d%7CN%5C.%20Mar%5C.%20I%5C.%20Commw%5C.%7CN%5C.%20Mar%5C.%20I%5C.%7CNorthum%5C.%20Co%5C.%20Leg%5C.%20N%5C.%7CNorthumb%5C.%20L%5C.J%5C.%7CN%5C.W%5C.%7CN%5C.W%5C.2d%7COhio%20App%5C.%7COhio%20App%5C.%202d%7COhio%20App%5C.%203d%7COhio%20C%5C.C%5C.%20Dec%5C.%7COhio%20C%5C.C%5C.%20%5C%28N%5C.S%5C.%5C%29%7COhio%20Cir%5C.%20Dec%5C.%7COhio%20Ct%5C.%20App%5C.%7COhio%20Misc%5C.%7COhio%20Misc%5C.%202d%7COhio%20Nisi%20Prius%7COhio%20Nisi%20Prius%20%5C%28N%5C.S%5C.%5C%29%7COhio%20Op%5C.%202d%7COhio%20Op%5C.%203d%7COhio%20Op%5C.%7COhio%20St%5C.%7COhio%20St%5C.%20%5C%28n%5C.s%5C.%5C%29%7COhio%20St%5C.%202d%7COhio%20St%5C.%203d%7COkla%5C.%20Crim%5C.%7COkla%5C.%7COlwine%27s%20L%5C.J%5C.%7COr%5C.%7COr%5C.%20App%5C.%7COr%5C.%20Tax%7CP%5C.%7CP%5C.2d%7CP%5C.3d%7CPaige%20Ch%5C.%7CPark%5C.%20Crim%5C.%20Rep%5C.%7CPelt%5C.%7CPa%5C.%20L%5C.%20Rec%5C.%7CPa%5C.%20Commw%5C.%7CPa%5C.%20Corp%5C.%20R%5C.%7CPa%5C.%20Co%5C.%20Ct%5C.%7CPa%5C.%20D%5C.%20%26%20C%5C.%202d%7CPa%5C.%20D%5C.%20%26%20C%5C.%7CPa%5C.%20D%5C.%20%26%20C%5C.%203d%7CPa%5C.%20D%5C.%20%26%20C%5C.%205th%7CPa%5C.%20D%5C.%20%26%20C%5C.%204th%7CPa%5C.%20Fid%5C.%7CPa%5C.%20Fid%5C.%202d%7CPa%5C.%20Fid%5C.%203d%7CPa%5C.%20Just%5C.%20L%5C.%20Rep%5C.%7CPa%5C.%20L%5C.J%5C.%20Rep%5C.%7CPa%5C.%7CPa%5C.%20Super%5C.%20Ct%5C.%7CPennyp%5C.%7CPhila%5C.%20Co%5C.%20R%5C.%7CPhila%5C.%20Reports%7CPin%5C.%7CPittsb%5C.%20L%5C.J%5C.%7CPitts%5C.%20R%5C.%7CPort%5C.%7CP%5C.R%5C.%20Fed%5C.%7CPow%5C.%20Surr%5C.%7CMich%5C.%20Pr%5C.%7CSinger%20Prob%5C.%20Cas%5C.%7CN%5C.Y%5C.%20Proc%5C.%20Ct%5C.%20Ass%5C.%7CP%5C.R%5C.%7CRec%5C.%20Q%5C.%20Ct%5C.%7CRec%5C.%20Ct%5C.%20Assistants%7CRec%5C.%20Co%5C.%20Ch%5C.%20%5C%28S%5C.C%5C.%5C%29%7CRec%5C.%20Ct%5C.%20Gen%5C.%20Sess%5C.%7CRec%5C.%20Bucks%5C.%20Co%5C.%20%5C%28Pa%5C.%5C%29%7CRec%5C.%20T%5C.%20Warwick%20%5C%28R%5C.I%5C.%5C%29%7CRec%5C.%20Ct%5C.%20Ches%5C.%20Co%5C.%20Pa%5C.%7CRec%5C.%20Co%5C.%20Ct%5C.%7CRec%5C.%20V%5C.A%5C.%20Ct%5C.%20%5C%28R%5C.I%5C.%5C%29%7CRedf%5C.%7CS%5C.C%5C.L%5C.%20%5C%28Ril%5C.%5C%29%7CCt%5C.%20Cl%5C.%7CMich%5C.%20Ct%5C.%20Cl%5C.%7CApp%5C.%20D%5C.C%5C.%7CBro%5C.%20Com%5C.%20P%5C.%7CAshm%5C.%20%5C%28Pa%5C.%5C%29%7CConn%5C.%20Super%5C.%20Ct%5C.%7CConn%5C.%20Super%5C.%20Ct%5C.%7CDisney%20%5C%28Ohio%5C%29%7CBinn%5C.%7CPen%5C.%20%26%20W%5C.%7CRawle%7CSerg%5C.%20%26%20Rawl%5C.%7CWatts%20%26%20Serg%5C.%7CWhart%5C.%7CYeates%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Des%5C.Eq%5C.%5C%29%7CKy%5C.%20%5C%28Hard%5C.%5C%29%7CHandy%7CSuper%5C.%20Ct%5C.%20Jud%5C.%7CTenn%5C.%20%5C%28Hayw%5C.%5C%29%7CGrant%7CD%5C.C%5C.%20%5C%28MacArth%5C.%20%26%20M%5C.%5C%29%7CD%5C.C%5C.%20%5C%28Tuck%5C.%20%26%20Cl%5C.%5C%29%7CJahn%7CS%5C.C%5C.L%5C.%20%5C%28Strob%5C.%5C%29%7CGill%7CG%5C.%20%26%20J%5C.%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Dud%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Bail%5C.%5C%29%7CN%5C.Y%5C.%7CWalk%5C.%20Ch%5C.%7CTenn%5C.%20Crim%5C.%20App%5C.%7CH%5C.%20%26%20J%5C.%7CWilson%7CMiss%5C.%20%5C%28S%5C.%20%26%20M%5C.%20Ch%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Bay%5C%29%7CMorris%7CWatts%7CTenn%5C.%20%5C%28Mart%5C.%20%26%20Yer%5C.%5C%29%7CTenn%5C.%20%5C%28Cold%5C.%5C%29%7CTenn%5C.%20%5C%28Heisk%5C.%5C%29%7CTenn%5C.%20%5C%28Yer%5C.%5C%29%7CTenn%5C.%20%5C%28Head%5C%29%7CTenn%5C.%20%5C%28Meigs%5C%29%7CTenn%5C.%20%5C%28Hum%5C.%5C%29%7CD%5C.C%5C.%7CD%5C.C%5C.%20%5C%28MacArth%5C.%5C%29%7CD%5C.C%5C.%20%5C%28Mackey%5C%29%7CDoug%5C.%7CArk%5C.%20Terr%5C.%20Rep%5C.%7CMcGl%5C.%7CD%5C.C%5C.%20%5C%28patent%5C%29%7CKy%5C.%20%5C%28Bibb%5C%29%7CKy%5C.%20%5C%28Litt%5C.%5C%29%7CKy%5C.%20%5C%28T%5C.B%5C.%20Mon%5C.%5C%29%7CKy%5C.%20%5C%28B%5C.%20Mon%5C.%5C%29%7CWright%7COhio%20Ch%5C.%7CKy%5C.%20%5C%28J%5C.J%5C.%20Marsh%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Speers%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Rich%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Rice%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Rich%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Dud%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Hill%5C%29%7CHay%5C.%20%26%20Haz%5C.%7CD%5C.C%5C.%20Cir%5C.%7CD%5C.C%5C.%20%5C%28Cranch%5C%29%7CBrightly%7CWalker%7CInd%5C.%20App%5C.%7CKan%5C.%20App%5C.%7CMd%5C.%20Ch%5C.%7CMd%5C.%20Ch%5C.%7CFreem%5C.%20Ch%5C.%7CWilcox%7CS%5C.C%5C.L%5C.%20%5C%28McCord%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Nott%20%26%20McC%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Harp%5C.%5C%29%7CHarr%5C.%20Ch%5C.%7CMiles%7CCal%5C.%20%3FDist%5C.%20Ct%5C.%7CMcCahon%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Rice%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Rich%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Hill%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Rich%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Rich%5C.%20Cas%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Strobh%5C.%20Eq%5C.%5C%29%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Bail%5C.%20Eq%5C.%5C%29%7CGreene%7CMyrick%7CD%5C.%20Haw%5C.%7CRep%5C.%20Cont%5C.%20Elect%5C.%20Case%5C.%7CRep%5C.%20Cont%5C.%20El%5C.%7CHowison%7CCoffey%7CCharlton%7CS%5C.C%5C.%20Eq%5C.%20%5C%28Harp%5C.%20Eq%5C.%5C%29%7CBrewster%7CS%5C.C%5C.L%5C.%20%5C%28Mill%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Tread%5C.%5C%29%7CS%5C.C%5C.L%5C.%20%5C%28Brev%5C.%5C%29%7CMass%5C.%20App%5C.%20Div%5C.%7CMass%5C.%20App%5C.%20Div%5C.%7CGoebel%7CKy%5C.%20%5C%28Dana%5C%29%7CKy%5C.%20%5C%28Duv%5C.%5C%29%7CKy%5C.%20%5C%28Met%5C.%5C%29%7CKy%5C.%20%5C%28Bush%5C%29%7CVaux%7CTenn%5C.%20%5C%28Swan%5C%29%7CTenn%5C.%20%5C%28Sneed%5C%29%7CBradf%5C.%7CT%5C.C%5C.%7CB%5C.T%5C.A%5C.%7CR%5C.I%5C.%20Ct%5C.%20Rec%5C.%7CR%5C.I%5C.%20Dec%5C.%7CR%5C.I%5C.%7CSuper%5C.%20Ct%5C.%20%5C%28R%5C.I%5C.%5C%29%7CRobertson%27s%20Super%5C.%20Ct%5C.%20Rep%5C.%7CRob%5C.%7CSand%5C.%20Ch%5C.%7CSandford%20Super%5C.%20Ct%5C.%20Rep%5C.%7CSarat%5C.%20Ch%5C.%20Sent%5C.%7CSchuy%5C.%20L%5C.%20Rec%5C.%7CSchuy%5C.%20Reg%5C.%7CSeld%5C.%20Notes%7CYates%7CParsons%7CSick%5C.%20Op%5C.%20Att%27y%20Gen%5C.%7CSilv%5C.%20Ct%5C.%20App%5C.%7CSilv%5C.%20Sup%5C.%7CSmith%7CSom%5C.%20L%5C.J%5C.%7CS%5C.C%5C.%7CS%5C.D%5C.%7CS%5C.E%5C.%7CS%5C.E%5C.2d%7CSo%5C.%7CSo%5C.2d%7CSo%5C.3d%7CS%5C.W%5C.%7CS%5C.W%5C.2d%7CS%5C.W%5C.3d%7CStew%5C.%7CStew%5C.%20%26%20P%5C.%7CS%5C.C%5C.D%5C.C%5C.%20%5C%28N%5C.S%5C.%5C%29%7CN%5C.Y%5C.%20Sup%5C.%20Ct%5C.%7CSusq%5C.%20Leg%5C.%20Chron%5C.%7CSweeney%20Super%5C.%20Ct%5C.%20Rep%5C.%7CRobards%7CN%5C.C%5C.%20%5C%28Taylor%5C%29%7CLa%5C.%20App%5C.%20%5C%28Teiss%5C.%5C%29%7CTenn%5C.%20App%5C.%7CTenn%5C.%20Cas%5C.%7CTenn%5C.%20Ch%5C.%20R%5C.%7CTenn%5C.%7CTenn%5C.%20%5C%28Peck%5C%29%7CTenn%5C.%20%5C%28Cooke%5C%29%7CTenn%5C.%20%5C%28Overt%5C.%5C%29%7CTex%5C.%20Civ%5C.%20App%5C.%7CTex%5C.%20Ct%5C.%20App%5C.%7CTex%5C.%20Crim%5C.%7CTex%5C.%20L%5C.%20R%5C.%7CTex%5C.%7CPosey%7CN%5C.J%5C.%20%5C%28Burlington%20County%20Ct%5C.%5C%29%7CCin%5C.%20Sup%5C.%20Ct%5C.%20Rep%5C.%7CCom%5C.%20Pl%5C.%20Rep%5C.%7CPa%5C.%20Dist%5C.%7CMass%5C.%20Law%20Rep%5C.%7CMich%5C.%20N%5C.P%5C.%20R%5C.%7CWestchester%7COhio%20Law%20Abs%5C.%7COhio%20L%5C.R%5C.%7CAld%5C.%7CThomp%5C.%20%26%20Cook%7CBlume%20Sup%5C.%20Ct%5C.%20Trans%5C.%7CTrans%5C.%20App%5C.%7CTuck%5C.%20Surr%5C.%7CTyl%5C.%7CCl%5C.%20Ct%5C.%7CU%5C.S%5C.%20App%5C.%20D%5C.C%5C.%7CCt%5C.%20Int%27l%20Trade%7CCust%5C.%20Ct%5C.%7CU%5C.%20%3FS%5C.%7CU%5C.S%5C.%20%5C%28Black%5C%29%7CU%5C.S%5C.%20%5C%28Cranch%5C%29%7CU%5C.S%5C.%20%5C%28Dall%5C.%5C%29%7CU%5C.S%5C.%20%5C%28How%5C.%5C%29%7CU%5C.S%5C.%20%5C%28Pet%5C.%5C%29%7CU%5C.S%5C.%20%5C%28Wall%5C.%5C%29%7CU%5C.S%5C.%20%5C%28Wheat%5C.%5C%29%7CMann%5C.%20Unrep%5C.%20Cas%5C.%7CBlume%20Unrep%5C.%20Op%5C.%7CUnrep%5C.%20Tenn%5C.%20Cas%5C.%7CCal%5C.%7CUtah%7CUtah%202d%7CVt%5C.%7CVa%5C.%20Cir%5C.%7CVa%5C.%20Col%5C.%20Dec%5C.%7CVa%5C.%20App%5C.%7CVa%5C.%20Dec%5C.%7CVa%5C.%20%5C%28Rand%5C.%5C%29%7CVa%5C.%20%5C%28Munf%5C.%5C%29%7CVa%5C.%20%5C%28Wash%5C.%5C%29%7CVa%5C.%7CVa%5C.%20%5C%28Gratt%5C.%5C%29%7CVa%5C.%20%5C%28Gilmer%5C%29%7CVa%5C.%20%5C%28Call%5C%29%7CVa%5C.%20%5C%28Patt%5C.%20%26%20Heath%5C%29%7CVa%5C.%20%5C%28Rob%5C.%5C%29%7CVa%5C.%20%5C%28Leigh%5C%29%7CV%5C.I%5C.%7CWash%5C.%20App%5C.%7CWash%5C.%20Co%5C.%5C%28Pa%5C.%5C%29%7CWash%5C.%7CWash%5C.%202d%7CWash%5C.%20Terr%5C.%7CWeek%5C.%20No%5C.%20Cas%5C.%20%5C%28Pa%5C.%5C%29%7CWend%5C.%7CWes%5C.%20C%5C.L%5C.J%5C.%7CTribal%7CA%5C.%20%3F2d%7CA%5C.%20%3F3d%7CB%5C.R%5C.%7CF%5C.%20App%27%3Fx%5C.%3F%7CHaw%5C.%7CM%5C.J%5C.%7CN%5C.Y%5C.S%5C.%202d%7CN%5C.Y%5C.S%5C.%202d%7CN%5C.Y%5C.S%5C.%7CVet%5C.%20App%5C.%7CW%5C.%20Va%5C.%7CWheel%5C.%20Cr%5C.%20Cas%5C.%7CWis%5C.%7CWis%5C.%202d%7CWyo%5C.%7CYates%20Sel%5C.%20Cas%5C.%7CYork%20Leg%5C.%20Rec%5C.%29%20%28%5Cd%2B%29%5Cb%28%2C%3F%28%20at%29%3F%20%28%5Cd%2B%29%28%28%5B-%E2%80%91%E2%80%93%5D%7C%20to%20%7C%20through%20%29%28%5Cd%2B%29%29%3F%5Cb%29%3F)

If you find an issue in one of these, or if there's a source of law you'd like to see added, please open a ticket [here](https://github.com/raindrum/citeurl/issues)!

---

If you get a lot of use out of Law Search and want to support it financially, you can use the link below:

<a href="https://www.buymeacoffee.com/simonsherred"><button>☕ Buy me a coffee</button></a>