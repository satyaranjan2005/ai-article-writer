# Article Optimizing Tool

## Overview
The Article Optimizing Tool is designed to help web developers and content creators optimize their articles for better readability and SEO performance. This tool analyzes the content and provides suggestions for improvements.

## Features
- **Blog Generation**: Generate a blog through a given title.
- **Content Optimization**: Optimize the generated or existing content for better readability and SEO.
- **TinyMCE Editor**: Edit your content using the integrated TinyMCE editor.

## Installation
To install the Article Optimizing Tool, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/article-optimizing-tool.git
    ```
2. Navigate to the project directory:
    ```bash
    cd article-optimizing-tool
    ```
3. Install the dependencies for both client and server:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

## API Keys

To use the Article Optimizing Tool, you need to generate API keys from TinyMCE and Google AI Studio. Follow the steps below to obtain and configure these keys:

### TinyMCE API Key
1. Go to the [TinyMCE API key registration page](https://www.tiny.cloud/get-tiny/).
2. Sign up or log in to your account.
3. Follow the instructions to create a new API key.
4. Copy the generated API key.

### Google AI Studio API Key
1. Visit the [Google AI Studio](https://ai.google/tools/studio/) website.
2. Sign in with your Google account.
3. Create a new project and enable the necessary APIs.
4. Generate an API key for your project.
5. Copy the generated API key.

### Configuration
1. Create a `.env` file in both the `client` and `server` directories if you haven't already.
2. Follow the `.env.example` files in each directory to add the necessary environment variables.
3. Add your TinyMCE and Google AI Studio API keys to the respective `.env` files.

Example `.env` file for the client:
```
VITE_TINYMCE_API_KEY=YOUR_TINYMCE_API_KEY
```

Example `.env` file for the server:
```
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
```

## Usage
To use the tool, run the following command:
```bash
npm start
```
Then, follow the on-screen instructions to analyze your article.

## Contact
For any questions or feedback, please contact us at [satyaranjannayak2005@gmail.com](mailto:satyaranjannayak2005@gmail.com).


