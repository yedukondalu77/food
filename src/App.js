import { BrowserRouter, Route, Routes } from "react-router";
import FoodRecipe from "./Components/FoodRecipe";
import ItemCard from "./Components/ItemCard";
function App() {
  return (
    <div className="App" style={{backgroundColor:'#EBEDF4'}}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<FoodRecipe/>}/>
        <Route path="/item" element={<ItemCard/>}/>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
