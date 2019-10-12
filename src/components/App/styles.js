const styles = theme => ({
  app: {
    textAlign: "center",
    overflow: "hidden",
  },
  logo: {
    height: "20vmin"
  },
  header: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
  button: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(4),
    fontWeight: "bold",
  },
});

export default styles;
