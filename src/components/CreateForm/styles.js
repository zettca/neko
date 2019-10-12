const styles = theme => ({
  paperino: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  textField: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    minWidth: '30vw',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  fab: {
    margin: theme.spacing(1),
    maxWidth: "10rem",
    
  },
});

export default styles;