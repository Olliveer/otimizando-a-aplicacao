import { lazy, memo } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  CellRenderer,
  createMasonryCellPositioner,
  Masonry,
} from "react-virtualized";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenre: {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}
const cache = new CellMeasurerCache({
  defaultHeight: 600,
  defaultWidth: 900,
  fixedWidth: false,
});

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 300,
  spacer: 10,
});

function ContentComponent({ selectedGenre, movies }: ContentProps) {
  const cellRenderer: CellRenderer = ({ index, key, parent, style }) => {
    const movie = movies[index];

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div key={key} style={style}>
          <MovieCard
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        </div>
      </CellMeasurer>
    );
  };

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          <Masonry
            autoHeight
            cellCount={movies.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={600}
            width={900}
          />
          {/* {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))} */}
        </div>
      </main>
    </div>
  );
}

export const Content = memo(ContentComponent);
