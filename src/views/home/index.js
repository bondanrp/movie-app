import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Text, View, FlatList } from "react-native";
import SearchBar from "../../components/search-bar";
import MovieCard from "../../components/movie-card";
import { useDispatch } from "react-redux";
import api from "../../api";
import { hideLoading, showLoading } from "../../redux/reducer/loading";
import MovieDetail from "../../components/movie-detail";

export default function Home() {
  let dispatch = useDispatch();
  const [state, setState] = useState({
    query: "",
    input: "",
    results: [],
    selected: null,
    typing: false,
    page: 1,
    notFound: false,
  });
  useEffect(() => {
    if (state.input) {
      getData(true);
    }
  }, [state.query]);
  const getData = (isNewSearch) => {
    isNewSearch && dispatch(showLoading());
    let newPage = isNewSearch ? 1 : state.page + 1;
    let params = {
      query: state.query,
      page: newPage,
    };
    api
      .searchMovie(params)
      .then((res) => {
        if (isNewSearch && !res.data.results.length) {
          setState((prevState) => {
            return { ...prevState, notFound: true };
          });
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              page: newPage,
              notFound: false,
              results: isNewSearch
                ? res.data.results
                : [...prevState.results, ...res.data.results],
            };
          });
        }
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch(hideLoading());
      });
  };

  const getDetail = (result) => {
    dispatch(showLoading());
    api
      .getDetail(result.id)
      .then((res) => {
        dispatch(hideLoading());
        setTimeout(() => {
          setState((prevState) => {
            return { ...prevState, selected: res.data };
          });
        }, 500);
      })
      .catch((err) => {
        dispatch(hideLoading());
      });
  };
  const setQuery = () => {
    setState((prevState) => ({ ...prevState, query: state.input }));
  };

  const clear = () => {
    setState(() => {
      return {
        query: "",
        results: [],
        selected: null,
        typing: false,
        page: 1,
      };
    });
  };
  const closeModal = () => {
    setState((prevState) => {
      return { ...prevState, selected: null };
    });
  };
  const handleBackButtonClick = () => {
    setState((prevState) => {
      return { ...prevState, loading: false, selected: null };
    });
    return true;
  };

  return (
    <React.Fragment>
      <View style={styles.title}>
        <Text style={styles.titleText}>TMDb</Text>
      </View>
      <SearchBar
        setState={setState}
        state={state}
        clear={clear}
        search={setQuery}
      />
      {state.query ? (
        state.results.length ? (
          <FlatList
            scrollEnabled={!state.typing}
            numColumns={3}
            columnWrapperStyle={styles.columnWrapper}
            data={state.results}
            style={styles.results}
            renderItem={(item, index) => MovieCard({ item, index, getDetail })}
            initialNumToRender={12}
            onEndReachedThreshold={20}
            onEndReached={() => {
              !state.typing && getData(false);
            }}
          ></FlatList>
        ) : state.notFound ? (
          <View style={styles.noContent}>
            <Text>
              We could not find a movie title that contains "{state.query}"
            </Text>
          </View>
        ) : null
      ) : (
        <View style={styles.noContent}>
          <Text>Start searching for movies!</Text>
        </View>
      )}
      <MovieDetail
        closeModal={closeModal}
        data={state.selected}
        handleBackButtonClick={handleBackButtonClick}
      />
    </React.Fragment>
  );
}
