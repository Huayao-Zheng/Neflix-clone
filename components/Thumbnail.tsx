import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie } from '../typings';

type Props = {
  // movie: Movie | DocumentData;
  movie: Movie;
};

export const Thumbnail = ({ movie }: Props) => {
  const [, setShowModal] = useRecoilState(modalState);
  const [, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  );
};
