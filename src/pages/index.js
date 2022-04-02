import Navbar from "../components/Navbar";
import Body from "../components/Body";

const homeStyle = {
  background: "#292929",
  minHeight: "100vh",
  paddingBottom: "15px",
};

function Home({ user }) {
  return (
    <div style={homeStyle}>
      <Navbar user={user} />
      <Body userStationCode={user.station_code} />
    </div>
  );
}

export async function getStaticProps() {
  const user = await (
    await fetch("https://assessment.api.vweb.app/user")
  ).json();

  return {
    props: {
      user,
    },
  };
}

export default Home;
