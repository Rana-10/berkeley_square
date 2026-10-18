// Client-supplied UK architecture photography (from "bsq images"), optimised to /public/images/uk.
// Captions are descriptive rather than place-specific except where the subject is unmistakable.
export type SiteImage = {
  src: string;
  alt: string;
  caption: string;
  /** natural orientation of the source file */
  orientation: "landscape" | "portrait";
};

const make = (file: string, orientation: SiteImage["orientation"], alt: string, caption: string): SiteImage => ({
  src: `/images/uk/${file}.webp`,
  alt,
  caption,
  orientation
});

export const images = {
  etonHighStreet: make("eton-high-street", "landscape", "A quiet high street of red-brick Victorian shopfronts with Union flags overhead", "Eton High Street, Berkshire"),
  etonChapel: make("eton-college-chapel", "landscape", "Gothic chapel pinnacles rising above a red-brick range under a blue sky", "Eton College Chapel, Berkshire"),
  thamesTownhouses: make("thames-townhouses", "landscape", "Gabled riverside townhouses with balconies overlooking the Thames and swans", "Riverside townhouses on the Thames"),
  victorianStoneCorner: make("victorian-stone-corner", "landscape", "A honey-coloured Victorian stone corner building seen from below", "Victorian stone, corner elevation"),
  terracottaCorner: make("victorian-terracotta-corner", "landscape", "Ornate Victorian stone and terracotta façade with gabled dormers", "Victorian stone and terracotta"),
  unionFlagPediment: make("union-flag-pediment", "portrait", "A red-brick pediment with a carved statue niche and a Union flag", "Brick pediment, Union flag"),
  gothicDoorway: make("gothic-doorway", "portrait", "A pointed Gothic stone doorway set between white sash windows", "Gothic doorway and sash windows"),
  stoneGable: make("stone-gable-tower", "portrait", "A rough-cut stone gable with stepped buttress and mullioned windows", "Stone gable and mullioned windows"),
  brickCorner: make("brick-corner-terrace", "portrait", "A red-brick corner terrace with iron balconies above a green shopfront", "Red-brick corner terrace"),
  stuccoSash: make("stucco-sash-windows", "portrait", "White stucco façade with carved pilasters, sash windows and shutters", "Stucco, sash windows and shutters"),
  crestDoorway: make("crest-doorway", "portrait", "A black studded door beneath a carved stone crest in red brick", "Carved crest and black door"),
  chapelGolden: make("chapel-golden-hour", "portrait", "A stone chapel with tall traceried windows lit by evening sun", "Stone chapel at golden hour"),
  brickMullions: make("brick-mullion-windows", "portrait", "A red-brick range with stone-mullioned windows and a panelled front door", "Brick and stone mullions"),
  brickBay: make("brick-bay-window", "portrait", "A stone-framed bay window set into a red-brick elevation", "Stone-framed brick bay"),
  etonGatehouse: make("eton-gatehouse", "portrait", "A castellated red-brick gatehouse with diaper-pattern brickwork and a post box", "Brick gatehouse, Eton"),
  portlandStone: make("portland-stone-portico", "portrait", "A white Portland stone classical entrance with columns and a tall arched window", "Portland stone portico"),
  ironLamp: make("wrought-iron-lamp", "portrait", "A wrought-iron street lamp silhouetted against a deep blue sky", "Wrought-iron lamp"),
  gardenBrick: make("garden-and-brick", "portrait", "Evening light across a wild garden beside a red-brick building", "Garden and brick, evening light")
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
