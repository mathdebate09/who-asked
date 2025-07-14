export interface Media {
  uri: string;
  tags: string[];
  height: number;
  width: number;
  type: string;
}

export interface Text {
    text: string;
    context: string[];
}