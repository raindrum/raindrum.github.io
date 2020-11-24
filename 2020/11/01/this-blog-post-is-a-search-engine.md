Modified: 2020-11-17
Tags: code, javascript, law

**EDIT:** These searches will still work, but there's not much reason to use them since they've all been [incorporated into a single search engine](/lawsearch).



Well, sort of a search engine. It's more of a tool for looking up federal laws by their section and subsection numbers, but "search engine" is catchier. Anyway, here's the goods:

<style>input { width: 100%; height; 100% }</style>
<table>
    <tr>
        <th>Body of Law</th>
        <th>Abbreviation</th>
        <th>Lookup</th>
    </tr>
    <tr>
        <td><label for="usc">U.S. Code</label></td>
        <td>usc</td>
        <td><form onsubmit="return uscLookup()"><input type="search" placeholder="E.g: 42 1983" name="usc" id="usc" title="Format: TITLE SECTION [SUBSECTION]"></form></td>
    </tr>
    <tr>
        <td><label for="cfr">Code of Federal Regulations</label></td>
        <td>cfr</td>
        <td><form onsubmit="return cfrLookup()"><input type="search" placeholder="E.g: 29 1926.1053 b 17 ii" name="cfr" id="cfr" title="Format: TITLE SECTION [SUBSECTION]"></form></td>
    </tr>
    <tr>
        <td><label for="frcp">Federal Rules of Civil Procedure</label></td>
        <td>frcp</td>
        <td><form onsubmit="return frcpLookup()"><input type="search" placeholder="E.g: 12 b 6" name="frcp" id="frcp" title="Format: RULE [SUBSECTION]"></form></td>
    </tr>
    <tr>
        <td><label for="ina">Immigration and Nationality Act</label></td>
        <td>ina</td>
        <td><form onsubmit="return inaLookup()"><input type="search" placeholder="E.g: 237 a 1 E ii" name="ina" id="ina" title="Format: SECTION [SUBSECTION]"></form></td>
    </tr>
    <tr>
        <td><label for="caa">Clean Air Act</label></td>
        <td>caa</td>
        <td><form onsubmit="return caaLookup()"><input type="search" placeholder="E.g: 112 k 3" name="caa" id="caa" title="Format: SECTION [SUBSECTION]"></form></td>
    </tr>
    <tr>
        <td><label for="cwa">Clean Water Act</label></td>
        <td>cwa</td>
        <td><form onsubmit="return cwaLookup()"><input type="search" placeholder="E.g: 301 b 2 A" name="cwa" id="cwa" title="Format: SECTION [SUBSECTION]"></form></td>
    </tr>
    <tr>
        <td><label for="nlra">National Labor Relations Act</label></td>
        <td>nlra</td>
        <td><form onsubmit="return nlraLookup()"><input type="search" placeholder="E.g: 8 b 4" name="nlra" id="nlra" title="Format: SECTION [SUBSECTION]"></form></td>
    </tr>
    <tr>
        <td><label for="ada">Americans With Disabilities Act</label></td>
        <td>ada</td>
        <td><form onsubmit="return adaLookup()"><input type="search" placeholder="E.g: 102 c 2 C iii" name="ada" id="ada" title="Format: SECTION [SUBSECTION]"></form></td>
    </tr>
    <tr>
        <td><label for="fha">Fair Housing Act</label></td>
        <td>fha</td>
        <td><form onsubmit="return fhaLookup()"><input type="search" placeholder="E.g: 804 f 3 C iii IV" name="fha" id="fha" title="Format: SECTION [SUBSECTION]"></form></td>
    </tr>
</table>


Read further and I'll tell you how you can look up the law just by typing things like "nlra 8 b 4" into your URL bar!

## Background

When Congress somehow passes a law, that law eventually goes through a process called "codification," where it's placed into a logical part of the U.S. Code based on its topic. For instance, Section 7 of the National Labor Relations Act became [29 U.S.C. § 157](https://www.law.cornell.edu/uscode/text/29/157), which is to say Section 157 of Title 29 of the U.S. Code. Title 29 is for labor laws, and since there were other laws in it before the NLRA was passed, Section 7 became 157.

