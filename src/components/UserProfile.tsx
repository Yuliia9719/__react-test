import { useEffect, useState } from "react";

export interface UserProfileInterface {
  name: string;
  id: number;
  email: string;
}
function UserProfile() {
  const [users, setUsers] = useState<UserProfileInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        const data: UserProfileInterface[] = await response.json();

        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>User profile</h1>
      {isLoading && <h4>Loading data...</h4>}
      {error &&
        !users.length &&
        <h5>
          {error}
        </h5>}

      <ul>
        {users.map((user: UserProfileInterface) =>
          <li key={user.id}>
            <p>
              {user.id}
            </p>
            <p>
              {user.name}
            </p>
            <p>
              {user.email}
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}
export default UserProfile;
