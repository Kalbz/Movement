// export const layoutTemplates = [

//     // ['Navbar', 'Hero', 'Carousel', 'Divider', 'Boxes' , 'Card', 'Footer'],
//     // ['Navbar', 'Divider', 'Divider', 'Hero', 'Divider','Divider','Divider','Divider','Divider','Divider','Divider','Divider', 'Footer'],
//     // ['Comparison', 'Hero', 'Divider', 'Footer', ],
//     // ['Hero', 'Divider', 'Hero', 'Footer'],
//     // ['Boxes', 'Footer'],
//     ['Navbar', 'Avatar'],



//   // ['Navbar', 'Hero', 'Carousel', 'Avatar', 'Boxes', 'Footer', 'Card', 'Accordion', 'Table', 'Comparison', 'Divider'],
// ];

export const layoutTemplates = [
  [

// { type: "Spacer", layout: { direction: "vertical", size: "48" } },
// =================================
// {
//   type: "Text",
//   props: { size: "text-5xl", align: "center" },
//   layout: { padding: "py-8" }
// }
// ,

//     { type: "Avatar", layout: { align: "center", padding: "pt-8 pb-8", background: "bg-base-200" } },
//     { type: "LongText", layout: { align: "center", padding: "pt-8", background: "bg-base-100" } },

//   ],

// =================================
{ type: "Spacer", layout: { direction: "vertical", size: "32" } },

,

    { type: "Avatar", layout: { align: "center", padding: "pt-8 pb-8", background: "bg-base-200" } },
    {
  type: "Text",
  props: { size: "text-5xl", align: "center" },
  layout: { padding: "py-8" }
},
    { type: "LongText", layout: { align: "center", padding: "pt-8", background: "bg-base-100" } },

  ],
];
