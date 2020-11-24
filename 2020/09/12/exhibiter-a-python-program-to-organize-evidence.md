Slug: exhibiter-a-python-program-to-organize-evidence
Tags: code, python, law, edn

When I was working at the [Eviction Defense Network](https://edn.la/) this past summer, one of my jobs was to put together jury documents---that is, sets of documents that would be shared with opposing counsel and eventually the court in preparation for jury trials.

One aspect of this was to collect all the evidence (various PDFs and images) and put it into a single PDF with cover pages for each exhibit. A related task was to list all the contents in a Word document.

When cases have very large amounts of evidence, and when the list and PDF must be updated upon receiving *new* evidence, it quickly becomes a hassle to do this manually. So, I wrote [a program to automate the process](https://github.com/raindrum/exhibiter). As long as evidence is arranged in folders and given meaningful names, the program can generate a PDF and exhibit list in seconds.

I hope to make more tools like this in the future. Eviction defense is too important to let its practitioners to get bogged down rearranging documents.