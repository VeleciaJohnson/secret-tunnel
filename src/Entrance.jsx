import { useAuth } from "./AuthContext";

export default function Entrance() {
  const { signup, error } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("name").trim();

    if (!username) {
      return;
    }

    signup(username);
  }

  return (
    <>
      <h1>Cave Entrance</h1>

      <p>Your journey has brought you to the base of a rocky mountain.</p>

      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>

      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" required />
        </label>

        <button type="submit">Respond</button>
      </form>

      {error && <p role="alert">{error}</p>}
    </>
  );
}