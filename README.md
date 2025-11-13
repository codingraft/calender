# Calendar

A calendar application built with React.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

## Features

- Monthly calendar view
- Navigate between months
- Display events from JSON file
- Event details modal
- Time conflict detection

## Event Format

Events are stored in `src/data/events.json`:

```json
{
  "id": 1,
  "title": "Event Title",
  "date": "2025-11-13",
  "startTime": "10:00",
  "endTime": "11:00",
  "color": "#3b82f6"
}
```

## Tech Stack

- React
- dayjs
- CSS
