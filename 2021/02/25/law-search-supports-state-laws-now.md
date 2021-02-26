Tags: code, javascript, python, law, lawsearch, citeurl

I've been working more on my citation lookup program, and I'm happy to announce you can now use it to look up state laws! Previously, apart from court cases, it only covered federal and California law. Now, it can look up statutes for every U.S. state and territory except Georgia, Arkansas, Puerto Rico, and Guam, whose laws aren't published in a compatible way, as far as I can tell.

As always, you can find the lookup tool on the [Law Search](../../../lawsearch) page.

For the more programming-inclined, it's also available [as a Python library](https://github.com/raindrum/citeurl/) on my GitHub page, with documentation available [here](https://raindrum.github.io/citeurl/). The advantage of the Python version is that it can process an entire block of text, like a court opinion, and insert links for every citation it finds, including shortform citations.

I'll probably add support for state constitutions next, and maybe even state regulations, though the latter will likely be too big a hassle.