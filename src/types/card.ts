export type CardType = "corp" | "prel" | "proj";
export type CardColor = "blue" | "green" | "red";

export type Tag =
  | "plant"
  | "space"
  | "building"
  | "science"
  | "earth"
  | "jovian"
  | "power"
  | "microbe"
  | "animal"
  | "city"
  | "event"
  | "wild";

export interface Resources {
  mc?: number;
  plant?: number;
  steel?: number;
  ti?: number;
  heat?: number;
  energy?: number;
  card?: number;
  city?: number;
  ocean?: number;
  greenery?: number;
  temp?: number;
  o2?: number;
  tr?: number;
  prelude?: number;
  award?: number;
  draw?: { [key in Tag]?: number };
}

export interface Requirements {
  temp?: number;
  maxtemp?: number;
  o2?: number;
  maxo2?: number;
  ocean?: number;
  maxocean?: number;
  science?: number;
  energy?: number;
  ti?: number;
  plant?: number;
  animal?: number;
  microbe?: number;
  jovian?: number;
  city?: number;
  greenery?: number;
  earth?: number;
}

export interface Discount {
  any?: number;
  space?: number;
  earth?: number;
  building?: number;
  science?: number;
  power?: number;
}

export interface Card {
  cardNum: string;
  type: CardType;
  tags: Tag[];
  resources: Resources;
  prod: Resources;
  color: CardColor;
  cost?: number;
  vp?: number;
  req?: Requirements;
  reduce?: Resources;
  discount?: Discount;
  cardExtra?: string;
  remove?: Resources;
  decreaseProd?: Resources;
}

export type CardsMap = Record<string, Card>;
