import { XIcon } from '@heroicons/react/outline';
import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Element, Genre } from '../typings';

export const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>();
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!currentMovie) return;

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          currentMovie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${currentMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        );

        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    };

    fetchMovie();
  }, [currentMovie]);

  const handleClose = () => setShowModal(false);

  console.log(trailer);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={
              trailer
                ? `https://www.youtube.com/watch?v=${trailer}`
                : 'https://www.youtube.com/watch?v=oic34YA4MeI'
            }
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex gap-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                play
              </button>

              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>

              <button className="modalButton">
                <ThumbUpIcon className="h-7 w-7" />
              </button>

              <button
                className="modalButton"
                onClick={() => setMuted((boo) => !boo)}
              >
                {muted ? (
                  <VolumeOffIcon className="h6 w-6" />
                ) : (
                  <VolumeUpIcon className="h6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {currentMovie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {currentMovie?.release_date || currentMovie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col gap-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres?.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};
