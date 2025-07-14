// export const layoutTemplates = [

//     // ['Navbar', 'Hero', 'Carousel', 'Divider', 'Boxes' , 'Card', 'Footer'],
//     // ['Navbar', 'Divider', 'Divider', 'Hero', 'Divider','Divider','Divider','Divider','Divider','Divider','Divider','Divider', 'Footer'],
//     // ['Comparison', 'Hero', 'Divider', 'Footer', ],
//     // ['Hero', 'Divider', 'Hero', 'Footer'],
//     // ['Boxes', 'Footer'],
//     ['Navbar', 'Avatar'],



//   // ['Navbar', 'Hero', 'Carousel', 'Avatar', 'Boxes', 'Footer', 'Card', 'Accordion', 'Table', 'Comparison', 'Divider'],
// ];


// COMMENT HERE
// export const layoutTemplates = [
//   [

// // { type: "Spacer", layout: { direction: "vertical", size: "48" } },
// // =================================
// // {
// //   type: "Text",
// //   props: { size: "text-5xl", align: "center" },
// //   layout: { padding: "py-8" }
// // }
// // ,

// //     { type: "Avatar", layout: { align: "center", padding: "pt-8 pb-8", background: "bg-base-200" } },
// //     { type: "LongText", layout: { align: "center", padding: "pt-8", background: "bg-base-100" } },

// //   ],

// // =================================
// { type: "Spacer", layout: { direction: "vertical", size: "32" } },

// ,

//     { type: "Avatar", layout: { align: "center", padding: "pt-8 pb-8", background: "bg-base-200" } },
//     {
//   type: "Text",
//   props: { size: "text-5xl", align: "center" },
//   layout: { padding: "py-0" }
// },
//     { type: "LongText", layout: { align: "center", padding: "pt-0", background: "bg-base-100" } },

//   ],
// ];

export const layoutTemplates = [
  // Template mode: Use existing template with dynamic content
  [
    {
      type: "Hero",
      layout: {
        template: 0, // Use template 0 (centered text template)
        children: [
          { type: "Text", props: { text: "Welcome to My Portfolio", size: "text-3xl", align: "center" } },
          { type: "Text", props: { text: "Check out my amazing work!", size: "text-xl", color: "text-secondary" } },
        ]
      }
    },
    { type: "Spacer", layout: { size: "24" } },
    { type: "Footer" }
  ],
  
  // Template mode: Use template 1 (side-by-side with images)
  [
    {
      type: "Hero",
      layout: {
        template: 1, // Use template 1 (side-by-side layout)
        children: [
          { type: "Text", props: { text: "My Creative Work", size: "text-3xl", align: "center" } },
          { type: "Text", props: { text: "Exploring the boundaries of design and technology", size: "text-xl", color: "text-secondary" } },
        ]
      }
    },
    { type: "Footer" }
  ],
  
  // Template mode: Use template 4 (reverse layout)
  [
    {
      type: "Hero",
      layout: {
        template: 4, // Use template 4 (reverse layout)
        children: [
          { type: "Text", props: { text: "Innovation First", size: "text-3xl", align: "center" } },
          { type: "Text", props: { text: "Building the future, one project at a time", size: "text-xl", color: "text-secondary" } },
        ]
      }
    }
  ],
  
  // Custom children mode: Completely custom layout
  [
    {
      type: "Hero",
      layout: {
        direction: "flex-row",
        align: "items-center",
        justify: "justify-center",
        gap: "gap-8",
        children: [
          { type: "Avatar" },
          { type: "Text", props: { text: "Welcome to my portfolio!", size: "text-4xl", align: "center" } },
          { type: "Avatar" }
        ]
      }
    },
    { type: "Footer" }
  ],
  
  
];
