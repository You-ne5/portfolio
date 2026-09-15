## What it does

Paste a Twitch stream link. Get every clip from that stream, ranked from most to least viewed.

For each clip:

- View count
- Clip link
- Timecode in the original stream, with a jump-to link
- Start and end times
- Clip creator

## Why it's useful

- **Editors:** the crowd already picked the highlights. Start editing a best-of instead of scrubbing a 6-hour VOD.
- **Streamers:** see which moments your viewers actually clipped, and turn them into shorts and recaps.
- **Managers:** pull a ranked list for any stream in seconds, no manual browsing.

## How it works

- Python script on top of the Twitch REST API.
- Fetches every clip tied to a stream, sorts by views, and prints a clean table.
- Timecodes are calculated back to the original VOD, so each clip links to its exact moment.

![Ranked clip table](output.png)
