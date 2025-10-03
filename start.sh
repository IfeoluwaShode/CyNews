#!/bin/bash

echo "Starting CYNews..."
echo

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Error: Dependencies not installed. Please run ./install.sh first."
    exit 1
fi

echo "Starting the development server..."
echo "The application will open in your default browser at http://localhost:3000"
echo
echo "Press Ctrl+C to stop the server"
echo

npm start
