# Launchpad Toggle

A free and open source macOS application to toggle between the Classic Launchpad and the new Tahoe Apps experience.

## Download

**[Download LaunchpadToggle-0.1.0-arm64.dmg](https://github.com/aramb-dev/launchpad-toggle/releases/download/v0.1/LaunchpadToggle-0.1.0-arm64.dmg)**

- **Requirements**: macOS Tahoe (macOS 15+)
- **Architecture**: Apple Silicon (ARM64)
- **Size**: ~50MB
- **License**: Free and open source

## Features

- **One-Click Toggle**: Switch between Classic Launchpad and Tahoe Apps instantly
- **Automatic Backups**: Creates timestamped backups before making any changes
- **Restart Guidance**: Clear prompts to restart for changes to take effect
- **Safe Operation**: Modifies only the SpotlightUI feature flag with proper backups
- **Native Design**: Liquid-glass visuals with Apple-like polish
- **Free & Open Source**: MIT licensed with source code available

## How It Works

1. **Detection**: Reads the SpotlightUI feature flag to determine current state
2. **Backup**: Creates a timestamped backup at `/Library/Preferences/FeatureFlags/Domain/SpotlightUI.plist.bak-{timestamp}`
3. **Toggle**: Safely modifies or removes the feature flag
4. **Restart**: Prompts you to restart for system-wide changes

## Important Note

**Spotlight Caveat**: Enabling Classic Launchpad will also revert the modern Spotlight to its older version. For enhanced search functionality, consider using [Raycast](https://raycast.com/?via=abdur-rahman) as a powerful alternative.

## Development

### Prerequisites

- Node.js 18+
- macOS Tahoe or later

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aramb-dev/launchpad-toggle.git
   cd launchpad-toggle
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run in development**:

   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

### Project Structure

```
├── main.js           # Main Electron process
├── preload.js        # Preload script for security
├── renderer/         # Frontend UI
├── website/          # Marketing website (Vite + Tailwind)
└── .github/          # GitHub Actions for deployment
```

## Building

The app uses electron-builder with Apple Developer ID signing:

```bash
npm run build:mac
```

Requires proper code signing certificates in your keychain.

## Website

The marketing website is built with Vite and Tailwind CSS v4. It's automatically deployed to GitHub Pages via GitHub Actions.

- **Live Site**: https://aramb-dev.github.io/launchpad-toggle/
- **Source**: `website/` directory

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/aramb-dev/launchpad-toggle/issues)
- **Discussions**: [GitHub Discussions](https://github.com/aramb-dev/launchpad-toggle/discussions)
- **Star this repo** if you find it useful!