But big, important statutes like the NLRA are often referenced by their pre-codification section numbers, even decades after they become law. This can make it inconvenient to look them up. See, while the U.S. Code is very neatly published and easy to access, the original statutes often aren't. You might find them on an agency's website, or in an overpriced textbook. LexisNexis or Westlaw usually work, but they are very expensive and [collaborate with ICE](https://socialchangenyu.com/review/when-westlaw-fuels-ice-surveillance-legal-ethics-in-the-era-of-big-data-policing/), so it's best not to involve them, especially for something as simple as reading federal laws.

This semester I'm taking Immigration Law, which relies heavily on the Immigration and Nationality Act (INA). And I *really* didn't want to buy a textbook just to keep up with the statutory references. Instead, I found [a list of where each INA sections was codified](https://www.uscis.gov/laws-and-policy/legislation/immigration-and-nationality-act), and I used it to make a custom search engine. Given an INA section number, it opens the corresponding U.S. Code section on [Cornell's website](https://www.law.cornell.edu/uscode/).

Then, I noticed that the Cornell site has anchor links within each page, corresponding to subsections of the law. I incorporated these into the search, so now it's possible to search for "237 a 1 C" to open [8. U.S.C. § 1227(a)(3)(C)](https://www.law.cornell.edu/uscode/text/8/1227#a_3_C) directly. Then I did the same thing for a bunch of other statutes and bodies of law, including the U.S. Code overall. And you, dear friend, can reap the benefits!

## How to Use

The search bars higher up on this page let you quickly open pages on Cornell's website. Each search bar shows a valid example input. Most inputs follow the format: `SECTION [SUBSECTION]`. For instance, typing "112 k 3" in the Clean Air Act search will open Section 112(k)(3) of the Clean Air Act. More precisely, it will open [42 U.S.C. § 7412(k)(3)](https://www.law.cornell.edu/uscode/text/42/7412#k_3), where the law was codified.

Subsection keys are optional, but are case-sensitive and must be separated by spaces. Searching for a valid subsection will automatically scroll the page so that the relevant subsection is at the top of the display. Unfortunately, Cornell's site currently doesn't account for the height of its page header in calculating what "top of the display" means, so you'll need to scroll slightly upward to see most subsections, or else use a browser extension like [UBlock Origin](https://ublockorigin.com/) to hide the header.

Unlike the other search engines, the U.S. Code and Code of Federal Relations searches require you to provide a title number. This should precede the section number. For instance, you can type "42 1983" in the U.S.C. search to look up [42 U.S.C. § 1983](https://www.law.cornell.edu/uscode/text/42/1983).

The best way to use these searches is to **set the searches as keywords so you can just type "frcp 12 b 6" in your URL bar to pull up the law**. If you expect to use this feature often, I recommend that you download this web page, close the browser tab, and reopen your *local* copy of the page file before proceeding. This way, the search tools will load more quickly and won't depend on my website. However, you can also use the web-hosted version if you like.

In either case, installation varies depending on your web browser:

- In Firefox, it's easy; just right click the search bar, select "Add a Keyword for this Search," and save the custom search with an appropriate keyword.

- In Chrome, go to `Settings > Manage Search Engines`. From there, click `Add`, and paste this in the URL field: 

  <p id="bookmarkUrl"></p>

  You'll need to replace "usc" with the abbreviation for the appropriate search engine. These abbreviations are in the table at the top of the page.

On either browser, the last step is to assign a keyword for the search. For convenience, I recommend using the abbreviation for that body of law.

I hope these tools are useful to folks! If you find any bugs, or if you'd like me to add any new bodies of law, [send me an email](mailto:simonraindrum@gmail.com)!

<script>
readQuery();
getBookmarkUrl();
function getBookmarkUrl() {
    document.getElementById("bookmarkUrl").innerHTML = "<code>" + window.location.href.split('?')[0].split('#')[0] + "?usc=%S</code><br>";
}
function readQuery () {
    var query = location.search.replace('?','').split('=');
    switch (query[0]) {
        case 'usc': uscLookup(query[1]); break;
        case 'cfr': cfrLookup(query[1]); break;
        case 'frcp': frcpLookup(query[1]); break;
        case 'ina': inaLookup(query[1]); break;
        case 'caa': caaLookup(query[1]); break;
        case 'cwa': cwaLookup(query[1]); break;
        case 'nlra': nlraLookup(query[1]); break;
        case 'ada': adaLookup(query[1]); break;
        case 'fha': fhaLookup(query[1]); break;
    }
}
function uscLookup (query=null) {
    if (!query) {
        var query = document.getElementById("usc").value;
    }
    return lookup(query, 'https://www.law.cornell.edu/uscode/text');
}
function cfrLookup (query=null) {
    if (!query) { var query = document.getElementById("cfr").value; }
    return lookup(query, 'https://www.law.cornell.edu/cfr/text');
}
function frcpLookup (query=null) {
    if (!query) { var query = document.getElementById("frcp").value; }
    var secondSeparator = '#rule_' + query.split(/%20| /)[0] + '_';
    return lookup(query, "https://www.law.cornell.edu/rules/frcp", ['/rule_', secondSeparator, '_']);
}
function inaLookup (query=null) {
    if (!query) { var query = document.getElementById("ina").value; }
    return lookup(query, 'https://www.law.cornell.edu/uscode/text', ['/8/', '#', '_'], 0, {'101':'1101','102':'1102','103':'1103','104':'1104','105':'1105','106':'1105a','201':'1151','202':'1152','203':'1153','204':'1154','205':'1155','206':'1156','207':'1157','208':'1158','209':'1159','210':'1160','210a':'1161','210A':'1161','211':'1181','212':'1182','213':'1183','213a':'1183a','213A':'1183a','214':'1184','215':'1185','216':'1186a','216a':'1186b','216A':'1186b','217':'1187','218':'1188','219':'1189','221':'1201','222':'1202','223':'1203','224':'1204','231':'1221','232':'1222','233':'1223','234':'1224','235':'1225','235a':'1225a','235A':'1225a','236':'1226','236a':'1226a','236A':'1226a','237':'1227','238':'1228','239':'1229','240':'1229a','240a':'1229b','240A':'1229b','240b':'1229c','240B':'1229c','240c':'1230','240C':'1230','241':'1231','242':'1252','242a':'1252a','242A':'1252a','242b':'1252b','242B':'1252b','243':'1253','244':'1254a','245':'1255','245a':'1255a','245A':'1255a','246':'1256','247':'1257','248':'1258','249':'1259','250':'1260','251':'1281','252':'1282','253':'1283','254':'1284','255':'1285','256':'1286','257':'1287','258':'1288','261':'1301','262':'1302','263':'1303','264':'1304','265':'1305','266':'1306','271':'1321','272':'1322','273':'1323','274':'1324','274a':'1324a','274A':'1324a','274b':'1324b','274B':'1324b','274c':'1324c','274C':'1324c','274d':'1324d','274D':'1324d','275':'1325','276':'1326','277':'1327','278':'1328','279':'1329','280':'1330','281':'1351','282':'1352','283':'1353','284':'1354','285':'1355','286':'1356','287':'1357','288':'1358','289':'1359','290':'1360','291':'1361','292':'1362','293':'1363','294':'1363a','295':'1363b','301':'1401','302':'1402','303':'1403','304':'1404','305':'1405','306':'1406','307':'1407','308':'1408','309':'1409','310':'1421','311':'1422','312':'1423','313':'1424','314':'1425','315':'1426','316':'1427','317':'1428','318':'1429','319':'1430','320':'1431','321':'1432','322':'1433','323':'1434','324':'1435','325':'1436','326':'1437','327':'1438','328':'1439','329':'1440','329a':'1440-1','329A':'1440-1','330':'1441','331':'1442','332':'1443','333':'1444','334':'1445','335':'1446','336':'1447','337':'1448','338':'1449','339':'1450','340':'1451','341':'1452','342':'1453','343':'1454','344':'1455','345':'1456','346':'1457','347':'1458','348':'1459','349':'1481','350':'1482','351':'1483','352':'1484','353':'1485','354':'1486','355':'1487','356':'1488','357':'1489','358':'1501','359':'1502','360':'1503','361':'1504','404':'1101','405':'1101','406':'1101','407':'1101','411':'1521','412':'1522','413':'1523','414':'1524','501':'1531','502':'1532','503':'1533','504':'1534','505':'1535','506':'1536','507':'1537'});
}
function caaLookup (query=null) {
    if (!query) { var query = document.getElementById("caa").value; }
    return lookup(query, 'https://www.law.cornell.edu/uscode/text', ['/42/', '#', '_'], 0, {'101':'7401','102':'7402','103':'7403','104':'7404','105':'7405','106':'7406','107':'7407','108':'7408','109':'7409','110':'7410','111':'7411','112':'7412','113':'7413','114':'7414','115':'7415','116':'7416','117':'7417','118':'7418','119':'7419','120':'7420','121':'7421','122':'7422','123':'7423','124':'7424','125':'7425','126':'7426','127':'7427','128':'7428','129':'7429','130':'7430','131':'7431','160':'7470','161':'7471','162':'7472','163':'7473','164':'7474','165':'7475','166':'7476','167':'7477','168':'7478','169':'7479','169a':'7491','169A':'7491','169b':'7492','169B':'7492','171':'7501','172':'7502','173':'7503','174':'7504','175':'7505','175a':'7505a','175A':'7505a','176':'7506','176a':'7506a','176A':'7506a','177':'7507','178':'7508','179':'7509','179b':'7509a','179B':'7509a','181':'7511','182':'7511a','183':'7511b','184':'7511c','185':'7511d','185a':'7511e','185A':'7511e','185b':'7511f','185B':'7511f','186':'7512','187':'7512a','188':'7513','189':'7513a','190':'7513b','191':'7514','192':'7514a','193':'7515','202':'7521','203':'7522','204':'7523','205':'7524','206':'7525','207':'7541','208':'7542','209':'7543','210':'7544','211':'7545','213':'7547','214':'7548','215':'7549','216':'7550','217':'7552','218':'7553','219':'7554','231':'7571','232':'7572','233':'7573','234':'7574','241':'7581','242':'7582','243':'7583','244':'7584','245':'7585','246':'7586','247':'7587','248':'7588','249':'7589','250':'7590','301':'7601','302':'7602','303':'7603','304':'7604','305':'7605','306':'7606','307':'7607','308':'7608','309':'7609','310':'7610','311':'7611','312':'7612','313':'7613','314':'7614','315':'7615','316':'7616','317':'7617','318':'7618','319':'7619','320':'7620','321':'7621','322':'7622','323':'7624','324':'7625','325':'7625-1','326':'7625a','327':'7626','328':'7627','201':'7641','401':'7651','402':'7651a','403':'7651b','404':'7651c','405':'7651d','406':'7651e','407':'7651f','408':'7651g','409':'7651h','410':'7651i','411':'7651j','412':'7651k','413':'7651l','414':'7651m','415':'7651n','416':'7651o','501':'7661','502':'7661a','503':'7661b','504':'7661c','505':'7661d','506':'7661e','507':'7661f','601':'7671','602':'7671a','603':'7671b','604':'7671c','605':'7671d','606':'7671e','607':'7671f','608':'7671g','609':'7671h','610':'7671i','611':'7671j','612':'7671k','613':'7671l','614':'7671m','615':'7671n','616':'7671o','617':'7671p','618':'7671q'});
}
function cwaLookup (query=null) {
    if (!query) { var query = document.getElementById("cwa").value; }
    return lookup(query, 'https://www.law.cornell.edu/uscode/text', ['/33/', '#', '_'], 0, {'101':'1251','112':'1262','115':'1265','301':'1311','302':'1312','303':'1313','304':'1314','305':'1315','306':'1316','307':'1317','308':'1318','309':'1319','310':'1320','316':'1326','319':'1329','401':'1341','402':'1342','403':'1343','404':'1344','405':'1345','406':'1346','501':'1361','502':'1362','505':'1365','509':'1369','510':'1370','511':'1371','517':'1376','518':'1377'});
}
function nlraLookup (query=null) {
    if (!query) { var query = document.getElementById("nlra").value; }
    return lookup(query, 'https://www.law.cornell.edu/uscode/text', ['/29/', '#', '_'], 0, {'1':'151','2':'152','3':'153','4':'154','5':'155','6':'156','7':'157','8':'158','9':'159','10':'160','11':'161','12':'162','13':'163','14':'164','15':'165','16':'166','17':'167','18':'168','19':'169'})
}
function adaLookup (query=null) {
    if (!query) { var query = document.getElementById("ada").value; }
    return lookup(query, 'https://www.law.cornell.edu/uscode/text', ['/42/', '#', '_'], 0, {'2':'12101','3':'12102','101':'12111','102':'12112','103':'12113','104':'12114','105':'12115','106':'12116','107':'12117','201':'12131','202':'12132','203':'12133','204':'12134','221':'12141','222':'12142','223':'12143','224':'12144','225':'12145','226':'12146','227':'12147','228':'12148','229':'12149','230':'12150','241':'12161','242':'12162','243':'12163','244':'12164','245':'12165','301':'12181','302':'12182','303':'12183','304':'12184','305':'12185','306':'12186','307':'12187','308':'12188','309':'12189','501':'12201','502':'12202','503':'12203','504':'12204','505':'12205','506':'12206','507':'12207','508':'12208','509':'12209','510':'12210','511':'12211','513':'12212','514':'12213'});
}
function fhaLookup (query=null) {
    if (!query) { var query = document.getElementById("fha").value; }
    return lookup(query, 'https://www.law.cornell.edu/uscode/text', ['/42/', '#', '_'], 0, {'801':'3601','802':'3602','803':'3603','804':'3604','805':'3605','806':'3606','807':'3607','808':'3608','808a':'3608a','809':'3609','810':'3610','811':'3611','812':'3612','813':'3613','814':'3614','814a':'3614-1','815':'3614a','816':'3615','817':'3616','817a':'3616a','818':'3617','819':'3618','820':'3619','901':'3631'});
}
function lookup (query, baseUrl, inputPrefixes=['/', '/', '#', '_'], lookupNo=null, lookupDict=null) {
    var inputs = query.split(/%20| /);
    var url = baseUrl;
    for (i = 0; i < inputs.length; i++) {
        if (lookupNo == i) {
            var value = lookupDict[inputs[i]];
        } else {
            var value = inputs[i];
        }
        if (i < inputPrefixes.length) {
            url += inputPrefixes[i] + value;
        } else {
            url += inputPrefixes[inputPrefixes.length - 1] + value;
        }
    }
    window.location.href = url;
    return false;
}
</script>









