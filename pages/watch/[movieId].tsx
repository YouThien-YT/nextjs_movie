import useSWR from "swr";
import { useRouter } from "next/router";

import useMovie from "@/Hook/useMovie";

import { TiArrowLeftOutline } from "react-icons/ti";

const watch = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { movieId } = router.query;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screem w-screen bg-black">
      <nav
        className="
            fixed
            w-full
            p-4
            z-10
            flex
            flex-row
            items-center
            gap-8
            bg-black
            bg-opacity-70
            "
      >
        <TiArrowLeftOutline onClick = {() => router.push('/')} className="text-white hover:text-neutral-300 cursor-pointer transition duration " size={40} />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default watch;
