/** Shop facts are from the public listing. Prices and barber profiles are editable placeholders. */

function photo(file: string) {
  return `${import.meta.env.BASE_URL}images/${file}`
}

export const phoneDisplay = "(416) 457-9693"
export const phoneHref = "tel:+14164579693"

export const mapsQuery = "Natural Barber Shop, 902 Wilson Ave, North York, ON M3K 1E7"
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("902 Wilson Ave, North York, ON M3K 1E7")}`
export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=16&output=embed`

export const socials = [
  {
    label: "Instagram",
    href: "https://www.google.com/search?q=Natural+Barber+Shop+902+Wilson+Ave+Instagram",
  },
  {
    label: "Facebook",
    href: "https://www.google.com/search?q=Natural+Barber+Shop+902+Wilson+Ave+Facebook",
  },
  {
    label: "TikTok",
    href: "https://www.google.com/search?q=Natural+Barber+Shop+902+Wilson+Ave+TikTok",
  },
]

export const navLinks = [
  { id: "top", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "services", label: "Services" },
  { id: "barbers", label: "The Barbers" },
  { id: "gallery", label: "Gallery" },
  { id: "visit", label: "Visit" },
]

export const rail = [
  { id: "top", index: "01", label: "Intro" },
  { id: "story", index: "02", label: "Our story" },
  { id: "services", index: "03", label: "Services" },
  { id: "barbers", index: "04", label: "The barbers" },
  { id: "experience", index: "05", label: "The experience" },
  { id: "gallery", index: "06", label: "Gallery" },
  { id: "visit", index: "07", label: "Visit" },
]

export type Service = {
  id: string
  index: string
  name: string
  description: string
  minutes: number
  price: number
}

export const services: Service[] = [
  {
    id: "classic-haircut",
    index: "01",
    name: "Classic Haircut",
    description:
      "A measured cut with shears or clippers, shaped to your head and finished at the neckline.",
    minutes: 45,
    price: 40,
  },
  {
    id: "skin-fade",
    index: "02",
    name: "Skin Fade",
    description:
      "A tight fade blended to the skin, with enough length on top to hold a shape.",
    minutes: 50,
    price: 45,
  },
  {
    id: "beard-sculpting",
    index: "03",
    name: "Beard Sculpting",
    description:
      "Cheek line, neck line, and length brought into one shape. Sharp, and still natural.",
    minutes: 30,
    price: 30,
  },
  {
    id: "haircut-beard",
    index: "04",
    name: "Haircut & Beard",
    description: "The full chair. Cut and beard together, so the two read as one.",
    minutes: 75,
    price: 65,
  },
  {
    id: "hot-towel-shave",
    index: "05",
    name: "Hot Towel Shave",
    description:
      "Hot towel, a close shave, and a cool finish. Book this when you are not in a hurry.",
    minutes: 45,
    price: 40,
  },
  {
    id: "premium",
    index: "06",
    name: "Premium Grooming Experience",
    description:
      "Consultation, cut, beard, and hot towel. The longest hour in the shop, kept quiet and exact.",
    minutes: 90,
    price: 95,
  },
]

