#!/bin/bash

# AlgorianAI Initial Setup Script for AWS EC2
# This script sets up the server environment for the first time

set -e  # Exit on error

echo "=========================================="
echo "AlgorianAI Initial Server Setup"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/var/www/algorianai"
DOMAIN="your-domain.com"  # Change this to your domain

echo -e "${GREEN}Step 1: Updating system packages...${NC}"
sudo apt update
sudo apt upgrade -y

echo -e "${GREEN}Step 2: Installing required packages...${NC}"
sudo apt install -y python3 python3-pip python3-venv nginx git curl

echo -e "${GREEN}Step 3: Installing Node.js and npm...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo -e "${GREEN}Step 4: Creating project directory...${NC}"
sudo mkdir -p $PROJECT_DIR
sudo chown -R $USER:www-data $PROJECT_DIR

echo -e "${GREEN}Step 5: Cloning repository from GitHub...${NC}"
cd /var/www
git clone https://github.com/aliabbas776/AlgorionAI.git algorianai

echo -e "${GREEN}Step 6: Setting up Python virtual environment...${NC}"
cd $PROJECT_DIR
python3 -m venv venv
source venv/bin/activate

echo -e "${GREEN}Step 7: Installing Python dependencies...${NC}"
pip install --upgrade pip
pip install -r requirements.txt

echo -e "${GREEN}Step 8: Setting up environment variables...${NC}"
# Create .env file
cat > $PROJECT_DIR/.env << EOF
DJANGO_SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
DEBUG=False
ALLOWED_HOSTS=$DOMAIN,www.$DOMAIN,$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
CORS_ALLOWED_ORIGINS=http://$DOMAIN,https://$DOMAIN
EOF

echo -e "${YELLOW}Note: Please update the .env file with your actual domain name${NC}"

echo -e "${GREEN}Step 9: Running Django migrations and collecting static files...${NC}"
cd $PROJECT_DIR/main
python manage.py migrate --settings=main.production_settings
python manage.py collectstatic --noinput --settings=main.production_settings

# Create Django superuser (optional)
echo -e "${YELLOW}Create Django admin superuser (you can skip this by pressing Ctrl+C):${NC}"
python manage.py createsuperuser --settings=main.production_settings || true

deactivate

echo -e "${GREEN}Step 10: Creating frontend .env file...${NC}"
cd $PROJECT_DIR/frontend
cat > .env << EOF
VITE_API_URL=http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)/api
EOF

echo -e "${GREEN}Step 11: Installing frontend dependencies and building...${NC}"
npm install
npm run build

echo -e "${GREEN}Step 12: Setting up Gunicorn service...${NC}"
# Create log directory
sudo mkdir -p /var/log/gunicorn
sudo chown -R $USER:www-data /var/log/gunicorn

# Copy and enable gunicorn service
sudo cp $PROJECT_DIR/deployment/gunicorn.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable gunicorn
sudo systemctl start gunicorn

echo -e "${GREEN}Step 13: Setting up Nginx...${NC}"
# Backup default nginx config
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup

# Copy nginx configuration
sudo cp $PROJECT_DIR/deployment/nginx.conf /etc/nginx/sites-available/algorianai

# Update nginx config with actual IP
EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
sudo sed -i "s/your-ec2-ip/$EC2_IP/g" /etc/nginx/sites-available/algorianai
sudo sed -i "s/your-domain.com/$DOMAIN/g" /etc/nginx/sites-available/algorianai

# Enable site
sudo ln -sf /etc/nginx/sites-available/algorianai /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

echo -e "${GREEN}Step 14: Setting up firewall...${NC}"
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo -e "${GREEN}Step 15: Setting proper permissions...${NC}"
sudo chown -R $USER:www-data $PROJECT_DIR
sudo chmod -R 755 $PROJECT_DIR

echo -e "${GREEN}=========================================="
echo -e "Setup completed successfully!"
echo -e "=========================================="
echo -e "${YELLOW}Your application is now running at:${NC}"
echo -e "${GREEN}http://$EC2_IP${NC}"
echo -e ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Update your domain DNS to point to: $EC2_IP"
echo -e "2. Update .env file in $PROJECT_DIR with your domain"
echo -e "3. Update frontend/.env with your domain"
echo -e "4. Optional: Set up SSL certificate using Let's Encrypt (see documentation)"
echo -e "5. Restart services: sudo systemctl restart gunicorn nginx"
echo -e ""
echo -e "${YELLOW}Useful commands:${NC}"
echo -e "- Check Gunicorn status: sudo systemctl status gunicorn"
echo -e "- Check Nginx status: sudo systemctl status nginx"
echo -e "- View Gunicorn logs: sudo tail -f /var/log/gunicorn/error.log"
echo -e "- View Nginx logs: sudo tail -f /var/log/nginx/error.log"
echo -e "=========================================="
