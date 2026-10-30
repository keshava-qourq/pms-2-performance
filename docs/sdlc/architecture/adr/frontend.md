<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-10-30

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Angular

## Decision Outcome

Chosen option: React 19, because Renders the form-heavy, role-aware interface here — dynamic goal/key-result forms, feedback forms, three role dashboards with charts and CSV upload — as a responsive SPA usable on desktop and mobile browsers.

## Consequences

As a client-rendered SPA it needs explicit route guards and token handling; acceptable for an internal tool and widely staffable.
<!-- sdlc:auto:end adr -->