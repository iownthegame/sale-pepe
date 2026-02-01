# SalePepe

### *Your Personal Kitchen Command Center*

SalePepe is a lightweight, home-focused app designed to answer the age-old question: **"What's for dinner?"** It helps you browse your favorite recipes, instantly build a shopping list, and quickly save new inspiration you find online without the manual data entry.

## How to use SalePepe every day

### 1. Decide what to cook

Search through your existing library of recipes.

### 2. Make your Grocery List

Found the dish you like? Add the ingredients to your list with one click.

### 3. Import New Recipe

When you find a recipe on Instagram, a blog, or a random text from a friend. Paste the messy text or URL, and the AI extracts the ingredients and steps for you in a JSON format.

#### System Diagram
```mermaid
graph TD
    %% User and Interface
    User((User)) --> UI[Next.js App Interface]

    %% Main Application logic
    subgraph App_Core [SalePepe Application]
        UI --> Context[Grocery & Recipe Context]
        Context <--> Cache[(Browser Local Storage)]
        UI --> Kitchen[Test Kitchen / Ingestor]
    end

    %% Data Sources
    subgraph Data_Layer [Data Layer]
        Static[(recipes.json)] --> UI
        Kitchen -.->|Verified JSON| Static
    end

    %% External Services
    subgraph External [External Services]
        Kitchen -->|Prompt| Gemini[Google Gemini AI]
        Gemini -->|JSON Output| Kitchen
        UI --- GH[GitHub Pages Hosting]
    end

    %% Styling
    style Gemini fill:#4285F4,color:#fff
```

#### User workflow
```mermaid
sequenceDiagram
    autonumber
    actor User as Home Chef
    participant UI as SalePepe App
    participant Storage as Local Storage

    User->>UI: Browse recipe gallery
    User->>UI: Select "What to cook today"
    UI->>UI: Open Recipe Details
    User->>UI: Click "Add to Grocery List"
    UI->>Storage: Save ingredients
    UI->>UI: Sort items by Store Category
    Note over User, UI: At the Store
    User->>UI: Open Grocery List
    User->>UI: Check off items while shopping
```

#### Developer workflow

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant UI as Test Kitchen
    participant AI as Gemini Engine
    participant File as recipes.json

    Dev->>UI: Access /dev/tools
    Dev->>UI: Paste messy recipe text
    UI->>AI: Request structured parse
    AI-->>UI: Return formatted JSON
    UI->>UI: Render preview for validation
    Dev->>File: Copy JSON to static data file
    Note over Dev, File: New recipe is now available for all users
```

## Quick Setup

To use the AI importer, add your Google AI key to a file named `.env.local`:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

Install the project on your machine. Run the command below and open your browser to `localhost:3000`:

```bash
npm install
npm run dev
```
