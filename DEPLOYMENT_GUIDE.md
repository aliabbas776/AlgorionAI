# AlgorianAI AWS EC2 Deployment Guide

This comprehensive guide will walk you through deploying your AlgorianAI application (React frontend + Django backend) to an AWS EC2 instance.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [AWS EC2 Setup](#aws-ec2-setup)
3. [Server Configuration](#server-configuration)
4. [Application Deployment](#application-deployment)
5. [Domain Configuration](#domain-configuration)
6. [SSL Certificate Setup](#ssl-certificate-setup)
7. [Maintenance & Updates](#maintenance--updates)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:
- An AWS account
- Basic knowledge of Linux command line
- SSH client installed on your local machine
- A domain name (optional, but recommended)

---

## AWS EC2 Setup

### Step 1: Launch EC2 Instance

1. **Log in to AWS Console**
   - Go to https://console.aws.amazon.com/
   - Navigate to EC2 Dashboard

2. **Launch Instance**
   - Click "Launch Instance"
   - **Name**: `AlgorianAI-Production`

3. **Choose AMI (Amazon Machine Image)**
   - Select: **Ubuntu Server 22.04 LTS (HVM), SSD Volume Type**
   - Architecture: 64-bit (x86)

4. **Choose Instance Type**
   - Recommended: **t2.medium** (2 vCPU, 4 GB RAM)
   - Minimum: **t2.small** (1 vCPU, 2 GB RAM)
   - For better performance: **t2.large** or higher

5. **Create Key Pair**
   - Click "Create new key pair"
   - Key pair name: `algorianai-key`
   - Key pair type: RSA
   - Private key file format: `.pem` (for Mac/Linux) or `.ppk` (for Windows/PuTTY)
   - **Download and save the key file securely**

6. **Network Settings**
   - Create security group: `algorianai-sg`
   - **Inbound Rules:**
     - SSH (Port 22) - Source: Your IP (or 0.0.0.0/0 for any IP)
     - HTTP (Port 80) - Source: 0.0.0.0/0
     - HTTPS (Port 443) - Source: 0.0.0.0/0

7. **Configure Storage**
   - Size: **20 GB** minimum (30 GB recommended)
   - Volume Type: General Purpose SSD (gp3)

8. **Launch Instance**
   - Review and click "Launch Instance"
   - Wait for instance state to become "Running"
   - Note down the **Public IPv4 address**

### Step 2: Connect to EC2 Instance

#### For Mac/Linux:
```bash
# Set permissions for key file
chmod 400 /path/to/algorianai-key.pem

# Connect to instance
ssh -i /path/to/algorianai-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

#### For Windows (using PowerShell):
```powershell
ssh -i C:\path\to\algorianai-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

#### For Windows (using PuTTY):
1. Convert .pem to .ppk using PuTTYgen
2. Use the .ppk file in PuTTY's SSH authentication settings

---

## Server Configuration

### Option 1: Automated Setup (Recommended)

Once connected to your EC2 instance, run the automated setup script:

```bash
# Download the setup script
wget https://raw.githubusercontent.com/aliabbas776/AlgorionAI/main/deployment/initial_setup.sh

# Make it executable
chmod +x initial_setup.sh

# Run the setup script
./initial_setup.sh
```

The script will:
- Install all required packages
- Clone your repository
- Set up Python virtual environment
- Configure Django backend
- Build React frontend
- Set up Nginx and Gunicorn
- Configure firewall

**Important:** After the script completes, update the following files with your actual domain:
- `/var/www/algorianai/.env`
- `/var/www/algorianai/frontend/.env`
- `/etc/nginx/sites-available/algorianai`

### Option 2: Manual Setup

If you prefer manual setup or if the automated script fails, follow these steps:

#### 1. Update System
```bash
sudo apt update
sudo apt upgrade -y
```

#### 2. Install Required Packages
```bash
# Python and pip
sudo apt install -y python3 python3-pip python3-venv

# Nginx web server
sudo apt install -y nginx

# Git
sudo apt install -y git

# Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 3. Clone Repository
```bash
# Create project directory
sudo mkdir -p /var/www/algorianai
sudo chown -R $USER:www-data /var/www/algorianai

# Clone from GitHub
cd /var/www
git clone https://github.com/aliabbas776/AlgorionAI.git algorianai
cd algorianai
```

#### 4. Setup Backend (Django)

```bash
cd /var/www/algorianai

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file
nano .env
```

Add the following to `.env`:
```env
DJANGO_SECRET_KEY=your-generated-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com,YOUR_EC2_IP
CORS_ALLOWED_ORIGINS=http://your-domain.com,https://your-domain.com
```

Generate a secret key:
```bash
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

```bash
# Run migrations
cd main
python manage.py migrate --settings=main.production_settings

# Collect static files
python manage.py collectstatic --noinput --settings=main.production_settings

# Create superuser (optional)
python manage.py createsuperuser --settings=main.production_settings

# Deactivate venv
deactivate
```

#### 5. Setup Frontend (React)

```bash
cd /var/www/algorianai/frontend

# Create .env file
nano .env
```

Add the following:
```env
VITE_API_URL=http://YOUR_EC2_IP/api
```

```bash
# Install dependencies
npm install

# Build frontend
npm run build
```

#### 6. Configure Gunicorn

```bash
# Create log directory
sudo mkdir -p /var/log/gunicorn
sudo chown -R $USER:www-data /var/log/gunicorn

# Copy service file
sudo cp /var/www/algorianai/deployment/gunicorn.service /etc/systemd/system/

# Reload systemd
sudo systemctl daemon-reload

# Start and enable gunicorn
sudo systemctl start gunicorn
sudo systemctl enable gunicorn

# Check status
sudo systemctl status gunicorn
```

#### 7. Configure Nginx

```bash
# Copy nginx configuration
sudo cp /var/www/algorianai/deployment/nginx.conf /etc/nginx/sites-available/algorianai

# Update configuration with your IP/domain
sudo nano /etc/nginx/sites-available/algorianai
# Replace 'your-ec2-ip' and 'your-domain.com' with actual values

# Enable site
sudo ln -s /etc/nginx/sites-available/algorianai /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

#### 8. Configure Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

---

## Application Deployment

Your application should now be accessible at:
- **Frontend**: `http://YOUR_EC2_IP`
- **Backend API**: `http://YOUR_EC2_IP/api`
- **Django Admin**: `http://YOUR_EC2_IP/admin`

Test the deployment:
```bash
# Check if services are running
sudo systemctl status gunicorn
sudo systemctl status nginx

# Check logs if there are issues
sudo tail -f /var/log/gunicorn/error.log
sudo tail -f /var/log/nginx/error.log
```

---

## Domain Configuration

### Step 1: Point Domain to EC2

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Add/Update the following records:

**A Records:**
- **Host**: `@` (or blank)
- **Value**: `YOUR_EC2_IP`
- **TTL**: 3600

- **Host**: `www`
- **Value**: `YOUR_EC2_IP`
- **TTL**: 3600

### Step 2: Update Application Configuration

```bash
# Update Django .env
nano /var/www/algorianai/.env
# Update ALLOWED_HOSTS and CORS_ALLOWED_ORIGINS with your domain

# Update Frontend .env
nano /var/www/algorianai/frontend/.env
# Update VITE_API_URL to use your domain

# Rebuild frontend
cd /var/www/algorianai/frontend
npm run build

# Update Nginx configuration
sudo nano /etc/nginx/sites-available/algorianai
# Replace IP addresses with your domain

# Restart services
sudo systemctl restart gunicorn
sudo systemctl restart nginx
```

---

## SSL Certificate Setup (HTTPS)

### Using Let's Encrypt (Free SSL Certificate)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain and install certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)

# Test automatic renewal
sudo certbot renew --dry-run
```

The certificate will auto-renew. Certbot adds a cron job automatically.

### Update Django Settings for HTTPS

```bash
nano /var/www/algorianai/main/main/production_settings.py
```

Update the security settings:
```python
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

```bash
# Restart services
sudo systemctl restart gunicorn
sudo systemctl restart nginx
```

---

## Maintenance & Updates

### Deploying Updates

When you push new code to GitHub, deploy it using:

```bash
cd /var/www/algorianai
bash deployment/deploy.sh
```

This script will:
- Pull latest code
- Install/update dependencies
- Run migrations
- Rebuild frontend
- Restart services

### Manual Update Process

```bash
# Navigate to project
cd /var/www/algorianai

# Pull latest code
git pull origin main

# Update backend
source venv/bin/activate
cd main
pip install -r ../requirements.txt
python manage.py migrate --settings=main.production_settings
python manage.py collectstatic --noinput --settings=main.production_settings
deactivate

# Update frontend
cd ../frontend
npm install
npm run build

# Restart services
sudo systemctl restart gunicorn
sudo systemctl restart nginx
```

### Database Backup

```bash
# Backup database
cd /var/www/algorianai/main
source ../venv/bin/activate
python manage.py dumpdata --settings=main.production_settings > backup_$(date +%Y%m%d_%H%M%S).json
deactivate

# Or backup the SQLite file directly
cp db.sqlite3 db.sqlite3.backup_$(date +%Y%m%d_%H%M%S)
```

### Media Files Backup

```bash
# Create backup of media files
cd /var/www/algorianai/main
tar -czf media_backup_$(date +%Y%m%d_%H%M%S).tar.gz media/
```

---

## Troubleshooting

### Check Service Status

```bash
# Check Gunicorn
sudo systemctl status gunicorn
sudo journalctl -u gunicorn -n 50

# Check Nginx
sudo systemctl status nginx
sudo journalctl -u nginx -n 50
```

### View Logs

```bash
# Gunicorn logs
sudo tail -f /var/log/gunicorn/error.log
sudo tail -f /var/log/gunicorn/access.log

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Common Issues

#### 1. 502 Bad Gateway
```bash
# Check if Gunicorn is running
sudo systemctl status gunicorn

# If not running, check logs
sudo journalctl -u gunicorn -n 50

# Restart Gunicorn
sudo systemctl restart gunicorn
```

#### 2. Static Files Not Loading
```bash
# Collect static files again
cd /var/www/algorianai/main
source ../venv/bin/activate
python manage.py collectstatic --noinput --settings=main.production_settings
deactivate

# Check permissions
sudo chown -R $USER:www-data /var/www/algorianai
sudo chmod -R 755 /var/www/algorianai
```

#### 3. API Not Responding
```bash
# Check if backend is running
sudo systemctl status gunicorn

# Test API directly
curl http://127.0.0.1:8000/api/hero-slides/

# Check Nginx configuration
sudo nginx -t
```

#### 4. Frontend Shows Blank Page
```bash
# Rebuild frontend
cd /var/www/algorianai/frontend
npm run build

# Check if dist folder was created
ls -la dist/

# Check Nginx configuration
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. Permission Denied Errors
```bash
# Fix permissions
sudo chown -R ubuntu:www-data /var/www/algorianai
sudo chmod -R 755 /var/www/algorianai

# For media uploads
sudo chmod -R 775 /var/www/algorianai/main/media
```

### Restart All Services

```bash
sudo systemctl restart gunicorn
sudo systemctl restart nginx
```

### Check Disk Space

```bash
df -h
```

If disk is full, clean up:
```bash
# Clean apt cache
sudo apt clean

# Clean old logs
sudo journalctl --vacuum-time=7d
```

---

## Useful Commands

```bash
# Check running services
sudo systemctl list-units --type=service --state=running

# Monitor system resources
htop

# Check open ports
sudo netstat -tlnp

# Test Nginx configuration
sudo nginx -t

# Reload Nginx (without downtime)
sudo nginx -s reload

# View real-time logs
sudo tail -f /var/log/gunicorn/error.log /var/log/nginx/error.log

# Check Django migrations
cd /var/www/algorianai/main
source ../venv/bin/activate
python manage.py showmigrations --settings=main.production_settings
```

---

## Security Best Practices

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords**
   - For Django admin
   - For EC2 SSH keys

3. **Limit SSH access**
   - Use specific IP in security group
   - Consider using SSH key pairs only

4. **Enable HTTPS**
   - Use Let's Encrypt SSL certificate
   - Enforce HTTPS redirect

5. **Regular backups**
   - Database backups
   - Media files backups
   - Configuration backups

6. **Monitor logs regularly**
   - Check for unauthorized access
   - Monitor for errors

---

## Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review application logs
3. Check AWS EC2 instance status
4. Verify security group settings
5. Ensure domain DNS is properly configured

---

## Summary Checklist

- [ ] EC2 instance launched and running
- [ ] Security group configured (ports 22, 80, 443)
- [ ] SSH connection established
- [ ] All packages installed
- [ ] Repository cloned
- [ ] Backend configured and running
- [ ] Frontend built and deployed
- [ ] Nginx configured
- [ ] Gunicorn service running
- [ ] Application accessible via IP
- [ ] Domain pointed to EC2 (optional)
- [ ] SSL certificate installed (optional)
- [ ] Firewall configured
- [ ] Backups configured

---

**Congratulations!** 🎉 Your AlgorianAI application is now live on AWS EC2!

Access your application at: `http://YOUR_EC2_IP` or `https://your-domain.com`
