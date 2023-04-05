import { useState } from "react";

function GithubSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://api.github.com/search/users?q=${query}`
    );
    const data = await response.json();
    const users = data.items.map((item) => ({
      name: item.login,
      link: item.html_url,
      avatar: item.avatar_url,
    }));
    setUsers(users);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a GitHub username:</label> <br></br>
          <input type="text" value={query} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {users.map((user) => (
        <UserCard key={user.name} user={user} />
      ))}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="usercard">
      <h2>Username: {user.name}</h2>
      <img src={user.avatar} alt={user.name} />
      <h4>Link to profile: <a href={user.link}>{user.link}</a></h4>
    </div>
  );
}

export default GithubSearch;