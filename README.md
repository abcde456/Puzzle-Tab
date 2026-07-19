# Puzzle Tab

I wanted to make a unique new tab page for the stardance mission, and I thought, why don't I make one with puzzles that could be played right on the page?

My goal for Puzzle Tab is to add on more puzzles and more features in the future, with ones such as soduko, chess puzzles, etc...

Try it out now at: https://abcde456.github.io/Puzzle-Tab/

## How It Works

Right now, the tools I mainly used for this are:

- Vite
- React
- DuckDuckGo Search Query API
- Cloudflare Workers

I used Vite + React for the actual web page itself, and then DuckDuckGo API for the search suggestions that pop up when you type in the search bar.

I wouldn't be able to simply call the API from the client, as CORS would block it, and when it is hosted on github pages, it is purely static, meaning CORS would still block it. The only way around this was to have a server call it, and that's why I used cloudflare workers as a proxy for the API call.

![Diagram](readme-assets\diagram.svg#gh-light-mode-only)
![Diagram](readme-assets\diagram-darkmode.svg#gh-dark-mode-only)

# Future Features Planned:

- Add a quicklinks bar below search bar for common websites (also allowing custom)
- Add changing color and pattern of background with settings
- Add first puzzles (Planned to be chess puzzles and soduko)
- Add a weather summary
