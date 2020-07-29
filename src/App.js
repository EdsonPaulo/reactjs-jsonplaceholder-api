import React from 'react';
import { AppBar, Toolbar, Container , Typography} from "@material-ui/core"
import Routes from './routes';


function App() {
  return (
    <>
      <header>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h5"> EPG Blog </Typography>
          </Toolbar>
        </AppBar>
      </header>

      <Container maxWidth="md" className="main">
        <Routes />
      </Container>

      <footer>
        <span>2020 EPG Blog By EdsonPaulo</span>
      </footer>
    </>
  );
}

export default App;
