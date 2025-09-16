# Launchpad Toggle

A simple Electron application to toggle between the Classic Launchpad and the new Tahoe Apps experience in macOS.

## MVP Features

- **Detects Current State**: Automatically detects whether you are using Classic Launchpad or Tahoe Apps.
- **One-Click Toggle**: Switch between Classic Launchpad and Tahoe Apps with a single click.
- **Automatic Backups**: Creates a timestamped backup of your settings before making any changes.
- **Restart Prompt**: Suggests a restart after applying changes to ensure they take effect.
- **Error Handling**: Displays clear error messages if administrator permissions are denied or if something goes wrong.

## Installation and Usage

1.  **Install Dependencies**:
    Open your terminal and run the following command to install the required packages.

    ```bash
    npm install
    ```

2.  **Run the Application**:
    After the installation is complete, run the following command to start the application.
    ```bash
    npm run dev
    ```

> **Note**: This is a development version (v0.1). For distribution, the application would need to be codesigned and notarized.
