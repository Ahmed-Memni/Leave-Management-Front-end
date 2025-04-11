import Profillepic from 'assets/images/trending-now/images.png';


export interface TrendingItem {
  id?: number;
  name: string;
  imgsrc: string;
  popularity: number;

}

export const trendingItems: TrendingItem[] = [
  {
    id: 1,
    name: 'Ahmed Memni',
    imgsrc: Profillepic,
    popularity: 78,
  },
  {
    id: 2,
    name: 'Akrem',
    imgsrc: Profillepic,
    popularity: 62,
  },
  {
    id: 3,
    name: 'Didi',
    imgsrc: Profillepic,
    popularity: 51,
  },
  {
    id: 4,
    name: 'Bin Ali',
    imgsrc: Profillepic,
    popularity: 29,
  },
];
