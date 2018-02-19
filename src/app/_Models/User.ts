import { Photo } from './Photo';

export interface User {
  id: number;
  username: string;
  gender: string;
  knowAs: string;
  age: number;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interest?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}
