import { images, type ImageKey } from "@/data/images";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: string;
  orientation: "landscape" | "portrait";
};

const entries: [ImageKey, string][] = [
  ["etonHighStreet", "Streetscape"],
  ["unionFlagPediment", "Red brick"],
  ["thamesTownhouses", "Riverside"],
  ["gothicDoorway", "Stone & Gothic"],
  ["victorianStoneCorner", "Victorian stone"],
  ["stuccoSash", "Stucco & sash"],
  ["etonChapel", "Ecclesiastical"],
  ["brickMullions", "Red brick"],
  ["crestDoorway", "Red brick"],
  ["terracottaCorner", "Victorian stone"],
  ["portlandStone", "Portland stone"],
  ["etonGatehouse", "Red brick"],
  ["chapelGolden", "Ecclesiastical"],
  ["brickBay", "Red brick"],
  ["stoneGable", "Stone & Gothic"],
  ["brickCorner", "Streetscape"],
  ["ironLamp", "Detail"],
  ["gardenBrick", "Detail"]
];

export const galleryImages: GalleryImage[] = entries.map(([key, category]) => ({
  src: images[key].src,
  alt: images[key].alt,
  caption: images[key].caption,
  orientation: images[key].orientation,
  category
}));
