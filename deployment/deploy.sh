#!/bin/bash

# AlgorianAI Deployment Script for AWS EC2
# This script automates the deployment of both frontend and backend

set -e  # Exit on error

echo "=========================================="
echo "AlgorianAI Deployment Script"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/var/www/algorianai"
BACKEND_DIR="$PROJECT_DIR/main"
FRONTEND_DIR="$PROJECT_DIR/frontend"
VENV_DIR="$PROJECT_DIR/venv"

# Check if running as root or with sudo
if [ "$EUID" -eq 0 ]; then 
    echo -e "${RED}Please do not run this script as root${NC}"
    exit 1
fi

echo -e "${GREEN}Step 1: Pulling latest code from GitHub...${NC}"
cd $PROJECT_DIR
git pull origin main

echo -e "${GREEN}Step 2: Updating Backend...${NC}"
cd $BACKEND_DIR

# Activate virtual environment
source $VENV_DIR/bin/activate

# Install/Update Python dependencies
echo "Installing Python dependencies..."
pip install -r ../requirements.txt

# Run migrations
echo "Running database migrations..."
python manage.py migrate --settings=main.production_settings

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --settings=main.production_settings

# Deactivate virtual environment
deactivate

echo -e "${GREEN}Step 3: Building Frontend...${NC}"
cd $FRONTEND_DIR

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Build frontend
echo "Building frontend..."
npm run build

echo -e "${GREEN}Step 4: Restarting services...${NC}"
sudo systemctl restart gunicorn
sudo systemctl restart nginx

echo -e "${GREEN}Step 5: Checking service status...${NC}"
sudo systemctl status gunicorn --no-pager
sudo systemctl status nginx --no-pager

echo -e "${GREEN}=========================================="
echo -e "Deployment completed successfully!"
echo -e "==========================================${NC}"
