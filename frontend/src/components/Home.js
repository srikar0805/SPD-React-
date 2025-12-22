import NavBar from "./NavBar";
import Cards from "./Cards";
import CardGroup from "react-bootstrap/CardGroup";
import { FooterContainer } from "../containers/footer";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="home">
        <div className="content">
          <span className="homeh2">
            <h2>Stock Portfolio Dashboard</h2>
          </span>
          <h1>
            Professional Portfolio Management
          </h1>
          <p>
            Track your investments, analyze performance, and make data-driven decisions with our advanced dashboard.
            Designed for serious traders.
          </p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </div>
      </div>

      <div className="features-section" style={{ padding: '4rem 2rem', backgroundColor: 'var(--bg-color)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
          Features and Advantages
        </h1>
        <CardGroup style={{ gap: '2rem', justifyContent: 'center' }}>
          <Cards
            text="Manage transactions from multiple Demat Accounts in one unified dashboard."
            title="Unified Portfolio"
            img="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80"
          />

          <Cards
            text="Real-time alerts on profit/loss to keep you ahead of the market."
            title="Real-time Alerts"
            img="https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=600&q=80"
          />

          <Cards
            text="Advanced statistical analytics and performance metrics for your investments."
            title="Deep Analytics"
            img="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=600&q=80"
          />
        </CardGroup>
      </div>

      <FooterContainer />
    </div>
  );
};

export default Home;
