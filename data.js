/*
  Portfolio content. Edit this file to change text, colours or add process photos.
  Descriptions are the artist's own text, with her marked revisions of 13 Oct applied
  (deletions removed, replacements and research additions inserted). A blank line ("\n\n") starts a new paragraph;
  **double stars** mark highlighted key words, *single stars* italic titles.

  flavor  : the work's candy colour, sampled from the photo's background and tuned by hand.
  widths  : WebP sizes that exist in assets/works/<slug>-<width>.webp
  process : add objects like
            { src: "assets/process/eye-candy-1-1600.webp", thumb: "assets/process/eye-candy-1-thumb.webp", caption: "Testing slime layers" }
            (tools/build_images.py --process makes both files from a folder of eye-candy-1.jpg, eye-candy-2.jpg …)
*/
window.PORTFOLIO = {
  artist: "Xiaoran Hou",
  seriesTitle: ["Please Don’t", "Lick the Art:", "Sensing Sweetness"], // each item is one line of the big title; the last line is drawn smaller
  year: 2026,
  siteTitle: "Please Don’t Lick the Art: Sensing Sweetness", // browser tab and link-preview title
  // Title lettering: effect "A" pop block, "B" halftone pop, "C" retro script sticker; palette 1–6 (see pop-title.css)
  title: { effect: "A", palette: 4, outline: false, side: "#F6A9C9" }, // side: colour of the 3D depth; outline: true brings back the dark edge
  epigraph: "I wanted to explore the point at which anticipated sweetness becomes unease.",
  epigraphSource: "Candybound",
  textFont: "fraunces", // font of the work texts and About: "fraunces", "literata", "nunito" or "figtree"
  showDraftNotes: false, // true shows dashed "draft note" boxes (e.g. the missing bio) while editing
  processIntro: "How the nine photographs were made: test shoots at home, frames from the studio, and the set itself. Tap any frame to see it larger.", // draft wording — edit freely

  // Process area: each group is drawn as a small pinned contact sheet (square thumbnails: tools/build_squares.py).
  // "related" links a photo to one of the works (shown in the full-size viewer).
  // To add a new top-level section later (e.g. Research), add an object to "sections" below.
  process: [
    {
      id: "test",
      label: "Test shoots",
      intro: "At home, on a Canon IXUS 115 HS compact camera. These sessions set the colors, objects and hands that the studio photographs grew from.", // draft wording — edit freely
      items: [
        {"src": "assets/more/test-02-1600.webp", "thumb": "assets/more/test-02-600.webp", "ratio": 1.3333, "related": "handful-of-sweetness", "caption": ""},
        {"src": "assets/more/test-07-1600.webp", "thumb": "assets/more/test-07-600.webp", "ratio": 1.3333, "related": "eye-candy", "caption": ""},
        {"src": "assets/more/test-06-1600.webp", "thumb": "assets/more/test-06-600.webp", "ratio": 1.3333, "related": "within-sweet-reach", "caption": ""},
        {"src": "assets/more/test-04-1600.webp", "thumb": "assets/more/test-04-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/test-09-1600.webp", "thumb": "assets/more/test-09-600.webp", "ratio": 1.3333, "related": "lathered-whispers", "caption": ""},
        {"src": "assets/more/test-05-1600.webp", "thumb": "assets/more/test-05-600.webp", "ratio": 1.3333, "related": "within-sweet-reach", "caption": ""},
        {"src": "assets/more/test-16-1600.webp", "thumb": "assets/more/test-16-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/test-10-1600.webp", "thumb": "assets/more/test-10-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/test-03-1600.webp", "thumb": "assets/more/test-03-600.webp", "ratio": 1.3333, "related": "tangled-treats", "caption": ""},
        {"src": "assets/more/test-15-1600.webp", "thumb": "assets/more/test-15-600.webp", "ratio": 0.75, "related": null, "caption": ""},
        {"src": "assets/more/test-08-1600.webp", "thumb": "assets/more/test-08-600.webp", "ratio": 1.3333, "related": "sugared-smile", "caption": ""},
        {"src": "assets/more/test-14-1600.webp", "thumb": "assets/more/test-14-600.webp", "ratio": 1.3333, "related": null, "caption": ""}
      ]
    },
    {
      id: "outtakes",
      label: "Studio outtakes",
      intro: "Frames from the studio shoot that did not become finished works.", // draft wording — edit freely
      items: [
        {"src": "assets/more/outtakes-01-1600.webp", "thumb": "assets/more/outtakes-01-600.webp", "ratio": 0.8, "related": null, "caption": ""},
        {"src": "assets/more/outtakes-02-1600.webp", "thumb": "assets/more/outtakes-02-600.webp", "ratio": 1.4993, "related": null, "caption": ""},
        {"src": "assets/more/outtakes-03-1600.webp", "thumb": "assets/more/outtakes-03-600.webp", "ratio": 1.4993, "related": null, "caption": ""},
        {"src": "assets/more/outtakes-04-1600.webp", "thumb": "assets/more/outtakes-04-600.webp", "ratio": 0.667, "related": "sugared-smile", "caption": ""},
        {"src": "assets/more/outtakes-05-1600.webp", "thumb": "assets/more/outtakes-05-600.webp", "ratio": 0.8001, "related": "sugared-smile", "caption": ""},
        {"src": "assets/more/outtakes-06-1600.webp", "thumb": "assets/more/outtakes-06-600.webp", "ratio": 0.8002, "related": "sugar-murmurs", "caption": ""},
        {"src": "assets/more/outtakes-07-1600.webp", "thumb": "assets/more/outtakes-07-600.webp", "ratio": 1.4993, "related": "candybound", "caption": ""},
        {"src": "assets/more/outtakes-08-1600.webp", "thumb": "assets/more/outtakes-08-600.webp", "ratio": 0.8001, "related": "candybound", "caption": ""},
        {"src": "assets/more/outtakes-09-1600.webp", "thumb": "assets/more/outtakes-09-600.webp", "ratio": 0.8, "related": "tangled-treats", "caption": ""},
        {"src": "assets/more/outtakes-10-1600.webp", "thumb": "assets/more/outtakes-10-600.webp", "ratio": 0.7999, "related": "within-sweet-reach", "caption": ""},
        {"src": "assets/more/outtakes-11-1600.webp", "thumb": "assets/more/outtakes-11-600.webp", "ratio": 1.4993, "related": "within-sweet-reach", "caption": ""},
        {"src": "assets/more/outtakes-12-1600.webp", "thumb": "assets/more/outtakes-12-600.webp", "ratio": 1.4996, "related": "eye-candy", "caption": ""}
      ]
    },
    {
      id: "bts",
      label: "Behind the scenes",
      intro: "The studio set, the lights, the tethered camera and the materials.", // draft wording — edit freely
      items: [
        {"src": "assets/more/bts-01-1600.webp", "thumb": "assets/more/bts-01-600.webp", "ratio": 0.667, "related": null, "caption": ""},
        {"src": "assets/more/bts-02-1600.webp", "thumb": "assets/more/bts-02-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/bts-03-1600.webp", "thumb": "assets/more/bts-03-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/bts-04-1600.webp", "thumb": "assets/more/bts-04-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/bts-05-1600.webp", "thumb": "assets/more/bts-05-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/bts-06-1600.webp", "thumb": "assets/more/bts-06-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/bts-07-1600.webp", "thumb": "assets/more/bts-07-600.webp", "ratio": 1.3333, "related": "sugar-murmurs", "caption": ""},
        {"src": "assets/more/bts-08-1600.webp", "thumb": "assets/more/bts-08-600.webp", "ratio": 1.3333, "related": "eye-candy", "caption": ""},
        {"src": "assets/more/bts-09-1600.webp", "thumb": "assets/more/bts-09-600.webp", "ratio": 1.3333, "related": "within-sweet-reach", "caption": ""},
        {"src": "assets/more/bts-10-1600.webp", "thumb": "assets/more/bts-10-600.webp", "ratio": 0.75, "related": "tangled-treats", "caption": ""},
        {"src": "assets/more/bts-11-1600.webp", "thumb": "assets/more/bts-11-600.webp", "ratio": 1.3333, "related": "cracked-and-crumbling", "caption": ""},
        {"src": "assets/more/bts-12-1600.webp", "thumb": "assets/more/bts-12-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/bts-13-1600.webp", "thumb": "assets/more/bts-13-600.webp", "ratio": 0.667, "related": null, "caption": ""},
        {"src": "assets/more/bts-14-1600.webp", "thumb": "assets/more/bts-14-600.webp", "ratio": 1.3333, "related": null, "caption": ""},
        {"src": "assets/more/bts-15-1600.webp", "thumb": "assets/more/bts-15-600.webp", "ratio": 1.3333, "related": null, "caption": ""}
      ]
    }
  ],
  sections: [
    {
      id: "research",
      tone: 3, // background tone while this section is on screen (mint; see TONES in app.js)
      label: "Research",
      layout: "research", // taped pages like Plans; each opens as a readable page
      intro: "How does sweetness become an experience? How do the physical and sensory qualities of confectionery interact with human perception and memory to shape flavor expectations and emotional comfort?",
      items: [
        {
          kicker: "01 · Text research",
          title: "Flavor is a multi-sensory construction",
          note: "Eyes, ears, mouth and hands: different routes into one eating experience.",
          cover: "flavor",
          groups: [{
            visual: { type: "flavor" },
            blocks: [
              { label: "The body combines information", text: "Eyes, ears, mouth and hands offer different routes into an eating experience." },
              { label: "Connection to my work", text: "Body-part models make these sensory routes visible within a single still life." }
            ]
          }],
          related: ["eye-candy", "sugar-murmurs", "sugared-smile", "handful-of-sweetness"],
          sources: [{ label: "NIDCD: Taste disorders — taste, smell and flavor", url: "https://www.nidcd.nih.gov/health/taste-disorders" }]
        },
        {
          kicker: "02 · Research",
          title: "Before tasting: color, shape and texture",
          note: "Color and shape set expectations; gloss, cracks and sound suggest a mouthfeel before the first bite.",
          cover: "before",
          groups: [
            {
              heading: "Color and shape set expectations",
              visual: { type: "candy" },
              blocks: [
                { label: "Research finding", text: "Food color can influence flavor expectations and identification." },
                { label: "Important limit", text: "Associations depend on experience and context; no color has one universal taste." },
                { label: "Research question", text: "How do recognizable shapes and colors establish expectations before tasting?" },
                { label: "Creative translation", text: "Pair candy-like colors with an eye to explore anticipation before eating." }
              ]
            },
            {
              heading: "Texture can be seen and heard",
              visual: { type: "textures" },
              blocks: [
                { label: "Material cues", text: "Gloss, translucency, cracks and roughness suggest different possible mouthfeels." },
                { label: "Research example", text: "Changing the sound of a potato-chip bite altered perceived crispness and freshness." },
                { label: "Creative translation", text: "Use the ear, close-up surfaces and sound annotations to imagine an eating experience." }
              ]
            }
          ],
          related: ["eye-candy", "sugar-murmurs", "cracked-and-crumbling", "lathered-whispers"],
          sources: [
            { label: "Spence (2015), On the psychological impact of food colour", url: "https://link.springer.com/article/10.1186/s13411-015-0031-3" },
            { label: "Zampini & Spence (2004), Auditory cues and perceived crispness / staleness", url: "https://doi.org/10.1111/j.1745-459x.2004.080403.x" }
          ]
        },
        {
          kicker: "03 · Artist research",
          title: "Maisie Cousins",
          subtitle: "sensory intensity",
          ref: "Reference: *Dipping Sauce*, 2018",
          note: "Close-up food imagery brings color, moisture and surface into intense proximity.",
          cover: "work:candybound",
          groups: [{
            visual: { type: "works", slugs: ["candybound"] },
            blocks: [
              { label: "What I looked at", text: "Close-up food imagery brings color, moisture and surface into intense proximity." },
              { label: "Takeaway", text: "A photograph can feel tactile and hold attraction alongside unease." },
              { label: "My development", text: "Use scale, crowding and glossy surfaces to make the image feel almost touchable." }
            ]
          }],
          related: ["candybound"],
          sources: [{ label: "Maisie Cousins, Dipping Sauce (exhibition)", url: "https://hungermag.com/editorial/maisie-cousins-debut-solo-exhibition-explores-the-joy-and-ceremony-of-eating" }]
        },
        {
          kicker: "04 · Artist research",
          title: "Pauline d’Andigné",
          subtitle: "material ambiguity",
          ref: "Reference: sculptural practice",
          note: "Artificial surfaces and organic-looking forms complicate what an object seems to be.",
          cover: "work:tangled-treats",
          groups: [{
            visual: { type: "works", slugs: ["tangled-treats", "lathered-whispers"] },
            blocks: [
              { label: "What I looked at", text: "Artificial surfaces and organic-looking forms complicate what an object seems to be." },
              { label: "Takeaway", text: "Color and material can make an object appear soft, manufactured, bodily or edible." },
              { label: "My development", text: "Let transparent models and candy-like elements sit between recognition and uncertainty." }
            ]
          }],
          related: ["tangled-treats", "lathered-whispers"],
          sources: [{ label: "Pauline d’Andigné at DARMO", url: "https://www.darmoart.com/contemporary-art/pauline-dandigne" }]
        }
      ]
    },
    {
      id: "plans",
      tone: 4, // background tone while this section is on screen (peach; see TONES in app.js)
      label: "Plans",
      layout: "strip", // a row of taped sketchbook pages; "masonry" is the other layout
      intro: "Planning pages drawn on iPad before the shoot: references, material lists and composition sketches. Some became photographs; some stayed on paper.", // draft wording — edit freely
      items: [
        {"src": "assets/plans/plan-01-map-2000.webp", "thumb": "assets/plans/plan-01-map-600.webp", "title": "Where it started", "note": "A map of the sensory toys and ASMR videos the project grew from: soap cutting, squishies, stress balls, perler beads, sensory stones, liquids.", "related": []},
        {"src": "assets/plans/plan-02-hands-2000.webp", "thumb": "assets/plans/plan-02-hands-600.webp", "title": "Hands: one and many", "note": "One clear hand holding liquid and small objects; many small hands circling a spiral of gem stickers and sensory toys.", "related": ["handful-of-sweetness", "within-sweet-reach"]},
        {"src": "assets/plans/plan-03-sensory-stones-2000.webp", "thumb": "assets/plans/plan-03-sensory-stones-600.webp", "title": "Sensory stones", "note": "Textured stones, beads, finger cots, a tiny hand and marbles under clear film.", "related": ["handful-of-sweetness"]},
        {"src": "assets/plans/plan-04-stress-balls-2000.webp", "thumb": "assets/plans/plan-04-stress-balls-600.webp", "title": "Stress balls", "note": "Mesh stress balls tied, squeezed and split open with cable ties.", "related": ["within-sweet-reach"]},
        {"src": "assets/plans/plan-05-asmr-2000.webp", "thumb": "assets/plans/plan-05-asmr-600.webp", "title": "ASMR: soap and liquid", "note": "Soap cutting with flowers, bubbles and a blade; a dish of liquid, beads and gem stickers.", "related": ["lathered-whispers"]},
        {"src": "assets/plans/plan-06-mouth-2000.webp", "thumb": "assets/plans/plan-06-mouth-600.webp", "title": "Mouth", "note": "Lips with pills, capsules and plastic insects, and a test of mixed liquids.", "related": ["sugared-smile"]},
        {"src": "assets/plans/plan-07-eye-2000.webp", "thumb": "assets/plans/plan-07-eye-600.webp", "title": "Eye", "note": "An eye flooded with liquid, beads and buttons. Maybe a clay eye?", "related": ["eye-candy"]},
        {"src": "assets/plans/plan-08-ear-2000.webp", "thumb": "assets/plans/plan-08-ear-600.webp", "title": "Ear", "note": "A clear ear dripping with liquid, stars, beads, buttons and safety pins.", "related": ["sugar-murmurs"]},
        {"src": "assets/plans/plan-09-squishies-2000.webp", "thumb": "assets/plans/plan-09-squishies-600.webp", "title": "Squishies", "note": "A hand pressing into stacked squishies held together with pins, liquid and plastic film.", "related": []},
        {"src": "assets/plans/plan-10-figures-2000.webp", "thumb": "assets/plans/plan-10-figures-600.webp", "title": "Little figures", "note": "Six figures in contrasting colors, tied together by one liquid style.", "related": []},
        {"src": "assets/plans/plan-11-perler-beads-2000.webp", "thumb": "assets/plans/plan-11-perler-beads-600.webp", "title": "Perler beads", "note": "A face built from perler beads, ribbon, gems and liquid.", "related": []},
        {"src": "assets/plans/plan-12-tattoos-2000.webp", "thumb": "assets/plans/plan-12-tattoos-600.webp", "title": "Temporary tattoos", "note": "Stickers, gems and thread on an arm: decoration that starts to look like pain.", "related": []},
        {"src": "assets/plans/plan-13-symbols-2000.webp", "thumb": "assets/plans/plan-13-symbols-600.webp", "title": "Childhood symbols", "note": "Toys and craft materials collected as a vocabulary: Tamagotchi, wind-up frog, slime, beads.", "related": []},
        {"src": "assets/plans/plan-14-loose-1-2000.webp", "thumb": "assets/plans/plan-14-loose-1-600.webp", "title": "Loose ideas I", "note": "Childhood toys hung out to dry; small figures as a portrait of my generation.", "related": []},
        {"src": "assets/plans/plan-15-loose-2-2000.webp", "thumb": "assets/plans/plan-15-loose-2-600.webp", "title": "Loose ideas II", "note": "Water beads under a net, a clapper hand missing its middle finger, a Tamagotchi.", "related": []},
        {"src": "assets/plans/plan-16-loose-3-2000.webp", "thumb": "assets/plans/plan-16-loose-3-600.webp", "title": "Loose ideas III", "note": "An eye in two layers, a whistle blowing objects out, a lollipop half liquid.", "related": []}
      ]
    }
  ],

  about: {
    heading: "About me",
    photos: [ // shown uncropped as two pinned prints next to the bio
      { src: "assets/about/xiaoran-studio-640.webp", w: 640, h: 960, alt: "Xiaoran in the studio, head bowed, attaching sensory toys to the transparent hand of Handful of Sweetness.", caption: "on set" },
      { src: "assets/about/xiaoran-night-900.webp", w: 900, h: 660, alt: "Xiaoran laughing by a river railing at night, arms out wide.", caption: "off set" }
    ],
    bio: "Hi, I’m Xiaoran! Born in 2008, currently in high school, and usually wondering what ordinary objects could become if I rearranged them a little.\n\nI like my socks weird and my hair dyed in patterns. Apparently, the experimenting doesn’t stop when I put the camera down.\n\nThis website is where some of the strange little ideas in my head come out to play. Have a look around!",
    email: "Xiaoran.Hou90127-bbsz@basischina.com",
    instagram: "" // optional
  },

  works: [
    {
      slug: "handful-of-sweetness",
      title: "Handful of Sweetness",
      medium: "Digital photography",
      materials: "transparent hand model, sensory toys, cable ties", // from the artist's description — confirm
      size: "40 × 50 cm",
      flavor: "#3DC96F",
      widths: [600, 1000, 1600, 2400],
      ratio: 0.8,
      alt: "A transparent hand model on a green background, hung with brightly colored sensory toys and bound with cable ties.",
      description: "I placed brightly colored sensory toys around a transparent hand model, using their round shape and textured surface to create **a confectionery-like appearance**.\n\nThis hand links the desire to touch with **the anticipation of tasting**. The edges, bumps and smooth curves of the toys invite the viewer to imagine how these objects might feel against their fingertips or inside the mouth.\n\nBut the transparent material and the clearly visible cable ties make the arrangement slightly unfamiliar. Drawing on my research into **multisensory flavor perception**, I explore how visual clues evoke people's expectations of sweetness and texture before tasting, and how objects designed to provide **tactile comfort can also appear unfamiliar** when combined with artificial materials and visible restraints.",
      process: [
        {"src": "assets/process/handful-of-sweetness-p1-1600.webp", "thumb": "assets/process/handful-of-sweetness-p1-600.webp", "ratio": 0.667, "caption": ""}
      ]
    },
    {
      slug: "tangled-treats",
      title: "Tangled Treats",
      medium: "Digital photography",
      materials: "pipe cleaners, segmented tangle toy, transparent nail display hands, pink and blue trays", // from the artist's description — confirm
      size: "40 × 50 cm",
      flavor: "#F4A9C0",
      widths: [600, 1000, 1600, 2400],
      ratio: 0.8,
      alt: "Clear nail-display hands against pink and blue trays, looped with fuzzy pipe cleaners and a segmented tangle toy.",
      description: "I looped colorful pipe cleaners and a segmented tangle toy around transparent nail display hands, and used light pink and light blue trays as the background. Their winding shapes resemble **gummy worms or candy ropes**, and the fuzzy and glossy surfaces suggest contrasting tactile sensations.\n\nWhat I'm interested in is how the familiar candy shape can **make an unexpected material look edible**. My research into Pauline d’Andigné’s work informed my interest in **material ambiguity**, particularly how artificial surfaces and organic-looking forms can challenge our recognition of familiar objects.\n\nThe transparent hands invite an imagined touch, bringing attention to the difference between the appearance of objects and the actual touch. Through these interesting combinations, I explore how color, shape and texture can influence **expectations of edibility before tasting**.",
      process: [
        {"src": "assets/process/tangled-treats-p1-1600.webp", "thumb": "assets/process/tangled-treats-p1-600.webp", "ratio": 1.2496, "caption": ""},
        {"src": "assets/process/tangled-treats-p2-1600.webp", "thumb": "assets/process/tangled-treats-p2-600.webp", "ratio": 0.8, "caption": ""},
        {"src": "assets/process/tangled-treats-p3-1600.webp", "thumb": "assets/process/tangled-treats-p3-600.webp", "ratio": 0.8002, "caption": ""},
        {"src": "assets/process/tangled-treats-p4-1600.webp", "thumb": "assets/process/tangled-treats-p4-600.webp", "ratio": 0.8, "caption": ""}
      ]
    },
    {
      slug: "candybound",
      title: "Candybound",
      medium: "Digital photography",
      materials: "miniature hand molds, blue clay, transparent slime, glass marbles, needles, straps, plastic insect", // from the artist's description — confirm
      size: "40 × 50 cm",
      flavor: "#7DB9FF",
      widths: [600, 1000, 1600, 2400],
      ratio: 0.8,
      alt: "Three small hand molds pressed into blue clay under clear slime, scattered with marbles, needles, straps and a plastic insect.",
      description: "I embedded three miniature hand molds into the blue clay and covered the arrangement with transparent slime, creating a sticky texture similar to syrup or icing.\n\nGlass marbles and colorful needles look like candy decorations, but on closer inspection, the viewer discovers **sharp needles, straps and a plastic insect**.\n\nLooking at **Maisie Cousins’ *Dipping Sauce* (2018)** encouraged me to experiment with glossy textures, saturated colors and tightly framed compositions that feel both tactile and unsettling.\n\nThe hands appear trapped in something that initially looks tempting. I wanted to explore **the point at which anticipated sweetness becomes unease**. As viewers begin to recognize the artificial and potentially uncomfortable elements, the initial impression of sweetness is disrupted. The composition is deliberately crowded, reinforcing **a sense of confinement** beneath the playful, candy-like surfaces.",
      process: [
        {"src": "assets/process/candybound-p1-1600.webp", "thumb": "assets/process/candybound-p1-600.webp", "ratio": 1.4993, "caption": ""},
        {"src": "assets/process/candybound-p2-1600.webp", "thumb": "assets/process/candybound-p2-600.webp", "ratio": 0.667, "caption": ""},
        {"src": "assets/process/candybound-p3-1600.webp", "thumb": "assets/process/candybound-p3-600.webp", "ratio": 0.8001, "caption": ""},
        {"src": "assets/process/candybound-p4-1600.webp", "thumb": "assets/process/candybound-p4-600.webp", "ratio": 0.8002, "caption": ""}
      ]
    },
    {
      slug: "sugar-murmurs",
      title: "Sugar Murmurs",
      medium: "Digital photography",
      materials: "transparent ear model, beads, ball-headed pins, metallic stickers", // from the artist's description — confirm
      size: "40 × 50 cm",
      flavor: "#FFE14D",
      mark: "#F6A9C9", // key-word highlighter: pink instead of lemon on this yellow work
      widths: [600, 1000, 1600, 2400],
      ratio: 0.8,
      alt: "A transparent ear model on a yellow background, its folds filled with colored beads and pierced with ball-headed pins.",
      description: "I sprinkled colorful beads along the folds of a transparent ear model, adding ball-headed pins and metallic stickers, against a bright yellow background.\n\nThe translucent surface of the model resembles hard candy, and the scattered beads resemble sugar sprinkles. By using an ear as the main object in the image, I wanted to invite viewers to **imagine the sounds associated with sweets**: a wrapper rustling, candy cracking, or sugar crunching between teeth.\n\n**Zampini and Spence’s (2004)** research into auditory cues and perceived crispness informed my interest in how sound contributes to food texture. I translate this idea into a silent photograph that evokes imagined sounds and tactile sensations.\n\nThe pins introduce a sharper, less comfortable sensation into the colorful and cheerful composition, disrupting its playful appearance with **a subtle sense of unease**. This work explores how **expectations of food extend beyond taste**, as visual information can evoke imagined sounds and textures before eating.",
      process: [
        {"src": "assets/process/sugar-murmurs-p1-1600.webp", "thumb": "assets/process/sugar-murmurs-p1-600.webp", "ratio": 0.8001, "caption": ""},
        {"src": "assets/process/sugar-murmurs-p2-1600.webp", "thumb": "assets/process/sugar-murmurs-p2-600.webp", "ratio": 0.8001, "caption": ""},
        {"src": "assets/process/sugar-murmurs-p3-1600.webp", "thumb": "assets/process/sugar-murmurs-p3-600.webp", "ratio": 0.8001, "caption": ""},
        {"src": "assets/process/sugar-murmurs-p4-1600.webp", "thumb": "assets/process/sugar-murmurs-p4-600.webp", "ratio": 0.8001, "caption": ""},
        {"src": "assets/process/sugar-murmurs-p5-1600.webp", "thumb": "assets/process/sugar-murmurs-p5-600.webp", "ratio": 0.7999, "caption": ""}
      ]
    },
    {
      slug: "eye-candy",
      title: "Eye Candy",
      medium: "Digital photography",
      materials: "printed eye, clear slime, glitter, beads, buttons, pins, eye stickers", // from the artist's description — confirm
      size: "40 × 50 cm",
      flavor: "#F7AE98",
      widths: [600, 1000, 1600, 2400],
      ratio: 0.8,
      alt: "Close-up of a printed eye surrounded by clear slime, glitter, beads, buttons and pins.",
      description: "I layered clear slime, glitter, beads, and buttons over a printed eye, turning its surrounding surface into something resembling melted candy. The glossy coating and bright colors suggest sweetness, while pins and small eye stickers make the close-up feel increasingly unsettling. The title **takes “eye candy” literally**: the organ through which we perceive visual information becomes part of the tempting display itself.\n\n**Charles Spence’s (2015)** research into the psychological impact of food color informed my exploration of how visual appearance can shape flavor expectations before tasting. I wanted to explore how a photograph can **suggest taste without containing food**. The eye remains visible beneath the crowded decorations, appearing to **look back at the viewer** who is inspecting it.",
      process: [
        {"src": "assets/process/eye-candy-p1-1600.webp", "thumb": "assets/process/eye-candy-p1-600.webp", "ratio": 1.4993, "caption": ""},
        {"src": "assets/process/eye-candy-p2-1600.webp", "thumb": "assets/process/eye-candy-p2-600.webp", "ratio": 0.7999, "caption": ""},
        {"src": "assets/process/eye-candy-p3-1600.webp", "thumb": "assets/process/eye-candy-p3-600.webp", "ratio": 0.7998, "caption": ""},
        {"src": "assets/process/eye-candy-p4-1600.webp", "thumb": "assets/process/eye-candy-p4-600.webp", "ratio": 0.8, "caption": ""}
      ]
    },
    {
      slug: "cracked-and-crumbling",
      title: "Cracked & Crumbling",
      medium: "Digital photography",
      materials: "wax-coated clay toys, transparent hand, broken shell fragments", // from the artist's description — confirm
      size: "40 × 50 cm",
      flavor: "#A6E3BE",
      widths: [600, 1000, 1600, 2400],
      ratio: 0.8,
      alt: "Wax-coated clay toys in pale pink, green and blue around a clear hand on a white background, with broken shell fragments below.",
      description: "I placed clay toys covered with wax layers around a transparent hand, leaving broken shell fragments scattered beneath them. These toys are softly colored, resembling **sugar-coated confectionery**, and the cracks reveal a softer and rougher texture inside, like a macaron. Against the white or even overexposed background, this texture difference becomes the visual focus.\n\n**Nendo’s *chocolatexture* (2015)**, which explores variations in chocolate surface and structure, inspired me to investigate how cracks, coatings and exposed interiors can suggest different mouthfeels before tasting.\n\nI hope the viewer can imagine the sensation of **a brittle shell breaking under pressure**, similar to biting into crisp food. The hand connects this imagined biting sensation with the tactile experience of handling sensory toys. Through these cracked surfaces and seemingly unstable layouts, I explore how visible fractures and exposed internal structures can suggest contrasting textures, and how the visible structure shapes our **expectations of mouthfeel**.",
      process: [
        {"src": "assets/process/cracked-and-crumbling-p1-1600.webp", "thumb": "assets/process/cracked-and-crumbling-p1-600.webp", "ratio": 0.8001, "caption": ""},
        {"src": "assets/process/cracked-and-crumbling-p2-1600.webp", "thumb": "assets/process/cracked-and-crumbling-p2-600.webp", "ratio": 0.8, "caption": ""},
        {"src": "assets/process/cracked-and-crumbling-p3-1600.webp", "thumb": "assets/process/cracked-and-crumbling-p3-600.webp", "ratio": 0.8, "caption": ""},
        {"src": "assets/process/cracked-and-crumbling-p4-1600.webp", "thumb": "assets/process/cracked-and-crumbling-p4-600.webp", "ratio": 0.7999, "caption": ""}
      ]
    },
    {
      slug: "sugared-smile",
      title: "Sugared Smile",
      medium: "Digital photography",
      materials: "dental model, colored foam, beads, empty pill capsules, calcium tablets, rhinestones", // from the artist's description — confirm
      size: "40 × 50 cm",
      flavor: "#4FC6EE",
      widths: [600, 1000, 1600, 2400],
      ratio: 0.8,
      alt: "An open dental model set in colored foam, its teeth studded with rhinestones, among pill capsules and calcium tablets.",
      description: "I surrounded an open dental model with colored foam, beads, empty pill capsules, calcium tablets, and decorated its teeth with rhinestones. The bright colors and round shapes recall colorful childhood sweets, and the addition of capsules evokes associations with medicine, treatment and bodily care. Their smooth and two-colored shells resemble certain types of candy, allowing similar visual qualities to carry very different expectations: **sweetness, bitterness, pleasure, or discomfort**.\n\nMy visual research into **Jelly Belly’s BeanBoozled**, where similarly colored candies can contain very different flavors, led me to question how reliably appearance can communicate what we are about to consume.\n\nThe dental model introduces a further tension between the sensory pleasure of eating and concerns about oral health. The mouth becomes a meeting point between sensory pleasure and concern for health. I wanted the image to feel inviting at first, while encouraging viewers to question what appears desirable and what it might mean for the body. Through this arrangement, I explore how similar visual characteristics can create **conflicting expectations** about the substances we consume.",
      process: [
        {"src": "assets/process/sugared-smile-p1-1600.webp", "thumb": "assets/process/sugared-smile-p1-600.webp", "ratio": 0.8705, "caption": ""},
        {"src": "assets/process/sugared-smile-p2-1600.webp", "thumb": "assets/process/sugared-smile-p2-600.webp", "ratio": 0.8, "caption": ""},
        {"src": "assets/process/sugared-smile-p3-1600.webp", "thumb": "assets/process/sugared-smile-p3-600.webp", "ratio": 0.7999, "caption": ""},
        {"src": "assets/process/sugared-smile-p4-1600.webp", "thumb": "assets/process/sugared-smile-p4-600.webp", "ratio": 0.8001, "caption": ""}
      ]
    },
    {
      slug: "within-sweet-reach",
      title: "Within Sweet Reach",
      medium: "Digital photography",
      materials: "miniature hands, stress balls, cable ties", // from the artist's description — confirm
      size: "40 × 50 cm",
      flavor: "#FF9A5E",
      widths: [600, 1000, 1512], // final resolution; white margins added left/right to make it 4:5
      ratio: 0.8,
      alt: "Small orange hands reaching from several directions toward clusters of stress balls bound with cable ties, on white.",
      description: "By using multiple miniature hands that reach toward clusters of stress balls from different directions, I aimed to create **a scene of repeated pursuit**. The stress balls are squeezed into various forms by the cable ties, distorting their candy-like softness into playful yet constrained forms and suggesting **a tension between comfort and pressure**.\n\nThe small size of the hands makes the colorful spheres look like oversized sweets, and the pure white background makes the whole group of objects seem to be suspended in the air. My research into **comfort food** led me to question whether the appeal of familiar, sweet-looking objects comes from their physical qualities or from the expectations and associations we attach to them. I used the hands as gestures of wanting, hovering, approaching, and almost grasping. I wanted to capture **the moment before satisfaction**, when seeing something appealing develops into an impulse to reach for it. Here, sweetness exists as an expectation, always within sight, and seems to be within reach.",
      process: [
        {"src": "assets/process/within-sweet-reach-p1-1600.webp", "thumb": "assets/process/within-sweet-reach-p1-600.webp", "ratio": 0.7999, "caption": ""},
        {"src": "assets/process/within-sweet-reach-p2-1600.webp", "thumb": "assets/process/within-sweet-reach-p2-600.webp", "ratio": 0.8, "caption": ""},
        {"src": "assets/process/within-sweet-reach-p3-1600.webp", "thumb": "assets/process/within-sweet-reach-p3-600.webp", "ratio": 0.8001, "caption": ""},
        {"src": "assets/process/within-sweet-reach-p4-1600.webp", "thumb": "assets/process/within-sweet-reach-p4-600.webp", "ratio": 1.2498, "caption": ""},
        {"src": "assets/process/within-sweet-reach-p5-1600.webp", "thumb": "assets/process/within-sweet-reach-p5-600.webp", "ratio": 1.2504, "caption": ""}
      ]
    },
    {
      slug: "lathered-whispers",
      title: "Lathered Whispers",
      medium: "Digital photography",
      materials: "soaps, rhinestone-decorated ear models, tray, blade", // from the artist's description — confirm
      size: "40 × 50 cm",
      flavor: "#F2C14E",
      widths: [600, 1000, 1600, 2400],
      ratio: 0.8,
      alt: "Stacked soaps and rhinestone-studded ear models on a tray, with scraped soap shavings and a craft blade.",
      description: "I stacked soaps and rhinestone-decorated ear models on a tray, creating an arrangement similar to that of **a dessert display**. The scraped surfaces and scattered shavings of the soaps suggest a crumbly texture, while the blade suggests a moment of cutting or breaking.\n\nMy earlier research into material ambiguity informed my decision to **use soap as a substitute for confectionery**, allowing familiar colors and textures to suggest food despite the objects being inedible.\n\nPlacing ears beside the soap invites viewers to imagine **the scrape, crackle, and crumble** that a still photograph cannot produce. I was interested in how these imagined sounds might make texture feel almost tangible, much as the anticipated crunch of food contributes to its appeal. The familiar soap shapes and exposed blade complicate the sweetness of the colors, keeping the scene somewhere **between soothing and uncomfortable**.",
      process: [
        {"src": "assets/process/lathered-whispers-p1-1600.webp", "thumb": "assets/process/lathered-whispers-p1-600.webp", "ratio": 0.8001, "caption": ""},
        {"src": "assets/process/lathered-whispers-p2-1600.webp", "thumb": "assets/process/lathered-whispers-p2-600.webp", "ratio": 0.8001, "caption": ""},
        {"src": "assets/process/lathered-whispers-p3-1600.webp", "thumb": "assets/process/lathered-whispers-p3-600.webp", "ratio": 0.7998, "caption": ""}
      ]
    }
  ]
};
