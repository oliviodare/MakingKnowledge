
<iframe width="500" height="300" src="https://www.youtube.com/embed/Ewhfok91AdE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="500" height="300" src="https://www.youtube.com/embed/qqsNNTkhK5Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Other resources
[How I put my mind under version control (Obsidian&GitHub), Medium](https://medium.com/analytics-vidhya/how-i-put-my-mind-under-version-control-24caea37b8a5)

[Deep Work AudioBook](http://audiobookbay.nl/audio-books/deep-work-rules-for-focused-success-in-a-distracted-world-cal-newport/)

[How to modify tags with CSS](https://santiyounger.com/tagstyle/)


### How should I take notes
- atomistic notes
- no copying, no paraphrasing (although I am a bit suspicious of not doing it *at all*, we'll see).
- the collections is not collection, it's *synthesis*.


### Pipeline: Two steps in note-taking:
- first, raw notes while reading
- then, reading your notes and writing my own thought and ideas about it.
	- This may mean that I could have to systems of taking notes: chronological (daily notes, lab-book style); and digested notes.

### Questions
- ~~How do I embed youtube videos?~~
- ~~How do tagging work? Are links different?~~
- Basic markdown and obsidian grammar
- ~~How do I make templates?~~
- ~~Search hotkey?~~
	- Cmd+Shift+F

## Most used tags and links
```
egrep -ohsr --exclude-dir='.*' "\[\[[A-Za-z0-9 _@ÄÖÜäöüß\'\!\?\.\(\)\-]+\]\]" -- * | sed -e 's/[[:space:]]#/#/' | sort | uniq -c | sort -r -t# -k2  > "Templates and Resources/ΩΩ Link Cloud.md"
```

> doesn't work with tags! have to look for alternative