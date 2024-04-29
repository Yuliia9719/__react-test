import { render, screen } from "@testing-library/react";
import UserProfile from "../components/UserProfile";

describe("UserProfile", () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Leanne Graham",
            email: "Sincere@april.biz"
          },
          {
            id: 2,
            name: "Ervin Howell",
            email: "bqjZG@example.com"
          }
        ])
    });
    globalThis.fetch = fetchMock;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("fetches and loads users", async () => {
    render(<UserProfile />);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const names = await screen.findAllByText(/Leanne Graham/i);
    expect(names.length).toBeGreaterThan(0);

    const emails = await screen.findAllByText(/Sincere@april.biz/i);
    expect(emails.length).toBeGreaterThan(0);
  });
});
