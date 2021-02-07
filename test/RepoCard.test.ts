/**
 * @jest-environment jsdom
 */

import { render, waitForElementToBeRemoved } from "@testing-library/svelte";
import fc from "fast-check";
import { randomRepo } from "./helper/repo";
import { resetDOM } from "./helper/dom";

import RepoCard from "../src";

// Mocking
import * as repo from "../src/util/repo";
jest.mock("../src/util/repo");
const fetchRepo = repo.default as jest.Mock;
beforeEach(() => {
  fetchRepo.mockReset();
});

it("renders the card correctly", async () => {
  await fc.assert(
    fc.asyncProperty(randomRepo(), async repo => {
      // Reset the DOM, to ensure a clean slate during fast-check.
      resetDOM();
      const slug = `thislooksfun/${repo.name}`;
      fetchRepo.mockResolvedValue(repo);

      const { getByTestId, queryByTestId } = render(RepoCard, { slug });

      // Loading
      const loading = getByTestId("loading");
      expect(loading).toBeInTheDocument();
      await waitForElementToBeRemoved(loading);
      expect(loading).not.toBeInTheDocument();

      // Render
      const name = getByTestId("repo-name");
      expect(name).toBeInTheDocument();
      expect(name.textContent).toEqual(repo.name);

      if (repo.isFork) {
        expect(getByTestId("fork")).toBeInTheDocument();
        const link = getByTestId("fork-link");
        expect(link).toBeInTheDocument();
        expect(link.getAttribute("href")).toEqual(repo.sourceUrl);
        expect(link.textContent).toEqual(repo.sourceName);
      } else {
        expect(queryByTestId("fork")).not.toBeInTheDocument();
      }

      if (repo.description) {
        const desc = getByTestId("description");
        expect(desc).toBeInTheDocument();
        expect(desc.textContent).toEqual(repo.description);
      } else {
        expect(queryByTestId("description")).not.toBeInTheDocument();
      }

      if (repo.language) {
        expect(getByTestId("language")).toBeInTheDocument();
        const lang = getByTestId("lang-name");
        expect(lang).toBeInTheDocument();
        expect(lang.textContent).toEqual(repo.language);
      } else {
        expect(queryByTestId("language")).not.toBeInTheDocument();
      }

      if (repo.stars > 0) {
        expect(getByTestId("stars")).toBeInTheDocument();
        const sc = getByTestId("star-count");
        expect(sc).toBeInTheDocument();
        expect(sc.textContent).toEqual(`${repo.stars}`);
      } else {
        expect(queryByTestId("stars")).not.toBeInTheDocument();
      }

      if (repo.forks > 0) {
        expect(getByTestId("forks")).toBeInTheDocument();
        const fc = getByTestId("fork-count");
        expect(fc).toBeInTheDocument();
        expect(fc.textContent).toEqual(`${repo.forks}`);
      } else {
        expect(queryByTestId("forks")).not.toBeInTheDocument();
      }
    })
  );
});

it("shows an error if the loading failed", async () => {
  await fc.assert(
    fc.asyncProperty(fc.string(), fc.string(), async (name, errMsg) => {
      // Reset the DOM, to ensure a clean slate during fast-check.
      resetDOM();
      const slug = `thislooksfun/${name}`;
      fetchRepo.mockRejectedValue(new Error(errMsg));

      const { getByTestId, queryByTestId } = render(RepoCard, { slug });

      // Loading
      const loading = getByTestId("loading");
      expect(loading).toBeInTheDocument();
      expect(loading.textContent).toEqual(`Loading card for ${slug}...`);
      await waitForElementToBeRemoved(loading);
      expect(loading).not.toBeInTheDocument();

      // Error message
      expect(getByTestId("failed")).toBeInTheDocument();

      if (errMsg) {
        const msg = getByTestId("errmsg");
        expect(msg).toBeInTheDocument();
        expect(msg.textContent).toEqual(errMsg);
      } else {
        expect(queryByTestId("errmsg")).not.toBeInTheDocument();
      }
    })
  );
});

// // Note: This is as an async test as we are using `fireEvent`
// it("changes button text on click", async () => {
//   const { getByText } = render(RepoCard, { name: "World" });
//   const button = getByText("Button");

//   // Using await when firing events is unique to the svelte testing library because
//   // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
//   await fireEvent.click(button);

//   expect(button).toHaveTextContent("Button Clicked");
// });
