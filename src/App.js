import React from 'react';
import { AppBar, Toolbar, Container , Typography} from "@material-ui/core"
import Routes from './routes';


function App() {
  return (
    <>
      <header>
        <AppBar position="fixed">
          <Toolbar style={{display: "flex", justifyContent: "center"}}>
            <Typography variant="h5">  EPG Blog - Teste Sossego </Typography>
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
