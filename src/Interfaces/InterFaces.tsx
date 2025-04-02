export interface UserInterFace {
  username: string;
  email: string;
  role: string;
  user_status: string;
  id: string;
  status: string;
}

export interface ConcertInterface {
  title: string;
  id: string;
  locationName: string;
  startDate: string;
  price: number;
  totalTicket: number;
  photos: string[];
}

export interface ComplainInterface {
  complainPhotos: string[];
  ticketId: string;
  user: {
    name: string;
    email: string;
  };
  title: string;
  id: string;
  status: string;
}
