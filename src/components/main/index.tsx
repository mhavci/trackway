import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MdNotifications, MdPerson, MdStar, MdAdd } from "react-icons/md";
import { connect } from "react-redux";
import { fetchMovieAsync } from "../../store/actions/movieActions";
import { BASE_IMAGE_URL } from '../../configs/webApi';

import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

import '../../styles/components/container.scss';


const override = css`
  display: block;
  margin: 20% auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Movie = {
  title: string
  vote_average: number
}

interface IProps {
  fetchData: () => Promise<IGotPeopleAction>;
  movies: IPerson[];
  moviesFetched: boolean;
}

export const Main: FC<IProps> = ({
  fetchData,
  movies,
  moviesFetched,
  isFetching,
  error,
}) => {
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container">
      <div className="container squeeze push--top">

        <Choose>
          <When condition={moviesFetched}>
          <ul className="card-list">
            <For each="item" index="idx" of={movies}>
              <li className="card-list-item" key={idx}>
                <div className="card">
                  <div className="card-image">
                    <img src={BASE_IMAGE_URL+item.poster_path} alt="placeholder" />
                  </div>
                  <div className="card-content">
                    <div className="card-content-row">
                      <span className="ratings"><MdStar /> {item.vote_average}</span>
                    </div>
                    <div className="card-content-row">
                      <h3 className="card-heading">{item.title}</h3>
                      {/* <p>{item.overview}</p> */}
                    </div>
                    <div className="card-content-row">
                      <button className="btn btn-sm primary"><MdAdd />Watchlist</button>
                    </div>
                  </div>
                </div>
              </li>
            </For>
          </ul>
          </When>
          <When condition={isFetching}>
            <SyncLoader
              css={override}
              size={50}
              color={"#fff"}
              loading={isFetching}
            />
          </When>
          <Otherwise>
            <span>{error}</span>
          </Otherwise>
        </Choose>


      </div>
    </div>
  );

};

function mapStateToProps(state) {
  return {
    movies: state.movie.movies,
    moviesFetched: state.movie.moviesFetched,
    isFetching: state.movie.isFetching,
    error: state.movie.error
  };
}



const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    fetchData: () =>
      dispatch(fetchMovieAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
