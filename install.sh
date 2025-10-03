#!/bin/bash

echo "Installing CYNews dependencies..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not available. Please ensure Node.js is properly installed."
    exit 1
fi

echo "Node.js version:"
node --version
echo
echo "npm version:"
npm --version
echo

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies."
    exit 1
fi

echo
echo "Installation completed successfully!"
echo
echo "To start the development server, run:"
echo "  npm start"
echo
echo "Don't forget to set up your NewsAPI key in a .env file:"
echo "  REACT_APP_NEWS_API_KEY=your_api_key_here"
echo
