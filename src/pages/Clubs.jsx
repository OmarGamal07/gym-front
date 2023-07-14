import React, { useEffect, useState } from "react";
import { FaLocationArrow, FaArrowDown, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetClubsHandler } from "../apis/user/GetClubs";
import { SearchClubNameHandler } from "../apis/user/SearchByName";
import { NearbyClubsHandler } from "../apis/user/NearbyFilter";
import { Backdrop, CircularProgress } from "@mui/material";
const Clubs = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [filter, setFilter] = useState([]);
  const [sortedData, setSortedData] = useState();
  const [nearbyResults, setNearbyResults] = useState([]);
  const stateClubs = useSelector((state) => state.GetClubs);
  const stateSearch = useSelector((state) => state.SearchName);
  const stateNearby = useSelector (state => state.NearbyClubsName)
  const lat = localStorage.getItem("lat");
  const long = localStorage.getItem("long");
  useEffect(() => {
    dispatch(GetClubsHandler()).then((res) => {
      if (res.payload.data) {
        setClubs(res.payload.data.Clubs);
        
      }
    });
  }, [dispatch]);

  const handleSearchByName = () => {
    dispatch(SearchClubNameHandler({ search })).then((res) => {
      if (res.payload.data) {
        setClubs([]);
        if (res.payload.data.Clubs.length !== 0) {
          setResults(res.payload.data.Clubs);
        } else {
          setResults("");
        }
      }
    });
  };

  const handleSort = (event) => {
    const option = event.target.value;
    setFilter(option);
    switch (option) {
      case "الاحدث":
        setResults([]);
        setClubs(
          [...clubs].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        break;
      case "الاقدم":
        setResults([]);
        setClubs(
          [...clubs].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );
        break;
      default:
        setClubs(clubs);
        break;
    }
  };
  const handleLocation = () => {
    dispatch(NearbyClubsHandler({ lat, long })).then((res) => {
      if (res.payload.data) {
        setClubs([]);
        setNearbyResults([]);
        setResults([]);
        setNearbyResults(res.payload.data.Clubs);
      } else {
        setNearbyResults("");
      }
    });
  };
  return (
    <>
      <div className="flex flex-row p-5 md:justify-around justify-between items-center">
        <div className=" md:flex-1 flex-2 flex gap-5 items-center justify-center">
          <select
            value={filter}
            onChange={handleSort}
            className="text-xl border-2 border-gray-500  text-black px-3 py-1 rounded-xl flex items-center text-right "
          >
            <option defaultChecked>عرض</option>
            <option>الاحدث</option>
            <option>الاقدم</option>
          </select>
          <FaLocationArrow
            className="text-4xl border-2 border-gray-500  text-black p-1 rounded-xl cursor-pointer sm:flex"
            onClick={() => handleLocation()}
          />
        </div>
        {stateClubs.loading || stateSearch.loading || stateNearby.loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={stateClubs.loading || stateSearch.loading || stateNearby.loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchByName();
            }}
            className="flex-1 flex justify-start"
          >
            <button
              type="submit"
              className="md:text-2xl text-md border-2 border-black  text-black  px-2 rounded-xl cursor-pointer mx-1  transition-all hover:bg-black hover:text-white"
            >
              <FaSearch />
            </button>
            <input
              required
              placeholder="... ابحث عن"
              className="border-2 border-black rounded-md px-3 py-2 md:text-xl text-md md:w-3/4 w-full text-right"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
        )}
      </div>
      <div className="grid relative lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-10 items-center justify-items-center mt-10 mb-5 h-full overflow-hidden p-5 bg-slate-100 min-h-screen">
        {stateClubs.data.Clubs ? (
          clubs.map((club) => {
            return (
              <div
                className="flex flex-col border-solid  justify-between items-center w-full h-full   rounded-md bg-white shadow-lg "
                key={club._id}
              >
                <div className="h-1/2">
                  <img
                    src={club.logo}
                    alt="img"
                    className="w-full h-full p-5 "
                  />
                </div>
                <span className="text-2xl text-black p-2 h-fit">
                  {club.name}
                </span>
                <span className="text-2xl text-gray-600 p-2 w-full break-words text-right">
                  {club.description}
                </span>
                <button
                  className="text-xl text-white border-2 border-white bg-black px-7 py-2 w-full hover:bg-white hover:text-black hover:border-2 hover:border-black  transition-all"
                  onClick={() =>
                    (window.location.pathname = `/clubs/${club._id}`)
                  }
                >
                  قم بزيارته
                </button>
              </div>
            );
          })
        ) : (
          <div className="absolute text-2xl text-red-700 ">
            لا توجد نوادي الان
          </div>
        )}
        {results ? (
          results.map((club) => {
            return (
              <div
                className="flex flex-col border-solid  justify-between items-center w-full h-full   rounded-md bg-white shadow-lg "
                key={club._id}
              >
                <div className="h-1/2">
                  <img
                    src={club.logo}
                    alt="img"
                    className="w-full h-full p-5 "
                  />
                </div>
                <span className="text-2xl text-black p-2 h-fit">
                  {club.name}
                </span>
                <span className="text-2xl text-gray-600 p-2 w-full break-words text-right">
                  {club.description}
                </span>
                <button
                  className="text-xl text-white border-2 border-white bg-black px-7 py-2 w-full hover:bg-white hover:text-black hover:border-2 hover:border-black  transition-all"
                  onClick={() =>
                    (window.location.pathname = `/clubs/${club._id}`)
                  }
                >
                  قم بزيارته
                </button>
              </div>
            );
          })
        ) : (
          <div className="absolute text-2xl text-red-700 ">
            {results === "" ? "لا توجد نوادي الان" : ""}
          </div>
        )}
        {nearbyResults ? (
          nearbyResults.map((club) => {
            return (
              <div
                className="flex flex-col border-solid  justify-between items-center w-full h-full   rounded-md bg-white shadow-lg "
                key={club._id}
              >
                <div className="h-1/2">
                  <img
                    src={club.logo}
                    alt="img"
                    className="w-full h-full p-5 "
                  />
                </div>
                <span className="text-2xl text-black p-2 h-fit">
                  {club.name}
                </span>
                <span className="text-2xl text-gray-600 p-2 w-full break-words text-right">
                  {club.description}
                </span>
                <button
                  className="text-xl text-white border-2 border-white bg-black px-7 py-2 w-full hover:bg-white hover:text-black hover:border-2 hover:border-black  transition-all"
                  onClick={() =>
                    (window.location.pathname = `/clubs/${club._id}`)
                  }
                >
                  قم بزيارته
                </button>
              </div>
            );
          })
        ) : (
          <div className="absolute text-2xl text-red-700 ">
            {nearbyResults === "" ? "لا توجد نوادي قريبه منك" : ""}
          </div>
        )}
      </div>
    </>
  );
};

export default Clubs;
