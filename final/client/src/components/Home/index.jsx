import { Helmet } from "react-helmet";
import Hero from "../Hero";
import Awesome from "../Awesome";
import BestSeller from "../BestSeller";
import Subcription from "../Subcription";
import TopFooter from "../TopFooter";

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
      </Helmet>

      <Hero />
      <Awesome />
      <BestSeller />
      <Subcription />
      <TopFooter />
    </>
  );
};

export default Home;
