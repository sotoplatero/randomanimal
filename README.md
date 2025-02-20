# Random Animal Generator

A random animal generator that uses the iNaturalist API to display detailed information about different species based on their taxonomy.

## Features

- **Taxonomy Exploration**: Browse through different taxonomic groups (Birds, Mammals, etc.) and discover random animals within each group.
- **Detailed Information**: For each animal, displays:
  - Common and scientific names
  - High-quality image
  - Conservation status (extinct, threatened, endemic)
  - Taxonomic rank
  - Wikipedia summary
  - Link for more information

## Technologies

- [SvelteKit](https://kit.svelte.dev/) - Web framework
- [iNaturalist API](https://api.inaturalist.org/v1/) - Biodiversity data source
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [DaisyUI](https://daisyui.com/) - UI Components

## Installation

```bash
# Clone the repository
git clone https://github.com/sotoplatero/randomanimal.git

# Install dependencies
cd randomanimal
npm install

# Start development server
npm run dev

# Or start and open in browser
npm run dev -- --open
```

## Usage

1. Visit the home page to see random animals from any taxonomy
2. Navigate to `/taxonomy/[taxo]` to see animals from a specific taxonomy
   - Example: `/taxonomy/Aves` to see birds
   - Example: `/taxonomy/Mammalia` to see mammals

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- Data and images provided by [iNaturalist](https://www.inaturalist.org/)
- Developed by [sotoplatero](https://github.com/sotoplatero)
