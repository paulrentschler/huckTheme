"""Python script for outputting the global navigation tabs in JSON format."""
# Written by: Paul Rentschler (par117@psu.edu)
# Created on: 25 May 2011

tabs = []
folderContents = container.getFolderContents()
for folderItem in folderContents:
    if not folderItem.exclude_from_nav:
        tabEntry = '"' + folderItem.id + '" : {"title": "' + folderItem.Title + '", "id": "' + folderItem.id + '", "url": "' + folderItem.getURL() + '"}'
        tabs.append(tabEntry)

result = "{" + ", ".join(tabs) + "}"
print result

return printed