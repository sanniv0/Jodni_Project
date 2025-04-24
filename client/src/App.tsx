import { Switch, Route } from "wouter";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import SellProductPage from "@/pages/SellProductPage";
import MyOrdersPage from "@/pages/MyOrdersPage";
import ProfilePage from "@/pages/ProfilePage";
import ExplorePage from "@/pages/ExplorePage";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/product/:id">
        {params => <ProductDetailPage params={params} />}
      </Route>
      <Route path="/explore" component={ExplorePage} />
      <Route path="/sell" component={SellProductPage} />
      <Route path="/orders" component={MyOrdersPage} />
      <Route path="/profile" component={ProfilePage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
