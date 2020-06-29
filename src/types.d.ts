type Movie = {
  id: number;
  name: string;
  price: number;
  img: string;
};

type Item = {
  id: number;
  quantity: number;
};

type UserState = {
  movies: Movie[];
  loading: boolean;
  profile: Item[];
};

type UserState = { username: string | null };
