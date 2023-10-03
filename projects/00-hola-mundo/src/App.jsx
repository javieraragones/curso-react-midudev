import { React } from "react";
import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard.jsx";

export function App() {
  return (
    <section className="App">
      <TwitterFollowCard initialIsFollowing userName="midudev">
        Miguel Ángel Durán
      </TwitterFollowCard>
      <TwitterFollowCard userName="midudev">
        Miguel Ángel Durán
      </TwitterFollowCard>
    </section>
  );
}
