// export const layoutTemplates = [

//     // ['Navbar', 'Hero', 'Carousel', 'Divider', 'Boxes' , 'Card', 'Footer'],
//     // ['Navbar', 'Divider', 'Divider', 'Hero', 'Divider','Divider','Divider','Divider','Divider','Divider','Divider','Divider', 'Footer'],
//     // ['Comparison', 'Hero', 'Divider', 'Footer', ],
//     // ['Hero', 'Divider', 'Hero', 'Footer'],
//     // ['Boxes', 'Footer'],
//     // ['Navbar', 'Avatar'],
// ]


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

// export const layoutTemplates = [
//   [
//     {
//       type: "Hero",
//       layout: {
//         template: 0,
//         children: [
//           { type: "Text", props: { text: "Welcome to My Portfolio", size: "text-3xl", align: "center" } },
//           { type: "Text", props: { text: "Check out my amazing work!", size: "text-xl", color: "text-secondary" } },
//         ]
//       }
//     },
//     { type: "Spacer", layout: { size: "24" } },
//     { type: "Footer" }
//   ],
  
//   [
//     {
//       type: "Hero",
//       layout: {
//         template: 1,
//         children: [
//           { type: "Text", props: { text: "My Creative Work", size: "text-3xl", align: "center" } },
//           { type: "Text", props: { text: "Exploring the boundaries of design and technology", size: "text-xl", color: "text-secondary" } },
//         ]
//       }
//     },
//     { type: "Footer" }
//   ],
  
//   [
//     {
//       type: "Hero",
//       layout: {
//         template: 4, // Use template 4 (reverse layout)
//         children: [
//           { type: "Text", props: { text: "Innovation First", size: "text-3xl", align: "center" } },
//           { type: "Text", props: { text: "Building the future, one project at a time", size: "text-xl", color: "text-secondary" } },
//         ]
//       }
//     }
//   ],
  

//   [
//     {
//       type: "Hero",
//       layout: {
//         direction: "flex-row",
//         align: "items-center",
//         justify: "justify-center",
//         gap: "gap-8",
//         children: [
//           { type: "Image",
//           props: {
//             src: "https://source.unsplash.com/random/600x400",
//             className: "max-w-xl",
//             alt: "Cool image"
//           } },
//           { type: "Avatar" }
//         ]
//       }
//     },
//     { type: "Footer" }
//   ],
// [
//     {
//       type: "Hero",
//       layout: {
//         direction: "flex-row",
//         align: "items-center",
//         justify: "justify-center",
//         gap: "gap-8"
//       },
//       children: [
//         { type: "Avatar" },
//         {
//           type: "Image",
//           props: {
//             src: "https://source.unsplash.com/random/600x400",
//             className: "max-w-xl",
//             alt: "Cool image"
//           }
//         },
//         { type: "Avatar" }
//       ]
//     },
//     { type: "Footer" }
//   ]

  
// ];

// export const layoutTemplates = [
//   [
//     { type: "Navbar" },
//     {
//       type: "Hero",
//       layout: {
//         template: 1,
//         children: [
//           { type: "Text", props: { text: "Welcome to the Jungle", size: "text-4xl", align: "center" } },
//           { type: "Text", props: { text: "Where creativity meets chaos.", size: "text-lg", color: "text-secondary" } },
//         ]
//       }
//     },
//     { type: "Spacer", layout: { direction: "vertical", size: "32" } },
//     { type: "Avatar", layout: { align: "center", padding: "pt-4 pb-4", background: "bg-base-200" } },
//     { type: "Carousel" },
//     { type: "Boxes" },
//     { type: "Card" },
//     { type: "Accordion" },
//     { type: "Comparison" },
//     { type: "Table" },
//     { type: "Divider" },
//     { type: "Footer" }
//   ],

// ];


export const layoutTemplates = [
  {
    name: 'Hero + Grid',
    blocks: [
      { top: '5%', left: '5%', width: '90%', height: '25%' },
      { top: '35%', left: '5%', width: '42%', height: '55%' },
      { top: '35%', left: '53%', width: '42%', height: '55%' }
    ]
  },
  {
    name: 'Two Columns',
    blocks: [
      { top: '5%', left: '5%', width: '42%', height: '90%' },
      { top: '5%', left: '53%', width: '42%', height: '90%' }
    ]
  },
  {
    name: 'Magazine Style',
    blocks: [
      { top: '5%', left: '5%', width: '90%', height: '25%' },
      { top: '35%', left: '5%', width: '25%', height: '55%' },
      { top: '35%', left: '35%', width: '60%', height: '55%' }
    ]
  },
  {
    name: 'Centered Block',
    blocks: [
      { top: '20%', left: '20%', width: '60%', height: '60%' }
    ]
  },
  {
    name: 'Top + Bottom Trio',
    blocks: [
      { top: '5%', left: '5%', width: '90%', height: '20%' },
      { top: '35%', left: '5%', width: '28%', height: '55%' },
      { top: '35%', left: '36%', width: '28%', height: '55%' },
      { top: '35%', left: '67%', width: '28%', height: '55%' }
    ]
  }
];