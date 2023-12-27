import React from "react";

import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { MovieInterface } from "@/types";

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-x-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semiblod mb-4  ">
            {title}
        </p>
        <div className="grid grid-cols-4 gap-2 mb-4">
            {data.map((movie) => (
                <MovieCard key={movie.id} data={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
