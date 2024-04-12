function UserProfilePage(props) {
  return <h1>Hello, {props.username}</h1>;
}

export default UserProfilePage;

// ═════════════════════════ GETSERVERSIDEPROPS ══════════════════════
export async function getServerSideProps(context) {
  return {
    props: {
      username: "MIC",
    },
  };
}
