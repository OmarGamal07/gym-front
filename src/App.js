import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Clubs from "./pages/Clubs";
import { useEffect, useState } from "react";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import Club from "./pages/Club";
import Pay from "./pages/Pay";
import ClubSub from "./pages/ClubSub";
import Questions from "./pages/Questions";
import NotFound from "./pages/NotFound";
import AddClub from "./pages/Admin/AddClub";
import Blog from "./pages/Admin/Blog";
import AddOpinion from "./pages/Admin/Opinion";

import AllClubs from "./pages/Admin/AllClubs";
import AllBlogs from  "./pages/Admin/AllBlogs";
import AllOpinions from "./pages/Admin/AllOpinions";
import Img from "./pages/Admin/Img";
import Uses from "./pages/Admin/Uses";
import Socail from "./pages/Admin/Socail";
import Payments from "./pages/Admin/Payments";
import Reports from "./pages/Admin/Reports";
import Complaints from "./pages/Admin/Complaints";
import UsersQuestions from "./pages/Admin/UsersQuestions";
import AppImgs from "./pages/Admin/AppImgs";
import WebImgs from "./pages/Admin/WebImgs";
import Cookies from "universal-cookie";
import EditClub from "./pages/Admin/EditClub";
import EditBlog from "./pages/Admin/EditBlog";
import EditOpinion from "./pages/Admin/EditOpinion";
import EditPersonalClub from "./pages/Club/EditClub";
import ClubReport from "./pages/Club/ClubReport";
import AddSubscribes from "./pages/Club/AddSubscribes";

import VerifyPlayer from "./pages/Club/VerifyPlayer";
import PlayerCard from "./pages/Club/PlayerCard";
import { useDispatch } from "react-redux";
import { GetRulesHandler } from "./apis/rules";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Privacy from "./pages/Admin/Privacy";
import Wallet from "./pages/Admin/Wallet";
import Blogs from "./pages/Blogs";
import Opinions from "./pages/Opinions";
import BlogUser from "./pages/Blog";

function App() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  const [activeBar, setActiveBar] = useState("/");
  const cookies = new Cookies();
  const [bar, setBar] = useState(false);
  const [rules, setRules] = useState(false);
  const [newLogo, setNewLogo] = useState();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem("lat", latitude);
          localStorage.setItem("long", longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);
  useEffect(() => {
    // Fetch the rules from the backend
    dispatch(GetRulesHandler()).then((res) => {
      if (res.payload) {
        // Get the main logo URL from the rules
        const rules = res.payload.data.rules;
        const logoUrl = rules.find(
          (rule) => rule.type === "main_logo"
        )?.main_logo;

        // Update the newLogo state
        setNewLogo(logoUrl);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // Update the favicon URL when the newLogo state changes
    if (newLogo) {
      const favicon = document.querySelector("link[rel='icon']");
      favicon.href = newLogo + "?v=" + Date.now();
    }
  }, [newLogo]);
  useEffect(() => {
    if (window.location.pathname.includes("admin")) setActiveBar("");
    dispatch(GetRulesHandler()).then((res) => {
      if (res.payload.data) setRules(res.payload.data.rules);
    });
  }, []);
  return (
    <div className="App ">
      <Navbar
        rules={rules}
        bar={bar}
        setBar={setBar}
        setActive={setActive}
        setActiveBar={setActiveBar}
        activeBar={activeBar}
        active={active}
      />
      <Routes>
        <Route path="/" element={<Home bar={bar} />} />
        {!cookies.get("_auth_token") && (
          <>
            <Route path="/auth/reg" element={<Register />} />
            <Route
              path="/auth/login"
              element={
                <Login setActive={setActive} setActiveBar={setActiveBar} />
              }
            />
          </>
        )}

        <Route path="/clubs" element={<Clubs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogUser />} />
        <Route path="/opinions" element={<Opinions />} />
        <Route path="/clubs/:id" element={<Club />} />
        <Route path="/pay/:id" element={<Pay />} />
        {cookies.get("payment") && (
          <>
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </>
        )}

        <Route
          path="/subscribe/:club_id"
          element={<ClubSub  />}
        />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/questions" element={<Questions />} />

        <Route path="/admin/add_club" element={<AddClub />} />
        <Route path="/admin/blog" element={<Blog />} />
        <Route path="/admin/opinion" element={<AddOpinion />} />
        <Route
          path="/admin/edit_club/:id"
          element={<EditClub  />}
        />
        <Route
          path="/admin/edit_blog/:id"
          element={<EditBlog  />}
        />
        <Route
          path="/admin/edit_opinion/:id"
          element={<EditOpinion  />}
        />
        <Route
          path="/admin/clubs"
          element={<AllClubs  />}
        />
        <Route
          path="/admin/blogs"
          element={<AllBlogs  />}
        />
        <Route
          path="/admin/opinions"
          element={<AllOpinions  />}
        />
        {cookies.get("_auth_token") &&
        cookies.get("_auth_role") === "65100109105110" ? (
          <>
            <Route path="/admin/imgs" element={<Img />} />
            <Route path="/admin/uses" element={<Uses />} />
            <Route path="/admin/privacy" element={<Privacy />} />
            <Route path="/admin/wallet" element={<Wallet />} />
            <Route path="/admin/socail" element={<Socail />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/complaints" element={<Complaints />} />
            <Route path="/admin/questions" element={<UsersQuestions />} />
            <Route path="/admin/imgs/mop" element={<AppImgs />} />
            <Route path="/admin/imgs/web" element={<WebImgs />} />
          </>
        ) : cookies.get("_auth_token") &&
          cookies.get("_auth_role") === "9910811798" ? (
          <>
            <Route
              path="/club/edit"
              element={<EditPersonalClub />}
            />
            <Route path="/club/report" element={<ClubReport />} />
            <Route path="/club/subscribe" element={<AddSubscribes />} />
            <Route path="/club/verify_player" element={<VerifyPlayer />} />

            <Route
              path="/club/player/:code"
              element={<PlayerCard />}
            />
          </>
        ) : (
          ""
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer rules={rules} />
    </div>
  );
}

export default App;
