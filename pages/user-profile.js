function UserProfilePage(props) {
  return <h1>Hello, {props.username}</h1>;
}

export default UserProfilePage;

// ═════════════════════════ GETSERVERSIDEPROPS ══════════════════════
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  // console.log("🪚 req:", req);
  // console.log("🪚 res:", res);
  // console.log("🪚 Server Side Code");

  return {
    props: {
      username: "MIC",
    },
  };
}
