const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        padding: "0 20px",
        backgroundImage: `url('https://png.pngtree.com/background/20230618/original/pngtree-assortment-of-social-media-app-logos-in-3d-rendered-squares-picture-image_3752002.jpg')`,
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'
      }}
    >
      <h1 style={{ textAlign: "center", backdropFilter: "blur(12px)" }}>
        Xoş gəlmisiniz. Zəhmət olmasa login və ya register olun
      </h1>
    </div>
  );
};

export default Home;
