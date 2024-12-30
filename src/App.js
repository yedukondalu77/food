import { BrowserRouter, Route, Routes } from "react-router";
import FoodRecipe from "./Components/FoodRecipe";

function App() {
  return (
    <div className="App" style={{backgroundColor:'#EBEDF4'}}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<FoodRecipe/>}/>
      

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