export function cad(amount: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export const barbers = [
  {
    name: "Julian Blake",
    specialty: "Texture & shape",
    bio: "Julian cuts with the grain of the hair. Curls, waves, and grown-out fades are shaped so they still look considered on day ten.",
    image: photo("barber-julian.jpg"),
    alt: "A barber in a grey sweater shaping a textured crop with clippers",
    position: "object-[center_18%]",
  },
  {
    name: "Marco Ellison",
    specialty: "Scissor work",
    bio: "Marco prefers the shear. Length comes off slowly, the outline stays soft, and the cut is built to fall without product doing the work.",
    image: photo("barber-marco.jpg"),
    alt: "A barber in a black cap cutting hair with scissors at a shop station",
    position: "object-[18%_30%]",
  },
  {
    name: "Elias Navarro",
    specialty: "Skin fades",
    bio: "Elias blends the fade tight to the skin and leaves the top with enough weight to hold. The line is decided before the clipper moves.",
    image: photo("blend.jpg"),
    alt: "Close view of a barber refining a skin fade with a straight razor",
    position: "object-[center_22%]",
  },
]

export const chapters = [
  {
    index: "01",
    title: "The station",
    body: "The chair is reset before you sit. Cape out, tools within reach, the mirror clear. Nothing about the hour should feel improvised.",
    image: photo("chair.jpg"),
    alt: "A tufted brown leather barber chair with polished chrome arms",
  },
  {
    index: "02",
    title: "The cut",
    body: "We cut the head in front of us, not a picture saved on a phone. The shape has to work with how your hair grows, and how you actually live.",
    image: photo("fade.jpg"),
    alt: "A barber blending a tight fade with a comb and clippers",
  },
  {
    index: "03",
    title: "The detail",
    body: "A neckline, a corner, the weight through the fringe. The last five minutes are where a haircut becomes a finished one.",
    image: photo("line.jpg"),
    alt: "Clippers and a comb defining a hard part and fade",
  },
  {
    index: "04",
    title: "The towel",
    body: "Hot towel, then a shave or a beard brought back into line. This is the slow appointment. It is meant to feel like one.",
    image: photo("shave.jpg"),
    alt: "A hot-towel shave, with a brush working lather along the neck",
  },
  {
    index: "05",
    title: "The room",
    body: "Clean, lit, and quiet enough to hear the clippers. Wilson Avenue, North York. Walk in, or book the chair.",
    image: photo("story.jpg"),
    alt: "Three black barber chairs facing a brick wall, mirrors, and pendant lights",
  },
]

export const gallery = [
  {
    src: photo("hero.jpg"),
    alt: "A barber trimming a client’s beard with shears in low light",
    caption: "The shave",
    span: "md:col-span-2 md:row-span-4 min-h-[420px]",
    position: "object-[center_35%]",
  },
  {
    src: photo("blend.jpg"),
    alt: "A skin fade in progress, seen from above the client’s head",
    caption: "Skin fade",
    span: "md:row-span-3 min-h-[280px]",
    position: "object-center",
  },
  {
    src: photo("shave.jpg"),
    alt: "Lather and a hot towel during a traditional shave",
    caption: "Hot towel",
    span: "md:row-span-3 min-h-[280px]",
    position: "object-[center_40%]",
  },
  {
    src: photo("chair.jpg"),
    alt: "Leather barber chair photographed from the footrest",
    caption: "The chair",
    span: "md:row-span-3 min-h-[260px]",
    position: "object-center",
  },
  {
    src: photo("fade.jpg"),
    alt: "Hands guiding a comb through a close fade",
    caption: "The blend",
    span: "md:col-span-2 md:row-span-3 min-h-[300px]",
    position: "object-[center_30%]",
  },
  {
    src: photo("barber-julian.jpg"),
    alt: "A barber concentrating on a textured haircut",
    caption: "Texture",
    span: "md:row-span-4 min-h-[360px]",
    position: "object-[center_15%]",
  },
  {
    src: photo("story.jpg"),
    alt: "A row of barber chairs under warm pendant lamps",
    caption: "The room",
    span: "md:col-span-2 md:row-span-3 min-h-[300px]",
    position: "object-center",
  },
  {
    src: photo("line.jpg"),
    alt: "A precise clipper line along the side of a haircut",
    caption: "The line",
    span: "md:row-span-3 min-h-[260px]",
    position: "object-[center_40%]",
  },
]

export const reviews = [
  {
    name: "Yani Reginaldo",
    quote: "The place is amazing!! service was excellent!",
  },
  {
    name: "Maria Alta",
    quote: "I really enjoyed my experience here this morning!",
  },
  {
    name: "Jennifer Nguyen",
    quote: "Good customer service, really friendly staff.",
  },
]
