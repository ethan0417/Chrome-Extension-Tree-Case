var test;
var datatest = 
      {title: "Folder", isFolder: true, key: "id3",
         children: [
            {title: "Sub-item 3.1",
               children: [
                  {title: "Sub-item 3.1.1", key: "id3.1.1" },
                  {title: "Sub-item 3.1.2", key: "id3.1.2" }
               ]
            },
            {title: "Sub-item 3.2",
               children: [
                  {title: "Sub-item 3.2.1", key: "id3.2.1" },
                  {title: "Sub-item 3.2.2", key: "id3.2.2" }
               ]
            }
         ]
      };
for(i=0; i< 1600; i++){
   test.push(datatest);
};
var Data = [
      {title: "Folder", isFolder: true, key: "id3",
         children: [
            {title: "Sub-item 3.1",
               children: [
                  {title: "Sub-item 3.1.1", key: "id3.1.1" },
                  {title: "Sub-item 3.1.2", key: "id3.1.2" }
               ]
            },
            {title: "Sub-item 3.2",
               children: [
                  {title: "Sub-item 3.2.1", key: "id3.2.1" },
                  {title: "Sub-item 3.2.2", key: "id3.2.2" }
               ]
            }
         ]
      }
      ,
      {title: "Document with some children (expanded on init)", key: "id4",
         children: [
            {title: "Sub-item 4.1 (active on init)",
               children: [
                  {title: "Sub-item 4.1.1", key: "id4.1.1" },
                  {title: "Sub-item 4.1.2", key: "id4.1.2" }
               ]
            },
            {title: "Sub-item 4.2 (selected on init)", key: 'sub-itm 4.2',
               children: [
                  {title: "Sub-item 4.2.1", key: "id4.2.1" },
                  {title: "Sub-item 4.2.2", key: "id4.2.2" }
               ]
            },
            {title: "Sub-item 4.3 (hideCheckbox)", key: 'subid4.3'},
            {title: "Sub-item 4.4 (unselectable)", key: 'subid4.3'}
         ]
      }
];
