import {Image} from "../image/image";

export class Newsletter {
  id?:string;
  created?: any;
  producerID?: string;
  titolo?: string;
  contenuto?: string;
  image?: Image;
  status? : string;
}
